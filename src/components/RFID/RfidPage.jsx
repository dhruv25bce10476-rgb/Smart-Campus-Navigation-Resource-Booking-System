import { useState } from 'react';

export default function RfidPage({ user, rfidLog, onScan }) {
  const [showHardware, setShowHardware] = useState(false);

  return (
    <div>
      {/* RFID Scanner Panel */}
      <div className="rfid-panel">
        <div className="rfid-panel-header">
          <div className="rfid-big-dot" />
          <div style={{ fontWeight: '700', fontSize: '16px' }}>RFID Auto-Booking System</div>
          <div style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--text3)' }}>
            Your tag: {user.rfid}
          </div>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '1rem' }}>
          When you scan your RFID tag at a campus terminal, the system automatically finds the nearest
          available resource for the current time slot and assigns it to you. No queuing required.
        </p>

        <div className="rfid-scan-area" id="rfid-scan-area" onClick={onScan}>
          <div className="rfid-scan-icon">📡</div>
          <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>Simulate RFID Scan</div>
          <div style={{ fontSize: '13px', color: 'var(--text2)' }}>
            Click to simulate tapping your {user.rfid} tag
          </div>
        </div>
      </div>

      {/* Hardware Integration Panel */}
      <div className="rfid-panel">
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
          onClick={() => setShowHardware(h => !h)}
        >
          <div style={{ fontWeight: '700', fontSize: '14px' }}>🔧 Hardware Integration (ESP32 + MFRC522)</div>
          <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600 }}>
            {showHardware ? '▲ Collapse' : '▼ Expand'}
          </span>
        </div>

        {showHardware && (
          <div style={{ marginTop: '1rem' }}>
            {/* How it works */}
            <p style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '1rem', lineHeight: 1.6 }}>
              The physical RFID system uses an <strong style={{ color: 'var(--text)' }}>ESP32 microcontroller</strong> with
              an <strong style={{ color: 'var(--text)' }}>MFRC522 RFID reader</strong> to control door access and automate bookings
              when a student or faculty taps their card at a campus terminal.
            </p>

            {/* Hardware Flow */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', marginBottom: '1rem' }}>
              {[
                { step: '1', icon: '💳', title: 'Tap RFID Card', desc: 'MFRC522 reader detects card UID and validates against registered users' },
                { step: '2', icon: '✅', title: 'Access Granted', desc: 'Green LED + buzzer confirm, servo motor opens door, session starts' },
                { step: '3', icon: '📡', title: 'Auto-Book Slot', desc: 'System assigns nearest available resource and sends notification' },
              ].map(s => (
                <div key={s.step} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', marginBottom: '6px' }}>{s.icon}</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)', marginBottom: '2px' }}>Step {s.step}</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>{s.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text3)', lineHeight: 1.4 }}>{s.desc}</div>
                </div>
              ))}
            </div>

            {/* Component Pinout */}
            <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '0.5rem' }}>📋 Hardware Components & Pinout</div>
            <table className="mini-table" style={{ marginBottom: '1rem' }}>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>ESP32 Pin</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['MFRC522 (SS)', 'GPIO 5', 'RFID card reader – SPI select'],
                  ['MFRC522 (RST)', 'GPIO 22', 'RFID card reader – reset'],
                  ['Servo Motor', 'GPIO 32', 'Door lock mechanism'],
                  ['PIR Sensor', 'GPIO 27', 'Motion detection (intrusion alert)'],
                  ['IR Sensor', 'GPIO 14', 'Door open/close detection'],
                  ['Buzzer', 'GPIO 33', 'Audio feedback on scan'],
                  ['Green LED', 'GPIO 26', 'Access granted indicator'],
                  ['Red LED', 'GPIO 25', 'Access denied / alert indicator'],
                ].map(([comp, pin, purpose], i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{comp}</td>
                    <td style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: 'var(--accent)' }}>{pin}</td>
                    <td style={{ fontSize: '12px', color: 'var(--text2)' }}>{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Security Features */}
            <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '0.5rem' }}>🔒 Security Features</div>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
              {[
                { label: 'UID Validation', desc: 'Only pre-registered card UIDs are accepted', color: 'var(--green)' },
                { label: 'Intrusion Alert', desc: 'PIR & IR sensors trigger alarm if door opened without RFID', color: 'var(--yellow)' },
                { label: 'Session Tracking', desc: 'Tap card once to start, tap again to end session', color: 'var(--accent)' },
              ].map((f, i) => (
                <div key={i} style={{ flex: '1 1 180px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.7rem' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: f.color, marginBottom: '2px' }}>{f.label}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Activity Log */}
      <div className="rfid-panel">
        <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '0.8rem' }}>📋 RFID Activity Log</div>
        <div className="rfid-log">
          {rfidLog.map((e, i) => (
            <div key={i} className="rfid-log-entry">
              <span className="log-time">[{e.time}]</span>
              <span className={`log-${e.type}`}>{e.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
