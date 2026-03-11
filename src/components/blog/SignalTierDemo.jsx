import { useState } from "react";

export default function SignalTierDemo() {
  const [selectedTier, setSelectedTier] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const tiers = [
    {
      name: "ALERT",
      analogy: "Fire alarm",
      description: "Stop what you're doing. This changes something.",
      color: "#EF4444",
    },
    {
      name: "SIGNAL",
      analogy: "Weather forecast",
      description: "Note this. It's building toward something.",
      color: "#F59E0B",
    },
    {
      name: "INSIGHT",
      analogy: "Climate model",
      description: "The pattern is visible now. Here's what it means.",
      color: "#3EAE7C",
    },
  ];

  const sampleItems = [
    {
      content: "New RBI circular mandates 48-hour cooling period on all digital loans",
      correctTier: "ALERT",
      explanation: "Direct regulation with immediate compliance deadline = ALERT",
    },
    {
      content: "Third BNPL company this month announces tier-2 expansion",
      correctTier: "SIGNAL",
      explanation: "Repeated market movement in same direction = SIGNAL, not yet actionable",
    },
    {
      content: "Digital loan default rates declining across ALL major banks simultaneously",
      correctTier: "INSIGHT",
      explanation: "Cross-institution pattern reveals systemic shift in risk model maturity",
    },
  ];

  const handleClassify = (contentIdx, selectedTierName) => {
    const correct = sampleItems[contentIdx].correctTier === selectedTierName;
    setFeedback({
      contentIdx,
      selectedTier: selectedTierName,
      correct,
      explanation: sampleItems[contentIdx].explanation,
    });
  };

  const clearFeedback = () => {
    setFeedback(null);
  };

  const demoStyles = {
    container: {
      maxWidth: "56rem",
      margin: "3rem auto",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    title: {
      fontSize: "1.05rem",
      fontWeight: "700",
      color: "#f4f4f5",
      margin: "0 0 2rem 0",
      textAlign: "center",
      lineHeight: 1.3,
    },
    tiersContainer: {
      marginBottom: "2rem",
    },
    tierCard: (color) => ({
      marginBottom: "0.75rem",
      borderLeft: `3px solid ${color}50`,
      backgroundColor: "rgba(255,255,255,0.02)",
      borderRadius: "1rem",
      padding: "1.25rem 1.5rem",
      border: `1px solid rgba(255,255,255,0.06)`,
      borderLeftWidth: "3px",
    }),
    tierHeader: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "0.75rem",
    },
    tierIcon: {
      fontSize: "1.25rem",
    },
    tierName: (color) => ({
      fontSize: "1rem",
      fontWeight: "700",
      color: color,
      flex: 1,
    }),
    tierAnalogy: {
      fontSize: "0.75rem",
      color: "#a1a1aa",
      fontStyle: "italic",
      marginBottom: "0.5rem",
    },
    tierDescription: {
      fontSize: "0.85rem",
      color: "#d4d4d8",
      lineHeight: 1.6,
    },
    classifySection: {
      marginTop: "2rem",
      paddingTop: "1.5rem",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    },
    classifyTitle: {
      fontSize: "0.95rem",
      fontWeight: "700",
      color: "#f4f4f5",
      marginBottom: "1.25rem",
      lineHeight: 1.3,
    },
    contentCard: {
      backgroundColor: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "1rem",
      padding: "1.25rem 1.5rem",
      marginBottom: "1.25rem",
    },
    contentText: {
      fontSize: "0.85rem",
      color: "#d4d4d8",
      marginBottom: "1rem",
      fontWeight: "500",
      lineHeight: 1.6,
    },
    buttonGroup: {
      display: "flex",
      gap: "0.5rem",
      flexWrap: "wrap",
    },
    classifyButton: (isSelected, color) => ({
      padding: "0.5rem 1rem",
      border: `1px solid ${isSelected ? color : "rgba(255,255,255,0.06)"}`,
      backgroundColor: isSelected ? `${color}20` : "rgba(255,255,255,0.02)",
      color: isSelected ? color : "#d4d4d8",
      borderRadius: "0.5rem",
      cursor: "pointer",
      fontSize: "0.75rem",
      fontWeight: "600",
      transition: "all 0.3s ease",
    }),
    feedbackMessage: (correct) => ({
      marginTop: "1rem",
      padding: "1rem",
      borderRadius: "0.5rem",
      backgroundColor: correct ? "#3EAE7C10" : "#EF444410",
      borderLeft: `3px solid ${correct ? "#3EAE7C50" : "#EF444450"}`,
      fontSize: "0.8rem",
      color: correct ? "#3EAE7C" : "#EF4444",
    }),
    feedbackTitle: {
      fontWeight: "600",
      marginBottom: "0.35rem",
    },
    feedbackExplanation: {
      fontSize: "0.8rem",
      lineHeight: 1.5,
      marginTop: "0.5rem",
    },
    clearButton: {
      marginTop: "0.75rem",
      padding: "0.4rem 0.8rem",
      backgroundColor: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "0.4rem",
      fontSize: "0.75rem",
      color: "#a1a1aa",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
  };

  return (
    <div style={demoStyles.container}>
      <h3 style={demoStyles.title}>Signal Tier System</h3>

      {/* Tier Definitions */}
      <div style={demoStyles.tiersContainer}>
        {tiers.map((tier, idx) => {
          const tierIcons = { ALERT: "◉", SIGNAL: "◈", INSIGHT: "◇" };
          return (
            <div key={idx} style={demoStyles.tierCard(tier.color)}>
              <div style={demoStyles.tierHeader}>
                <span style={demoStyles.tierIcon}>{tierIcons[tier.name]}</span>
                <span style={demoStyles.tierName(tier.color)}>{tier.name}</span>
              </div>
              <div style={demoStyles.tierAnalogy}>Analogy: {tier.analogy}</div>
              <div style={demoStyles.tierDescription}>{tier.description}</div>
            </div>
          );
        })}
      </div>

      {/* Classification Exercise */}
      <div style={demoStyles.classifySection}>
        <div style={demoStyles.classifyTitle}>Try Classifying These</div>

        {sampleItems.map((item, contentIdx) => (
          <div key={contentIdx} style={demoStyles.contentCard}>
            <div style={demoStyles.contentText}>"{item.content}"</div>
            <div style={demoStyles.buttonGroup}>
              {tiers.map((tier) => (
                <button
                  key={tier.name}
                  style={demoStyles.classifyButton(
                    feedback?.contentIdx === contentIdx && feedback?.selectedTier === tier.name,
                    tier.color
                  )}
                  onClick={() => handleClassify(contentIdx, tier.name)}
                  disabled={feedback?.contentIdx === contentIdx}
                >
                  {tier.name}
                </button>
              ))}
            </div>

            {feedback?.contentIdx === contentIdx && (
              <div>
                <div style={demoStyles.feedbackMessage(feedback.correct)}>
                  <div style={{...demoStyles.feedbackTitle, color: feedback.correct ? "#3EAE7C" : "#EF4444"}}>
                    {feedback.correct ? "✓ Correct!" : "Not quite."}
                  </div>
                  <div style={{...demoStyles.feedbackExplanation, color: "#a1a1aa"}}>
                    {!feedback.correct && `This is actually a ${item.correctTier}. `}
                    {feedback.explanation}
                  </div>
                </div>
                <button
                  style={demoStyles.clearButton}
                  onClick={clearFeedback}
                >
                  Clear & Try Another
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
