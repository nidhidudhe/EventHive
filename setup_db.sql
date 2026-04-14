-- SQL Queries for Event Management System "EventHive"

-- 1. Category Table
CREATE TABLE Category (
    category_ID SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT
);

-- 2. Venue Table
CREATE TABLE Venue (
    venue_ID SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    capacity INTEGER
);

-- 3. Organizer Table
CREATE TABLE Organizer (
    organiser_ID SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    contact_no VARCHAR(20),
    company_name VARCHAR(255)
);

-- 4. Event Table
CREATE TABLE Event (
    event_ID SERIAL PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    description TEXT,
    venue_ID INTEGER REFERENCES Venue(venue_ID) ON DELETE SET NULL,
    organiser_ID INTEGER REFERENCES Organizer(organiser_ID) ON DELETE SET NULL,
    category_ID INTEGER REFERENCES Category(category_ID) ON DELETE SET NULL
);

-- 5. User Table
CREATE TABLE Users (
    user_ID SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    contact_no VARCHAR(20),
    registration_date DATE DEFAULT CURRENT_DATE
);

-- 6. Booking Table
CREATE TABLE Booking (
    booking_ID SERIAL PRIMARY KEY,
    booking_date DATE DEFAULT CURRENT_DATE,
    total_amount DECIMAL(10, 2),
    user_ID INTEGER REFERENCES Users(user_ID) ON DELETE CASCADE
);

-- 7. Ticket Table
CREATE TABLE Ticket (
    ticket_ID SERIAL PRIMARY KEY,
    event_ID INTEGER REFERENCES Event(event_ID) ON DELETE CASCADE,
    booking_ID INTEGER REFERENCES Booking(booking_ID) ON DELETE CASCADE,
    type VARCHAR(50),
    price DECIMAL(10, 2)
);

-- 8. Payment Table
CREATE TABLE Payment (
    payment_ID SERIAL PRIMARY KEY,
    booking_ID INTEGER REFERENCES Booking(booking_ID) ON DELETE CASCADE,
    payment_method VARCHAR(50),
    payment_date DATE DEFAULT CURRENT_DATE
);

-- 9. Vendor Table
CREATE TABLE Vendor (
    vendor_ID SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_no VARCHAR(20),
    service VARCHAR(100),
    event_ID INTEGER REFERENCES Event(event_ID) ON DELETE CASCADE
);

-- 10. Sponsor Table
CREATE TABLE Sponsor (
    sponsor_ID SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    company VARCHAR(100),
    contact_no VARCHAR(20)
);

-- 11. Event_Sponsor Table (Many-to-Many)
CREATE TABLE Event_Sponsor (
    event_ID INTEGER REFERENCES Event(event_ID) ON DELETE CASCADE,
    sponsor_ID INTEGER REFERENCES Sponsor(sponsor_ID) ON DELETE CASCADE,
    PRIMARY KEY (event_ID, sponsor_ID)
);

-- 12. Schedule Table
CREATE TABLE Schedule (
    schedule_ID SERIAL PRIMARY KEY,
    event_ID INTEGER REFERENCES Event(event_ID) ON DELETE CASCADE,
    activity VARCHAR(255),
    start_time TIMESTAMP,
    end_time TIMESTAMP
);

-- 13. Staff Table
CREATE TABLE Staff (
    staff_ID SERIAL PRIMARY KEY,
    name VARCHAR(100),
    role VARCHAR(100),
    contact_no VARCHAR(20),
    event_ID INTEGER REFERENCES Event(event_ID) ON DELETE CASCADE
);

-- SEED DATA (Required for Add Event to work)
INSERT INTO Category (category_name, description) VALUES ('Tech', 'Technology related events');
INSERT INTO Venue (name, location, capacity) VALUES ('Grand Hall', 'New York', 500);
INSERT INTO Organizer (name, email, contact_no, company_name) VALUES ('John Doe', 'john@example.com', '1234567890', 'TechCorps');
INSERT INTO Users (name, email, contact_no) VALUES ('Guest User', 'guest@example.com', '0000000000');
INSERT INTO Event (event_name, description, venue_ID, organiser_ID, category_ID) VALUES 
('Launch Event', 'The first event of EventHive', 1, 1, 1);
