const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const db      = require('../config/db');

// الإيميل الخاص بصاحب الصيدلية — يحصل تلقائياً على role=admin
const OWNER_EMAIL = 'waseemmohammed@gmail.com';

const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET || 'smart_pharmacy_jwt_secret_2024_secure_key', { expiresIn: '7d' });

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Name, email and password are required' });

    const [exists] = await db.execute('SELECT id FROM users WHERE email = ?', [email.trim().toLowerCase()]);
    if (exists.length) return res.status(409).json({ message: 'Email already registered' });

    // إيميل صاحب الصيدلية → admin، أي إيميل آخر → customer
    const role = email.trim().toLowerCase() === OWNER_EMAIL.toLowerCase() ? 'admin' : 'customer';
    const hash = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name.trim(), email.trim().toLowerCase(), hash, role]
    );

    const userObj = { id: result.insertId, name: name.trim(), email: email.trim().toLowerCase(), role };
    const token   = signToken(userObj);

    res.status(201).json({ message: 'Registered successfully', token, user: userObj });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' });

    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email.trim().toLowerCase()]);
    if (!rows.length) return res.status(401).json({ message: 'Invalid email or password' });

    const user = rows[0];
    if (user.status === 'Suspended')
      return res.status(403).json({ message: 'Account suspended. Please contact support.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid email or password' });

    // إذا إيميل صاحب الصيدلية لكن role مش admin → نصلحها
    if (user.email.toLowerCase() === OWNER_EMAIL.toLowerCase() && user.role !== 'admin') {
      await db.execute('UPDATE users SET role = ? WHERE id = ?', ['admin', user.id]);
      user.role = 'admin';
    }

    const userObj = { id: user.id, name: user.name, email: user.email, role: user.role };
    const token   = signToken(userObj);

    res.json({ message: 'Login successful', token, user: userObj });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/auth/me — validate token
router.get('/me', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'smart_pharmacy_jwt_secret_2024_secure_key');
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
