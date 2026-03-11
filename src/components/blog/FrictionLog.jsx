import { useState } from 'react';

export default function FrictionLog() {
  const frictionPoints = [
    { day: "Mon", time: "8:12am", friction: "Opened app, saw 6 tasks. Closed app.", category: "ux", resolved: true },
    { day: "Mon", time: "2:30pm", friction: "AI suggested deep work during 15-min calendar gap", category: "logic", resolved: true },
    { day: "Tue", time: "9:00am", friction: "Habit check-in screen took 3 taps too many", category: "ux", resolved: false },
    { day: "Wed", time: "7:15pm", friction: "Journal prompt was generic — didn't reference my actual day", category: "logic", resolved: true },
    { day: "Thu", time: "11:00am", friction: "Wanted to defer a task but deferral flow was confusing", category: "ux", resolved: false },
    { day: "Fri", time: "6:00pm", friction: "No awareness that tomorrow is a DJ gig — wrong prep surfaced", category: "missing", resolved: true },
    { day: "Sat", time: "10:00am", friction: "Week review was useful but took too long to load", category: "performance", resolved: false }
  ];

  const categoryColors = {
    ux: '#6495ed',
    logic: '#9370db',
    performance: '#ff9500',
    missing: '#ff6b6b'
  };

  const categoryLabels = {
    ux: 'UX',
    logic: 'Logic',
    performance: 'Perf',
    missing: 'Missing'
  };

  // Group by day
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
        paddingLeft: '3rem',
        paddingRight: '1rem'
      }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          left: '0.75rem',
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'linear-gradient(to bottom, #D4920A, #D4920A 50%, transparent)',
          opacity: 0.3
        }} />

        {/* Timeline entries */}
        {days.map((day) => (
          <div key={day} style={{ marginBottom: '2.5rem' }}>
            {/* Day header */}
            <div style={{
              position: 'relative',
              marginBottom: '1rem'
            }}>
              <div style={{
                position: 'absolute',
                left: '-2.5rem',
                top: 0,
                width: '1.5rem',
                height: '1.5rem',
                borderRadius: '50%',
                background: '#D4920A',
                border: '3px solid #0a0a0a',
                opacity: 0.7
              }} />
              <h4 style={{
                margin: '0 0 0.75rem 0',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#D4920A',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {day}day
              </h4>
            </div>

            {/* Friction entries for this day */}
            {groupedByDay[day] && groupedByDay[day].map((point, idx) => (
              <div
                key={`${day}-${idx}`}
                style={{
                  background: '#1a1a1a',
                  border: `1px solid rgba(212, 146, 10, 0.1)`,
                  borderRadius: '6px',
                  padding: '1rem',
                  marginBottom: '0.75rem',
                  position: 'relative',
                  paddingLeft: '3rem'
                }}
              >
                {/* Resolved/Unresolved indicator */}
                <div style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1.25rem',
                  height: '1.25rem',
                  borderRadius: '50%',
                  background: point.resolved ? '#4ade80' : '#D4920A',
                  border: '2px solid #0a0a0a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  color: point.resolved ? '#000' : '#000',
                  fontWeight: 700
                }}>
                  {point.resolved ? '✓' : '●'}
                </div>

                {/* Time and friction text */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      margin: '0 0 0.5rem 0',
                      fontSize: '0.8rem',
                      color: '#888',
                      fontWeight: 500
                    }}>
                      {point.time}
                    </p>
                    <p style={{
                      margin: 0,
                      fontSize: '0.9rem',
                      color: '#e0e0e0',
                      lineHeight: 1.5
                    }}>
                      {point.friction}
                    </p>
                  </div>

                  {/* Category tag */}
                  <div style={{
                    background: categoryColors[point.category],
                    color: '#000',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                    opacity: 0.8
                  }}>
                    {categoryLabels[point.category]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Caption */}
      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        background: 'rgba(212, 146, 10, 0.05)',
        border: '1px solid rgba(212, 146, 10, 0.1)',
        borderRadius: '6px',
        textAlign: 'center'
      }}>
        <p style={{
          margin: 0,
          fontSize: '0.9rem',
          color: '#999',
          fontStyle: 'italic',
          lineHeight: 1.6
        }}>
          Every friction moment is a product decision waiting to be made
        </p>
      </div>

      {/* Legend */}
      <div style={{
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        flexWrap: 'wrap',
        fontSize: '0.8rem',
        color: '#777'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '0.75rem',
            height: '0.75rem',
            borderRadius: '50%',
            background: '#4ade80'
          }} />
          Resolved
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '0.75rem',
            height: '0.75rem',
            borderRadius: '50%',
            background: '#D4920A'
          }} />
          Unresolved
        </div>
      </div>
    </div>
  );
}
