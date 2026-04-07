export default function Sidebar({ user, page, setPage, myBookings, onLogout }) {
  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'resources', icon: '🏫', label: 'Browse Resources' },
    { id: 'map', icon: '🗺️', label: 'Campus Map' },
    { id: 'mybookings', icon: '📅', label: 'My Bookings', badge: myBookings },
    { id: 'rfid', icon: '📡', label: 'RFID Scanner' },
  ];

  if (user.role === 'admin') {
    navItems.push({ id: 'admin', icon: '⚙️', label: 'Admin Panel' });
  }

  const roleColor = user.role === 'admin' ? '#f59e0b' : user.role === 'faculty' ? '#7c3aed' : '#00d4ff';

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">🏛️</div>
        <div className="sidebar-logo-text">
          SmartCampus
          <small>Resource Navigator</small>
        </div>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar" style={{ background: roleColor + '22', color: roleColor }}>
          {user.avatar}
        </div>
        <div className="user-info">
          <div className="user-name">{user.name}</div>
          <div className="user-role">{user.role} · {user.rfid}</div>
        </div>
      </div>

      <div className="sidebar-nav">
        <div className="nav-section">Navigation</div>
        {navItems.map(item => (
          <div
            key={item.id}
            id={`nav-${item.id}`}
            className={`nav-item${page === item.id ? ' active' : ''}`}
            onClick={() => setPage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
            {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
          </div>
        ))}
      </div>

      <div className="sidebar-bottom">
        <div className="logout-btn" id="logout-btn" onClick={onLogout}>🚪 Sign Out</div>
      </div>
    </div>
  );
}
