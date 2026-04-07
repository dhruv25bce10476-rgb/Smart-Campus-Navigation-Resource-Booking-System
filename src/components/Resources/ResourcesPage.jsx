import { TIMES } from '../../data/constants';

export default function ResourcesPage({ user, bookings, resources, filterType, setFilterType, onModal, onCancel }) {
  const today = '2026-04-06';
  const types = ['all', 'lab', 'seminar', 'sports', 'study'];
  const filtered = filterType === 'all' ? resources : resources.filter(r => r.type === filterType);

  const isMine = (rid, slot) => bookings.some(b => b.resourceId === rid && b.userId === user.id && b.slot === slot && b.date === today);
  const isTaken = (rid, slot) => bookings.some(b => b.resourceId === rid && b.slot === slot && b.date === today);
  const myBookingFor = (rid) => bookings.find(b => b.resourceId === rid && b.userId === user.id && b.date === today);

  return (
    <div>
      {/* Filter Bar */}
      <div className="section-header">
        <div className="section-title">Available Resources</div>
        <div className="filter-tabs">
          {types.map(t => (
            <div
              key={t}
              id={`filter-${t}`}
              className={`filter-tab${filterType === t ? ' active' : ''}`}
              onClick={() => setFilterType(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </div>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="resources-grid">
        {filtered.map(res => {
          const myB = myBookingFor(res.id);
          const taken = bookings.filter(b => b.resourceId === res.id && b.date === today).length;
          const allTaken = taken >= TIMES.length;

          return (
            <div
              key={res.id}
              id={`resource-card-${res.id}`}
              className={`resource-card${myB ? ' booked-me' : ''}`}
              onClick={() => onModal(res.id)}
            >
              <div className="resource-header">
                <div>
                  <div className="resource-icon">{res.icon}</div>
                  <div className="resource-name">{res.name}</div>
                  <div className="resource-loc">{res.location}</div>
                </div>
                <div className={`status-badge ${allTaken ? 'badge-occupied' : 'badge-available'}`}>
                  {allTaken ? 'Occupied' : 'Available'}
                </div>
              </div>

              <div className="resource-capacity">Capacity: {res.capacity} people</div>

              <div className="slots-row">
                {TIMES.slice(0, 6).map(t => {
                  const mine = isMine(res.id, t);
                  const taken2 = isTaken(res.id, t);
                  return (
                    <div key={t} className={`slot${mine ? ' mine' : taken2 ? ' taken' : ''}`}>
                      {t}
                    </div>
                  );
                })}
                <div className="slot" style={{ opacity: 0.5 }}>…</div>
              </div>

              {myB ? (
                <button
                  className="book-btn cancel"
                  onClick={e => { e.stopPropagation(); onCancel(myB.id); }}
                >
                  Cancel Booking ({myB.slot})
                </button>
              ) : (
                <button
                  className="book-btn"
                  onClick={e => { e.stopPropagation(); onModal(res.id); }}
                >
                  Book a Slot →
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
