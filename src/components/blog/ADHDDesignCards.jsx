import { useState } from 'react';

export default function ADHDDesignCards() {
  const [expandedIdx, setExpandedIdx] = useState(null);

  const cards = [
    {
      name: "Todo",
      icon: "◎",
      failureMode: "List grows → anxiety → stop opening the app",
      designResponse: "One active task. Hard cap at 15. LLM picks priority. Everything else is invisible until needed."
    },
    {
      name: "Habits",
      icon: "⟳",
      failureMode: "Streak breaks → guilt → abandon tracking",
      designResponse: "Frequency, not streaks. 5-of-7 = 71% consistency. It trends. It doesn't reset."
    },
    {
      name: "Journal",
      icon: "◐",
      failureMode: "Blank page → paralysis → skip journaling",
      designResponse: "AI prompt generated from your day's data. You can ignore it. But the blank page is gone."
    },
    {
      name: "Calendar",
      icon: "⬡",
      failureMode: "Shows when things happen, not what to do between them",
      designResponse: "A lens on Google Calendar. Uses gaps and events as context, not as the product."
    }
  ];

  const accent = '#D4920A';

  return (
    <div style={{
      maxWidth: "56rem",
      margin: "3rem auto",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {cards.map((card, idx) => {
          const isExpanded = expandedIdx === idx;
          return (
            <button
              key={card.name}
              onClick={() => setExpandedIdx(isExpanded ? null : idx)}
              style={{
                backgroundColor: isExpanded ? `${accent}08` : "rgba(255,255,255,0.02)",
                border: `1px solid ${isExpanded ? `${accent}40` : "rgba(255,255,255,0.06)"}`,
                borderRadius: "1rem",
                padding: "1.25rem 1.5rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                textAlign: "left",
                display: "block",
                width: "100%"
              }}
            >
              {/* Header row */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "0.5rem"
              }}>
                <span style={{
                  fontSize: "1.1rem",
                  color: accent,
                  lineHeight: 1,
                  width: "1.5rem",
                  textAlign: "center"
                }}>{card.icon}</span>
                <span style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#f4f4f5",
                  flex: 1
                }}>{card.name}</span>
                <span style={{
                  fontSize: "0.75rem",
                  color: "#52525b",
                  transition: "transform 0.2s ease",
                  transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)"
                }}>▾</span>
              </div>

              {/* Failure mode — always visible */}
              <div style={{
                fontSize: "0.85rem",
                color: "#a1a1aa",
                lineHeight: 1.6,
                paddingLeft: "2.5rem"
              }}>
                {card.failureMode}
              </div>

              {/* Design response — expands */}
              {isExpanded && (
                <div style={{
                  marginTop: "1rem",
                  marginLeft: "2.5rem",
                  paddingTop: "1rem",
                  borderTop: `1px solid ${accent}15`
                }}>
                  <div style={{
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    color: accent,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontFamily: "monospace",
                    marginBottom: "0.5rem"
                  }}>Design Response</div>
                  <div style={{
                    fontSize: "0.85rem",
                    color: "#f4f4f5",
                    lineHeight: 1.6,
                    fontWeight: 500
                  }}>
                    {card.designResponse}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
