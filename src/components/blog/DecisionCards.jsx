import { useState } from "react";

const CATEGORY_COLORS = {
  product: "#22c55e",
  architecture: "#818cf8",
  ux: "#f59e0b",
  process: "#ec4899",
};

const CATEGORY_LABELS = {
  product: "Product",
  architecture: "Architecture",
  ux: "UX Design",
  process: "Process",
};

const CATEGORY_ICONS = {
  product: "◎",
  architecture: "⬡",
  ux: "◐",
  process: "⟐",
};

export default function DecisionCards({ decisions }) {
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("all");

  const categories = ["all", ...new Set(decisions.map((d) => d.category))];
  const filtered = filter === "all" ? decisions : decisions.filter((d) => d.category === filter);

  return (
    <div style={{ maxWidth: "56rem", margin: "3rem auto" }}>
      {/* Filter pills */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {categories.map((cat) => {
          const isActive = filter === cat;
          const color = cat === "all" ? "#a1a1aa" : CATEGORY_COLORS[cat];
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontFamily: "monospace",
                fontWeight: isActive ? "600" : "400",
                cursor: "pointer",
                border: "none",
                backgroundColor: isActive ? `${color}20` : "rgba(255,255,255,0.03)",
                color: isActive ? color : "#71717a",
                transition: "all 0.2s ease",
              }}
            >
              {cat === "all" ? "All" : CATEGORY_LABELS[cat]}
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
        {filtered.map((d) => {
          const color = CATEGORY_COLORS[d.category];
          const isExpanded = expandedId === d.id;
          const icon = CATEGORY_ICONS[d.category];

          return (
            <div
              key={d.id}
              onClick={() => setExpandedId(isExpanded ? null : d.id)}
              style={{
                cursor: "pointer",
                borderRadius: "1rem",
                border: `1px solid ${isExpanded ? color + "40" : "rgba(255,255,255,0.06)"}`,
                backgroundColor: isExpanded ? `${color}08` : "rgba(255,255,255,0.02)",
                padding: "1.5rem",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "1.5rem",
                    height: "1.5rem",
                    borderRadius: "0.375rem",
                    backgroundColor: `${color}20`,
                    color: color,
                    fontSize: "0.7rem",
                  }}>
                    {icon}
                  </span>
                  <span style={{
                    fontSize: "0.65rem",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: color,
                    fontWeight: "600",
                  }}>
                    {CATEGORY_LABELS[d.category]}
                  </span>
                </div>
                <span style={{
                  fontSize: "1.2rem",
                  color: "#52525b",
                  transition: "transform 0.2s",
                  transform: isExpanded ? "rotate(45deg)" : "rotate(0)",
                  lineHeight: 1,
                }}>
                  +
                </span>
              </div>

              <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#f4f4f5", marginBottom: "0.5rem", lineHeight: 1.3 }}>
                {d.title}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#a1a1aa", lineHeight: 1.5, marginBottom: isExpanded ? "1rem" : 0 }}>
                {d.choice}
              </p>

              {/* Expanded detail */}
              {isExpanded && (
                <div style={{ borderTop: `1px solid ${color}15`, paddingTop: "1rem", marginTop: "0.5rem" }}>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <p style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "#52525b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>Decision</p>
                    <p style={{ fontSize: "0.85rem", color: "#d4d4d8", lineHeight: 1.5 }}>{d.decided}</p>
                  </div>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <p style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "#52525b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>Tradeoff</p>
                    <p style={{ fontSize: "0.85rem", color: "#a1a1aa", lineHeight: 1.5 }}>{d.tradeoff}</p>
                  </div>
                  <div style={{
                    borderRadius: "0.75rem",
                    padding: "0.85rem 1rem",
                    backgroundColor: `${color}10`,
                    borderLeft: `3px solid ${color}50`,
                  }}>
                    <p style={{ fontSize: "0.65rem", fontFamily: "monospace", color: color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>Lesson</p>
                    <p style={{ fontSize: "0.85rem", color: "#f4f4f5", fontWeight: "500", fontStyle: "italic", lineHeight: 1.5 }}>{d.lesson}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
