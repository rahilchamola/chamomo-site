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

  const width = 800;
  const height = 500;
  const leftX = 80;
  const rightX = width - 80;
  const nodeRadius = 30;
  const nodeSpacing = (height - 80) / skillPairs.length;

  const leftNodes = skillPairs.map((_, i) => ({
    x: leftX,
    y: 60 + i * nodeSpacing
  }));

  const rightNodes = skillPairs.map((_, i) => ({
    x: rightX,
    y: 60 + i * nodeSpacing
  }));

  return (
    <div style={{
      padding: "24px",
      backgroundColor: "#0f0f0f",
      borderRadius: "8px",
      color: "#fff",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <h3 style={{ margin: "0 0 24px 0", fontSize: "18px", fontWeight: "600" }}>
        DJ Skills → PM Skills Transfer Map
      </h3>

      <div style={{
        position: "relative",
        backgroundColor: "#1a1a1a",
        borderRadius: "6px",
        overflow: "hidden",
        marginBottom: "20px"
      }}>
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
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
              <g key={`line-${i}`}>
                <path
                  d={`M ${leftNode.x + nodeRadius} ${leftNode.y} Q ${width / 2} ${(leftNode.y + rightNode.y) / 2} ${rightNode.x - nodeRadius} ${rightNode.y}`}
                  stroke={isHovered ? "#D946A8" : "#7C3AED"}
                  strokeWidth={isHovered ? 3 : 1.5}
                  fill="none"
                  opacity={isHovered ? 1 : 0.4}
                  style={{ transition: "all 0.2s", cursor: "pointer" }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </g>
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
                  fill={isHovered ? "#D946A8" : "#D946A840"}
                  stroke="#D946A8"
                  strokeWidth="2"
                  style={{ transition: "all 0.2s" }}
                />
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dy="0.3em"
                  fontSize="11"
                  fontWeight="600"
                  fill={isHovered ? "#000" : "#D946A8"}
                  style={{ pointerEvents: "none", transition: "all 0.2s" }}
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
                  fill={isHovered ? "#7C3AED" : "#7C3AED40"}
                  stroke="#7C3AED"
                  strokeWidth="2"
                  style={{ transition: "all 0.2s" }}
                />
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dy="0.3em"
                  fontSize="11"
                  fontWeight="600"
                  fill={isHovered ? "#fff" : "#7C3AED"}
                  style={{ pointerEvents: "none", transition: "all 0.2s" }}
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
          height: height,
          pointerEvents: "none"
        }}>
          {/* Left side labels */}
          {skillPairs.map((pair, i) => {
            const node = leftNodes[i];
            const isHovered = hoveredIndex === i;
            return (
              <div
                key={`left-label-${i}`}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: node.y,
                  transform: "translateY(-50%)",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: isHovered ? "#D946A8" : "#888",
                  maxWidth: "60px",
                  lineHeight: "1.3",
                  transition: "color 0.2s"
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
            const node = rightNodes[i];
            const isHovered = hoveredIndex === i;
            return (
              <div
                key={`right-label-${i}`}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: node.y,
                  transform: "translateY(-50%)",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: isHovered ? "#7C3AED" : "#888",
                  maxWidth: "60px",
                  textAlign: "right",
                  lineHeight: "1.3",
                  transition: "color 0.2s"
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
          padding: "20px",
          backgroundColor: "#1a1a1a",
          borderRadius: "6px",
          borderLeft: "3px solid #D946A8",
          animation: "fadeIn 0.2s ease-in"
        }}>
          <div style={{ marginBottom: "8px", fontSize: "13px", color: "#888", textTransform: "uppercase", letterSpacing: "0.3px" }}>
            Connection #{hoveredIndex + 1}
          </div>
          <div style={{ marginBottom: "12px" }}>
            <span style={{ color: "#D946A8", fontWeight: "600" }}>
              {skillPairs[hoveredIndex].djSkill}
            </span>
            <span style={{ color: "#666", margin: "0 8px" }}>→</span>
            <span style={{ color: "#7C3AED", fontWeight: "600" }}>
              {skillPairs[hoveredIndex].pmSkill}
            </span>
          </div>
          <div style={{ color: "#aaa", fontSize: "13px", lineHeight: "1.6" }}>
            {skillPairs[hoveredIndex].connection}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}