export default function NotifStack({ notifications, onClose }) {
  return (
    <div className="notif-stack">
      {notifications.map(n => (
        <div key={n.id} className={`notif ${n.type}`} style={{ position: 'relative' }}>
          <div className="notif-close" onClick={() => onClose(n.id)}>✕</div>
          <div className="notif-title">{n.title}</div>
          <div className="notif-body">{n.body}</div>
        </div>
      ))}
    </div>
  );
}
