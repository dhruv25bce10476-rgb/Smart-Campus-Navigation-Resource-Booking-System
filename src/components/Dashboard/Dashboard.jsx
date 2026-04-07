import { TIMES } from '../../data/constants';

export default function Dashboard({ user, bookings, resources, myBookings }) {
  const today = '2026-04-06';

  const totalAvailable = resources.filter(r => {
    const taken = new Set(bookings.filter(b => b.resourceId === r.id && b.date === today).map(b => b.slot));
    return taken.size < TIMES.length;
  }).length;

  return (
    <div>
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">🏫 Total Resources</div>
          <div className="stat-value stat-accent">{resources.length}</div>
          <div className="stat-sub">Campus facilities</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">✅ Available Now</div>
          <div className="stat-value stat-green">{totalAvailable}</div>
          <div className="stat-sub">Ready to book</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">📅 My Bookings</div>
          <div className="stat-value stat-yellow">{myBookings.length}</div>
          <div className="stat-sub">Active reservations</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">📡 RFID Bookings</div>
          <div className="stat-value" style={{ color: '#7c3aed' }}>
            {myBookings.filter(b => b.via === 'rfid').length}
          </div>
          <div className="stat-sub">Auto-assigned</div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="section-header">
        <div className="section-title">Recent Bookings</div>
      </div>
      <div className="bookings-list">
        {myBookings.length === 0 ? (
          <div className="empty">No bookings yet. Browse resources to get started.</div>
        ) : (
          myBookings.slice(0, 5).map(b => {
            const res = resources.find(r => r.id === b.resourceId);
            return (
              <div key={b.id} className="booking-item">
                <div className="booking-icon">{res.icon}</div>
                <div className="booking-info">
                  <div className="booking-name">{res.name}</div>
                  <div className="booking-details">{res.location} · {b.date}</div>
                </div>
                <div className="booking-time">{b.slot}–{b.endSlot}</div>
                <div className={`booking-status ${b.via === 'rfid' ? 'status-rfid' : b.status === 'active' ? 'status-active' : 'status-upcoming'}`}>
                  {b.via === 'rfid' ? 'RFID' : b.status}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
