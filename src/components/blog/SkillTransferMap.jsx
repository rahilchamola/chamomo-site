import { useState } from "react";

const skillPairs = [
  { djSkill: "Reading the room", pmSkill: "Product sensing", connection: "Sensing what the crowd/product needs before the metrics tell you" },
  { djSkill: "Set preparation", pmSkill: "Architecture design", connection: "Preparation sets the ceiling. Instinct sets the floor." },
  { djSkill: "Kill bad tracks fast", pmSkill: "Kill bad features fast", connection: "Don't defend choices that aren't working." },
  { djSkill: "Gear disappears", pmSkill: "Tools disappear", connection: "Good tools are transparent. They enable you to forget they exist." },
  { djSkill: "Separate prep/perf", pmSkill: "Scope by workflow", connection: "Two tools for different workflow moments > one tool for everything" }
];

export default function SkillTransferMap() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const viewBoxWidth = 700;
  const viewBoxHeight = 320;
  const leftNodeX = 200;
  const rightNodeX = 500;
  const nodeRadius = 16;
  const nodeSpacing = (viewBoxHeight - 80) / (skillPairs.length - 1);
  const startY = 50;

  const accent = "#D946A8";
  const secondary = "#7C3AED";

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
        DJ Skills → PM Skills
      </h3>

      <div style={{
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "0.75rem",
        overflow: "hidden",
        marginBottom: "1rem"
      }}>
        <svg
          width="100%"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ display: "block" }}
        >
          {/* Column headers */}
          <text x={leftNodeX} y={20} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent} fontFamily="monospace" letterSpacing="0.08em">
            DJ SKILLS
          </text>
          <text x={rightNodeX} y={20} textAnchor="middle" fontSize="10" fontWeight="600" fill={secondary} fontFamily="monospace" letterSpacing="0.08em">
            PM SKILLS
          </text>

          {/* Connection lines */}
          {skillPairs.map((_, i) => {
            const y = startY + i * nodeSpacing;
            const isHovered = hoveredIndex === i;
            const midX = (leftNodeX + rightNodeX) / 2;

            return (
              <path
                key={`line-${i}`}
                d={`M ${leftNodeX + nodeRadius} ${y} C ${midX} ${y}, ${midX} ${y}, ${rightNodeX - nodeRadius} ${y}`}
                stroke={isHovered ? accent : secondary}
                strokeWidth={isHovered ? 2 : 1}
                fill="none"
                opacity={isHovered ? 1 : 0.25}
                style={{ transition: "all 0.3s ease", cursor: "pointer" }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}

          {/* Left nodes + labels */}
          {skillPairs.map((pair, i) => {
            const y = startY + i * nodeSpacing;
            const isHovered = hoveredIndex === i;
            return (
              <g
                key={`left-${i}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={leftNodeX}
                  cy={y}
                  r={nodeRadius}
                  fill={isHovered ? accent : `${accent}20`}
                  stroke={accent}
                  strokeWidth="1.5"
                  style={{ transition: "all 0.3s ease" }}
                />
                <text
                  x={leftNodeX}
                  y={y}
                  textAnchor="middle"
                  dy="0.35em"
                  fontSize="9"
                  fontWeight="700"
                  fill={isHovered ? "#f4f4f5" : accent}
                  fontFamily="monospace"
                  style={{ pointerEvents: "none", transition: "all 0.3s ease" }}
                >
                  {i + 1}
                </text>
                {/* Label to the left of node */}
                <text
                  x={leftNodeX - nodeRadius - 8}
                  y={y}
                  textAnchor="end"
                  dy="0.35em"
                  fontSize="10"
                  fontWeight="500"
                  fill={isHovered ? accent : "#71717a"}
                  style={{ transition: "fill 0.3s ease" }}
                >
                  {pair.djSkill}
                </text>
              </g>
            );
          })}

          {/* Right nodes + labels */}
          {skillPairs.map((pair, i) => {
            const y = startY + i * nodeSpacing;
            const isHovered = hoveredIndex === i;
            return (
              <g
                key={`right-${i}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={rightNodeX}
                  cy={y}
                  r={nodeRadius}
                  fill={isHovered ? secondary : `${secondary}20`}
                  stroke={secondary}
                  strokeWidth="1.5"
                  style={{ transition: "all 0.3s ease" }}
                />
                <text
                  x={rightNodeX}
                  y={y}
                  textAnchor="middle"
                  dy="0.35em"
                  fontSize="9"
                  fontWeight="700"
                  fill={isHovered ? "#f4f4f5" : secondary}
                  fontFamily="monospace"
                  style={{ pointerEvents: "none", transition: "all 0.3s ease" }}
                >
                  {i + 1}
                </text>
                {/* Label to the right of node */}
                <text
                  x={rightNodeX + nodeRadius + 8}
                  y={y}
                  textAnchor="start"
                  dy="0.35em"
                  fontSize="10"
                  fontWeight="500"
                  fill={isHovered ? secondary : "#71717a"}
                  style={{ transition: "fill 0.3s ease" }}
                >
                  {pair.pmSkill}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Details section */}
      {hoveredIndex !== null ? (
        <div style={{
          padding: "1rem",
          backgroundColor: `${accent}08`,
          border: `1px solid ${accent}30`,
          borderLeft: `3px solid ${accent}`,
          borderRadius: "0.75rem"
        }}>
          <div style={{ marginBottom: "0.5rem", fontSize: "0.65rem", color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace", fontWeight: 600 }}>
            Connection {hoveredIndex + 1}
          </div>
          <div style={{ marginBottom: "0.75rem", fontSize: "0.8rem", lineHeight: 1.5 }}>
            <span style={{ color: accent, fontWeight: 600 }}>
              {skillPairs[hoveredIndex].djSkill}
            </span>
            <span style={{ color: "#52525b", margin: "0 0.5rem" }}>→</span>
            <span style={{ color: secondary, fontWeight: 600 }}>
              {skillPairs[hoveredIndex].pmSkill}
            </span>
          </div>
          <div style={{ color: "#d4d4d8", fontSize: "0.75rem", lineHeight: 1.6, fontStyle: "italic" }}>
            {skillPairs[hoveredIndex].connection}
          </div>
        </div>
      ) : (
        <div style={{
          padding: "0.85rem 1.25rem",
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "0.75rem",
          fontSize: "0.8rem",
          color: "#71717a",
          textAlign: "center",
          lineHeight: 1.6
        }}>
          Hover a node to see the connection
        </div>
      )}
    </div>
  );
}
