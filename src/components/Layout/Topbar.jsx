export default function Topbar({ page, clockTime, onRfid }) {
  const titles = {
    dashboard: 'Dashboard',
    resources: 'Browse Resources',
    map: 'Campus Map',
    mybookings: 'My Bookings',
    rfid: 'RFID System',
    admin: 'Admin Panel',
  };

  const pad = n => String(n).padStart(2, '0');
  const ts = `${pad(clockTime.getHours())}:${pad(clockTime.getMinutes())}:${pad(clockTime.getSeconds())}`;

  return (
    <div className="topbar">
      <div className="topbar-title">{titles[page] || 'Dashboard'}</div>
      <div className="topbar-time">{ts}</div>
      <div className="rfid-status" id="rfid-scan-trigger" onClick={onRfid}>
        <div className="rfid-dot scanning" />
        RFID Active — Tap to Scan
      </div>
    </div>
  );
}
