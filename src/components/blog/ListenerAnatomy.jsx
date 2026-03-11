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

  const layerStyles = {
    container: {
      maxWidth: "56rem",
      margin: "3rem auto",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    title: {
      fontSize: "1.05rem",
      fontWeight: "700",
      color: "#f4f4f5",
      margin: "0 0 1rem 0",
      lineHeight: 1.3,
    },
    toggles: {
      display: "flex",
      gap: "0.75rem",
      justifyContent: "center",
      marginBottom: "2rem",
      flexWrap: "wrap",
    },
    toggleButton: (isActive) => ({
      padding: "0.5rem 1rem",
      border: `1px solid ${isActive ? "#3EAE7C40" : "rgba(255,255,255,0.06)"}`,
      backgroundColor: isActive ? "#3EAE7C08" : "rgba(255,255,255,0.02)",
      color: isActive ? "#3EAE7C" : "#d4d4d8",
      borderRadius: "0.5rem",
      cursor: "pointer",
      fontSize: "0.85rem",
      fontWeight: "500",
      transition: "all 0.3s ease",
    }),
    diagram: {
      position: "relative",
      width: "300px",
      height: "300px",
      margin: "0 auto 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    ring: (layerType) => ({
      position: "absolute",
      borderRadius: "50%",
      border: `2px solid ${layerType === 'outer' ? 'rgba(62, 174, 124, 0.3)' : layerType === 'middle' ? 'rgba(62, 174, 124, 0.5)' : '#3EAE7C'}`,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
    }),
    ringOuter: {
      width: "280px",
      height: "280px",
    },
    ringMiddle: {
      width: "180px",
      height: "180px",
    },
    ringInner: {
      width: "100px",
      height: "100px",
    },
    ringLabel: {
      textAlign: "center",
      fontSize: "0.75rem",
      fontWeight: "600",
      padding: "0.75rem",
      color: "#f4f4f5",
    },
    ringSubLabel: {
      fontSize: "0.7rem",
      color: "#a1a1aa",
      marginTop: "0.35rem",
    },
    expandedContent: {
      backgroundColor: "rgba(255,255,255,0.02)",
      border: "1px solid #3EAE7C40",
      borderRadius: "1rem",
      padding: "1.25rem 1.5rem",
      marginTop: "1.5rem",
    },
    expandedSection: {
      marginBottom: "0.75rem",
    },
    expandedTitle: {
      fontSize: "0.7rem",
      fontWeight: "600",
      color: "#3EAE7C",
      marginBottom: "0.5rem",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      fontFamily: "monospace",
    },
    expandedList: {
      listStyle: "none",
      padding: "0",
      margin: "0",
    },
    expandedItem: {
      fontSize: "0.85rem",
      color: "#d4d4d8",
      marginBottom: "0.35rem",
      paddingLeft: "1rem",
      position: "relative",
      lineHeight: 1.5,
    },
    expandedItemBullet: {
      position: "absolute",
      left: "0",
      color: "#3EAE7C",
      fontWeight: "bold",
    },
  };

  return (
    <div style={layerStyles.container}>
      <div style={layerStyles.header}>
        <h3 style={layerStyles.title}>Listener Anatomy</h3>
        <div style={layerStyles.toggles}>
          {listeners.map((listener, idx) => (
            <button
              key={idx}
              style={layerStyles.toggleButton(idx === selectedListener)}
              onClick={() => {
                setSelectedListener(idx);
                setExpandedLayer(null);
              }}
            >
              {listener.name}
            </button>
          ))}
        </div>
      </div>

      <div style={layerStyles.diagram}>
        {/* Outer ring - Entities */}
        <div
          style={{
            ...layerStyles.ring('outer'),
            ...layerStyles.ringOuter,
          }}
          onClick={() => setExpandedLayer(expandedLayer === 'entities' ? null : 'entities')}
        >
          <div style={layerStyles.ringLabel}>
            <div style={{ fontWeight: "700" }}>ENTITIES</div>
            <div style={layerStyles.ringSubLabel}>what you watch</div>
          </div>
        </div>

        {/* Middle ring - Signal Types */}
        <div
          style={{
            ...layerStyles.ring('middle'),
            ...layerStyles.ringMiddle,
          }}
          onClick={() => setExpandedLayer(expandedLayer === 'signals' ? null : 'signals')}
        >
          <div style={layerStyles.ringLabel}>
            <div style={{ fontWeight: "700" }}>SIGNALS</div>
            <div style={layerStyles.ringSubLabel}>what matters</div>
          </div>
        </div>

        {/* Inner ring - Learning Goal */}
        <div
          style={{
            ...layerStyles.ring('inner'),
            ...layerStyles.ringInner,
            boxShadow: "0 0 16px #3EAE7C40",
          }}
          onClick={() => setExpandedLayer(expandedLayer === 'goal' ? null : 'goal')}
        >
          <div style={layerStyles.ringLabel}>
            <div style={{ fontSize: "0.7rem", fontWeight: "700" }}>THE</div>
            <div style={{ fontSize: "0.65rem", fontWeight: "700" }}>QUESTION</div>
          </div>
        </div>
      </div>

      {expandedLayer && (
        <div style={layerStyles.expandedContent}>
          {expandedLayer === 'entities' && (
            <div>
              <div style={layerStyles.expandedSection}>
                <div style={layerStyles.expandedTitle}>Entities</div>
                <ul style={layerStyles.expandedList}>
                  {current.entities.map((entity, idx) => (
                    <li key={idx} style={layerStyles.expandedItem}>
                      <span style={layerStyles.expandedItemBullet}>•</span>
                      {entity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {expandedLayer === 'signals' && (
            <div>
              <div style={layerStyles.expandedSection}>
                <div style={layerStyles.expandedTitle}>Signal Types</div>
                <ul style={layerStyles.expandedList}>
                  {current.signalTypes.map((signal, idx) => (
                    <li key={idx} style={layerStyles.expandedItem}>
                      <span style={layerStyles.expandedItemBullet}>•</span>
                      {signal}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {expandedLayer === 'goal' && (
            <div>
              <div style={layerStyles.expandedSection}>
                <div style={layerStyles.expandedTitle}>Learning Goal</div>
                <p style={{ fontSize: "0.85rem", color: "#f4f4f5", margin: "0", fontStyle: "italic", fontWeight: 500, lineHeight: 1.6 }}>
                  "{current.learningGoal}"
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
