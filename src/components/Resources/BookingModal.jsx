import { useState } from 'react';
import { TIMES } from '../../data/constants';

export default function BookingModal({ resource, taken, mySlots, preSlot, onClose, onConfirm }) {
  const [selected, setSelected] = useState(preSlot || null);

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <button className="modal-close" id="modal-close-btn" onClick={onClose}>✕</button>
        <div className="modal-title">{resource.icon} {resource.name}</div>
        <div style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '1rem' }}>
          {resource.location} · Capacity: {resource.capacity}
        </div>
        <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'var(--text2)' }}>
          Select a time slot — {new Date().toDateString()}
        </div>

        {/* Time Slot Picker */}
        <div className="slot-picker">
          {TIMES.map(t => {
            const isMine = mySlots.includes(t);
            const isTaken = taken.includes(t) && !isMine;
            return (
              <div
                key={t}
                className={`slot-pick${selected === t ? ' selected' : ''}${isTaken || isMine ? ' disabled' : ''}`}
                onClick={() => { if (!isTaken && !isMine) setSelected(t); }}
              >
                {t}
                {isMine && <div style={{ fontSize: '9px', marginTop: '2px', color: '#c4b5fd' }}>yours</div>}
                {isTaken && <div style={{ fontSize: '9px', marginTop: '2px', color: '#fca5a5' }}>taken</div>}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '1rem', fontSize: '12px', color: 'var(--text3)' }}>
          <span style={{ background: 'rgba(239,68,68,0.1)', padding: '2px 8px', borderRadius: '4px', color: '#fca5a5' }}>Taken</span>
          <span style={{ background: 'rgba(124,58,237,0.15)', padding: '2px 8px', borderRadius: '4px', color: '#c4b5fd' }}>Yours</span>
          <span style={{ background: 'rgba(0,212,255,0.1)', padding: '2px 8px', borderRadius: '4px', color: 'var(--accent)' }}>Selected</span>
        </div>

        <button
          id="confirm-booking-btn"
          className="confirm-btn"
          disabled={!selected}
          style={{ opacity: selected ? 1 : 0.4, cursor: selected ? 'pointer' : 'not-allowed' }}
          onClick={() => selected && onConfirm(selected)}
        >
          Confirm Booking for {selected}
        </button>
      </div>
    </div>
  );
}
