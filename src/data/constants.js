// Demo user accounts
export const USERS = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@campus.edu', password: 'rahul123', role: 'student', rfid: 'RFID-4A2F', avatar: 'RS' },
  { id: 2, name: 'Dr. Priya Mehta', email: 'priya@campus.edu', password: 'priya123', role: 'faculty', rfid: 'RFID-7B1E', avatar: 'PM' },
  { id: 3, name: 'Admin', email: 'admin@campus.edu', password: 'admin123', role: 'admin', rfid: 'RFID-9C3D', avatar: 'AD' },
  { id: 4, name: 'Sneha Patel', email: 'sneha@campus.edu', password: 'sneha123', role: 'student', rfid: 'RFID-2E8A', avatar: 'SP' },
];

// Campus resources
export const RESOURCES = [
  { id: 1, name: 'Computer Lab A', icon: '💻', type: 'lab', location: 'Block A, Floor 2', capacity: 40, building: 'A' },
  { id: 2, name: 'Seminar Hall 1', icon: '🎓', type: 'seminar', location: 'Main Building, Floor 1', capacity: 100, building: 'M' },
  { id: 3, name: 'Physics Lab', icon: '🔬', type: 'lab', location: 'Science Block, Floor 3', capacity: 25, building: 'S' },
  { id: 4, name: 'Sports Ground', icon: '⚽', type: 'sports', location: 'Campus South', capacity: 200, building: 'G' },
  { id: 5, name: 'Library Study Room', icon: '📚', type: 'study', location: 'Library, Floor 2', capacity: 15, building: 'L' },
  { id: 6, name: 'Robotics Lab', icon: '🤖', type: 'lab', location: 'Tech Block, Floor 1', capacity: 20, building: 'T' },
  { id: 7, name: 'Auditorium', icon: '🎭', type: 'seminar', location: 'Main Building, Ground', capacity: 500, building: 'M' },
  { id: 8, name: 'Basketball Court', icon: '🏀', type: 'sports', location: 'Sports Complex', capacity: 30, building: 'G' },
  { id: 9, name: 'Chemistry Lab', icon: '⚗️', type: 'lab', location: 'Science Block, Floor 2', capacity: 30, building: 'S' },
];

// Available time slots
export const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

// Pre-existing bookings for demo
export const initialBookings = [
  { id: 101, resourceId: 1, userId: 4, date: '2026-04-06', slot: '10:00', endSlot: '11:00', via: 'manual', status: 'active' },
  { id: 102, resourceId: 4, userId: 2, date: '2026-04-06', slot: '09:00', endSlot: '10:00', via: 'manual', status: 'upcoming' },
  { id: 103, resourceId: 2, userId: 4, date: '2026-04-06', slot: '14:00', endSlot: '15:00', via: 'rfid', status: 'upcoming' },
];

// Campus building map layout
export const BUILDINGS = [
  { id: 'A', name: 'Block A', icon: '💻', x: 12, y: 12, w: 18, h: 14 },
  { id: 'M', name: 'Main Bldg', icon: '🏛️', x: 38, y: 8, w: 22, h: 18 },
  { id: 'S', name: 'Science', icon: '🔬', x: 70, y: 12, w: 20, h: 16 },
  { id: 'G', name: 'Grounds', icon: '⚽', x: 12, y: 60, w: 25, h: 22 },
  { id: 'L', name: 'Library', icon: '📚', x: 42, y: 65, w: 18, h: 14 },
  { id: 'T', name: 'Tech Block', icon: '🤖', x: 68, y: 60, w: 20, h: 16 },
];
