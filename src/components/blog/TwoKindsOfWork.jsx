import { useState } from "react";

const technicalItems = [
  "BPM matching",
  "Key compatibility",
  "Energy management",
  "Gear setup"
];

const intuitiveItems = [
  "Reading the room",
  "Crowd energy",
  "Live decisions",
  "Moment sensing"
];

export default function TwoKindsOfWork() {
  const [attentionPos, setAttentionPos] = useState(50);

  const isConflict = attentionPos > 30 && attentionPos < 70;
  const isLeft = attentionPos <= 30;
  const isRight = attentionPos >= 70;

  const techOpacity = isLeft ? 1 : isRight ? 0.3 : 0.5;
  const intuitionOpacity = isRight ? 1 : isLeft ? 0.3 : 0.5;

  const label = isConflict ? "conflict" : isLeft ? "preparation" : isRight ? "performance" : "";

  const accent = "#D946A8";

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
        Two Kinds of Work in DJing
      </h3>

      {/* Two columns — compact pill layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
        {/* Technical */}
        <div style={{ opacity: techOpacity, transition: "opacity 0.3s ease" }}>
          <div style={{
            fontSize: "0.65rem", fontWeight: 600, color: accent,
            textTransform: "uppercase", letterSpacing: "0.08em",
            fontFamily: "monospace", marginBottom: "0.5rem"
          }}>Technical</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {technicalItems.map((item, i) => (
              <span key={i} style={{
                padding: "0.3rem 0.6rem",
                backgroundColor: `${accent}15`,
                borderRadius: "1rem",
                fontSize: "0.75rem",
                color: "#d4d4d8",
                whiteSpace: "nowrap"
              }}>{item}</span>
            ))}
          </div>
        </div>

        {/* Intuitive */}
        <div style={{ opacity: intuitionOpacity, transition: "opacity 0.3s ease" }}>
          <div style={{
            fontSize: "0.65rem", fontWeight: 600, color: accent,
            textTransform: "uppercase", letterSpacing: "0.08em",
            fontFamily: "monospace", marginBottom: "0.5rem"
          }}>Intuitive</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {intuitiveItems.map((item, i) => (
              <span key={i} style={{
                padding: "0.3rem 0.6rem",
                backgroundColor: `${accent}15`,
                borderRadius: "1rem",
                fontSize: "0.75rem",
                color: "#d4d4d8",
                whiteSpace: "nowrap"
              }}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal attention slider */}
      <div style={{ marginBottom: "0.75rem" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: "0.6rem", fontFamily: "monospace", color: "#71717a",
          textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem"
        }}>
          <span>← Prep</span>
          <span style={{
            color: accent, fontWeight: 600,
            fontSize: "0.65rem", letterSpacing: "0.1em"
          }}>{label}</span>
          <span>Live →</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={attentionPos}
          onChange={(e) => setAttentionPos(Number(e.target.value))}
          style={{
            width: "100%",
            height: "6px",
            appearance: "none",
            WebkitAppearance: "none",
            background: `linear-gradient(90deg, ${accent}, #7C3AED)`,
            borderRadius: "3px",
            cursor: "pointer",
            outline: "none"
          }}
        />
        <style>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 16px;
            height: 16px;
            background: #f4f4f5;
            border: 2px solid ${accent};
            border-radius: 50%;
            cursor: grab;
            box-shadow: 0 0 8px rgba(217,70,168,0.3);
          }
          input[type="range"]::-moz-range-thumb {
            width: 16px;
            height: 16px;
            background: #f4f4f5;
            border: 2px solid ${accent};
            border-radius: 50%;
            cursor: grab;
            box-shadow: 0 0 8px rgba(217,70,168,0.3);
          }
        `}</style>
      </div>

      {/* Insight */}
      <div style={{
        padding: "0.75rem 1rem",
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderLeft: `3px solid ${accent}`,
        borderRadius: "0.75rem",
        fontSize: "0.8rem",
        color: "#d4d4d8",
        lineHeight: 1.5,
        fontStyle: "italic"
      }}>
        <span style={{ color: accent, fontWeight: 600, fontStyle: "normal" }}>Ritmos</span> keeps attention on the left — so during performance, it's fully on the right.
      </div>
    </div>
  );
}
