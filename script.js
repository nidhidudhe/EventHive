const API_BASE = 'http://localhost:5000';
let currentTable = 'event';
<<<<<<< HEAD
let editId = null; // Track if we are editing or adding
=======
>>>>>>> 550ff04eb415eb483c0682358a24f825ed249448

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
<<<<<<< HEAD

=======
    
>>>>>>> 550ff04eb415eb483c0682358a24f825ed249448
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
<<<<<<< HEAD
    const activeLi = Array.from(document.querySelectorAll('.nav-links li')).find(li =>
=======
    const activeLi = Array.from(document.querySelectorAll('.nav-links li')).find(li => 
>>>>>>> 550ff04eb415eb483c0682358a24f825ed249448
        li.getAttribute('onclick').toLowerCase().includes(tableName.toLowerCase())
    );
    if (activeLi) activeLi.classList.add('active');

<<<<<<< HEAD
    document.getElementById('add-btn').innerHTML = `<svg width="16px" height="16px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g data-name="add" id="add-2"> <g> <line fill="none" stroke="#ffffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="19" y2="5"></line> <line fill="none" stroke="#ffffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="5" x2="19" y1="12" y2="12"></line> </g> </g> </g> </g></svg> Add ${tableName}`;
=======
    document.getElementById('add-btn').innerText = `➕ Add ${tableName}`;
>>>>>>> 550ff04eb415eb483c0682358a24f825ed249448
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
<<<<<<< HEAD
                <div style="margin-top: 1rem; display: flex; gap: 10px;">
                    <button class="btn btn-edit" onclick='openUniModal(${JSON.stringify(e)})'><svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#ffffffff"></path> </g></svg> Edit</button>
                    <button class="btn btn-danger" onclick="deleteRecord('${e.event_id}')"><svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#ffffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> Delete</button>
=======
                <div style="margin-top: 1rem">
                    <button class="btn btn-danger" onclick="deleteRecord('${e.event_id}')">🗑️ Delete</button>
>>>>>>> 550ff04eb415eb483c0682358a24f825ed249448
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
<<<<<<< HEAD
                <td>
                    <button class="btn btn-edit" style="padding: 4px 8px; margin-right: 5px" onclick='openUniModal(${JSON.stringify(row)})'><svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#ffffffff"></path> </g></svg> Edit</button>
                    <button class="btn btn-danger" style="padding: 4px 8px" onclick="deleteRecord('${row[cols[0]]}')"><svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#ffffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> Delete</button>
                </td>
=======
                <td><button class="btn btn-danger" style="padding: 4px 8px" onclick="deleteRecord('${row[cols[0]]}')">X</button></td>
>>>>>>> 550ff04eb415eb483c0682358a24f825ed249448
            </tr>
        `).join('');
    } catch (err) { body.innerHTML = '<tr><td colspan="100">Error loading data.</td></tr>'; }
}

<<<<<<< HEAD
function openUniModal(existingData = null) {
    editId = existingData ? Object.values(existingData)[0] : null; // Assume 1st col is ID

    const schemaKey = Object.keys(schemas).find(k => k.toLowerCase() === currentTable.toLowerCase()) || currentTable;
    const fields = schemas[schemaKey] || [];
    const container = document.getElementById('form-fields');

    document.getElementById('modal-title').innerText = editId ? `Edit ${currentTable} (ID: ${editId})` : `Add New ${currentTable}`;

    container.innerHTML = fields.map(f => {
        const isNum = f.includes('_id') || f.includes('capacity') || f.includes('amount') || f.includes('price');
        const isDate = f.includes('date') || f.includes('time');
        const value = existingData ? (existingData[f] || '') : '';

        return `
            <div class="form-group">
                <label style="color: #818cf8">${f.toUpperCase()}</label>
                <input type="${isNum ? 'number' : (isDate ? 'date' : 'text')}" 
                       id="inp_${f}" 
                       value="${value}"
                       placeholder="Enter ${f}" 
                       ${f.toLowerCase().includes('_id') && editId ? 'disabled' : ''} 
                       required>
=======
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
>>>>>>> 550ff04eb415eb483c0682358a24f825ed249448
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
<<<<<<< HEAD

=======
    
>>>>>>> 550ff04eb415eb483c0682358a24f825ed249448
    fields.forEach(f => {
        const el = document.getElementById(`inp_${f}`);
        data[f] = el.type === 'number' ? parseFloat(el.value) : el.value;
    });

    try {
<<<<<<< HEAD
        if (editId) {
            await axios.put(`${API_BASE}/${currentTable}/${editId}`, data);
            alert('Updated Successfully!');
        } else {
            await axios.post(`${API_BASE}/${currentTable}`, data);
            alert('Saved Successfully!');
        }
=======
        await axios.post(`${API_BASE}/${currentTable}`, data);
        alert('Saved Successfully! 🎉');
>>>>>>> 550ff04eb415eb483c0682358a24f825ed249448
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