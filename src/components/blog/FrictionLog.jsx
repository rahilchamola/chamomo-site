import { useState } from 'react';

export default function FrictionLog() {
  const [expandedItem, setExpandedItem] = useState(null);

  const accent = '#D4920A';

  const frictionPoints = [
    { day: "Mon", time: "8:12am", friction: "Opened app, saw 6 tasks. Closed app.", category: "ux", resolved: true },
    { day: "Mon", time: "2:30pm", friction: "AI suggested deep work during 15-min calendar gap", category: "logic", resolved: true },
    { day: "Tue", time: "9:00am", friction: "Habit check-in screen took 3 taps too many", category: "ux", resolved: false },
    { day: "Wed", time: "7:15pm", friction: "Journal prompt was generic — didn't reference my actual day", category: "logic", resolved: true },
    { day: "Thu", time: "11:00am", friction: "Wanted to defer a task but deferral flow was confusing", category: "ux", resolved: false },
    { day: "Fri", time: "6:00pm", friction: "No awareness that tomorrow is a DJ gig — wrong prep surfaced", category: "missing", resolved: true },
    { day: "Sat", time: "10:00am", friction: "Week review was useful but took too long to load", category: "performance", resolved: false }
  ];

  const categoryInfo = {
    ux: { label: 'UX', color: accent },
    logic: { label: 'Logic', color: accent },
    performance: { label: 'Perf', color: accent },
    missing: { label: 'Missing', color: accent }
  };

  const groupedByDay = frictionPoints.reduce((acc, point) => {
    if (!acc[point.day]) acc[point.day] = [];
    acc[point.day].push(point);
    return acc;
  }, {});

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{
        position: 'relative',
        paddingLeft: '2.5rem',
        paddingRight: '1rem'
      }}>
        <div style={{
          position: 'absolute',
          left: '0.6rem',
          top: 0,
          bottom: 0,
          width: '1px',
          background: `linear-gradient(to bottom, ${accent}40 0%, ${accent}20 50%, transparent 100%)`
        }} />

        {days.map((day) => (
          <div key={day} style={{ marginBottom: '2rem' }}>
            <div style={{
              position: 'relative',
              marginBottom: '1rem'
            }}>
              <div style={{
                position: 'absolute',
                left: '-1.5rem',
                top: '0.1rem',
                width: '1.2rem',
                height: '1.2rem',
                borderRadius: '50%',
                background: accent,
                border: `2px solid #0a0a0a`,
                opacity: 0.8
              }} />
              <h4 style={{
                margin: 0,
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: accent
              }}>
                {day}day
              </h4>
            </div>

            {groupedByDay[day] && groupedByDay[day].map((point, idx) => (
              <button
                key={`${day}-${idx}`}
                onClick={() => setExpandedItem(expandedItem === `${day}-${idx}` ? null : `${day}-${idx}`)}
                style={{
                  background: expandedItem === `${day}-${idx}` ? `${accent}08` : 'rgba(255,255,255,0.02)',
                  border: expandedItem === `${day}-${idx}` ? `1px solid ${accent}40` : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '0.75rem',
                  padding: '1rem 1.25rem',
                  marginBottom: '0.5rem',
                  position: 'relative',
                  paddingLeft: '2.5rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  width: '100%'
                }}
              >
                <div style={{
                  position: 'absolute',
                  left: '0.55rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1rem',
                  height: '1rem',
                  borderRadius: '50%',
                  background: point.resolved ? '#4ade80' : accent,
                  border: `2px solid #0a0a0a`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.6rem',
                  color: '#000',
                  fontWeight: 700
                }}>
                  {point.resolved ? '✓' : '●'}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    margin: '0 0 0.4rem 0',
                    fontSize: '0.75rem',
                    color: '#a1a1aa',
                    fontFamily: 'monospace'
                  }}>
                    {point.time}
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: '0.85rem',
                    color: '#f4f4f5',
                    lineHeight: 1.4
                  }}>
                    {point.friction}
                  </p>
                </div>

                <div style={{
                  background: `${accent}15`,
                  color: accent,
                  padding: '0.3rem 0.7rem',
                  borderRadius: '0.4rem',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.05em',
                  flexShrink: 0,
                  fontFamily: 'monospace',
                  border: `1px solid ${accent}25`
                }}>
                  {categoryInfo[point.category].label}
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '2.5rem',
        padding: '1.25rem 1.5rem',
        background: `${accent}08`,
        border: `1px solid ${accent}40`,
        borderLeft: `3px solid ${accent}50`,
        borderRadius: '1rem',
        textAlign: 'center'
      }}>
        <p style={{
          margin: 0,
          fontSize: '0.85rem',
          color: '#f4f4f5',
          lineHeight: 1.6,
          fontStyle: 'italic',
          fontWeight: 500
        }}>
          Every friction moment is a product decision waiting to be made
        </p>
      </div>
    </div>
  );
}
