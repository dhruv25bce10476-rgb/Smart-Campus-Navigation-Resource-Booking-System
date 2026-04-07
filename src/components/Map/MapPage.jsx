import { BUILDINGS, TIMES } from '../../data/constants';

export default function MapPage({ resources, bookings, selectedBuilding, setSelectedBuilding }) {
  const today = '2026-04-06';

  const bResources = (bid) => resources.filter(r => r.building === bid);

  const hasAvail = (bid) => bResources(bid).some(r => {
    const t = bookings.filter(b => b.resourceId === r.id && b.date === today).length;
    return t < TIMES.length;
  });

  const sel = BUILDINGS.find(b => b.id === selectedBuilding);

  return (
    <div>
      <div className="section-header">
        <div className="section-title">Campus Map</div>
        {selectedBuilding && (
          <button className="filter-tab active" onClick={() => setSelectedBuilding(null)}>✕ Clear</button>
        )}
      </div>

      {/* Interactive Map */}
      <div className="map-container">
        <div className="campus-map" style={{ position: 'relative' }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="30" y1="20" x2="38" y2="20" stroke="rgba(0,212,255,0.2)" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="60" y1="20" x2="70" y2="22" stroke="rgba(0,212,255,0.2)" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="50" y1="26" x2="50" y2="65" stroke="rgba(0,212,255,0.2)" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="37" y1="65" x2="42" y2="70" stroke="rgba(0,212,255,0.2)" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="60" y1="72" x2="68" y2="68" stroke="rgba(0,212,255,0.2)" strokeWidth="0.5" strokeDasharray="2 2" />
            <text x="50" y="50" textAnchor="middle" fill="rgba(0,212,255,0.08)" fontSize="8" fontWeight="700" fontFamily="Space Grotesk">CAMPUS</text>
          </svg>

          {BUILDINGS.map(b => (
            <div
              key={b.id}
              id={`building-${b.id}`}
              className={`map-building${hasAvail(b.id) ? ' has-available' : ' fully-booked'}${selectedBuilding === b.id ? ' selected' : ''}`}
              style={{ left: b.x + '%', top: b.y + '%', width: b.w + '%', height: b.h + '%' }}
              onClick={() => setSelectedBuilding(b.id === selectedBuilding ? null : b.id)}
            >
              <div className="building-icon">{b.icon}</div>
              {b.name}
              <div className="building-label">{bResources(b.id).length} rooms</div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Building Details */}
      {sel && (
        <div style={{ marginTop: '1rem', background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 'var(--radius)', padding: '1.2rem' }}>
          <div className="section-title" style={{ marginBottom: '0.8rem' }}>{sel.icon} {sel.name}</div>
          <div className="resources-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {bResources(sel.id).map(r => {
              const taken = bookings.filter(b => b.resourceId === r.id && b.date === today).length;
              return (
                <div key={r.id} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.8rem' }}>
                  <div style={{ fontSize: '20px' }}>{r.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: '700', marginTop: '4px' }}>{r.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '2px' }}>{taken} slots booked today</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
