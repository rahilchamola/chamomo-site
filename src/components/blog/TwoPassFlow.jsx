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
    pipelineContainer: {
      backgroundColor: "#f9fafb",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "30px",
      marginBottom: "30px",
    },
    inputCard: {
      backgroundColor: "white",
      border: "2px solid #9ca3af",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "20px",
      fontSize: "14px",
      color: "#374151",
    },
    passContainer: {
      marginBottom: "20px",
    },
    passHeader: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "12px",
      fontSize: "13px",
      fontWeight: "600",
      color: "#6b7280",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    passIcon: {
      fontSize: "18px",
    },
    passLabel: (color) => ({
      display: "inline-block",
      backgroundColor: color,
      color: "white",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "11px",
      fontWeight: "600",
    }),
    passZone: (color) => ({
      backgroundColor: color,
      opacity: 0.08,
      borderLeft: `4px solid ${color}`,
      borderRadius: "6px",
      padding: "16px",
      marginBottom: "16px",
    }),
    passOutput: {
      fontSize: "14px",
      color: "#374151",
      lineHeight: "1.6",
    },
    outputCard: {
      backgroundColor: "white",
      border: `3px solid ${classificationColor}`,
      borderRadius: "8px",
      padding: "20px",
      marginTop: "20px",
    },
    classificationLabel: {
      fontSize: "12px",
      fontWeight: "700",
      color: classificationColor,
      marginBottom: "8px",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    classificationValue: {
      fontSize: "24px",
      fontWeight: "700",
      color: classificationColor,
      marginBottom: "12px",
    },
    reason: {
      fontSize: "13px",
      color: "#6b7280",
      fontStyle: "italic",
      borderTop: `1px solid ${classificationColor}`,
      paddingTop: "12px",
      marginTop: "12px",
    },
    controls: {
      textAlign: "center",
    },
    button: {
      backgroundColor: "#3EAE7C",
      color: "white",
      border: "none",
      padding: "12px 24px",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    counter: {
      fontSize: "12px",
      color: "#9ca3af",
      marginTop: "12px",
    },
  };

  return (
    <div style={flowStyles.container}>
      <h3 style={flowStyles.title}>Two-Pass Flow</h3>

      <div style={flowStyles.pipelineContainer}>
        {/* Input */}
        <div style={flowStyles.inputCard}>
          <strong>Raw Web Data:</strong> {current.input}
        </div>

        {/* Pass 1 */}
        <div style={flowStyles.passContainer}>
          <div style={flowStyles.passHeader}>
            <span style={flowStyles.passIcon}>📡</span>
            <span style={flowStyles.passLabel("#0ea5e9")}>RETRIEVAL</span>
          </div>
          <div style={flowStyles.passZone("#0ea5e9")}>
            <div style={flowStyles.passOutput}>{current.passOneOutput}</div>
          </div>
        </div>

        {/* Arrow */}
        <div style={{ textAlign: "center", color: "#9ca3af", marginBottom: "16px", fontSize: "18px" }}>
          ↓
        </div>

        {/* Pass 2 */}
        <div style={flowStyles.passContainer}>
          <div style={flowStyles.passHeader}>
            <span style={flowStyles.passIcon}>🧠</span>
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
