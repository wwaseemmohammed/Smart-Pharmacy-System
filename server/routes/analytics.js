const express = require('express');
const router  = express.Router();
const db      = require('../config/db');
const { authMiddleware, adminOnly } = require('../middleware/auth');

// GET /api/analytics/summary — dashboard KPIs
router.get('/summary', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { range = 'today' } = req.query;
    let dateFilter = 'DATE(o.created_at) = CURDATE()';
    if (range === 'week')  dateFilter = 'o.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)';
    if (range === 'month') dateFilter = 'o.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)';

    const [[{ total_orders }]] = await db.execute(
      `SELECT COUNT(*) as total_orders FROM orders o WHERE ${dateFilter}`
    );
    const [[{ revenue }]] = await db.execute(
      `SELECT COALESCE(SUM(o.total),0) as revenue FROM orders o WHERE ${dateFilter} AND o.status != 'Rejected'`
    );
    const [[{ total_users }]] = await db.execute('SELECT COUNT(*) as total_users FROM users');
    const [[{ total_appointments }]] = await db.execute(
      `SELECT COUNT(*) as total_appointments FROM appointments WHERE ${dateFilter.replace('o.', '')}`
    );
    const [[{ low_stock_count }]] = await db.execute(
      'SELECT COUNT(*) as low_stock_count FROM medicines WHERE stock <= min_stock'
    );
    const [lowStockMeds] = await db.execute(
      'SELECT id, name, stock, min_stock FROM medicines WHERE stock <= min_stock ORDER BY stock ASC LIMIT 5'
    );

    res.json({ total_orders, revenue: Number(revenue), total_users, total_appointments, low_stock_count, low_stock_medicines: lowStockMeds });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/analytics/sales — sales over time
router.get('/sales', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { range = 'week' } = req.query;
    let groupBy = 'DATE(created_at)';
    let dateFilter = 'created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)';
    if (range === 'month') { dateFilter = 'created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)'; }

    const [rows] = await db.execute(
      `SELECT ${groupBy} as date, COUNT(*) as orders, COALESCE(SUM(total),0) as revenue
       FROM orders WHERE ${dateFilter} AND status != 'Rejected'
       GROUP BY ${groupBy} ORDER BY date ASC`
    );
    res.json(rows);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// GET /api/analytics/top-medicines
router.get('/top-medicines', authMiddleware, adminOnly, async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT m.name, SUM(oi.quantity) as total_sold, SUM(oi.quantity * oi.price) as revenue
       FROM order_items oi
       JOIN medicines m ON m.id = oi.medicine_id
       JOIN orders o ON o.id = oi.order_id
       WHERE o.status != 'Rejected'
       GROUP BY m.id, m.name
       ORDER BY total_sold DESC LIMIT 10`
    );
    res.json(rows);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
