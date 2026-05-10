const express = require('express');
const router  = express.Router();
const db      = require('../config/db');
const { authMiddleware, adminOnly } = require('../middleware/auth');

// GET /api/appointments — admin only
router.get('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT a.*, p.name as pharmacist_name, p.name_ar as pharmacist_name_ar
       FROM appointments a
       JOIN pharmacists p ON p.id = a.pharmacist_id
       ORDER BY a.appointment_date DESC, a.appointment_time ASC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/appointments — public (patient books)
router.post('/', async (req, res) => {
  try {
    const { patient_name, patient_phone, pharmacist_id, appointment_date, appointment_time, notes } = req.body;
    if (!patient_name || !pharmacist_id || !appointment_date || !appointment_time)
      return res.status(400).json({ message: 'All fields are required' });

    // Check for conflict: same pharmacist, same date, same time
    const [conflict] = await db.execute(
      `SELECT id FROM appointments
       WHERE pharmacist_id = ? AND appointment_date = ? AND appointment_time = ?
       AND status NOT IN ('Cancelled')`,
      [pharmacist_id, appointment_date, appointment_time]
    );
    if (conflict.length)
      return res.status(409).json({ message: 'This time slot is already booked. Please choose another time.' });

    // Check pharmacist exists
    const [pharm] = await db.execute('SELECT id, status FROM pharmacists WHERE id = ?', [pharmacist_id]);
    if (!pharm.length) return res.status(404).json({ message: 'Pharmacist not found' });
    if (pharm[0].status === 'On Leave')
      return res.status(409).json({ message: 'This pharmacist is currently on leave' });

    const [result] = await db.execute(
      `INSERT INTO appointments (patient_name, patient_phone, pharmacist_id, appointment_date, appointment_time, notes)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [patient_name, patient_phone || null, pharmacist_id, appointment_date, appointment_time, notes || null]
    );
    res.status(201).json({ message: 'Appointment booked successfully', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/appointments/availability — check available slots for a pharmacist on a date
router.get('/availability', async (req, res) => {
  try {
    const { pharmacist_id, date } = req.query;
    if (!pharmacist_id || !date) return res.status(400).json({ message: 'pharmacist_id and date required' });

    const [booked] = await db.execute(
      `SELECT appointment_time FROM appointments
       WHERE pharmacist_id = ? AND appointment_date = ? AND status NOT IN ('Cancelled')`,
      [pharmacist_id, date]
    );
    const bookedTimes = booked.map(r => r.appointment_time);
    res.json({ bookedTimes });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/appointments/:id/status — admin only
router.patch('/:id/status', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['Waiting','In Progress','Completed','Cancelled'];
    if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });
    await db.execute('UPDATE appointments SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/appointments/:id — admin only
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    await db.execute('DELETE FROM appointments WHERE id = ?', [req.params.id]);
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
