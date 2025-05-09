const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

let connection;

async function testConnection() {
  try {
    await connection.connect(); // Not strictly needed, as `mysql2/promise` auto-connects
    console.log('Connected to MySQL database successfully!');
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

async function initializeDatabase() {
  try {
    // 1. התחברות בלי לבחור database
    const tempConnection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Cs0583299351!",
      database: "chaniandayala",
      port: 3306
    });

    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
    console.log(`Database ${process.env.DB_NAME} created or already exists`);
    await tempConnection.end();

    // 2. התחברות מחדש עם בסיס הנתונים שנבחר
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Cs0583299351!",
      database: "chaniandayala",
      port: 3306
    });

    // 3. קריאת schema
    const schemaSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    const queries = schemaSQL.split(';').filter(q => q.trim() !== '');

    for (const query of queries) {
      await connection.query(query + ';');
    }

    console.log('Database schema initialized successfully!');
    return true;
  } catch (error) {
    console.error('Failed to initialize database schema:', error);
    return false;
  }
}

module.exports = {
  get connection() {
    if (!connection) throw new Error("Database not initialized. Call initializeDatabase() first.");
    return connection;
  },
  testConnection,
  initializeDatabase
};
