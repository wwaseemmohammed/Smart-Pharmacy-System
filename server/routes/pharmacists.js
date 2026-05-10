const express = require('express');
const router  = express.Router();
const db      = require('../config/db');
const { authMiddleware, adminOnly } = require('../middleware/auth');

// GET /api/pharmacists — public
router.get('/', async (req, res) => {
  try {
    const { shift } = req.query;
    let where = '1=1';
    const params = [];
    if (shift && shift !== 'all') { where += ' AND shift = ?'; params.push(shift); }
    const [rows] = await db.execute(`SELECT * FROM pharmacists WHERE ${where} ORDER BY experience DESC`, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/pharmacists/:id — public
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM pharmacists WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Pharmacist not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/pharmacists — admin only
router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { name, name_ar, title, title_ar, specialty, specialty_ar, experience, shift, phone, whatsapp, avatar, avatar_color, status } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const [result] = await db.execute(
      `INSERT INTO pharmacists (name, name_ar, title, title_ar, specialty, specialty_ar, experience, shift, phone, whatsapp, avatar, avatar_color, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, name_ar||null, title||null, title_ar||null, specialty||null, specialty_ar||null,
       Number(experience)||0, shift||'morning', phone||null, whatsapp||null,
       avatar||name.substring(0,2).toUpperCase(), avatar_color||'#1D9E75', status||'Available']
    );
    const [newRow] = await db.execute('SELECT * FROM pharmacists WHERE id = ?', [result.insertId]);
    res.status(201).json(newRow[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/pharmacists/:id — admin only
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { name, name_ar, title, title_ar, specialty, specialty_ar, experience, shift, phone, whatsapp, avatar, avatar_color, status } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    await db.execute(
      `UPDATE pharmacists SET name=?, name_ar=?, title=?, title_ar=?, specialty=?, specialty_ar=?,
       experience=?, shift=?, phone=?, whatsapp=?, avatar=?, avatar_color=?, status=? WHERE id=?`,
      [name, name_ar||null, title||null, title_ar||null, specialty||null, specialty_ar||null,
       Number(experience)||0, shift||'morning', phone||null, whatsapp||null,
       avatar||name.substring(0,2).toUpperCase(), avatar_color||'#1D9E75', status||'Available',
       req.params.id]
    );
    const [updated] = await db.execute('SELECT * FROM pharmacists WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/pharmacists/:id — admin only
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    await db.execute('DELETE FROM pharmacists WHERE id = ?', [req.params.id]);
    res.json({ message: 'Pharmacist deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
