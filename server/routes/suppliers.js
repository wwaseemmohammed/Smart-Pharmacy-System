const express = require('express');
const router  = express.Router();
const db      = require('../config/db');
const { authMiddleware, adminOnly } = require('../middleware/auth');

router.get('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { search = '' } = req.query;
    let where = '1=1';
    const params = [];
    if (search) { where += ' AND (name LIKE ? OR email LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
    const [rows] = await db.execute(`SELECT * FROM suppliers WHERE ${where} ORDER BY name ASC`, params);
    res.json(rows);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { name, email, phone, address, status } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const [result] = await db.execute(
      'INSERT INTO suppliers (name, email, phone, address, status) VALUES (?, ?, ?, ?, ?)',
      [name, email||null, phone||null, address||null, status||'Active']
    );
    const [row] = await db.execute('SELECT * FROM suppliers WHERE id = ?', [result.insertId]);
    res.status(201).json(row[0]);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { name, email, phone, address, status } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    await db.execute(
      'UPDATE suppliers SET name=?, email=?, phone=?, address=?, status=? WHERE id=?',
      [name, email||null, phone||null, address||null, status||'Active', req.params.id]
    );
    const [row] = await db.execute('SELECT * FROM suppliers WHERE id = ?', [req.params.id]);
    res.json(row[0]);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    await db.execute('DELETE FROM suppliers WHERE id = ?', [req.params.id]);
    res.json({ message: 'Supplier deleted' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
