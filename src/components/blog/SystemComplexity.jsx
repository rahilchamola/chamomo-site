export default function SystemComplexity({ systems }) {
  const maxVal = Math.max(...systems.map((s) => s.value));
  const COLORS = ["#818cf8", "#a78bfa", "#c084fc", "#e879f9", "#ec4899", "#f43f5e"];

  return (
    <div style={{ maxWidth: "56rem", margin: "3rem auto" }}>
      <div style={{
        borderRadius: "1rem",
        border: "1px solid rgba(255,255,255,0.06)",
        backgroundColor: "rgba(255,255,255,0.02)",
        padding: "1.5rem",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {systems.map((sys, i) => {
            const color = COLORS[i % COLORS.length];
            const pct = (sys.value / maxVal) * 100;
            return (
              <div key={sys.label}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#e4e4e7" }}>{sys.label}</span>
                  <span style={{ fontSize: "1rem", fontFamily: "monospace", fontWeight: "700", color: color }}>
                    {sys.value}
                  </span>
                </div>
                <div style={{
                  height: "2rem",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  position: "relative",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${pct}%`,
                    borderRadius: "0.5rem",
                    background: `linear-gradient(90deg, ${color}40 0%, ${color}25 100%)`,
                    borderRight: `3px solid ${color}`,
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "0.75rem",
                    transition: "width 0.7s ease",
                  }}>
                    <span style={{
                      fontSize: "0.7rem",
                      color: "#a1a1aa",
                      fontFamily: "monospace",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                      {sys.description}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
