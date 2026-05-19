const db = require('./db');

async function columnExists(table, column) {
  const [rows] = await db.execute(
    `SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [table, column]
  );
  return rows[0].cnt > 0;
}

async function ensureCareersSchema() {
  const changes = [];

  if (!(await columnExists('pharmacists', 'email'))) {
    await db.execute('ALTER TABLE pharmacists ADD COLUMN email VARCHAR(150) NULL AFTER phone');
    changes.push('pharmacists.email');
  }
  if (!(await columnExists('pharmacists', 'hired_from_application_id'))) {
    await db.execute('ALTER TABLE pharmacists ADD COLUMN hired_from_application_id INT NULL AFTER email');
    changes.push('pharmacists.hired_from_application_id');
  }
  if (!(await columnExists('job_applications', 'pharmacist_id'))) {
    await db.execute('ALTER TABLE job_applications ADD COLUMN pharmacist_id INT NULL AFTER status');
    changes.push('job_applications.pharmacist_id');
  }

  if (changes.length) {
    console.log('✅ Careers schema updated:', changes.join(', '));
  }
}

module.exports = { ensureCareersSchema };
