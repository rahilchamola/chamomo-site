import { useState } from "react";

const skillPairs = [
  { djSkill: "Reading the room", pmSkill: "Product sensing", connection: "Sensing what the crowd/product needs before the metrics tell you" },
  { djSkill: "Set preparation", pmSkill: "Architecture design", connection: "Preparation sets the ceiling. Instinct sets the floor." },
  { djSkill: "Kill bad tracks fast", pmSkill: "Kill bad features fast", connection: "Don't defend choices that aren't working." },
  { djSkill: "Gear disappears in performance", pmSkill: "Tools disappear in usage", connection: "Good tools are transparent. They enable you to forget they exist." },
  { djSkill: "Separate prep from performance tools", pmSkill: "Scope by workflow, not capability", connection: "Two tools for different workflow moments > one tool for everything" }
];

export default function SkillTransferMap() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const viewBoxWidth = 560;
  const viewBoxHeight = 320;
  const leftX = 50;
  const rightX = viewBoxWidth - 50;
  const nodeRadius = 18;
  const nodeSpacing = (viewBoxHeight - 60) / skillPairs.length;

  const leftNodes = skillPairs.map((_, i) => ({
    x: leftX,
    y: 40 + i * nodeSpacing
  }));

  const rightNodes = skillPairs.map((_, i) => ({
    x: rightX,
    y: 40 + i * nodeSpacing
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
      <h3 style={{ margin: "0 0 1rem 0", fontSize: "1rem", fontWeight: 700, color: "#f4f4f5", lineHeight: 1.3 }}>
        DJ Skills → PM Skills
      </h3>

      <div style={{
        position: "relative",
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "0.75rem",
        overflow: "hidden",
        marginBottom: "1rem",
        minHeight: "280px"
      }}>
        <svg width="100%" height="auto" viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} preserveAspectRatio="xMidYMid meet" style={{ display: "block" }}>
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D946A8" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>

          {/* Connection lines */}
          {leftNodes.map((leftNode, i) => {
            const rightNode = rightNodes[i];
            const isHovered = hoveredIndex === i;

            return (
              <path
                key={`line-${i}`}
                d={`M ${leftNode.x + nodeRadius} ${leftNode.y} Q ${viewBoxWidth / 2} ${(leftNode.y + rightNode.y) / 2} ${rightNode.x - nodeRadius} ${rightNode.y}`}
                stroke={isHovered ? "#D946A8" : "#7C3AED"}
                strokeWidth={isHovered ? 2 : 1}
                fill="none"
                opacity={isHovered ? 1 : 0.35}
                style={{ transition: "all 0.3s ease", cursor: "pointer" }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}

          {/* Left nodes (DJ Skills) */}
          {leftNodes.map((node, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <g
                key={`left-${i}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeRadius}
                  fill={isHovered ? "#D946A8" : "#D946A820"}
                  stroke="#D946A8"
                  strokeWidth="1.5"
                  style={{ transition: "all 0.3s ease" }}
                />
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dy="0.3em"
                  fontSize="9"
                  fontWeight="700"
                  fill={isHovered ? "#f4f4f5" : "#D946A8"}
                  fontFamily="monospace"
                  style={{ pointerEvents: "none", transition: "all 0.3s ease" }}
                >
                  {i + 1}
                </text>
              </g>
            );
          })}

          {/* Right nodes (PM Skills) */}
          {rightNodes.map((node, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <g
                key={`right-${i}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeRadius}
                  fill={isHovered ? "#7C3AED" : "#7C3AED20"}
                  stroke="#7C3AED"
                  strokeWidth="1.5"
                  style={{ transition: "all 0.3s ease" }}
                />
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dy="0.3em"
                  fontSize="9"
                  fontWeight="700"
                  fill={isHovered ? "#f4f4f5" : "#7C3AED"}
                  fontFamily="monospace"
                  style={{ pointerEvents: "none", transition: "all 0.3s ease" }}
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating labels */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          paddingTop: "1rem"
        }}>
          {/* Left side labels */}
          {skillPairs.map((pair, i) => {
            const ratio = (viewBoxHeight / 320);
            const pixelY = (40 + i * nodeSpacing) * ratio;
            const isHovered = hoveredIndex === i;
            return (
              <div
                key={`left-label-${i}`}
                style={{
                  position: "absolute",
                  left: "0.5rem",
                  top: `calc(${pixelY}px - 0.5rem)`,
                  transform: "translateY(-50%)",
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  color: isHovered ? "#D946A8" : "#71717a",
                  maxWidth: "50px",
                  lineHeight: 1.3,
                  transition: "color 0.3s ease",
                  fontFamily: "monospace"
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div style={{ pointerEvents: "auto", cursor: "pointer" }}>
                  {pair.djSkill}
                </div>
              </div>
            );
          })}

          {/* Right side labels */}
          {skillPairs.map((pair, i) => {
            const ratio = (viewBoxHeight / 320);
            const pixelY = (40 + i * nodeSpacing) * ratio;
            const isHovered = hoveredIndex === i;
            return (
              <div
                key={`right-label-${i}`}
                style={{
                  position: "absolute",
                  right: "0.5rem",
                  top: `calc(${pixelY}px - 0.5rem)`,
                  transform: "translateY(-50%)",
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  color: isHovered ? "#7C3AED" : "#71717a",
                  maxWidth: "50px",
                  textAlign: "right",
                  lineHeight: 1.3,
                  transition: "color 0.3s ease",
                  fontFamily: "monospace"
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div style={{ pointerEvents: "auto", cursor: "pointer" }}>
                  {pair.pmSkill}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details section */}
      {hoveredIndex !== null && (
        <div style={{
          padding: "1rem",
          backgroundColor: "rgba(217,70,168,0.08)",
          border: "1px solid rgba(217,70,168,0.3)",
          borderLeft: "3px solid #D946A8",
          borderRadius: "0.75rem",
          animation: "fadeIn 0.3s ease-in"
        }}>
          <div style={{ marginBottom: "0.5rem", fontSize: "0.65rem", color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace", fontWeight: 600 }}>
            Connection {hoveredIndex + 1}
          </div>
          <div style={{ marginBottom: "0.75rem", fontSize: "0.8rem", lineHeight: 1.5 }}>
            <span style={{ color: "#D946A8", fontWeight: 600 }}>
              {skillPairs[hoveredIndex].djSkill}
            </span>
            <span style={{ color: "#52525b", margin: "0 0.5rem" }}>→</span>
            <span style={{ color: "#7C3AED", fontWeight: 600 }}>
              {skillPairs[hoveredIndex].pmSkill}
            </span>
          </div>
          <div style={{ color: "#d4d4d8", fontSize: "0.75rem", lineHeight: 1.6, fontStyle: "italic" }}>
            {skillPairs[hoveredIndex].connection}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}