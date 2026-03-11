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

  const moduleStyle = {
    background: `${accent}08`,
    border: `1px solid ${accent}40`,
    borderRadius: '1rem',
    padding: '1.25rem 1.5rem',
    flex: 1
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap'
      }}>
        {scenarios.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setActiveScenario(idx)}
            style={{
              background: activeScenario === idx ? accent : 'rgba(255,255,255,0.02)',
              color: activeScenario === idx ? '#000' : '#a1a1aa',
              border: activeScenario === idx ? `1px solid ${accent}40` : '1px solid rgba(255,255,255,0.06)',
              padding: '0.4rem 1rem',
              borderRadius: '1rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div style={{
        textAlign: 'center',
        marginBottom: '1.5rem',
        fontSize: '0.8rem',
        color: '#a1a1aa'
      }}>
        {scenario.time}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        <div style={moduleStyle}>
          <div style={{
            fontSize: '0.65rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: accent,
            marginBottom: '0.5rem'
          }}>
            📝 Todo
          </div>
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            color: '#f4f4f5',
            fontWeight: 500,
            lineHeight: 1.4
          }}>
            {scenario.todoState.active || '—'}
          </p>
          {scenario.todoState.overdue > 0 && (
            <p style={{
              margin: '0.5rem 0 0 0',
              fontSize: '0.8rem',
              color: '#a1a1aa'
            }}>
              {scenario.todoState.overdue} overdue
            </p>
          )}
        </div>

        <div style={moduleStyle}>
          <div style={{
            fontSize: '0.65rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: accent,
            marginBottom: '0.5rem'
          }}>
            ↻ Habits
          </div>
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            color: '#f4f4f5',
            fontWeight: 500,
            lineHeight: 1.4
          }}>
            {scenario.habitState.completed}/{scenario.habitState.total}
          </p>
          <p style={{
            margin: '0.5rem 0 0 0',
            fontSize: '0.8rem',
            color: '#a1a1aa'
          }}>
            {scenario.habitState.streak}
          </p>
        </div>

        <div style={moduleStyle}>
          <div style={{
            fontSize: '0.65rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: accent,
            marginBottom: '0.5rem'
          }}>
            ✎ Journal
          </div>
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            color: '#f4f4f5',
            fontWeight: 500,
            lineHeight: 1.4
          }}>
            {scenario.journalState.lastMood}
          </p>
          <p style={{
            margin: '0.5rem 0 0 0',
            fontSize: '0.8rem',
            color: '#a1a1aa',
            fontStyle: 'italic'
          }}>
            "{scenario.journalState.lastEntry}"
          </p>
        </div>

        <div style={moduleStyle}>
          <div style={{
            fontSize: '0.65rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: accent,
            marginBottom: '0.5rem'
          }}>
            ◷ Calendar
          </div>
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            color: '#f4f4f5',
            fontWeight: 500,
            lineHeight: 1.4
          }}>
            {scenario.calendarState.nextEvent}
          </p>
          <p style={{
            margin: '0.5rem 0 0 0',
            fontSize: '0.8rem',
            color: '#a1a1aa'
          }}>
            {scenario.calendarState.gapMinutes} min gap
          </p>
        </div>
      </div>

      <div style={{
        background: `${accent}08`,
        border: `1px solid ${accent}40`,
        borderLeft: `3px solid ${accent}50`,
        borderRadius: '1rem',
        padding: '1.5rem',
        textAlign: 'left'
      }}>
        <div style={{
          fontSize: '0.65rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: accent,
          marginBottom: '0.75rem'
        }}>
          🎯 Surfaced to User
        </div>
        <p style={{
          margin: 0,
          fontSize: '1rem',
          fontWeight: 700,
          color: '#f4f4f5',
          marginBottom: '0.75rem'
        }}>
          {scenario.aiSurface.widget}
        </p>
        <p style={{
          margin: 0,
          fontSize: '0.85rem',
          color: '#d4d4d8',
          lineHeight: 1.6,
          fontStyle: 'italic'
        }}>
          {scenario.aiSurface.reason}
        </p>
      </div>
    </div>
  );
}
