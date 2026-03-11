import { useState } from 'react';

export default function AppGraveyard() {
  const [flipped, setFlipped] = useState({});

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

  const toggleFlip = (name) => {
    setFlipped(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        width: '100%'
      }}>
        {apps.map(app => (
          <button
            key={app.name}
            onClick={() => toggleFlip(app.name)}
            style={{
              background: '#1a1a1a',
              border: flipped[app.name] ? '2px solid #D4920A' : '2px solid #404040',
              borderRadius: '8px',
              padding: '1.5rem',
              cursor: 'pointer',
              minHeight: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {!flipped[app.name] ? (
              <>
                <div style={{
                  fontSize: '2.5rem',
                  opacity: 0.4,
                  marginBottom: '0.5rem'
                }}>
                  {app.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{
                    margin: '0 0 0.5rem 0',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#fff'
                  }}>
                    {app.name}
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '0.85rem',
                    color: '#888',
                    textAlign: 'left'
                  }}>
                    {app.category}
                  </p>
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#666',
                  marginTop: '1rem',
                  borderTop: '1px solid #333',
                  paddingTop: '0.75rem'
                }}>
                  {app.weeksUsed} weeks
                </div>
              </>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'left'
              }}>
                <p style={{
                  margin: 0,
                  fontSize: '0.95rem',
                  color: '#D4920A',
                  lineHeight: 1.5,
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
        marginTop: '2rem',
        fontSize: '0.85rem',
        color: '#666',
        textAlign: 'center',
        fontStyle: 'italic'
      }}>
        Click a tombstone to reveal the failure mode
      </p>
    </div>
  );
}
