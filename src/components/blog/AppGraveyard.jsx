import { useState } from 'react';

export default function AppGraveyard() {
  const [expanded, setExpanded] = useState({});

  const apps = [
    { name: "Todoist", category: "Tasks", failureMode: "Manages tasks without knowing your energy, habits, or calendar", weeksUsed: 8 },
    { name: "Notion", category: "Everything", failureMode: "Infinite flexibility means infinite setup cost — ADHD kryptonite", weeksUsed: 12 },
    { name: "Habitica", category: "Habits", failureMode: "Gamification works until you skip a day and the guilt mechanic backfires", weeksUsed: 3 },
    { name: "Bear", category: "Notes", failureMode: "Beautiful writing app that knows nothing about what you should write about", weeksUsed: 6 },
    { name: "Day One", category: "Journal", failureMode: "Blank page paralysis — no prompts, no context, just an empty field", weeksUsed: 4 },
    { name: "Fantastical", category: "Calendar", failureMode: "Knows when things happen but not what to do between them", weeksUsed: 10 },
    { name: "Things 3", category: "Tasks", failureMode: "Beautiful task lists that grow until opening the app causes anxiety", weeksUsed: 6 },
    { name: "Obsidian", category: "Knowledge", failureMode: "Second brain that never tells you what to do with what you know", weeksUsed: 5 }
  ];

  const toggleExpanded = (name) => {
    setExpanded(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const accent = '#D4920A';

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '0.75rem',
        width: '100%'
      }}>
        {apps.map(app => (
          <button
            key={app.name}
            onClick={() => toggleExpanded(app.name)}
            style={{
              background: expanded[app.name] ? `${accent}08` : 'rgba(255,255,255,0.02)',
              border: expanded[app.name] ? `1px solid ${accent}40` : '1px solid rgba(255,255,255,0.06)',
              borderRadius: '1rem',
              padding: '1.25rem 1.5rem',
              cursor: 'pointer',
              minHeight: expanded[app.name] ? '160px' : '140px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'left'
            }}
          >
            {!expanded[app.name] ? (
              <>
                <div>
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: accent,
                    marginBottom: '0.5rem'
                  }}>
                    {app.category}
                  </div>
                  <h3 style={{
                    margin: 0,
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#f4f4f5',
                    lineHeight: 1.3
                  }}>
                    {app.name}
                  </h3>
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#a1a1aa',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid rgba(255,255,255,0.06)'
                }}>
                  {app.weeksUsed} weeks used
                </div>
              </>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: accent,
                  marginBottom: '0.75rem'
                }}>
                  Why it failed
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '0.85rem',
                  color: '#f4f4f5',
                  lineHeight: 1.5,
                  fontStyle: 'italic',
                  fontWeight: 500
                }}>
                  {app.failureMode}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>
      <p style={{
        marginTop: '1.5rem',
        fontSize: '0.85rem',
        color: '#a1a1aa',
        textAlign: 'center',
        fontStyle: 'italic'
      }}>
        Click a card to see why it failed
      </p>
    </div>
  );
}
