<<<<<<< HEAD
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
=======
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
>>>>>>> 550ff04eb415eb483c0682358a24f825ed249448
module.exports = pool;