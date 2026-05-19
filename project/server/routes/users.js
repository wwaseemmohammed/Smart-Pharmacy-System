const express = require('express');
const router  = express.Router();
const db      = require('../config/db');
const bcrypt  = require('bcryptjs');
const { authMiddleware, adminOnly } = require('../middleware/auth');

router.get('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { search = '' } = req.query;
    let where = '1=1';
    const params = [];
    if (search) { where += ' AND (name LIKE ? OR email LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
    const [rows] = await db.execute(
      `SELECT id, name, email, role, status, created_at FROM users WHERE ${where} ORDER BY created_at DESC`,
      params
    );
    res.json(rows);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
    const [exists] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (exists.length) return res.status(409).json({ message: 'Email already exists' });
    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hash, role || 'customer']
    );
    const [row] = await db.execute('SELECT id, name, email, role, status, created_at FROM users WHERE id = ?', [result.insertId]);
    res.status(201).json(row[0]);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { name, email, role, status } = req.body;
    await db.execute(
      'UPDATE users SET name=?, email=?, role=?, status=? WHERE id=?',
      [name, email, role || 'customer', status || 'Active', req.params.id]
    );
    const [row] = await db.execute('SELECT id, name, email, role, status, created_at FROM users WHERE id = ?', [req.params.id]);
    res.json(row[0]);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    await db.execute('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'User deleted' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;