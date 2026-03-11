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
      maxWidth: "800px",
      margin: "40px auto",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    title: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#1f2937",
      margin: "0 0 10px 0",
      textAlign: "center",
    },
    subtitle: {
      fontSize: "13px",
      color: "#6b7280",
      textAlign: "center",
      marginBottom: "30px",
      fontStyle: "italic",
    },
    featureCard: (isKilled) => ({
      backgroundColor: "#1f2937",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "16px",
      display: "flex",
      gap: "20px",
      alignItems: "flex-start",
      border: "1px solid #374151",
      opacity: isKilled ? 0.7 : 1,
      transition: "all 0.2s ease",
    }),
    featureContent: {
      flex: 1,
    },
    featureName: (isKilled) => ({
      fontSize: "15px",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "6px",
      textDecoration: isKilled ? "line-through" : "none",
      textDecorationColor: "#ef4444",
      textDecorationThickness: "2px",
    }),
    featureDescription: {
      fontSize: "13px",
      color: "#d1d5db",
      marginBottom: "12px",
      lineHeight: "1.5",
    },
    featureReason: {
      fontSize: "12px",
      color: "#9ca3af",
      fontStyle: "italic",
    },
    barContainer: {
      width: "120px",
      flexShrink: 0,
    },
    barLabel: {
      fontSize: "11px",
      fontWeight: "600",
      color: "#9ca3af",
      marginBottom: "6px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    barRow: {
      marginBottom: "12px",
    },
    barRowLabel: {
      fontSize: "10px",
      color: "#6b7280",
      marginBottom: "4px",
    },
    bar: (value, color) => ({
      height: "6px",
      backgroundColor: color,
      borderRadius: "3px",
      width: `${value * 12}px`,
      minWidth: `${value * 12}px`,
      opacity: 0.8,
    }),
    switchContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
      flexShrink: 0,
    },
    toggle: (isShipped) => ({
      width: "56px",
      height: "28px",
      backgroundColor: isShipped ? "#3EAE7C" : "#EF4444",
      border: "none",
      borderRadius: "14px",
      cursor: "pointer",
      position: "relative",
      transition: "all 0.3s ease",
      boxShadow: `0 2px 8px ${isShipped ? 'rgba(62, 174, 124, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
    }),
    toggleDot: (isShipped) => ({
      position: "absolute",
      top: "2px",
      left: isShipped ? "30px" : "2px",
      width: "24px",
      height: "24px",
      backgroundColor: "white",
      borderRadius: "12px",
      transition: "left 0.3s ease",
    }),
    verdictLabel: (verdict) => ({
      fontSize: "11px",
      fontWeight: "700",
      color: verdict === "shipped" ? "#10b981" : "#ef4444",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
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

              <div style={{ ...switchStyles.barLabel, marginTop: "12px" }}>
                Practical
              </div>
              <div style={switchStyles.barRow}>
                <div style={switchStyles.barRowLabel}>{feature.practicalValue}/10</div>
                <div style={switchStyles.bar(feature.practicalValue, "#10b981")} />
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

      <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#f9fafb", borderRadius: "8px", textAlign: "center" }}>
        <p style={{ fontSize: "13px", color: "#6b7280", margin: "0", lineHeight: "1.6" }}>
          <strong>The pattern:</strong> The three most exciting ideas (9, 8, 7) all got killed. The two shipped features scored 9 and 5 on practical value. Excitement is a terrible signal for what matters.
        </p>
      </div>
    </div>
  );
}
