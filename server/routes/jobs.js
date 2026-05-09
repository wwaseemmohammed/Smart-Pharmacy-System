const express = require('express');
const router  = express.Router();
const db      = require('../config/db');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const { authMiddleware, adminOnly } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads/cv');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `cv_${Date.now()}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/'))
      cb(null, true);
    else cb(new Error('Only PDF or image files allowed'));
  },
});

// POST /api/jobs — public, submit application
router.post('/', upload.single('cv'), async (req, res) => {
  try {
    const { full_name, email, phone, position, experience, specialization, about } = req.body;
    if (!full_name || !email || !position)
      return res.status(400).json({ message: 'Name, email and position are required' });

    const cv_filename = req.file ? req.file.filename : null;
    const [result] = await db.execute(
      `INSERT INTO job_applications (full_name, email, phone, position, experience, specialization, about, cv_filename)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [full_name, email, phone||null, position, Number(experience)||0, specialization||null, about||null, cv_filename]
    );
    res.status(201).json({ message: 'Application submitted successfully', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/jobs — admin only
router.get('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM job_applications ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// PATCH /api/jobs/:id/status — admin only
router.patch('/:id/status', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['Pending','Reviewed','Accepted','Rejected'];
    if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });
    await db.execute('UPDATE job_applications SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Status updated' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// GET /api/jobs/:id/cv — download CV
router.get('/:id/cv', authMiddleware, adminOnly, async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT cv_filename FROM job_applications WHERE id = ?', [req.params.id]);
    if (!rows.length || !rows[0].cv_filename) return res.status(404).json({ message: 'CV not found' });
    const filePath = path.join(__dirname, '../uploads/cv', rows[0].cv_filename);
    res.download(filePath);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
