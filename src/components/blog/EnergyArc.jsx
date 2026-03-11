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

  const viewBoxWidth = 500;
  const viewBoxHeight = 280;
  const padding = 45;
  const chartWidth = viewBoxWidth - padding * 2;
  const chartHeight = viewBoxHeight - padding * 2;

  const maxMinute = Math.max(...data.map(d => d.minute));
  const minBpm = Math.min(...data.map(d => d.bpm));
  const maxBpm = Math.max(...data.map(d => d.bpm));
  const bpmRange = maxBpm - minBpm;

  const points = data.map(d => ({
    x: padding + (d.minute / maxMinute) * chartWidth,
    y: viewBoxHeight - padding - ((d.bpm - minBpm) / bpmRange) * chartHeight,
    ...d
  }));

  const pathData = points.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cp1x = (prev.x + p.x) / 2;
    const cp1y = prev.y;
    const cp2x = (prev.x + p.x) / 2;
    const cp2y = p.y;
    return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
  }).join(" ");

  const fillPath = pathData + ` L ${points[points.length - 1].x} ${viewBoxHeight - padding} L ${points[0].x} ${viewBoxHeight - padding} Z`;

  const phases = Array.from(new Map(data.map(d => [d.phase, d])).values());
  const phasePositions = phases.map(phase => {
    const phasePoints = points.filter(p => p.phase === phase.phase);
    return {
      phase: phase.phase,
      x: (phasePoints[0].x + phasePoints[phasePoints.length - 1].x) / 2,
      y: Math.min(...phasePoints.map(p => p.y)) - 22
    };
  });

  return (
    <div style={{
      padding: "1.25rem 1.5rem",
      backgroundColor: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "1rem",
      color: "#f4f4f5",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{ marginBottom: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#f4f4f5", lineHeight: 1.3 }}>
          DJ Set Energy Arc
        </h3>
        <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", cursor: "pointer", fontSize: "0.85rem", color: "#a1a1aa" }}>
          <input
            type="checkbox"
            checked={showNarrative}
            onChange={(e) => setShowNarrative(e.target.checked)}
            style={{ cursor: "pointer", accentColor: "#D946A8" }}
          />
          <span>Narrative</span>
        </label>
      </div>

      <svg width="100%" height="auto" viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} preserveAspectRatio="xMidYMid meet" style={{ display: "block", minHeight: "200px" }}>
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D946A8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D946A8" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={`hline-${i}`}
            x1={padding}
            y1={padding + (i * chartHeight / 4)}
            x2={viewBoxWidth - padding}
            y2={padding + (i * chartHeight / 4)}
            stroke="#52525b"
            strokeWidth="0.5"
            strokeDasharray="3,2"
            opacity="0.4"
          />
        ))}

        {/* Y-axis labels (BPM) */}
        {[0, 1, 2, 3, 4].map(i => {
          const bpm = Math.round(minBpm + (bpmRange / 4) * i);
          return (
            <text
              key={`ylabel-${i}`}
              x={padding - 8}
              y={viewBoxHeight - padding - (i * chartHeight / 4) + 3}
              textAnchor="end"
              fontSize="9"
              fill="#71717a"
              fontFamily="monospace"
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
              y={viewBoxHeight - padding + 14}
              textAnchor="middle"
              fontSize="9"
              fill="#71717a"
              fontFamily="monospace"
            >
              {minute}m
            </text>
          );
        })}

        {/* Fill under curve */}
        <path d={fillPath} fill="url(#arcGradient)" />

        {/* Curve line */}
        <path
          d={pathData}
          stroke="#D946A8"
          strokeWidth="2"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={`point-${i}`}
            cx={p.x}
            cy={p.y}
            r="2.5"
            fill="#D946A8"
            stroke="#f4f4f5"
            strokeWidth="1"
          />
        ))}

        {/* Phase labels */}
        {phasePositions.map((phasePos, i) => (
          <g key={`phase-${i}`}>
            <text
              x={phasePos.x}
              y={phasePos.y}
              textAnchor="middle"
              fontSize="10"
              fill="#D946A8"
              fontWeight="600"
              fontFamily="monospace"
            >
              {phasePos.phase}
            </text>
            {showNarrative && (
              <text
                x={phasePos.x}
                y={phasePos.y + 12}
                textAnchor="middle"
                fontSize="8"
                fill="#71717a"
                fontStyle="italic"
              >
                {phaseMapping[phasePos.phase]}
              </text>
            )}
          </g>
        ))}

        {/* Axes */}
        <line x1={padding} y1={viewBoxHeight - padding} x2={viewBoxWidth - padding} y2={viewBoxHeight - padding} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1={padding} y1={padding} x2={padding} y2={viewBoxHeight - padding} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      </svg>

      <div style={{ marginTop: "0.5rem", fontSize: "0.7rem", color: "#71717a", fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Time (min) × BPM
      </div>
    </div>
  );
}