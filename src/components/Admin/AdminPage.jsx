export default function AdminPage({ users, bookings, resources }) {
  const today = '2026-04-06';

  return (
    <div>
      {/* Admin Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">👥 Users</div>
          <div className="stat-value stat-accent">{users.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">📅 Total Bookings</div>
          <div className="stat-value stat-green">{bookings.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">📡 RFID Bookings</div>
          <div className="stat-value" style={{ color: '#7c3aed' }}>
            {bookings.filter(b => b.via === 'rfid').length}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">🏫 Resources</div>
          <div className="stat-value stat-yellow">{resources.length}</div>
        </div>
      </div>

      <div className="admin-grid">
        {/* All Users Table */}
        <div className="admin-card">
          <div className="section-title" style={{ marginBottom: '0.8rem' }}>All Users</div>
          <table className="mini-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>RFID</th>
                <th>Bookings</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>
                    <span
                      className={`booking-status ${u.role === 'admin' ? 'status-rfid' : u.role === 'faculty' ? 'status-upcoming' : 'status-active'}`}
                      style={{ fontSize: '10px', padding: '2px 6px' }}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: 'var(--text3)' }}>{u.rfid}</td>
                  <td>{bookings.filter(b => b.userId === u.id).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Today's Bookings Table */}
        <div className="admin-card">
          <div className="section-title" style={{ marginBottom: '0.8rem' }}>Today&#39;s Bookings</div>
          <table className="mini-table">
            <thead>
              <tr>
                <th>Resource</th>
                <th>User</th>
                <th>Slot</th>
                <th>Via</th>
              </tr>
            </thead>
            <tbody>
              {bookings.filter(b => b.date === today).map(b => {
                const res = resources.find(r => r.id === b.resourceId);
                const usr = users.find(u => u.id === b.userId);
                return (
                  <tr key={b.id}>
                    <td>{res?.icon} {res?.name}</td>
                    <td>{usr?.name || 'Unknown'}</td>
                    <td style={{ fontFamily: 'JetBrains Mono', fontSize: '11px' }}>{b.slot}</td>
                    <td>
                      {b.via === 'rfid' ? (
                        <span style={{ color: 'var(--accent)', fontSize: '11px' }}>📡 RFID</span>
                      ) : (
                        <span style={{ color: 'var(--text3)', fontSize: '11px' }}>manual</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
