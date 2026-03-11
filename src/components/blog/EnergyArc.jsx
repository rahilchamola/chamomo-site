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

const accent = "#D946A8";

export default function EnergyArc() {
  const [showNarrative, setShowNarrative] = useState(false);

  const viewBoxWidth = 500;
  const viewBoxHeight = 240;
  const padLeft = 40;
  const padRight = 15;
  const padTop = 30;
  const padBottom = 28;
  const chartWidth = viewBoxWidth - padLeft - padRight;
  const chartHeight = viewBoxHeight - padTop - padBottom;

  const maxMinute = Math.max(...data.map(d => d.minute));
  const minBpm = Math.min(...data.map(d => d.bpm));
  const maxBpm = Math.max(...data.map(d => d.bpm));
  const bpmRange = maxBpm - minBpm;

  const points = data.map(d => ({
    x: padLeft + (d.minute / maxMinute) * chartWidth,
    y: viewBoxHeight - padBottom - ((d.bpm - minBpm) / bpmRange) * chartHeight,
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

  const fillPath = pathData + ` L ${points[points.length - 1].x} ${viewBoxHeight - padBottom} L ${points[0].x} ${viewBoxHeight - padBottom} Z`;

  // Get unique phases and their center positions
  const phaseGroups = {};
  points.forEach(p => {
    if (!phaseGroups[p.phase]) phaseGroups[p.phase] = [];
    phaseGroups[p.phase].push(p);
  });

  const phasePositions = Object.entries(phaseGroups).map(([phase, pts]) => ({
    phase,
    x: (pts[0].x + pts[pts.length - 1].x) / 2,
    y: Math.min(...pts.map(p => p.y)) - 14
  }));

  return (
    <div style={{
      padding: "1.25rem 1.5rem",
      backgroundColor: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "1rem",
      color: "#f4f4f5",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{ marginBottom: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#f4f4f5", lineHeight: 1.3 }}>
          DJ Set Energy Arc
        </h3>
        <button
          onClick={() => setShowNarrative(!showNarrative)}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.35rem",
            padding: "0.25rem 0.6rem",
            backgroundColor: showNarrative ? `${accent}20` : "transparent",
            border: `1px solid ${showNarrative ? accent : "rgba(255,255,255,0.1)"}`,
            borderRadius: "1rem",
            cursor: "pointer",
            fontSize: "0.7rem",
            fontFamily: "monospace",
            color: showNarrative ? accent : "#71717a",
            letterSpacing: "0.05em",
            transition: "all 0.2s ease"
          }}
        >
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            backgroundColor: showNarrative ? accent : "#52525b",
            transition: "background-color 0.2s ease"
          }} />
          Narrative
        </button>
      </div>

      <svg
        width="100%"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Subtle grid lines */}
        {[0, 1, 2, 3].map(i => (
          <line
            key={`hline-${i}`}
            x1={padLeft}
            y1={padTop + (i * chartHeight / 3)}
            x2={viewBoxWidth - padRight}
            y2={padTop + (i * chartHeight / 3)}
            stroke="#52525b"
            strokeWidth="0.5"
            strokeDasharray="2,3"
            opacity="0.3"
          />
        ))}

        {/* Y-axis BPM labels */}
        {[0, 1, 2, 3].map(i => {
          const bpm = Math.round(minBpm + (bpmRange / 3) * i);
          return (
            <text
              key={`ylabel-${i}`}
              x={padLeft - 6}
              y={viewBoxHeight - padBottom - (i * chartHeight / 3) + 3}
              textAnchor="end"
              fontSize="8"
              fill="#52525b"
              fontFamily="monospace"
            >
              {bpm}
            </text>
          );
        })}

        {/* X-axis minute labels */}
        {[0, 15, 30, 45].map(minute => {
          const x = padLeft + (minute / maxMinute) * chartWidth;
          return (
            <text
              key={`xlabel-${minute}`}
              x={x}
              y={viewBoxHeight - padBottom + 13}
              textAnchor="middle"
              fontSize="8"
              fill="#52525b"
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
          stroke={accent}
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
            fill={accent}
            stroke="#0a0b10"
            strokeWidth="1.5"
          />
        ))}

        {/* Phase labels */}
        {phasePositions.map((phasePos, i) => (
          <g key={`phase-${i}`}>
            <text
              x={phasePos.x}
              y={phasePos.y}
              textAnchor="middle"
              fontSize="9"
              fill={accent}
              fontWeight="600"
              fontFamily="monospace"
              letterSpacing="0.5"
            >
              {phasePos.phase}
            </text>
            {showNarrative && (
              <text
                x={phasePos.x}
                y={phasePos.y + 11}
                textAnchor="middle"
                fontSize="7.5"
                fill="#71717a"
                fontStyle="italic"
              >
                {phaseMapping[phasePos.phase]}
              </text>
            )}
          </g>
        ))}

        {/* Axes */}
        <line x1={padLeft} y1={viewBoxHeight - padBottom} x2={viewBoxWidth - padRight} y2={viewBoxHeight - padBottom} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1={padLeft} y1={padTop} x2={padLeft} y2={viewBoxHeight - padBottom} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      </svg>
    </div>
  );
}
