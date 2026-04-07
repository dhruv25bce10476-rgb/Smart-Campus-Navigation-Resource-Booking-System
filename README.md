<<<<<<< HEAD
## Smart Campus Navigation & Resource Booking System

This is a modern web application built with **React.js** that enables real-time campus navigation, shows live availability of bookable resources, and allows students and faculty to reserve slots seamlessly.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5+-purple?logo=vite)


## Key Features

- **User Authentication** — A simple login and registration system for students and faculty, ensuring personalized access and secure usage.
- **Live Dashboard** — Real-time overview of campus resources, availability stats, and recent bookings
- **Resource Exploration** — Users can browse different facilities and filter them based on there needs
- **Real Time Campus Navigation** —An interactive campus map helps users locate buildings and resources easily, along with their live availability status.
- **RFID Based Automation** —A system integrates an RFID-based overflow where:
   - A user scans their RFID Tag
   - Assigns the most suitable available slot and location
   - Logs the activity instantly
- **Notifications System** — User receives real-time notifications for:
   - Booking confirmations
   - Slot start and end time
   - RFID based booking automation

## How it Works

The idea is to remove manual effort and confusion.

For example, instead of checking multiple places for visibility:
- A student opens the app
- Sees what's free now
- Book it instantly

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/smart-campus.git
cd smart-campus

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
smart-campus/
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── Admin/
│   │   │   └── AdminPage.jsx        # Admin dashboard with user & booking tables
│   │   ├── Auth/
│   │   │   └── AuthPage.jsx         # Login & registration forms
│   │   ├── Bookings/
│   │   │   └── MyBookingsPage.jsx   # User's booking history & management
│   │   ├── Dashboard/
│   │   │   └── Dashboard.jsx        # Main dashboard with stats & recent bookings
│   │   ├── Layout/
│   │   │   ├── NotifStack.jsx       # Toast notification system
│   │   │   ├── Sidebar.jsx          # Navigation sidebar
│   │   │   └── Topbar.jsx           # Top bar with clock & RFID status
│   │   ├── Map/
│   │   │   └── MapPage.jsx          # Interactive campus map
│   │   ├── Resources/
│   │   │   ├── BookingModal.jsx     # Slot selection & booking modal
│   │   │   └── ResourcesPage.jsx    # Resource browsing & filtering
│   │   └── RFID/
│   │       └── RfidPage.jsx         # RFID scanner simulation & hardware info
│   ├── data/
│   │   └── constants.js             # Users, resources, time slots, buildings data
│   ├── styles/
│   │   └── index.css                # Global styles & design system
│   ├── App.jsx                      # Root component with state management
│   └── main.jsx                     # Application entry point
├── hardware/
│   └── smartcampus.ino              # ESP32 + MFRC522 RFID door access firmware
├── index.html                       # HTML template
├── package.json
├── vite.config.js
└── README.md
```

## Demo Credentials

| Role    | Email              | Password  |
| ------- | ------------------ | --------- |
| Student | rahul@campus.edu   | rahul123  |
| Faculty | priya@campus.edu   | priya123  |
| Admin   | admin@campus.edu   | admin123  |

## Tech Stack

- **Frontend**: React(Vite)
- **Styling**: CSS(Custom design properties)
- **State Handling**: React hooks
- **Hardware**: ESP32 + MFRC522 RFID Reader (Arduino framework)

## RFID Integration

The web app includes an RFID simulation, while `hardware/smartcampus.ino` contains real firmware for an ESP32-based RFID door access system.

### Software (Web Simulation)
1. **Auto-detection**: RFID tag scanned at campus terminal
2. **Auto-assignment**: System finds nearest available resource for current time slot
3. **Notification**: Booking confirmation sent to user automatically
4. **Activity Log**: All RFID scans and assignments are logged in real-time

### Hardware (ESP32 + MFRC522)

The Arduino firmware (`smartcampus.ino`) runs on an ESP32 and handles physical access control:

| Component | ESP32 Pin | Purpose |
|-----------|-----------|-------------------------------------------|
| MFRC522 (SS) | GPIO 5 | RFID card reader – SPI select |
| MFRC522 (RST) | GPIO 22 | RFID card reader – reset |
| Servo Motor | GPIO 32 | Door lock mechanism |
| PIR Sensor | GPIO 27 | Motion detection (intrusion alert) |
| IR Sensor | GPIO 14 | Door open/close detection |
| Buzzer | GPIO 33 | Audio feedback on scan |
| Green LED | GPIO 26 | Access granted indicator |
| Red LED | GPIO 25 | Access denied / alert indicator |

**Flow**: Card tap → UID validation → Green LED + buzzer → Servo opens door → Session starts → Tap again to end session.

**Security**: Unauthorized door opening or motion without a valid session triggers a red LED + buzzer alarm.

## Vision behind the project
The goal is not just to build a booking system, but to move towards a smart campus environment where:
- Decision happens in a real-time
- Manual effort is reduced
- Resources are used wisely
=======
# Smart-Campus-Navigation-Resource-Booking-System
This is a modern web application built with **React.js** that enables real-time campus navigation, shows live availability of bookable resources, and allows students and faculty to reserve slots seamlessly.
>>>>>>> 98ce8d980568ab7e2a5e25cdcf127db74994a7ed
