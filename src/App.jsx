import { useState, useEffect, useRef } from 'react';
import { USERS, RESOURCES, TIMES, initialBookings } from './data/constants';

// Components
import AuthPage from './components/Auth/AuthPage';
import Sidebar from './components/Layout/Sidebar';
import Topbar from './components/Layout/Topbar';
import NotifStack from './components/Layout/NotifStack';
import Dashboard from './components/Dashboard/Dashboard';
import ResourcesPage from './components/Resources/ResourcesPage';
import BookingModal from './components/Resources/BookingModal';
import MapPage from './components/Map/MapPage';
import MyBookingsPage from './components/Bookings/MyBookingsPage';
import RfidPage from './components/RFID/RfidPage';
import AdminPage from './components/Admin/AdminPage';

export default function App() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState(initialBookings);
  const [page, setPage] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [modal, setModal] = useState(null);
  const [rfidLog, setRfidLog] = useState([
    { time: '08:30', msg: 'System initialized', type: 'info' },
    { time: '09:15', msg: 'RFID-4A2F scanned → Rahul Sharma', type: 'success' },
    { time: '09:15', msg: 'Auto-booked: Computer Lab A 09:00-10:00', type: 'success' },
  ]);
  const [filterType, setFilterType] = useState('all');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [clockTime, setClockTime] = useState(new Date());
  const notifId = useRef(200);
  const bookingId = useRef(200);

  // Live clock
  useEffect(() => {
    const t = setInterval(() => setClockTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // --- Notification helpers ---
  const addNotif = (title, body, type = 'info') => {
    const id = notifId.current++;
    setNotifications(p => [...p, { id, title, body, type }]);
    setTimeout(() => setNotifications(p => p.filter(n => n.id !== id)), 5000);
  };

  // --- Booking helpers ---
  const getMyBookings = (uid) => bookings.filter(b => b.userId === uid);
  const getResourceBookings = (rid, date) => bookings.filter(b => b.resourceId === rid && b.date === date);
  const isSlotTaken = (rid, slot, date) => bookings.some(b => b.resourceId === rid && b.slot === slot && b.date === date);

  const book = (resourceId, slot, via = 'manual') => {
    const today = '2026-04-06';
    const res = RESOURCES.find(r => r.id === resourceId);

    if (isSlotTaken(resourceId, slot, today)) {
      // --- Conflict: auto-hold next available slot ---
      const slotIndex = TIMES.indexOf(slot);
      const nextAvailable = TIMES.slice(slotIndex + 1).find(t => !isSlotTaken(resourceId, t, today));

      if (!nextAvailable) {
        addNotif(
          'Booking Conflict',
          `The ${slot} slot was just booked by another user and no later slots are available for ${res.name}.`,
          'error'
        );
        return false;
      }

      // Book the next available slot automatically
      const nextEnd = TIMES[TIMES.indexOf(nextAvailable) + 1] || '19:00';
      const autoB = { id: bookingId.current++, resourceId, userId: user.id, date: today, slot: nextAvailable, endSlot: nextEnd, via, status: 'upcoming' };
      setBookings(p => [...p, autoB]);

      addNotif(
        'Slot Conflict — Auto-Held',
        `The ${slot} slot was just booked by another user. We've automatically held the next available slot (${nextAvailable}–${nextEnd}) for you at ${res.name}.`,
        'warning'
      );
      addNotif(
        'Booking Confirmed!',
        `${res.name} booked for ${nextAvailable}–${nextEnd} on ${today}`,
        'success'
      );
      return true;
    }

    const endSlot = TIMES[TIMES.indexOf(slot) + 1] || '19:00';
    const newB = { id: bookingId.current++, resourceId, userId: user.id, date: today, slot, endSlot, via, status: 'upcoming' };
    setBookings(p => [...p, newB]);
    addNotif('Booking Confirmed!', `${res.name} booked for ${slot}–${endSlot} on ${today}`, 'success');
    return true;
  };

  const cancelBooking = (bid) => {
    setBookings(p => p.filter(b => b.id !== bid));
    addNotif('Booking Cancelled', 'Your reservation has been cancelled.', 'warning');
  };

  // --- RFID simulation ---
  const simulateRfid = () => {
    const today = '2026-04-06';
    const now = clockTime.getHours();
    const nearestSlot = TIMES.find(t => parseInt(t) === now) || '10:00';
    const available = RESOURCES.find(r => !isSlotTaken(r.id, nearestSlot, today) && r.type === 'lab');

    if (!available) {
      const ts = `${clockTime.getHours()}:${String(clockTime.getMinutes()).padStart(2, '0')}`;
      setRfidLog(p => [...p, { time: ts, msg: `${user.rfid} scanned — no slots available`, type: 'warn' }]);
      addNotif('RFID Scan', 'No available lab slots found at this time.', 'warning');
      return;
    }

    const ts = `${clockTime.getHours()}:${String(clockTime.getMinutes()).padStart(2, '0')}`;
    setRfidLog(p => [
      ...p,
      { time: ts, msg: `${user.rfid} scanned → ${user.name}`, type: 'success' },
      { time: ts, msg: `Auto-assigned: ${available.name} at ${nearestSlot}`, type: 'info' },
    ]);
    book(available.id, nearestSlot, 'rfid');
    addNotif('RFID Auto-Book', `Tag ${user.rfid} → ${available.name} at ${nearestSlot}`, 'info');
  };

  // --- Auth gate ---
  if (!user) {
    return (
      <AuthPage onLogin={(u) => { setUser(u); addNotif('Welcome Back', `Hello, ${u.name}!`, 'success'); }} />
    );
  }

  // --- Main App ---
  return (
    <div className="app">
      <Sidebar
        user={user}
        page={page}
        setPage={setPage}
        myBookings={getMyBookings(user.id).length}
        onLogout={() => setUser(null)}
      />

      <div className="main">
        <Topbar page={page} clockTime={clockTime} onRfid={simulateRfid} />
        <div className="content">
          {page === 'dashboard' && (
            <Dashboard user={user} bookings={bookings} resources={RESOURCES} myBookings={getMyBookings(user.id)} />
          )}
          {page === 'resources' && (
            <ResourcesPage
              user={user}
              bookings={bookings}
              resources={RESOURCES}
              filterType={filterType}
              setFilterType={setFilterType}
              onBook={(rid, slot) => setModal({ rid, slot })}
              onModal={(rid) => setModal({ rid, slot: null })}
              onCancel={cancelBooking}
            />
          )}
          {page === 'map' && (
            <MapPage
              resources={RESOURCES}
              bookings={bookings}
              selectedBuilding={selectedBuilding}
              setSelectedBuilding={setSelectedBuilding}
            />
          )}
          {page === 'mybookings' && (
            <MyBookingsPage
              user={user}
              bookings={getMyBookings(user.id)}
              resources={RESOURCES}
              onCancel={cancelBooking}
            />
          )}
          {page === 'rfid' && (
            <RfidPage user={user} rfidLog={rfidLog} onScan={simulateRfid} />
          )}
          {page === 'admin' && user.role === 'admin' && (
            <AdminPage users={USERS} bookings={bookings} resources={RESOURCES} />
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {modal && (
        <BookingModal
          resource={RESOURCES.find(r => r.id === modal.rid)}
          taken={getResourceBookings(modal.rid, '2026-04-06').map(b => b.slot)}
          mySlots={getMyBookings(user.id).filter(b => b.resourceId === modal.rid).map(b => b.slot)}
          preSlot={modal.slot}
          onClose={() => setModal(null)}
          onConfirm={(slot) => { if (book(modal.rid, slot)) { setModal(null); } }}
        />
      )}

      {/* Notifications */}
      <NotifStack notifications={notifications} onClose={(id) => setNotifications(p => p.filter(n => n.id !== id))} />
    </div>
  );
}
