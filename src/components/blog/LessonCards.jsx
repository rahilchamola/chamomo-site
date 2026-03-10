import { useState } from "react";

const CATEGORY_META = {
  ai: { label: "Building with AI", color: "#818cf8", icon: "⬡" },
  product: { label: "Product Thinking", color: "#34d399", icon: "◎" },
};

export default function LessonCards({ lessons }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? lessons : lessons.filter((l) => l.category === filter);

  return (
    <div style={{ maxWidth: "56rem", margin: "3rem auto" }}>
      {/* Filter */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", justifyContent: "center" }}>
        {["all", "ai", "product"].map((cat) => {
          const isActive = filter === cat;
          const color = cat === "all" ? "#a1a1aa" : CATEGORY_META[cat].color;
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
              {cat === "all" ? "All Lessons" : CATEGORY_META[cat].label}
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filtered.map((lesson) => {
          const meta = CATEGORY_META[lesson.category];
          return (
            <div
              key={lesson.id}
              style={{
                borderRadius: "1rem",
                border: "1px solid rgba(255,255,255,0.06)",
                backgroundColor: "rgba(255,255,255,0.02)",
                padding: "1.25rem 1.5rem",
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
              }}
            >
              {/* Number badge */}
              <div style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                fontWeight: "800",
                fontFamily: "monospace",
                color: meta.color,
                backgroundColor: `${meta.color}15`,
                flexShrink: 0,
                border: `1px solid ${meta.color}20`,
              }}>
                {lesson.id}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                  <span style={{
                    fontSize: "0.6rem",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: meta.color,
                    fontWeight: "600",
                  }}>
                    {meta.icon} {meta.label}
                  </span>
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#f4f4f5", margin: "0 0 0.35rem 0", lineHeight: 1.3 }}>
                  {lesson.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#a1a1aa", lineHeight: 1.55, margin: 0 }}>
                  {lesson.summary}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
