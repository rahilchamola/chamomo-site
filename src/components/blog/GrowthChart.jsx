import { useState } from "react";

const METRICS = [
  { key: "loc", label: "Lines of Code", color: "#818cf8", format: (v) => v >= 1000 ? `${(v/1000).toFixed(0)}K` : v },
  { key: "files", label: "Files", color: "#a78bfa", format: (v) => v },
  { key: "effectTypes", label: "Effects", color: "#ec4899", format: (v) => v },
  { key: "messageTypes", label: "Messages", color: "#f59e0b", format: (v) => v },
  { key: "worlds", label: "Worlds", color: "#34d399", format: (v) => v },
];

export default function GrowthChart({ data }) {
  const [activeMetric, setActiveMetric] = useState("loc");
  const metric = METRICS.find((m) => m.key === activeMetric);
  const maxVal = Math.max(...data.map((d) => d[activeMetric]));
  const chartHeight = 200;

  return (
    <div style={{ maxWidth: "56rem", margin: "3rem auto" }}>
      {/* Metric selector */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
        {METRICS.map((m) => {
          const isActive = activeMetric === m.key;
          return (
            <button
              key={m.key}
              onClick={() => setActiveMetric(m.key)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontFamily: "monospace",
                fontWeight: isActive ? "600" : "400",
                cursor: "pointer",
                border: "none",
                backgroundColor: isActive ? `${m.color}20` : "rgba(255,255,255,0.03)",
                color: isActive ? m.color : "#71717a",
                transition: "all 0.2s ease",
              }}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Chart container */}
      <div style={{
        borderRadius: "1rem",
        border: "1px solid rgba(255,255,255,0.06)",
        backgroundColor: "rgba(255,255,255,0.02)",
        padding: "1.5rem",
      }}>
        {/* Y-axis label */}
        <div style={{ fontSize: "0.7rem", fontFamily: "monospace", color: metric.color, marginBottom: "1rem", fontWeight: "600" }}>
          {metric.label}
        </div>

        {/* Bars with CSS grid for even spacing */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${data.length}, 1fr)`,
          gap: "0.5rem",
          alignItems: "end",
          height: `${chartHeight}px`,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          paddingBottom: "0.5rem",
        }}>
          {data.map((d, i) => {
            const val = d[activeMetric];
            const pct = maxVal > 0 ? (val / maxVal) * 100 : 0;
            return (
              <div key={d.version} style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
                {/* Value label */}
                <span style={{
                  fontSize: "0.7rem",
                  fontFamily: "monospace",
                  fontWeight: "700",
                  color: metric.color,
                  marginBottom: "0.35rem",
                }}>
                  {metric.format(val)}
                </span>
                {/* Bar */}
                <div style={{
                  width: "100%",
                  maxWidth: "3rem",
                  height: `${Math.max(pct, 2)}%`,
                  borderRadius: "0.375rem 0.375rem 0.125rem 0.125rem",
                  background: `linear-gradient(180deg, ${metric.color} 0%, ${metric.color}60 100%)`,
                  opacity: 0.8,
                  transition: "height 0.5s ease, background 0.3s ease",
                  position: "relative",
                }} />
              </div>
            );
          })}
        </div>

        {/* X-axis labels */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${data.length}, 1fr)`,
          gap: "0.5rem",
          marginTop: "0.5rem",
        }}>
          {data.map((d) => (
            <div key={d.version} style={{ textAlign: "center" }}>
              <span style={{ fontSize: "0.7rem", fontFamily: "monospace", color: "#71717a" }}>
                {d.version}
              </span>
            </div>
          ))}
        </div>

        {/* Summary stat */}
        <div style={{
          marginTop: "1.25rem",
          paddingTop: "1rem",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}>
          <span style={{ fontSize: "0.75rem", color: "#71717a", fontFamily: "monospace" }}>
            Day 1 → Day 8
          </span>
          <span style={{ fontSize: "0.85rem", color: metric.color, fontWeight: "700", fontFamily: "monospace" }}>
            {metric.format(data[0]?.[activeMetric])} → {metric.format(data[data.length - 1]?.[activeMetric])}
          </span>
        </div>
      </div>
    </div>
  );
}
