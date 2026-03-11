import { useState } from "react";

export default function FeatureKillSwitch() {
  const initialFeatures = [
    {
      id: 1,
      name: "Cross-Listener Pattern Detection",
      description: "Auto-detect when signals across different Listeners converge",
      excitement: 9,
      practicalValue: 2,
      verdict: "killed",
      reason: "Most brittle, hardest to test, least useful before core behavior is validated",
    },
    {
      id: 2,
      name: "Three-Tier Classification",
      description: "ALERT / SIGNAL / INSIGHT forced categorization",
      excitement: 5,
      practicalValue: 9,
      verdict: "shipped",
      reason: "The core behavior. Everything else depends on this working.",
    },
    {
      id: 3,
      name: "Sentiment Trending",
      description: "Track how narrative sentiment shifts over weeks",
      excitement: 7,
      practicalValue: 3,
      verdict: "killed",
      reason: "Interesting analytics, but users need to trust basic classification first",
    },
    {
      id: 4,
      name: "Learning Goal Refinement",
      description: "AI suggests improvements to your Listener's learning goal",
      excitement: 6,
      practicalValue: 7,
      verdict: "shipped",
      reason: "Directly improves output quality from the first use",
    },
    {
      id: 5,
      name: "Real-Time Alert Push",
      description: "Push notifications for ALERT-tier signals",
      excitement: 8,
      practicalValue: 3,
      verdict: "killed",
      reason: "Notifications are the disease, not the cure. Batch digest is enough.",
    },
  ];

  const [features, setFeatures] = useState(initialFeatures);

  const toggleFeature = (id) => {
    setFeatures(
      features.map((f) =>
        f.id === id ? { ...f, verdict: f.verdict === "shipped" ? "killed" : "shipped" } : f
      )
    );
  };

  const switchStyles = {
    container: {
      maxWidth: "56rem",
      margin: "3rem auto",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    title: {
      fontSize: "1.05rem",
      fontWeight: "700",
      color: "#f4f4f5",
      margin: "0 0 0.5rem 0",
      textAlign: "center",
      lineHeight: 1.3,
    },
    subtitle: {
      fontSize: "0.8rem",
      color: "#a1a1aa",
      textAlign: "center",
      marginBottom: "2rem",
      fontStyle: "italic",
      lineHeight: 1.5,
    },
    featureCard: (isKilled) => ({
      backgroundColor: "rgba(255,255,255,0.02)",
      borderRadius: "1rem",
      padding: "1.25rem 1.5rem",
      marginBottom: "0.75rem",
      display: "flex",
      gap: "1.25rem",
      alignItems: "flex-start",
      border: "1px solid rgba(255,255,255,0.06)",
      opacity: isKilled ? 0.6 : 1,
      transition: "all 0.3s ease",
    }),
    featureContent: {
      flex: 1,
    },
    featureName: (isKilled) => ({
      fontSize: "0.95rem",
      fontWeight: "700",
      color: "#f4f4f5",
      marginBottom: "0.35rem",
      textDecoration: isKilled ? "line-through" : "none",
      textDecorationColor: "#EF4444",
      textDecorationThickness: "2px",
    }),
    featureDescription: {
      fontSize: "0.8rem",
      color: "#d4d4d8",
      marginBottom: "0.75rem",
      lineHeight: 1.5,
    },
    featureReason: {
      fontSize: "0.75rem",
      color: "#a1a1aa",
      fontStyle: "italic",
    },
    barContainer: {
      width: "100px",
      flexShrink: 0,
    },
    barLabel: {
      fontSize: "0.65rem",
      fontWeight: "600",
      color: "#a1a1aa",
      marginBottom: "0.4rem",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      fontFamily: "monospace",
    },
    barRow: {
      marginBottom: "0.75rem",
    },
    barRowLabel: {
      fontSize: "0.7rem",
      color: "#71717a",
      marginBottom: "0.25rem",
    },
    bar: (value, color) => ({
      height: "4px",
      backgroundColor: color,
      borderRadius: "2px",
      width: `${value * 9}px`,
      minWidth: `${value * 9}px`,
      opacity: 0.8,
    }),
    switchContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.5rem",
      flexShrink: 0,
    },
    toggle: (isShipped) => ({
      width: "48px",
      height: "24px",
      backgroundColor: isShipped ? "#3EAE7C" : "#EF4444",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      position: "relative",
      transition: "all 0.3s ease",
    }),
    toggleDot: (isShipped) => ({
      position: "absolute",
      top: "2px",
      left: isShipped ? "26px" : "2px",
      width: "20px",
      height: "20px",
      backgroundColor: "white",
      borderRadius: "10px",
      transition: "left 0.3s ease",
    }),
    verdictLabel: (verdict) => ({
      fontSize: "0.65rem",
      fontWeight: "700",
      color: verdict === "shipped" ? "#3EAE7C" : "#EF4444",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      fontFamily: "monospace",
    }),
  };

  return (
    <div style={switchStyles.container}>
      <h3 style={switchStyles.title}>Feature Kill Switch</h3>
      <p style={switchStyles.subtitle}>
        Most exciting ≠ Most valuable. Flip each switch to see which features made the cut.
      </p>

      {features.map((feature) => {
        const isKilled = feature.verdict === "killed";

        return (
          <div key={feature.id} style={switchStyles.featureCard(isKilled)}>
            <div style={switchStyles.featureContent}>
              <div style={switchStyles.featureName(isKilled)}>{feature.name}</div>
              <div style={switchStyles.featureDescription}>{feature.description}</div>
              <div style={switchStyles.featureReason}>{feature.reason}</div>
            </div>

            <div style={switchStyles.barContainer}>
              <div style={switchStyles.barLabel}>Excitement</div>
              <div style={switchStyles.barRow}>
                <div style={switchStyles.barRowLabel}>{feature.excitement}/10</div>
                <div style={switchStyles.bar(feature.excitement, "#EF4444")} />
              </div>

              <div style={{ ...switchStyles.barLabel, marginTop: "0.75rem" }}>
                Practical
              </div>
              <div style={switchStyles.barRow}>
                <div style={switchStyles.barRowLabel}>{feature.practicalValue}/10</div>
                <div style={switchStyles.bar(feature.practicalValue, "#3EAE7C")} />
              </div>
            </div>

            <div style={switchStyles.switchContainer}>
              <button
                style={switchStyles.toggle(feature.verdict === "shipped")}
                onClick={() => toggleFeature(feature.id)}
                title={feature.verdict === "shipped" ? "Kill this feature" : "Ship this feature"}
              >
                <div style={switchStyles.toggleDot(feature.verdict === "shipped")} />
              </button>
              <div style={switchStyles.verdictLabel(feature.verdict)}>
                {feature.verdict}
              </div>
            </div>
          </div>
        );
      })}

      <div style={{ marginTop: "2rem", padding: "1.25rem 1.5rem", backgroundColor: "rgba(255,255,255,0.02)", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
        <p style={{ fontSize: "0.8rem", color: "#a1a1aa", margin: "0", lineHeight: 1.6 }}>
          <strong style={{ color: "#f4f4f5" }}>The pattern:</strong> The three most exciting ideas (9, 8, 7) all got killed. The two shipped features scored 9 and 5 on practical value. Excitement is a terrible signal for what matters.
        </p>
      </div>
    </div>
  );
}
