const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// --- DATABASE CONNECTION ---
pool.connect((err, client, release) => {
    if (err) return console.error('❌ DB Connection Error:', err.stack);
    console.log('✅ Connected to EventHive Database');
    release();
});

// --- HELPER: Get Columns ---
const getTableColumns = async (tableName) => {
    try {
        const query = `SELECT column_name FROM information_schema.columns WHERE table_name = $1`;
        const res = await pool.query(query, [tableName.toLowerCase()]);
        return res.rows.map(r => r.column_name);
    } catch (e) { return []; }
};

// --- API ROUTES ---
app.get('/:table', async (req, res) => {
    let tableName = req.params.table;
    try {
        // Table name is NOT quoted here to allow PG to handle case-insensitivity (except for "User")
        const targetTable = tableName.toLowerCase() === 'user' ? '"User"' : tableName;
        const result = await pool.query(`SELECT * FROM ${targetTable}`);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/:table', async (req, res) => {
    const tableName = req.params.table;
    const data = req.body;
    const keys = Object.keys(data).map(k => k.toLowerCase());
    const values = Object.values(data);
    
    // Column names remain quoted in lowercase for safety
    const columns = keys.map(k => `"${k}"`).join(', ');
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const targetTable = tableName.toLowerCase() === 'user' ? '"User"' : tableName;

    try {
        const query = `INSERT INTO ${targetTable} (${columns}) OVERRIDING SYSTEM VALUE VALUES (${placeholders}) RETURNING *`;
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (err) {
        try {
            const fallbackQuery = `INSERT INTO ${targetTable} (${columns}) VALUES (${placeholders}) RETURNING *`;
            const fbResult = await pool.query(fallbackQuery, values);
            res.json(fbResult.rows[0]);
        } catch (err2) {
            const realCols = await getTableColumns(tableName);
            res.status(500).json({ 
                error: `Insert failed for table '${tableName}'. Database expects columns: [${realCols.join(', ')}]` 
            });
        }
    }
});

app.delete('/:table/:id', async (req, res) => {
    const tableName = req.params.table;
    try {
        const targetTable = tableName.toLowerCase() === 'user' ? '"User"' : tableName;
        // Simple 1st column delete as fallback
        const result = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_name = $1 LIMIT 1`, [tableName.toLowerCase()]);
        const pk = result.rows[0].column_name;
        await pool.query(`DELETE FROM ${targetTable} WHERE "${pk}" = $1`, [req.params.id]);
        res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Master Hub on http://localhost:5000`);
});
