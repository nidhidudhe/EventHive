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

<<<<<<< HEAD
app.put('/:table/:id', async (req, res) => {
    const tableName = req.params.table;
    const id = req.params.id;
    const data = req.body;
    
    try {
        const targetTable = tableName.toLowerCase() === 'user' ? '"User"' : tableName;
        
        // 1. Get primary key column name
        const pkRes = await pool.query(`
            SELECT a.attname 
            FROM pg_index i 
            JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey) 
            WHERE i.indrelid = $1::regclass AND i.indisprimary`, 
            [targetTable.replace(/"/g, '')]
        );
        const pk = pkRes.rows[0]?.attname || (await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_name = $1 LIMIT 1`, [tableName.toLowerCase()])).rows[0].column_name;

        // 2. Build SET clause (excluding primary key)
        const keys = Object.keys(data).filter(k => k.toLowerCase() !== pk.toLowerCase());
        const setClause = keys.map((k, i) => `"${k}" = $${i + 1}`).join(', ');
        const values = keys.map(k => data[k]);
        values.push(id); // Add ID for WHERE clause

        const query = `UPDATE ${targetTable} SET ${setClause} WHERE "${pk}" = $${values.length} RETURNING *`;
        const result = await pool.query(query, values);
        
        if (result.rowCount === 0) return res.status(404).json({ error: "Record not found" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

=======
>>>>>>> 550ff04eb415eb483c0682358a24f825ed249448
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Master Hub on http://localhost:5000`);
});
