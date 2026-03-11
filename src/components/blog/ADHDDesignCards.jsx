import { useState } from 'react';

export default function ADHDDesignCards() {
  const [flipped, setFlipped] = useState({});

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

  const toggleFlip = (name) => {
    setFlipped(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const cardStyle = (isFront) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1.5rem',
    textAlign: 'center',
    opacity: isFront ? 1 : 0,
    transform: isFront ? 'rotateY(0deg)' : 'rotateY(180deg)',
    transition: 'opacity 0.6s ease, transform 0.6s ease'
  });

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '2rem',
        width: '100%'
      }}>
        {cards.map((card, idx) => (
          <button
            key={card.name}
            onClick={() => toggleFlip(card.name)}
            style={{
              perspective: '1000px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              height: '300px',
              position: 'relative',
              transformStyle: 'preserve-3d',
              animation: `slideIn 0.6s ease ${idx * 0.1}s both`,
              outline: 'none'
            }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              transform: flipped[card.name] ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.6s ease'
            }}>
              {/* Front */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: '#1a1a1a',
                border: '2px solid #D4920A',
                borderRadius: '8px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backfaceVisibility: 'hidden',
                boxShadow: '0 8px 32px rgba(212, 146, 10, 0.1)'
              }}>
                <div>
                  <div style={{
                    fontSize: '2.5rem',
                    marginBottom: '1rem'
                  }}>
                    {card.icon}
                  </div>
                  <h3 style={{
                    margin: '0 0 1rem 0',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#fff'
                  }}>
                    {card.name}
                  </h3>
                </div>

                <div>
                  <p style={{
                    margin: 0,
                    fontSize: '0.9rem',
                    color: '#ff6b6b',
                    lineHeight: 1.5,
                    fontWeight: 500
                  }}>
                    {card.failureMode}
                  </p>
                </div>

                <div style={{
                  fontSize: '0.75rem',
                  color: '#666',
                  textAlign: 'center'
                }}>
                  Click to flip
                </div>
              </div>

              {/* Back */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: '#1a1a1a',
                border: '2px solid #D4920A',
                borderRadius: '8px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                boxShadow: '0 8px 32px rgba(212, 146, 10, 0.1)'
              }}>
                <div />

                <div>
                  <p style={{
                    margin: 0,
                    fontSize: '0.95rem',
                    color: '#D4920A',
                    lineHeight: 1.6,
                    fontWeight: 500
                  }}>
                    {card.designResponse}
                  </p>
                </div>

                <div style={{
                  fontSize: '0.75rem',
                  color: '#666',
                  textAlign: 'center'
                }}>
                  Design Response
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
