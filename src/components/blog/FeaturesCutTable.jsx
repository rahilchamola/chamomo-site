export default function FeaturesCutTable({ features }) {
  const accentColors = ["#ef4444", "#f97316", "#eab308", "#a855f7", "#6366f1"];

  return (
    <div style={{ maxWidth: "56rem", margin: "3rem auto" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {features.map((f, i) => {
          const color = accentColors[i % accentColors.length];
          return (
            <div
              key={f.feature}
              style={{
                borderRadius: "1rem",
                border: "1px solid rgba(255,255,255,0.06)",
                backgroundColor: "rgba(255,255,255,0.02)",
                padding: "1.25rem 1.5rem",
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "0.75rem",
                transition: "border-color 0.2s",
                borderLeft: `3px solid ${color}60`,
              }}
            >
              {/* Feature name + kill icon */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "1.75rem",
                  height: "1.75rem",
                  borderRadius: "0.5rem",
                  backgroundColor: `${color}15`,
                  color: color,
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  flexShrink: 0,
                }}>✕</span>
                <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "#f4f4f5", margin: 0 }}>
                  {f.feature}
                </h4>
              </div>

              {/* Reason + lesson in a two-column layout on wider screens */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", paddingLeft: "2.5rem" }}>
                <div>
                  <p style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "#52525b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>
                    Why it was killed
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "#a1a1aa", lineHeight: 1.5, margin: 0 }}>
                    {f.reason}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "0.65rem", fontFamily: "monospace", color: color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>
                    Lesson
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "#e4e4e7", fontStyle: "italic", fontWeight: "500", lineHeight: 1.5, margin: 0 }}>
                    {f.lesson}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
