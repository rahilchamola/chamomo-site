import { useState } from "react";

export default function TwoPassFlow() {
  const [currentExample, setCurrentExample] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const examples = [
    {
      input: "RBI releases new digital lending guidelines",
      passOneOutput: "RBI circular: mandatory cooling-off period for digital loans, new disclosure requirements",
      classification: "ALERT",
      reason: "Direct regulatory action affecting credit product design — requires immediate review",
    },
    {
      input: "Fintech startup raises Series B for BNPL product",
      passOneOutput: "Company X raised $40M Series B for BNPL expansion in tier-2 cities",
      classification: "SIGNAL",
      reason: "Market movement in BNPL space — worth tracking but no immediate action required",
    },
    {
      input: "Three major banks report declining digital loan defaults",
      passOneOutput: "SBI, HDFC, ICICI Q3 reports show 15-20% decline in digital loan NPAs",
      classification: "INSIGHT",
      reason: "Pattern across institutions suggests digital lending risk models are maturing",
    },
  ];

  const current = examples[currentExample];

  const classificationColor = {
    ALERT: "#EF4444",
    SIGNAL: "#F59E0B",
    INSIGHT: "#3EAE7C",
  }[current.classification];

  const handleRunAnother = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentExample((prev) => (prev + 1) % examples.length);
      setIsAnimating(false);
    }, 300);
  };

  const flowStyles = {
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
    pipelineContainer: {
      backgroundColor: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "1rem",
      padding: "1.5rem",
      marginBottom: "2rem",
    },
    inputCard: {
      backgroundColor: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "0.5rem",
      padding: "1rem",
      marginBottom: "1rem",
      fontSize: "0.85rem",
      color: "#d4d4d8",
      lineHeight: 1.6,
    },
    passContainer: {
      marginBottom: "1rem",
    },
    passHeader: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "0.75rem",
      fontSize: "0.7rem",
      fontWeight: "600",
      color: "#a1a1aa",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      fontFamily: "monospace",
    },
    passIcon: {
      fontSize: "1rem",
    },
    passLabel: (color) => ({
      display: "inline-block",
      backgroundColor: color,
      color: "white",
      padding: "0.3rem 0.5rem",
      borderRadius: "0.25rem",
      fontSize: "0.65rem",
      fontWeight: "600",
    }),
    passZone: (color) => ({
      backgroundColor: `${color}10`,
      borderLeft: `3px solid ${color}50`,
      borderRadius: "0.5rem",
      padding: "1rem",
      marginBottom: "1rem",
    }),
    passOutput: {
      fontSize: "0.85rem",
      color: "#d4d4d8",
      lineHeight: 1.6,
    },
    outputCard: {
      backgroundColor: "rgba(255,255,255,0.02)",
      border: `1px solid ${classificationColor}40`,
      borderRadius: "0.5rem",
      padding: "1.25rem 1.5rem",
      marginTop: "1rem",
    },
    classificationLabel: {
      fontSize: "0.7rem",
      fontWeight: "700",
      color: classificationColor,
      marginBottom: "0.5rem",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      fontFamily: "monospace",
    },
    classificationValue: {
      fontSize: "1.25rem",
      fontWeight: "700",
      color: classificationColor,
      marginBottom: "0.75rem",
    },
    reason: {
      fontSize: "0.8rem",
      color: "#a1a1aa",
      fontStyle: "italic",
      borderTop: `1px solid ${classificationColor}40`,
      paddingTop: "0.75rem",
      marginTop: "0.75rem",
      lineHeight: 1.5,
    },
    controls: {
      textAlign: "center",
    },
    button: {
      backgroundColor: "#3EAE7C",
      color: "white",
      border: "none",
      padding: "0.75rem 1.5rem",
      borderRadius: "0.5rem",
      fontSize: "0.85rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    counter: {
      fontSize: "0.75rem",
      color: "#71717a",
      marginTop: "0.75rem",
    },
  };

  return (
    <div style={flowStyles.container}>
      <h3 style={flowStyles.title}>Two-Pass Flow</h3>

      <div style={flowStyles.pipelineContainer}>
        {/* Input */}
        <div style={flowStyles.inputCard}>
          <strong style={{ color: "#f4f4f5" }}>Raw Web Data:</strong> {current.input}
        </div>

        {/* Pass 1 */}
        <div style={flowStyles.passContainer}>
          <div style={flowStyles.passHeader}>
            <span style={flowStyles.passIcon}>◈</span>
            <span style={flowStyles.passLabel("#3EAE7C")}>RETRIEVAL</span>
          </div>
          <div style={flowStyles.passZone("#3EAE7C")}>
            <div style={flowStyles.passOutput}>{current.passOneOutput}</div>
          </div>
        </div>

        {/* Arrow */}
        <div style={{ textAlign: "center", color: "#52525b", marginBottom: "1rem", fontSize: "1rem" }}>
          ↓
        </div>

        {/* Pass 2 */}
        <div style={flowStyles.passContainer}>
          <div style={flowStyles.passHeader}>
            <span style={flowStyles.passIcon}>◉</span>
            <span style={flowStyles.passLabel("#3EAE7C")}>CLASSIFICATION</span>
          </div>
          <div style={flowStyles.passZone("#3EAE7C")}>
            <div style={flowStyles.passOutput}>
              Categorize into one of three tiers: ALERT, SIGNAL, or INSIGHT
            </div>
          </div>
        </div>

        {/* Output */}
        <div
          style={{
            ...flowStyles.outputCard,
            opacity: isAnimating ? 0.5 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <div style={flowStyles.classificationLabel}>Classification Result</div>
          <div style={flowStyles.classificationValue}>{current.classification}</div>
          <div style={flowStyles.reason}>
            <strong>Why:</strong> {current.reason}
          </div>
        </div>
      </div>

      <div style={flowStyles.controls}>
        <button
          style={{
            ...flowStyles.button,
            opacity: isAnimating ? 0.7 : 1,
            cursor: isAnimating ? "not-allowed" : "pointer",
          }}
          onClick={handleRunAnother}
          disabled={isAnimating}
        >
          Run Another
        </button>
        <div style={flowStyles.counter}>
          Example {currentExample + 1} of {examples.length}
        </div>
      </div>
    </div>
  );
}
