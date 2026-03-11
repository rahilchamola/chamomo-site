import { useState } from 'react';

export default function ADHDDesignCards() {
  const [expanded, setExpanded] = useState({});

  const cards = [
    {
      name: "Todo",
      icon: "✓",
      failureMode: "List grows → anxiety → stop opening the app",
      designResponse: "One active task. Hard cap at 15. LLM picks priority. Everything else is invisible until needed."
    },
    {
      name: "Habits",
      icon: "↻",
      failureMode: "Streak breaks → guilt → abandon tracking",
      designResponse: "Frequency, not streaks. 5-of-7 = 71% consistency. It trends. It doesn't reset."
    },
    {
      name: "Journal",
      icon: "✎",
      failureMode: "Blank page → paralysis → skip journaling",
      designResponse: "AI prompt generated from your day's data. You can ignore it. But the blank page is gone."
    },
    {
      name: "Calendar",
      icon: "◷",
      failureMode: "Shows when things happen, not what to do between them",
      designResponse: "A lens on Google Calendar. Uses gaps and events as context, not as the product."
    }
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
        {cards.map((card) => (
          <button
            key={card.name}
            onClick={() => toggleExpanded(card.name)}
            style={{
              background: expanded[card.name] ? `${accent}08` : 'rgba(255,255,255,0.02)',
              border: expanded[card.name] ? `1px solid ${accent}40` : '1px solid rgba(255,255,255,0.06)',
              borderRadius: '1rem',
              padding: '1.25rem 1.5rem',
              cursor: 'pointer',
              minHeight: expanded[card.name] ? '160px' : '140px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'left'
            }}
          >
            {!expanded[card.name] ? (
              <>
                <div>
                  <div style={{
                    fontSize: '1.8rem',
                    marginBottom: '0.5rem',
                    lineHeight: 1
                  }}>
                    {card.icon}
                  </div>
                  <h3 style={{
                    margin: '0 0 0.5rem 0',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#f4f4f5',
                    lineHeight: 1.3
                  }}>
                    {card.name}
                  </h3>
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '0.8rem',
                  color: '#d4d4d8',
                  lineHeight: 1.4,
                  fontStyle: 'italic'
                }}>
                  {card.failureMode}
                </p>
              </>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}>
                <div style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: accent,
                  marginBottom: '0.75rem'
                }}>
                  Design Response
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '0.85rem',
                  color: '#f4f4f5',
                  lineHeight: 1.5,
                  fontStyle: 'italic',
                  fontWeight: 500
                }}>
                  {card.designResponse}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
