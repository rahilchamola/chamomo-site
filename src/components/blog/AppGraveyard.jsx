import { useState } from 'react';

export default function AppGraveyard() {
  const [filter, setFilter] = useState("all");

  const apps = [
    { name: "Todoist", category: "Tasks", failureMode: "Manages tasks without knowing your energy, habits, or calendar", weeksUsed: 8 },
    { name: "Notion", category: "Everything", failureMode: "Infinite flexibility means infinite setup cost — ADHD kryptonite", weeksUsed: 12 },
    { name: "Habitica", category: "Habits", failureMode: "Gamification works until you skip a day and the guilt mechanic backfires", weeksUsed: 3 },
    { name: "Bear", category: "Notes", failureMode: "Beautiful writing app that knows nothing about what you should write about", weeksUsed: 6 },
    { name: "Day One", category: "Journal", failureMode: "Blank page paralysis — no prompts, no context, just an empty field", weeksUsed: 4 },
    { name: "Fantastical", category: "Calendar", failureMode: "Knows when things happen but not what to do between them", weeksUsed: 10 },
    { name: "Things 3", category: "Tasks", failureMode: "Beautiful task lists that grow until opening the app causes anxiety", weeksUsed: 6 },
    { name: "Obsidian", category: "Knowledge", failureMode: "Second brain that never tells you what to do with what you know", weeksUsed: 5 }
  ];

  const accent = '#D4920A';
  const categories = ["all", ...new Set(apps.map(a => a.category))];
  const filtered = filter === "all" ? apps : apps.filter(a => a.category === filter);

  return (
    <div style={{
      maxWidth: "56rem",
      margin: "3rem auto",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      {/* Filter pills */}
      <div style={{
        display: "flex",
        gap: "0.5rem",
        marginBottom: "1.5rem",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: "0.35rem 0.85rem",
              borderRadius: "9999px",
              border: `1px solid ${filter === cat ? `${accent}40` : "rgba(255,255,255,0.06)"}`,
              backgroundColor: filter === cat ? `${accent}08` : "rgba(255,255,255,0.02)",
              color: filter === cat ? accent : "#a1a1aa",
              fontSize: "0.75rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
              textTransform: "capitalize"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Vertical list — no hidden content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {filtered.map(app => (
          <div
            key={app.name}
            style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "1rem",
              padding: "1.25rem 1.5rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "1.25rem",
              transition: "all 0.2s ease"
            }}
          >
            {/* Weeks badge */}
            <div style={{
              minWidth: "3rem",
              height: "3rem",
              borderRadius: "0.75rem",
              backgroundColor: `${accent}15`,
              border: `1px solid ${accent}25`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <span style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: accent,
                lineHeight: 1,
                fontFamily: "monospace"
              }}>{app.weeksUsed}</span>
              <span style={{
                fontSize: "0.5rem",
                color: "#71717a",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontFamily: "monospace"
              }}>wks</span>
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.4rem" }}>
                <span style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#f4f4f5"
                }}>{app.name}</span>
                <span style={{
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  color: accent,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontFamily: "monospace"
                }}>{app.category}</span>
              </div>
              <p style={{
                margin: 0,
                fontSize: "0.85rem",
                color: "#a1a1aa",
                lineHeight: 1.6
              }}>
                {app.failureMode}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
