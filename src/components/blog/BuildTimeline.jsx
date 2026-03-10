import { useState } from "react";

export default function BuildTimeline({ phases }) {
  const [activePhase, setActivePhase] = useState(null);

  return (
    <div style={{ maxWidth: "56rem", margin: "3rem auto" }}>
      {/* Vertical timeline */}
      <div style={{ position: "relative", paddingLeft: "2.5rem" }}>
        {/* Vertical line */}
        <div style={{
          position: "absolute",
          left: "0.75rem",
          top: "0.5rem",
          bottom: "0.5rem",
          width: "2px",
          background: "linear-gradient(180deg, #6366f1 0%, #ec4899 50%, #ef4444 100%)",
          opacity: 0.3,
          borderRadius: "1px",
        }} />

        {phases.map((phase, i) => {
          const isActive = activePhase === i;
          return (
            <div
              key={phase.id}
              onClick={() => setActivePhase(isActive ? null : i)}
              style={{
                position: "relative",
                marginBottom: i < phases.length - 1 ? "0.75rem" : 0,
                cursor: "pointer",
              }}
            >
              {/* Timeline node */}
              <div style={{
                position: "absolute",
                left: "-2.5rem",
                top: "1.25rem",
                width: isActive ? "1.75rem" : "1.5rem",
                height: isActive ? "1.75rem" : "1.5rem",
                borderRadius: "50%",
                border: `2px solid ${phase.color}`,
                backgroundColor: isActive ? phase.color : "#09090b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                boxShadow: isActive ? `0 0 16px ${phase.color}40` : "none",
                zIndex: 2,
                marginLeft: isActive ? "-0.125rem" : 0,
                marginTop: isActive ? "-0.125rem" : 0,
              }}>
                <span style={{ color: isActive ? "#fff" : phase.color, fontSize: "0.65rem", fontWeight: "700", fontFamily: "monospace" }}>
                  {phase.day}
                </span>
              </div>

              {/* Pivot indicator */}
              {phase.isPivot && (
                <div style={{
                  position: "absolute",
                  left: "-1.25rem",
                  top: "0.5rem",
                  width: "1rem",
                  height: "1rem",
                  borderRadius: "50%",
                  backgroundColor: "#facc15",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.55rem",
                  fontWeight: "800",
                  color: "#000",
                  zIndex: 3,
                }}>!</div>
              )}

              {/* Card */}
              <div style={{
                borderRadius: "1rem",
                border: `1px solid ${isActive ? phase.color + "40" : "rgba(255,255,255,0.06)"}`,
                backgroundColor: isActive ? `${phase.color}08` : "rgba(255,255,255,0.02)",
                padding: isActive ? "1.25rem 1.5rem" : "0.85rem 1.25rem",
                transition: "all 0.3s ease",
              }}>
                {/* Header row */}
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", minWidth: 0 }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#f4f4f5", margin: 0, whiteSpace: "nowrap" }}>
                      {phase.label}
                    </h3>
                    <span style={{ fontSize: "0.7rem", fontFamily: "monospace", color: phase.color }}>
                      {phase.dateRange}
                    </span>
                  </div>
                  <span style={{
                    fontSize: "0.7rem",
                    fontFamily: "monospace",
                    color: "#71717a",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}>
                    {phase.milestone}
                  </span>
                </div>

                {/* Expanded content */}
                {isActive && (
                  <div style={{ marginTop: "1rem" }}>
                    <p style={{ fontSize: "0.85rem", color: "#d4d4d8", lineHeight: 1.6, margin: "0 0 1rem 0" }}>
                      {phase.summary}
                    </p>

                    {/* Key learning */}
                    <div style={{
                      borderRadius: "0.75rem",
                      padding: "0.85rem 1rem",
                      backgroundColor: `${phase.color}10`,
                      borderLeft: `3px solid ${phase.color}50`,
                      marginBottom: "1rem",
                    }}>
                      <p style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "#71717a", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>Key Learning</p>
                      <p style={{ fontSize: "0.85rem", color: "#f4f4f5", fontStyle: "italic", fontWeight: "500", margin: 0, lineHeight: 1.5 }}>
                        "{phase.keyLearning}"
                      </p>
                    </div>

                    {/* Pivot note */}
                    {phase.isPivot && phase.pivotNote && (
                      <div style={{
                        borderRadius: "0.75rem",
                        padding: "0.75rem 1rem",
                        backgroundColor: "rgba(250,204,21,0.06)",
                        border: "1px solid rgba(250,204,21,0.15)",
                        marginBottom: "1rem",
                      }}>
                        <p style={{ fontSize: "0.8rem", color: "#fde68a", margin: 0 }}>
                          <strong>⚡ Pivot:</strong> {phase.pivotNote}
                        </p>
                      </div>
                    )}

                    {/* Metrics */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
                      {[
                        { label: "LOC", value: phase.metrics.loc.toLocaleString() },
                        { label: "Files", value: phase.metrics.files },
                        { label: "Worlds", value: phase.metrics.worlds },
                        { label: "Effects", value: phase.metrics.effectTypes },
                      ].map((m) => (
                        <div key={m.label} style={{
                          textAlign: "center",
                          padding: "0.6rem",
                          borderRadius: "0.5rem",
                          backgroundColor: "rgba(255,255,255,0.03)",
                        }}>
                          <p style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f4f4f5", margin: "0 0 0.15rem 0" }}>{m.value}</p>
                          <p style={{ fontSize: "0.6rem", fontFamily: "monospace", color: "#71717a", textTransform: "uppercase", margin: 0 }}>{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
