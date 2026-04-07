export default function MyBookingsPage({ user, bookings, resources, onCancel }) {
  if (bookings.length === 0) {
    return <div className="empty">No bookings. Browse resources to reserve a slot.</div>;
  }

  return (
    <div>
      <div className="section-header">
        <div className="section-title">My Reservations</div>
      </div>
      <div className="bookings-list">
        {bookings.map(b => {
          const res = resources.find(r => r.id === b.resourceId);
          return (
            <div key={b.id} className="booking-item">
              <div className="booking-icon">{res.icon}</div>
              <div className="booking-info">
                <div className="booking-name">{res.name}</div>
                <div className="booking-details">{res.location} · {b.date} · via {b.via.toUpperCase()}</div>
              </div>
              <div className="booking-time">{b.slot} – {b.endSlot}</div>
              <div className={`booking-status ${b.via === 'rfid' ? 'status-rfid' : b.status === 'active' ? 'status-active' : 'status-upcoming'}`}>
                {b.via === 'rfid' ? '📡 RFID' : b.status}
              </div>
              <button className="cancel-small" onClick={() => onCancel(b.id)}>Cancel</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
