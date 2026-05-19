require('dotenv').config();
const express     = require('express');
const cors        = require('cors');
const path        = require('path');
const rateLimit   = require('express-rate-limit');

const app = express();

// ── Middleware ────────────────────────────────────────────────
app.use(cors({
  origin: [process.env.CLIENT_URL || 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth',         require('./routes/auth'));
app.use('/api/medicines',    require('./routes/medicines'));
app.use('/api/orders',       require('./routes/orders'));
app.use('/api/pharmacists',  require('./routes/pharmacists'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/suppliers',    require('./routes/suppliers'));
app.use('/api/users',        require('./routes/users'));
app.use('/api/jobs',         require('./routes/jobs'));
app.use('/api/analytics',    require('./routes/analytics'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// ── 404 & Error handler ───────────────────────────────────────
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

// ── Start ─────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const { ensureCareersSchema } = require('./config/migrate');

async function start() {
  try {
    await ensureCareersSchema();
  } catch (err) {
    console.error('⚠️  Careers schema migration failed:', err.message);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Smart Pharmacy API running on http://localhost:${PORT}`);
    console.log(`📦 Database: smart_pharmacy`);
    if (!process.env.SMTP_HOST) {
      console.log('📧 SMTP not configured — hire/reject emails will be logged only');
    }
  });
}

start();