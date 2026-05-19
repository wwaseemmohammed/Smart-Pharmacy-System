const mysql2 = require('mysql2');
require('dotenv').config();

const pool = mysql2.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || 'waseemxd12',
  database: process.env.DB_NAME     || 'smart_pharmacy',
  port:     process.env.DB_PORT     || 3306,
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
  charset:            'utf8mb4',
});

const promisePool = pool.promise();

// Test connection on startup
pool.getConnection((err, conn) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
  } else {
    console.log('✅ MySQL connected — database:', process.env.DB_NAME);
    conn.release();
  }
});

module.exports = promisePool;