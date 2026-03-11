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
      maxWidth: "600px",
      margin: "40px auto",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
    },
    title: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#1f2937",
      margin: "0 0 20px 0",
    },
    toggles: {
      display: "flex",
      gap: "10px",
      justifyContent: "center",
      marginBottom: "30px",
      flexWrap: "wrap",
    },
    toggleButton: (isActive) => ({
      padding: "8px 16px",
      border: "2px solid #3EAE7C",
      backgroundColor: isActive ? "#3EAE7C" : "transparent",
      color: isActive ? "white" : "#3EAE7C",
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.2s ease",
    }),
    diagram: {
      position: "relative",
      width: "300px",
      height: "300px",
      margin: "0 auto 30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    ring: (radius, layerType) => ({
      position: "absolute",
      borderRadius: "50%",
      border: `3px solid ${layerType === 'outer' ? '#8EE4D9' : layerType === 'middle' ? '#5EC4B0' : '#3EAE7C'}`,
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
      fontSize: "12px",
      fontWeight: "500",
      padding: "10px",
      color: "#1f2937",
    },
    tag: {
      position: "absolute",
      backgroundColor: "#E0F8F5",
      border: "1px solid #3EAE7C",
      color: "#0f766e",
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "11px",
      fontWeight: "500",
    },
    expandedContent: {
      backgroundColor: "#f3f4f6",
      border: "2px solid #3EAE7C",
      borderRadius: "8px",
      padding: "20px",
      marginTop: "20px",
    },
    expandedSection: {
      marginBottom: "15px",
    },
    expandedTitle: {
      fontSize: "13px",
      fontWeight: "600",
      color: "#3EAE7C",
      marginBottom: "8px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    expandedList: {
      listStyle: "none",
      padding: "0",
      margin: "0",
    },
    expandedItem: {
      fontSize: "13px",
      color: "#374151",
      marginBottom: "6px",
      paddingLeft: "16px",
      position: "relative",
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
            ...layerStyles.ring(140, 'outer'),
            ...layerStyles.ringOuter,
          }}
          onClick={() => setExpandedLayer(expandedLayer === 'entities' ? null : 'entities')}
        >
          <div style={layerStyles.ringLabel}>
            <div style={{ fontSize: "11px", fontWeight: "600", marginBottom: "4px" }}>ENTITIES</div>
            <div style={{ fontSize: "10px", color: "#6b7280" }}>what you watch</div>
          </div>
        </div>

        {/* Middle ring - Signal Types */}
        <div
          style={{
            ...layerStyles.ring(90, 'middle'),
            ...layerStyles.ringMiddle,
          }}
          onClick={() => setExpandedLayer(expandedLayer === 'signals' ? null : 'signals')}
        >
          <div style={layerStyles.ringLabel}>
            <div style={{ fontSize: "11px", fontWeight: "600", marginBottom: "4px" }}>SIGNALS</div>
            <div style={{ fontSize: "10px", color: "#6b7280" }}>what matters</div>
          </div>
        </div>

        {/* Inner ring - Learning Goal */}
        <div
          style={{
            ...layerStyles.ring(50, 'inner'),
            ...layerStyles.ringInner,
            boxShadow: "0 0 20px rgba(62, 174, 124, 0.3)",
          }}
          onClick={() => setExpandedLayer(expandedLayer === 'goal' ? null : 'goal')}
        >
          <div style={layerStyles.ringLabel}>
            <div style={{ fontSize: "10px", fontWeight: "600" }}>THE</div>
            <div style={{ fontSize: "9px", fontWeight: "600" }}>QUESTION</div>
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
                <p style={{ fontSize: "14px", color: "#374151", margin: "0", fontStyle: "italic" }}>
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
