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
      maxWidth: "700px",
      margin: "40px auto",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    title: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#1f2937",
      margin: "0 0 30px 0",
      textAlign: "center",
    },
    tiersContainer: {
      marginBottom: "40px",
    },
    tierCard: (color) => ({
      marginBottom: "16px",
      borderLeft: `6px solid ${color}`,
      backgroundColor: "white",
      borderRadius: "6px",
      padding: "20px",
      border: `1px solid #e5e7eb`,
      borderLeftWidth: "6px",
    }),
    tierHeader: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "12px",
    },
    tierIcon: {
      fontSize: "20px",
    },
    tierName: (color) => ({
      fontSize: "16px",
      fontWeight: "700",
      color: color,
      flex: 1,
    }),
    tierAnalogy: {
      fontSize: "12px",
      color: "#6b7280",
      fontStyle: "italic",
      marginBottom: "8px",
    },
    tierDescription: {
      fontSize: "14px",
      color: "#374151",
      lineHeight: "1.6",
    },
    classifySection: {
      marginTop: "40px",
      paddingTop: "30px",
      borderTop: "2px solid #e5e7eb",
    },
    classifyTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "20px",
    },
    contentCard: {
      backgroundColor: "#f9fafb",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "20px",
    },
    contentText: {
      fontSize: "14px",
      color: "#374151",
      marginBottom: "16px",
      fontWeight: "500",
      lineHeight: "1.6",
    },
    buttonGroup: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    },
    classifyButton: (isSelected, color) => ({
      padding: "10px 16px",
      border: `2px solid ${color}`,
      backgroundColor: isSelected ? color : "transparent",
      color: isSelected ? "white" : color,
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "600",
      transition: "all 0.2s ease",
    }),
    feedbackMessage: (correct) => ({
      marginTop: "16px",
      padding: "16px",
      borderRadius: "6px",
      backgroundColor: correct ? "#ecfdf5" : "#fef2f2",
      borderLeft: `4px solid ${correct ? "#10b981" : "#ef4444"}`,
      fontSize: "13px",
      color: correct ? "#065f46" : "#7f1d1d",
    }),
    feedbackTitle: {
      fontWeight: "600",
      marginBottom: "6px",
    },
    feedbackExplanation: {
      fontSize: "13px",
      lineHeight: "1.5",
      marginTop: "8px",
    },
    clearButton: {
      marginTop: "12px",
      padding: "6px 12px",
      backgroundColor: "transparent",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
      fontSize: "12px",
      color: "#6b7280",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
  };

  return (
    <div style={demoStyles.container}>
      <h3 style={demoStyles.title}>Signal Tier System</h3>

      {/* Tier Definitions */}
      <div style={demoStyles.tiersContainer}>
        {tiers.map((tier, idx) => {
          const tierIcons = { ALERT: "🔴", SIGNAL: "🌤️", INSIGHT: "🧭" };
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
                <div
                  style={demoStyles.feedbackMessage(feedback.correct)}
                >
                  <div style={demoStyles.feedbackTitle}>
                    {feedback.correct ? "✓ Correct!" : "Not quite."}
                  </div>
                  <div style={demoStyles.feedbackExplanation}>
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
