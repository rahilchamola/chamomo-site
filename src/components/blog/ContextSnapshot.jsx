import { useState } from 'react';

export default function ContextSnapshot() {
  const scenarios = [
    {
      label: "Monday Morning",
      time: "Mon 8am",
      todoState: { active: "Strategy case prep", overdue: 3 },
      habitState: { completed: 4, total: 6, streak: "Strong" },
      journalState: { lastMood: "Energized", lastEntry: "Good sleep, ready to push" },
      calendarState: { nextEvent: "Team meeting 10am", gapMinutes: 120 },
      aiSurface: { widget: "Deep Work: Strategy case prep", reason: "120-min gap, high energy, 3 overdue — tackling highest-priority task" }
    },
    {
      label: "Friday Depleted",
      time: "Fri 6pm",
      todoState: { active: "None", overdue: 0 },
      habitState: { completed: 2, total: 6, streak: "Slipping" },
      journalState: { lastMood: "Depleted", lastEntry: "Long week, need recovery" },
      calendarState: { nextEvent: "Free evening", gapMinutes: 240 },
      aiSurface: { widget: "Gentle Habit Nudge", reason: "Low energy, habits slipping — suggesting easiest habit with low-energy framing" }
    },
    {
      label: "Pre-DJ Gig",
      time: "Sun 7pm",
      todoState: { active: "Set prep", overdue: 1 },
      habitState: { completed: 5, total: 6, streak: "Strong" },
      journalState: { lastMood: "Focused", lastEntry: "Excited for tonight" },
      calendarState: { nextEvent: "DJ Set 10pm", gapMinutes: 180 },
      aiSurface: { widget: "Set Prep Checklist", reason: "DJ gig in 3 hours — surfacing prep checklist, not coursework" }
    }
  ];

  const [activeScenario, setActiveScenario] = useState(0);
  const scenario = scenarios[activeScenario];
  const accent = '#D4920A';

  const modules = [
    { label: "Todo", icon: "◎", value: scenario.todoState.active || "—", detail: scenario.todoState.overdue > 0 ? `${scenario.todoState.overdue} overdue` : null },
    { label: "Habits", icon: "⟳", value: `${scenario.habitState.completed}/${scenario.habitState.total}`, detail: scenario.habitState.streak },
    { label: "Journal", icon: "◐", value: scenario.journalState.lastMood, detail: scenario.journalState.lastEntry },
    { label: "Calendar", icon: "⬡", value: scenario.calendarState.nextEvent, detail: `${scenario.calendarState.gapMinutes} min gap` }
  ];

  return (
    <div style={{
      maxWidth: "56rem",
      margin: "3rem auto",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      {/* Scenario pills */}
      <div style={{
        display: "flex",
        gap: "0.5rem",
        justifyContent: "center",
        marginBottom: "2rem",
        flexWrap: "wrap"
      }}>
        {scenarios.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setActiveScenario(idx)}
            style={{
              padding: "0.35rem 0.85rem",
              borderRadius: "9999px",
              border: `1px solid ${activeScenario === idx ? `${accent}40` : "rgba(255,255,255,0.06)"}`,
              backgroundColor: activeScenario === idx ? `${accent}08` : "rgba(255,255,255,0.02)",
              color: activeScenario === idx ? accent : "#a1a1aa",
              fontSize: "0.8rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* AI recommendation — the star */}
      <div style={{
        backgroundColor: `${accent}08`,
        border: `1px solid ${accent}40`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: "1rem",
        padding: "1.5rem",
        marginBottom: "1.25rem"
      }}>
        <div style={{
          fontSize: "0.6rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: accent,
          fontFamily: "monospace",
          marginBottom: "0.5rem"
        }}>
          ◇ AI Surfaces
        </div>
        <div style={{
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "#f4f4f5",
          marginBottom: "0.75rem",
          lineHeight: 1.3
        }}>
          {scenario.aiSurface.widget}
        </div>
        <div style={{
          fontSize: "0.85rem",
          color: "#d4d4d8",
          lineHeight: 1.6,
          fontStyle: "italic"
        }}>
          {scenario.aiSurface.reason}
        </div>
      </div>

      {/* Supporting context — compact row */}
      <div style={{
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap"
      }}>
        {modules.map(mod => (
          <div
            key={mod.label}
            style={{
              flex: "1 1 0",
              minWidth: "120px",
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "0.75rem",
              padding: "0.85rem 1rem"
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              marginBottom: "0.4rem"
            }}>
              <span style={{ fontSize: "0.75rem", color: accent }}>{mod.icon}</span>
              <span style={{
                fontSize: "0.6rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#71717a",
                fontFamily: "monospace"
              }}>{mod.label}</span>
            </div>
            <div style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#f4f4f5",
              lineHeight: 1.4
            }}>
              {mod.value}
            </div>
            {mod.detail && (
              <div style={{
                fontSize: "0.75rem",
                color: "#71717a",
                marginTop: "0.25rem"
              }}>
                {mod.detail}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
