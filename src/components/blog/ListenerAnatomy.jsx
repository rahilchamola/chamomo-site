import { useState } from "react";

export default function ListenerAnatomy() {
  const [selectedListener, setSelectedListener] = useState(0);
  const [expandedLayer, setExpandedLayer] = useState(null);

  const listeners = [
    {
      name: "RBI Policy Watch",
      entities: ["Reserve Bank of India", "digital lending", "credit regulation"],
      signalTypes: ["policy announcements", "consultation papers", "enforcement actions"],
      learningGoal: "What regulatory shifts should change how I think about credit product design?",
    },
    {
      name: "Vibe Coding Ecosystem",
      entities: ["AI coding tools", "non-technical builders", "product-led development"],
      signalTypes: ["new tools", "capability shifts", "community narratives"],
      learningGoal: "Is the non-engineer builder becoming a viable product role, or is this a temporary window?",
    },
  ];

  const current = listeners[selectedListener];
  const accent = "#3EAE7C";

  const layers = [
    { key: "entities", label: "Entities", badge: "L1", sublabel: "what you watch", items: current.entities },
    { key: "signals", label: "Signal Types", badge: "L2", sublabel: "what matters", items: current.signalTypes },
    { key: "goal", label: "Learning Goal", badge: "L3", sublabel: "the question", items: null, text: current.learningGoal },
  ];

  return (
    <div style={{
      maxWidth: "56rem",
      margin: "3rem auto",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <h3 style={{
        fontSize: "1.05rem",
        fontWeight: 700,
        color: "#f4f4f5",
        margin: "0 0 1rem 0",
        textAlign: "center",
        lineHeight: 1.3
      }}>Listener Anatomy</h3>

      {/* Listener toggle */}
      <div style={{
        display: "flex",
        gap: "0.5rem",
        justifyContent: "center",
        marginBottom: "2rem",
        flexWrap: "wrap"
      }}>
        {listeners.map((listener, idx) => (
          <button
            key={idx}
            onClick={() => { setSelectedListener(idx); setExpandedLayer(null); }}
            style={{
              padding: "0.35rem 0.85rem",
              borderRadius: "9999px",
              border: `1px solid ${idx === selectedListener ? `${accent}40` : "rgba(255,255,255,0.06)"}`,
              backgroundColor: idx === selectedListener ? `${accent}08` : "rgba(255,255,255,0.02)",
              color: idx === selectedListener ? accent : "#a1a1aa",
              fontSize: "0.8rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            {listener.name}
          </button>
        ))}
      </div>

      {/* Stacked layers */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {layers.map((layer, idx) => {
          const isExpanded = expandedLayer === layer.key;
          return (
            <button
              key={layer.key}
              onClick={() => setExpandedLayer(isExpanded ? null : layer.key)}
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
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {/* Layer badge */}
                <div style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "0.75rem",
                  backgroundColor: `${accent}15`,
                  border: `1px solid ${accent}25`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <span style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: accent,
                    fontFamily: "monospace"
                  }}>{layer.badge}</span>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#f4f4f5",
                    lineHeight: 1.3
                  }}>{layer.label}</div>
                  <div style={{
                    fontSize: "0.75rem",
                    color: "#71717a",
                    marginTop: "0.15rem"
                  }}>{layer.sublabel}</div>
                </div>

                <span style={{
                  fontSize: "0.75rem",
                  color: "#52525b",
                  transition: "transform 0.2s ease",
                  transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)"
                }}>▾</span>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div style={{
                  marginTop: "1rem",
                  paddingTop: "1rem",
                  paddingLeft: "3.5rem",
                  borderTop: `1px solid ${accent}15`
                }}>
                  {layer.items ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      {layer.items.map((item, i) => (
                        <div key={i} style={{
                          fontSize: "0.85rem",
                          color: "#d4d4d8",
                          lineHeight: 1.5,
                          position: "relative",
                          paddingLeft: "1rem"
                        }}>
                          <span style={{
                            position: "absolute",
                            left: 0,
                            color: accent,
                            fontWeight: "bold"
                          }}>·</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      fontSize: "0.9rem",
                      color: "#f4f4f5",
                      fontStyle: "italic",
                      fontWeight: 500,
                      lineHeight: 1.6
                    }}>
                      "{layer.text}"
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Connector hint */}
      <div style={{
        marginTop: "1.25rem",
        padding: "0.85rem 1.25rem",
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "0.75rem",
        fontSize: "0.8rem",
        color: "#71717a",
        textAlign: "center",
        lineHeight: 1.6
      }}>
        <strong style={{ color: "#f4f4f5" }}>Outer → Inner:</strong> Entities define scope. Signals filter noise. The Question keeps it honest.
      </div>
    </div>
  );
}
