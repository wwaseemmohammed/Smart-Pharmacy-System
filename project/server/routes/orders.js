const express = require('express');
const router  = express.Router();
const db      = require('../config/db');
const { authMiddleware, adminOnly } = require('../middleware/auth');

// POST /api/orders — create new order (public)
router.post('/', async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const { customer_name, customer_email, customer_phone, address, items = [], payment_method, notes, order_code } = req.body;
    if (!customer_name)
      return res.status(400).json({ message: 'Customer name is required' });

    const safeNotes = [
      order_code ? `Code: ${order_code}` : null,
      payment_method ? `Payment: ${payment_method}` : null,
      notes || null,
    ]
      .filter(Boolean)
      .join(' | ');

    let total = 0;
    if (items && items.length > 0) {
      for (const item of items) {
        const [[med]] = await conn.execute('SELECT * FROM medicines WHERE id = ?', [item.medicine_id]);
        if (!med) throw new Error(`Medicine id ${item.medicine_id} not found`);
        if (med.stock < item.quantity) throw new Error(`Insufficient stock for ${med.name}`);
        total += med.price * item.quantity;
      }
    }

    const [orderResult] = await conn.execute(
      `INSERT INTO orders (customer_name, customer_email, customer_phone, address, total, payment_method, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [customer_name, customer_email || null, customer_phone || null, address || null,
       total, payment_method || 'Cash', safeNotes || null]
    );
    const orderId = orderResult.insertId;

    if (items && items.length > 0) {
      for (const item of items) {
        const [[med]] = await conn.execute('SELECT price FROM medicines WHERE id = ?', [item.medicine_id]);
        await conn.execute(
          'INSERT INTO order_items (order_id, medicine_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.medicine_id, item.quantity, med.price]
        );
        await conn.execute(
          'UPDATE medicines SET stock = stock - ? WHERE id = ?',
          [item.quantity, item.medicine_id]
        );
      }
    }

    await conn.commit();
    res.status(201).json({ message: 'Order created successfully', order_id: orderId, total, order_code });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error' });
  } finally {
    conn.release();
  }
});

// GET /api/orders — admin: all orders
router.get('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    let where = '1=1';
    const params = [];
    if (status && status !== 'All') { where += ' AND o.status = ?'; params.push(status); }

    const [rows] = await db.execute(
      `SELECT o.*, GROUP_CONCAT(m.name SEPARATOR ', ') as items_summary
       FROM orders o
       LEFT JOIN order_items oi ON oi.order_id = o.id
       LEFT JOIN medicines m ON m.id = oi.medicine_id
       WHERE ${where}
       GROUP BY o.id
       ORDER BY o.created_at DESC
       LIMIT ${Number(limit)} OFFSET ${offset}`,
      params
    );
    const [[{ total }]] = await db.execute(`SELECT COUNT(*) as total FROM orders o WHERE ${where}`, params);
    res.json({ orders: rows, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/orders/:id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Order not found' });

    const [items] = await db.execute(
      `SELECT oi.*, m.name, m.name_ar, m.category FROM order_items oi
       JOIN medicines m ON m.id = oi.medicine_id WHERE oi.order_id = ?`,
      [req.params.id]
    );
    res.json({ ...rows[0], items });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/orders/:id/status — admin only
router.patch('/:id/status', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['Pending','Accepted','Rejected','Delivered'];
    if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });

    const [rows] = await db.execute('SELECT id FROM orders WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Order not found' });

    await db.execute('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Status updated', status });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/orders/:id — admin only
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    await db.execute('DELETE FROM orders WHERE id = ?', [req.params.id]);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;