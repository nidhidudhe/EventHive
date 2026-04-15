// db.js
const { Pool } = require('pg');

// Create connection pool
const pool = new Pool({
  user: 'postgres',          // your pgAdmin username
  host: 'localhost',
  database: 'EventHive',     // your database name
  password: 'NND06#sql', // your postgres password
  port: 5432,
});

// Export pool
module.exports = pool;