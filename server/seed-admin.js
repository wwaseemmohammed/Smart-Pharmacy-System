// Run this once to create a proper admin user with hashed password
// node seed-admin.js

require('dotenv').config()
const mysql  = require('mysql2/promise')
const bcrypt = require('bcryptjs')

async function seed() {
  const conn = await mysql.createConnection({
    host:     process.env.DB_HOST     || 'localhost',
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || 'waseemxd12',
    database: process.env.DB_NAME     || 'smart_pharmacy',
  })

  const hash = await bcrypt.hash('Admin@1234', 10)

  // Delete existing admin and re-insert with correct hash
  await conn.execute("DELETE FROM users WHERE email = 'admin@pharmacy.ps'")
  await conn.execute(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    ['Admin User', 'admin@pharmacy.ps', hash, 'admin']
  )

  console.log('✅ Admin user created:')
  console.log('   Email:    admin@pharmacy.ps')
  console.log('   Password: Admin@1234')

  await conn.end()
}

seed().catch(console.error)
