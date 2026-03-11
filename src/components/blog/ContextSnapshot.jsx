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

  const moduleStyle = {
    background: 'linear-gradient(135deg, rgba(212, 146, 10, 0.08) 0%, rgba(212, 146, 10, 0.02) 100%)',
    border: '1px solid rgba(212, 146, 10, 0.2)',
    borderRadius: '8px',
    padding: '1.5rem',
    flex: 1
  };

  const labelStyle = {
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#D4920A',
    marginBottom: '0.75rem'
  };

  const contentStyle = {
    fontSize: '0.95rem',
    color: '#e0e0e0',
    lineHeight: 1.5,
    margin: 0
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Scenario selector */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        justifyContent: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {scenarios.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setActiveScenario(idx)}
            style={{
              background: activeScenario === idx ? '#D4920A' : '#2a2a2a',
              color: activeScenario === idx ? '#000' : '#999',
              border: activeScenario === idx ? '2px solid #D4920A' : '2px solid #404040',
              padding: '0.6rem 1.2rem',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (activeScenario !== idx) {
                e.target.style.borderColor = '#D4920A';
                e.target.style.color = '#D4920A';
              }
            }}
            onMouseLeave={(e) => {
              if (activeScenario !== idx) {
                e.target.style.borderColor = '#404040';
                e.target.style.color = '#999';
              }
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Time display */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '0.85rem',
        color: '#888'
      }}>
        {scenario.time}
      </div>

      {/* 2x2 Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Todo Module */}
        <div style={moduleStyle}>
          <div style={labelStyle}>📝 Todo</div>
          <p style={contentStyle}>
            <strong>{scenario.todoState.active || '—'}</strong>
          </p>
          {scenario.todoState.overdue > 0 && (
            <p style={{ ...contentStyle, color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              {scenario.todoState.overdue} overdue
            </p>
          )}
        </div>

        {/* Habits Module */}
        <div style={moduleStyle}>
          <div style={labelStyle}>↻ Habits</div>
          <p style={contentStyle}>
            {scenario.habitState.completed} / {scenario.habitState.total} completed
          </p>
          <p style={{
            ...contentStyle,
            fontSize: '0.85rem',
            color: scenario.habitState.streak === 'Strong' ? '#4ade80' : '#ff9500',
            marginTop: '0.5rem'
          }}>
            Streak: {scenario.habitState.streak}
          </p>
        </div>

        {/* Journal Module */}
        <div style={moduleStyle}>
          <div style={labelStyle}>✎ Journal</div>
          <p style={{ ...contentStyle, fontSize: '0.9rem' }}>
            <strong>{scenario.journalState.lastMood}</strong>
          </p>
          <p style={{ ...contentStyle, fontSize: '0.85rem', color: '#999', marginTop: '0.5rem' }}>
            "{scenario.journalState.lastEntry}"
          </p>
        </div>

        {/* Calendar Module */}
        <div style={moduleStyle}>
          <div style={labelStyle}>◷ Calendar</div>
          <p style={contentStyle}>
            <strong>{scenario.calendarState.nextEvent}</strong>
          </p>
          <p style={{ ...contentStyle, fontSize: '0.85rem', color: '#999', marginTop: '0.5rem' }}>
            {scenario.calendarState.gapMinutes} min gap
          </p>
        </div>
      </div>

      {/* AI Surface Panel */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(212, 146, 10, 0.15) 0%, rgba(212, 146, 10, 0.05) 100%)',
        border: '2px solid #D4920A',
        borderRadius: '8px',
        padding: '2rem',
        textAlign: 'center',
        animation: 'pulse 2s ease-in-out infinite',
        animationKeyframes: `
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.85; }
          }
        `
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: '#D4920A',
            marginBottom: '0.75rem'
          }}>
            🎯 Surfaced to User
          </div>
          <p style={{
            margin: 0,
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#D4920A',
            marginBottom: '1rem'
          }}>
            {scenario.aiSurface.widget}
          </p>
        </div>
        <p style={{
          margin: 0,
          fontSize: '0.9rem',
          color: '#bbb',
          lineHeight: 1.6

        }}>
          {scenario.aiSurface.reason}
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}
