# EventHive 🎉 | Event Management System

We developed **EventHive** as a comprehensive solution for managing complex event data. This project showcases our ability to build a full-stack application using a modern tech stack and a database-intelligent architecture.

## 🚀 Key Features We Implemented
- **Universal Management Dashboard**: We built a central hub that allows management of all 13 database entities (Events, Users, Bookings, etc.) from a single interface.
- **Dynamic Contextual Forms**: We designed the UI to be context-aware; the application automatically generates the correct data entry fields based on which database table is currently active.
- **Manual Data Control**: We implemented support for manual primary key entries (e.g., specific IDs like 701, 702), giving users full control over data relationships.
- **Premium User Experience**: We focused on aesthetics, using CSS Grid, Flexbox, and Glassmorphism to create a professional dark-mode dashboard.
- **Intelligent Backend**: We developed an Express engine that dynamically detects database schemas and handles naming constraints (like case sensitivity) automatically.

## 🏁 Getting Started

### 1. Database Configuration
1. We created a PostgreSQL database named `EventHive`.
2. We initialized the schema using the provided `setup_db.sql` script to ensure all foreign key relationships were correctly mapped.

### 2. Running Locally
```powershell
# Install the necessary dependencies
npm install

# Start the Node.js server
node server.js
```
3. We configured the server to run at **http://localhost:5000**.

---

## 📚 Technical Breakdown & Development Notes

### 1. Our Technology Stack
- **Frontend**: We chose to use **Vanilla HTML5, CSS3, and JavaScript** to demonstrate core web development skills without external frameworks like React.
- **API Communication**: We utilized **Axios** (via CDN) for efficient, asynchronous data fetching and state updates.
- **Server Architecture**: We built the backend using **Node.js** and **Express.js**.
- **Data Persistence**: We used **PostgreSQL** as the relational database to handle complex 1-to-Many and Many-to-Many relationships.

### 2. Core Logic Flow We Developed
1. **The Request**: The frontend captures user input and sends it as a JSON object to a universal API endpoint.
2. **The Processing Engine**: Our backend uses a dynamic query builder to construct and execute SQL commands on the fly based on the target table.
3. **Data Integrity**: We ensured that PostgreSQL enforces relational constraints, with the backend relaying clear feedback to the UI.
4. **Instant UI Sync**: We implemented logic that refreshes the specific data view immediately after a successful database transaction.

### 3. Database Schema & Relationships
- We placed **Events** at the center of the schema, linking them to **Venues**, **Organizers**, and **Categories**.
- We designed **Bookings** to connect **Users** with their respective **Tickets** and **Payments**.
- We handled complex metadata (like Event-Sponsor links) using dedicated join tables.

### 4. Important Questions & Rationale
- **Why Port 5000?** We selected this port as a standard for Node.js development and configured it to serve both the API and the static frontend files.
- **Why double quotes in SQL?** We implemented this to handle reserved keywords in PostgreSQL, such as the `"User"` table.
- **Why Manual IDs?** We allowed manual ID entry so that users can maintain their own indexing systems (e.g., 701, 702) for better data organization.
