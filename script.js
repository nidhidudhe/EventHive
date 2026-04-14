const API_BASE = 'http://localhost:5000';
let currentTable = 'event';

const schemas = {
    'event': ['event_id', 'event_name', 'description', 'venue_id', 'organiser_id', 'category_id'],
    'User': ['user_id', 'name', 'email', 'contact_no'],
    'booking': ['booking_id', 'booking_date', 'total_amount', 'user_id'],
    'ticket': ['ticket_id', 'event_id', 'booking_id', 'type', 'price'],
    'payment': ['payment_id', 'booking_id', 'payment_method'],
    'vendor': ['vendor_id', 'name', 'contact_no', 'service', 'event_id'],
    'organizer': ['organiser_id', 'name', 'email', 'contact_no', 'company_name'],
    'sponsor': ['sponsor_id', 'name', 'company', 'contact_no'],
    'venue': ['venue_id', 'name', 'location', 'capacity'],
    
    // MATCHED TO YOUR DATABASE: category_id, name, description
    'category': ['category_id', 'name', 'description'],

    'schedule': ['schedule_id', 'event_id', 'activity', 'start_time', 'end_time'],
    'staff': ['staff_id', 'name', 'role', 'contact_no', 'event_id'],
    'event_sponsor': ['event_id', 'sponsor_id']
};

document.addEventListener('DOMContentLoaded', () => switchSection('event'));

async function switchSection(tableName) {
    currentTable = tableName;
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
    const activeLi = Array.from(document.querySelectorAll('.nav-links li')).find(li => 
        li.getAttribute('onclick').toLowerCase().includes(tableName.toLowerCase())
    );
    if (activeLi) activeLi.classList.add('active');

    document.getElementById('add-btn').innerText = `➕ Add ${tableName}`;
    const grid = document.getElementById('events-grid');
    const table = document.getElementById('table-view');

    grid.style.display = 'none';
    table.style.display = 'none';

    if (tableName === 'event') {
        grid.style.display = 'grid';
        await loadEvents();
    } else {
        table.style.display = 'block';
        await loadTableData(tableName);
    }
}

async function loadEvents() {
    const grid = document.getElementById('events-grid');
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Refreshing...</p>';
    try {
        const res = await axios.get(`${API_BASE}/event`);
        if (res.data.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem;">No events found.</p>';
            return;
        }
        grid.innerHTML = res.data.map(e => `
            <div class="card">
                <h2 style="color: var(--primary)">ID: ${e.event_id}</h2>
                <h3>${e.event_name}</h3>
                <p style="margin: 1rem 0">${e.description || '-'}</p>
                <div style="font-size: 0.8rem; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 5px">
                    Venue: ${e.venue_id} | Organizer: ${e.organiser_id}
                </div>
                <div style="margin-top: 1rem">
                    <button class="btn btn-danger" onclick="deleteRecord('${e.event_id}')">🗑️ Delete</button>
                </div>
            </div>
        `).join('');
    } catch (err) { console.error(err); }
}

async function loadTableData(tableName) {
    const body = document.getElementById('table-body');
    const head = document.getElementById('table-head');
    body.innerHTML = '<tr><td colspan="100">Syncing...</td></tr>';
    try {
        const res = await axios.get(`${API_BASE}/${tableName}`);
        if (res.data.length === 0) {
            body.innerHTML = '<tr><td colspan="100" style="padding: 2rem; text-align: center;">Empty Table.</td></tr>';
            head.innerHTML = '';
            return;
        }
        const cols = Object.keys(res.data[0]);
        head.innerHTML = `<tr>${cols.map(c => `<th>${c}</th>`).join('')}<th>ACTION</th></tr>`;
        body.innerHTML = res.data.map(row => `
            <tr>
                ${cols.map(c => `<td>${row[c] !== null ? row[c] : '-'}</td>`).join('')}
                <td><button class="btn btn-danger" style="padding: 4px 8px" onclick="deleteRecord('${row[cols[0]]}')">X</button></td>
            </tr>
        `).join('');
    } catch (err) { body.innerHTML = '<tr><td colspan="100">Error loading data.</td></tr>'; }
}

function openUniModal() {
    const schemaKey = Object.keys(schemas).find(k => k.toLowerCase() === currentTable.toLowerCase()) || currentTable;
    const fields = schemas[schemaKey] || [];
    const container = document.getElementById('form-fields');
    
    document.getElementById('modal-title').innerText = `Add New ${currentTable}`;
    container.innerHTML = fields.map(f => {
        const isNum = f.includes('_id') || f.includes('capacity') || f.includes('amount') || f.includes('price');
        const isDate = f.includes('date') || f.includes('time');
        return `
            <div class="form-group">
                <label style="color: #818cf8">${f.toUpperCase()}</label>
                <input type="${isNum ? 'number' : (isDate ? 'date' : 'text')}" id="inp_${f}" placeholder="Enter ${f}" required>
            </div>
        `;
    }).join('');
    document.getElementById('uniModal').style.display = 'flex';
}

function closeUniModal() { document.getElementById('uniModal').style.display = 'none'; }

document.getElementById('uniForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {};
    const schemaKey = Object.keys(schemas).find(k => k.toLowerCase() === currentTable.toLowerCase()) || currentTable;
    const fields = schemas[schemaKey] || [];
    
    fields.forEach(f => {
        const el = document.getElementById(`inp_${f}`);
        data[f] = el.type === 'number' ? parseFloat(el.value) : el.value;
    });

    try {
        await axios.post(`${API_BASE}/${currentTable}`, data);
        alert('Saved Successfully! 🎉');
        closeUniModal();
        switchSection(currentTable);
    } catch (err) {
        alert(err.response?.data?.error || 'Database Error.');
    }
});

async function deleteRecord(id) {
    if (!confirm('Delete?')) return;
    try {
        await axios.delete(`${API_BASE}/${currentTable}/${id}`);
        switchSection(currentTable);
    } catch (err) { alert('Delete failed.'); }
}