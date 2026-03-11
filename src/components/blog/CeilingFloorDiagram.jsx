import { useState } from "react";

const messages = {
  highPrepLowInstinct: "Sometimes amazing, sometimes disaster",
  lowPrepHighInstinct: "Reliably mediocre",
  highPrepHighInstinct: "Consistently great",
  lowPrepLowInstinct: "Why are you on stage?"
};

function getMessage(prepLevel, instinctLevel) {
  if (prepLevel >= 70 && instinctLevel >= 70) return messages.highPrepHighInstinct;
  if (prepLevel < 30 && instinctLevel < 30) return messages.lowPrepLowInstinct;
  if (prepLevel >= 70 && instinctLevel < 30) return messages.highPrepLowInstinct;
  if (prepLevel < 30 && instinctLevel >= 70) return messages.lowPrepHighInstinct;
  return "Finding balance...";
}

export default function CeilingFloorDiagram() {
  const [prepLevel, setPrepLevel] = useState(70);
  const [instinctLevel, setInstinctLevel] = useState(70);

  const width = 400;
  const height = 300;
  const padding = 40;
  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;

  // Normalize levels to 0-1 for positioning
  const ceilingY = padding + (100 - prepLevel) / 100 * chartHeight;
  const floorY = padding + (100 - instinctLevel) / 100 * chartHeight;

  // Ensure floor is always below ceiling
  const actualFloorY = Math.max(floorY, ceilingY + 20);
  const actualCeilingY = Math.min(ceilingY, actualFloorY - 20);

  // Performance range dimensions
  const rangeTop = actualCeilingY;
  const rangeBottom = actualFloorY;
  const rangeHeight = Math.max(rangeBottom - rangeTop, 20);

  const message = getMessage(prepLevel, instinctLevel);

  return (
    <div style={{
      padding: "24px",
      backgroundColor: "#0f0f0f",
      borderRadius: "8px",
      color: "#fff",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <h3 style={{ margin: "0 0 24px 0", fontSize: "18px", fontWeight: "600" }}>
        Ceiling & Floor: Preparation vs Instinct
      </h3>

      {/* Main chart and controls layout */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px",
        marginBottom: "24px"
      }}>
        {/* Chart */}
        <div style={{
          padding: "20px",
          backgroundColor: "#1a1a1a",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <svg width="100%" height="320" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
            {/* Background */}
            <rect width={width} height={height} fill="#0f0f0f" />

            {/* Axes */}
            <line
              x1={padding}
              y1={padding}
              x2={padding}
              y2={height - padding}
              stroke="#444"
              strokeWidth="2"
            />
            <line
              x1={padding}
              y1={height - padding}
              x2={width - padding}
              y2={height - padding}
              stroke="#444"
              strokeWidth="2"
            />

            {/* Ceiling line */}
            <line
              x1={padding}
              y1={actualCeilingY}
              x2={width - padding}
              y2={actualCeilingY}
              stroke="#D4920A"
              strokeWidth="2"
            />

            {/* Floor line */}
            <line
              x1={padding}
              y1={actualFloorY}
              x2={width - padding}
              y2={actualFloorY}
              stroke="#D946A8"
              strokeWidth="2"
            />

            {/* Performance range fill */}
            <defs>
              <linearGradient id="rangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D946A8" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#D4920A" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <rect
              x={padding}
              y={rangeTop}
              width={width - padding * 2}
              height={Math.max(rangeHeight, 0)}
              fill="url(#rangeGradient)"
            />

            {/* Labels */}
            {/* Ceiling label */}
            <text
              x={padding - 10}
              y={actualCeilingY + 4}
              textAnchor="end"
              fontSize="12"
              fill="#D4920A"
              fontWeight="600"
            >
              Ceiling
            </text>

            {/* Floor label */}
            <text
              x={padding - 10}
              y={actualFloorY + 4}
              textAnchor="end"
              fontSize="12"
              fill="#D946A8"
              fontWeight="600"
            >
              Floor
            </text>

            {/* Y-axis percentage labels */}
            {[0, 25, 50, 75, 100].map(pct => {
              const y = height - padding - (pct / 100 * chartHeight);
              return (
                <text
                  key={`pct-${pct}`}
                  x={padding - 15}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="#666"
                >
                  {pct}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Preparation slider */}
          <div>
            <label style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
              fontWeight: "500",
              marginBottom: "8px",
              color: "#D4920A"
            }}>
              <span>Preparation Level</span>
              <span>{prepLevel}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={prepLevel}
              onChange={(e) => setPrepLevel(parseInt(e.target.value))}
              style={{
                width: "100%",
                height: "6px",
                backgroundColor: "#2a2a2a",
                borderRadius: "3px",
                outline: "none",
                accentColor: "#D4920A",
                cursor: "pointer"
              }}
            />
            <div style={{
              fontSize: "11px",
              color: "#666",
              marginTop: "6px"
            }}>
              Sets the ceiling of your performance
            </div>
          </div>

          {/* Instinct slider */}
          <div>
            <label style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
              fontWeight: "500",
              marginBottom: "8px",
              color: "#D946A8"
            }}>
              <span>Instinct Level</span>
              <span>{instinctLevel}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={instinctLevel}
              onChange={(e) => setInstinctLevel(parseInt(e.target.value))}
              style={{
                width: "100%",
                height: "6px",
                backgroundColor: "#2a2a2a",
                borderRadius: "3px",
                outline: "none",
                accentColor: "#D946A8",
                cursor: "pointer"
              }}
            />
            <div style={{
              fontSize: "11px",
              color: "#666",
              marginTop: "6px"
            }}>
              Sets the floor of your performance
            </div>
          </div>

          {/* Message */}
          <div style={{
            padding: "16px",
            backgroundColor: "#1a1a1a",
            borderRadius: "6px",
            borderLeft: "3px solid #D946A8",
            fontSize: "14px",
            fontWeight: "500",
            color: "#D946A8",
            lineHeight: "1.6"
          }}>
            {message}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div style={{
        padding: "16px",
        backgroundColor: "#1a1a1a",
        borderRadius: "6px",
        fontSize: "12px",
        color: "#888",
        lineHeight: "1.7"
      }}>
        <p style={{ margin: "0 0 12px 0" }}>
          <strong style={{ color: "#D4920A" }}>Ceiling (Preparation):</strong> The best possible outcome you can achieve. Built during rehearsal, planning, and technical setup. Sets the upper bound of what's possible on stage.
        </p>
        <p style={{ margin: "0 0 12px 0" }}>
          <strong style={{ color: "#D946A8" }}>Floor (Instinct):</strong> The minimum quality you deliver under pressure. Built through experience and muscle memory. Catches you when things go wrong.
        </p>
        <p style={{ margin: 0 }}>
          Your performance range lives between these two lines. Ideally: high preparation + high instinct = <strong>consistently great</strong> sets.
        </p>
      </div>
    </div>
  );
}