import { useState } from "react";

const data = [
  { minute: 0, bpm: 100, phase: "Gathering" },
  { minute: 5, bpm: 108, phase: "Gathering" },
  { minute: 10, bpm: 118, phase: "Commitment" },
  { minute: 15, bpm: 124, phase: "Commitment" },
  { minute: 20, bpm: 128, phase: "Peak" },
  { minute: 30, bpm: 128, phase: "Peak" },
  { minute: 35, bpm: 130, phase: "Peak" },
  { minute: 40, bpm: 125, phase: "Resolution" },
  { minute: 45, bpm: 118, phase: "Resolution" }
];

const phaseMapping = {
  "Gathering": "Exposition",
  "Commitment": "Rising Action",
  "Peak": "Climax",
  "Resolution": "Denouement"
};

export default function EnergyArc() {
  const [showNarrative, setShowNarrative] = useState(false);

  const width = 700;
  const height = 400;
  const padding = 60;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const maxMinute = Math.max(...data.map(d => d.minute));
  const minBpm = Math.min(...data.map(d => d.bpm));
  const maxBpm = Math.max(...data.map(d => d.bpm));
  const bpmRange = maxBpm - minBpm;

  const points = data.map(d => ({
    x: padding + (d.minute / maxMinute) * chartWidth,
    y: height - padding - ((d.bpm - minBpm) / bpmRange) * chartHeight,
    ...d
  }));

  // Generate smooth curve path
  const pathData = points.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cp1x = (prev.x + p.x) / 2;
    const cp1y = prev.y;
    const cp2x = (prev.x + p.x) / 2;
    const cp2y = p.y;
    return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
  }).join(" ");

  // Fill area under curve
  const fillPath = pathData + ` L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  // Get unique phases for labels
  const phases = Array.from(new Map(data.map(d => [d.phase, d])).values());
  const phasePositions = phases.map(phase => {
    const phasePoints = points.filter(p => p.phase === phase.phase);
    return {
      phase: phase.phase,
      x: (phasePoints[0].x + phasePoints[phasePoints.length - 1].x) / 2,
      y: Math.min(...phasePoints.map(p => p.y)) - 30
    };
  });

  return (
    <div style={{
      padding: "20px",
      backgroundColor: "#0f0f0f",
      borderRadius: "8px",
      color: "#fff",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>DJ Set Energy Arc</h3>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={showNarrative}
            onChange={(e) => setShowNarrative(e.target.checked)}
            style={{ cursor: "pointer" }}
          />
          <span style={{ fontSize: "14px" }}>Show Narrative Overlay</span>
        </label>
      </div>

      <svg width={width} height={height} style={{ backgroundColor: "#1a1a1a", borderRadius: "6px", overflow: "hidden" }}>
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={`hline-${i}`}
            x1={padding}
            y1={padding + (i * chartHeight / 4)}
            x2={width - padding}
            y2={padding + (i * chartHeight / 4)}
            stroke="#333"
            strokeWidth="1"
            strokeDasharray="4"
          />
        ))}

        {/* Y-axis labels (BPM) */}
        {[0, 1, 2, 3, 4].map(i => {
          const bpm = Math.round(minBpm + (bpmRange / 4) * i);
          return (
            <text
              key={`ylabel-${i}`}
              x={padding - 10}
              y={height - padding - (i * chartHeight / 4) + 5}
              textAnchor="end"
              fontSize="12"
              fill="#888"
            >
              {bpm}
            </text>
          );
        })}

        {/* X-axis labels (Minutes) */}
        {[0, 15, 30, 45].map(minute => {
          const x = padding + (minute / maxMinute) * chartWidth;
          return (
            <text
              key={`xlabel-${minute}`}
              x={x}
              y={height - padding + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#888"
            >
              {minute}m
            </text>
          );
        })}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D946A8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D946A8" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Fill under curve */}
        <path d={fillPath} fill="url(#arcGradient)" />

        {/* Curve line */}
        <path
          d={pathData}
          stroke="#D946A8"
          strokeWidth="3"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={`point-${i}`}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#D946A8"
            stroke="#fff"
            strokeWidth="2"
          />
        ))}

        {/* BPM labels at points */}
        {points.map((p, i) => (
          <text
            key={`bpm-${i}`}
            x={p.x}
            y={p.y - 15}
            textAnchor="middle"
            fontSize="11"
            fill="#D946A8"
            fontWeight="600"
          >
            {p.bpm}
          </text>
        ))}

        {/* Phase labels */}
        {phasePositions.map((phasePos, i) => (
          <g key={`phase-${i}`}>
            <text
              x={phasePos.x}
              y={phasePos.y}
              textAnchor="middle"
              fontSize="13"
              fill="#D946A8"
              fontWeight="600"
            >
              {phasePos.phase}
            </text>
            {showNarrative && (
              <text
                x={phasePos.x}
                y={phasePos.y + 18}
                textAnchor="middle"
                fontSize="12"
                fill="#888"
                fontStyle="italic"
              >
                {phaseMapping[phasePos.phase]}
              </text>
            )}
          </g>
        ))}

        {/* Axes */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#444" strokeWidth="2" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#444" strokeWidth="2" />
      </svg>

      <div style={{ marginTop: "12px", fontSize: "12px", color: "#888" }}>
        X: Time (minutes) | Y: BPM
      </div>
    </div>
  );
}