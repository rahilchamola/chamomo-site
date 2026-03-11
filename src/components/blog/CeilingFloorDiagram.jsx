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

  const viewBoxWidth = 280;
  const viewBoxHeight = 220;
  const padding = 28;
  const chartHeight = viewBoxHeight - padding * 2;
  const chartWidth = viewBoxWidth - padding * 2;

  const ceilingY = padding + (100 - prepLevel) / 100 * chartHeight;
  const floorY = padding + (100 - instinctLevel) / 100 * chartHeight;

  const actualFloorY = Math.max(floorY, ceilingY + 15);
  const actualCeilingY = Math.min(ceilingY, actualFloorY - 15);

  const rangeTop = actualCeilingY;
  const rangeBottom = actualFloorY;
  const rangeHeight = Math.max(rangeBottom - rangeTop, 15);

  const message = getMessage(prepLevel, instinctLevel);

  return (
    <div style={{
      padding: "1.25rem 1.5rem",
      backgroundColor: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "1rem",
      color: "#f4f4f5",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <h3 style={{ margin: "0 0 1rem 0", fontSize: "1rem", fontWeight: 700, color: "#f4f4f5", lineHeight: 1.3 }}>
        Ceiling & Floor
      </h3>

      {/* Main chart and controls layout */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
        marginBottom: "1rem"
      }}>
        {/* Chart */}
        <div style={{
          padding: "1rem",
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "0.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <svg width="100%" height="auto" viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} preserveAspectRatio="xMidYMid meet" style={{ display: "block", minHeight: "200px" }}>
            {/* Axes */}
            <line
              x1={padding}
              y1={padding}
              x2={padding}
              y2={viewBoxHeight - padding}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
            <line
              x1={padding}
              y1={viewBoxHeight - padding}
              x2={viewBoxWidth - padding}
              y2={viewBoxHeight - padding}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />

            {/* Performance range fill */}
            <defs>
              <linearGradient id="rangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D946A8" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#D946A8" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <rect
              x={padding}
              y={rangeTop}
              width={viewBoxWidth - padding * 2}
              height={Math.max(rangeHeight, 0)}
              fill="url(#rangeGradient)"
            />

            {/* Ceiling line */}
            <line
              x1={padding}
              y1={actualCeilingY}
              x2={viewBoxWidth - padding}
              y2={actualCeilingY}
              stroke="#D946A8"
              strokeWidth="1.5"
              strokeDasharray="3,2"
            />

            {/* Floor line */}
            <line
              x1={padding}
              y1={actualFloorY}
              x2={viewBoxWidth - padding}
              y2={actualFloorY}
              stroke="#D946A8"
              strokeWidth="1.5"
            />

            {/* Ceiling label */}
            <text
              x={padding - 6}
              y={actualCeilingY + 3}
              textAnchor="end"
              fontSize="8"
              fill="#D946A8"
              fontFamily="monospace"
              fontWeight="600"
            >
              ceiling
            </text>

            {/* Floor label */}
            <text
              x={padding - 6}
              y={actualFloorY + 3}
              textAnchor="end"
              fontSize="8"
              fill="#D946A8"
              fontFamily="monospace"
              fontWeight="600"
            >
              floor
            </text>

            {/* Y-axis percentage labels */}
            {[0, 50, 100].map(pct => {
              const y = viewBoxHeight - padding - (pct / 100 * chartHeight);
              return (
                <text
                  key={`pct-${pct}`}
                  x={padding - 8}
                  y={y + 2}
                  textAnchor="end"
                  fontSize="7"
                  fill="#71717a"
                  fontFamily="monospace"
                >
                  {pct}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {/* Preparation slider */}
          <div>
            <label style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.7rem",
              fontWeight: 600,
              marginBottom: "0.35rem",
              color: "#D946A8",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontFamily: "monospace"
            }}>
              <span>Prep</span>
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
                height: "5px",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: "3px",
                outline: "none",
                accentColor: "#D946A8",
                cursor: "pointer"
              }}
            />
            <div style={{
              fontSize: "0.65rem",
              color: "#71717a",
              marginTop: "0.25rem",
              fontFamily: "monospace"
            }}>
              Ceiling
            </div>
          </div>

          {/* Instinct slider */}
          <div>
            <label style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.7rem",
              fontWeight: 600,
              marginBottom: "0.35rem",
              color: "#D946A8",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontFamily: "monospace"
            }}>
              <span>Instinct</span>
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
                height: "5px",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: "3px",
                outline: "none",
                accentColor: "#D946A8",
                cursor: "pointer"
              }}
            />
            <div style={{
              fontSize: "0.65rem",
              color: "#71717a",
              marginTop: "0.25rem",
              fontFamily: "monospace"
            }}>
              Floor
            </div>
          </div>

          {/* Message */}
          <div style={{
            padding: "0.75rem",
            backgroundColor: "rgba(217,70,168,0.08)",
            border: "1px solid rgba(217,70,168,0.3)",
            borderLeft: "3px solid #D946A8",
            borderRadius: "0.35rem",
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "#d4d4d8",
            lineHeight: 1.5,
            fontStyle: "italic"
          }}>
            {message}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div style={{
        padding: "0.75rem",
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "0.5rem",
        fontSize: "0.7rem",
        color: "#a1a1aa",
        lineHeight: 1.6
      }}>
        <p style={{ margin: "0 0 0.35rem 0" }}>
          <strong style={{ color: "#D946A8", fontFamily: "monospace" }}>Ceiling</strong> is your best outcome. <strong style={{ color: "#D946A8", fontFamily: "monospace" }}>Floor</strong> is minimum quality under pressure. Range = your performance.
        </p>
      </div>
    </div>
  );
}