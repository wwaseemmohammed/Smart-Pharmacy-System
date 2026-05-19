const express = require('express');
const router  = express.Router();
const db      = require('../config/db');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');

// Multer setup for medicine images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads/medicines');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `med_${Date.now()}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files allowed'));
  },
});

// GET /api/medicines — public, with search & filter & pagination
router.get('/', async (req, res) => {
  try {
    const { search = '', category = 'all', sort = 'popular', page = 1, limit = 50 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let where = '1=1';
    const params = [];

    if (search) {
      where += ' AND (m.name LIKE ? OR m.name_ar LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    if (category && category !== 'all') {
      where += ' AND m.category = ?';
      params.push(category);
    }

    let orderBy = 'm.popular DESC';
    if (sort === 'price-asc')  orderBy = 'm.price ASC';
    if (sort === 'price-desc') orderBy = 'm.price DESC';
    if (sort === 'newest')     orderBy = 'm.is_new DESC, m.created_at DESC';
    if (sort === 'name')       orderBy = 'm.name ASC';

    const [rows] = await db.execute(
      `SELECT m.* FROM medicines m WHERE ${where} ORDER BY ${orderBy} LIMIT ${Number(limit)} OFFSET ${offset}`,
      params
    );
    const [[{ total }]] = await db.execute(
      `SELECT COUNT(*) as total FROM medicines m WHERE ${where}`, params
    );

    res.json({ medicines: rows, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/medicines/low-stock
router.get('/low-stock', authMiddleware, adminOnly, async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM medicines WHERE stock <= min_stock ORDER BY stock ASC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/medicines/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM medicines WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Medicine not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/medicines — admin only
router.post('/', authMiddleware, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { name, name_ar, category, price, stock, min_stock, description, usage_info, is_new, popular } = req.body;
    if (!name || !price) return res.status(400).json({ message: 'Name and price are required' });

    const image_url = req.file ? `/uploads/medicines/${req.file.filename}` : null;
    const [result] = await db.execute(
      `INSERT INTO medicines (name, name_ar, category, price, stock, min_stock, description, usage_info, image_url, is_new, popular)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, name_ar || null, category || 'other', Number(price), Number(stock) || 0,
       Number(min_stock) || 10, description || null, usage_info || null,
       image_url, Number(is_new) || 0, Number(popular) || 50]
    );
    const [newMed] = await db.execute('SELECT * FROM medicines WHERE id = ?', [result.insertId]);
    res.status(201).json(newMed[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/medicines/:id — admin only
router.put('/:id', authMiddleware, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { name, name_ar, category, price, stock, min_stock, description, usage_info, is_new, popular } = req.body;
    if (!name || !price) return res.status(400).json({ message: 'Name and price are required' });

    const [existing] = await db.execute('SELECT * FROM medicines WHERE id = ?', [req.params.id]);
    if (!existing.length) return res.status(404).json({ message: 'Medicine not found' });

    const image_url = req.file
      ? `/uploads/medicines/${req.file.filename}`
      : (existing[0].image_url || null);

    await db.execute(
      `UPDATE medicines SET name=?, name_ar=?, category=?, price=?, stock=?, min_stock=?,
       description=?, usage_info=?, image_url=?, is_new=?, popular=? WHERE id=?`,
      [name, name_ar || null, category || 'other', Number(price), Number(stock) || 0,
       Number(min_stock) || 10, description || null, usage_info || null,
       image_url, Number(is_new) || 0, Number(popular) || 50, req.params.id]
    );
    const [updated] = await db.execute('SELECT * FROM medicines WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/medicines/:id — admin only
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT id FROM medicines WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Medicine not found' });
    await db.execute('DELETE FROM medicines WHERE id = ?', [req.params.id]);
    res.json({ message: 'Medicine deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;