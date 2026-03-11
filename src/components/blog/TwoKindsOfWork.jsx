import { useState } from "react";

const technicalItems = [
  "BPM matching",
  "Key compatibility",
  "Energy management",
  "Gear setup & testing"
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

  const getTechOpacity = () => {
    if (isLeft) return 1;
    if (isRight) return 0.3;
    return 0.5;
  };

  const getIntuitionOpacity = () => {
    if (isRight) return 1;
    if (isLeft) return 0.3;
    return 0.5;
  };

  const getConflictLabel = () => {
    if (isConflict) return "conflict";
    if (isLeft) return "preparation";
    if (isRight) return "performance";
    return "";
  };

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

      {/* Split screen columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 45px 1fr",
        gap: "0.75rem",
        marginBottom: "1rem"
      }}>
        {/* Left: Technical Work */}
        <div style={{
          padding: "1rem",
          backgroundColor: "rgba(255,255,255,0.02)",
          border: `1px solid ${accent}25`,
          borderRadius: "0.75rem",
          opacity: getTechOpacity(),
          transition: "all 0.3s ease"
        }}>
          <h4 style={{
            margin: "0 0 0.75rem 0",
            fontSize: "0.65rem",
            fontWeight: 600,
            color: accent,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontFamily: "monospace"
          }}>
            Technical
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {technicalItems.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "0.5rem 0.75rem",
                  backgroundColor: `${accent}15`,
                  borderRadius: "0.5rem",
                  fontSize: "0.8rem",
                  color: "#d4d4d8",
                  lineHeight: 1.4
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Center: Attention slider (range input) */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          minHeight: "160px"
        }}>
          <input
            type="range"
            min="0"
            max="100"
            value={attentionPos}
            onChange={(e) => setAttentionPos(Number(e.target.value))}
            style={{
              writingMode: "vertical-lr",
              direction: "rtl",
              height: "100%",
              width: "28px",
              appearance: "none",
              WebkitAppearance: "none",
              background: "transparent",
              cursor: "pointer"
            }}
          />
          <style>{`
            input[type="range"]::-webkit-slider-runnable-track {
              width: 6px;
              height: 100%;
              background: linear-gradient(to top, ${accent}, #7C3AED);
              border-radius: 3px;
            }
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 14px;
              height: 28px;
              background: #f4f4f5;
              border: 1px solid ${accent};
              border-radius: 5px;
              cursor: grab;
              box-shadow: 0 0 8px rgba(217,70,168,0.3);
              margin-left: -4px;
            }
            input[type="range"]::-moz-range-track {
              width: 6px;
              background: linear-gradient(to top, ${accent}, #7C3AED);
              border-radius: 3px;
            }
            input[type="range"]::-moz-range-thumb {
              width: 14px;
              height: 28px;
              background: #f4f4f5;
              border: 1px solid ${accent};
              border-radius: 5px;
              cursor: grab;
              box-shadow: 0 0 8px rgba(217,70,168,0.3);
            }
          `}</style>
        </div>

        {/* Right: Intuitive Work */}
        <div style={{
          padding: "1rem",
          backgroundColor: "rgba(255,255,255,0.02)",
          border: `1px solid ${accent}25`,
          borderRadius: "0.75rem",
          opacity: getIntuitionOpacity(),
          transition: "all 0.3s ease"
        }}>
          <h4 style={{
            margin: "0 0 0.75rem 0",
            fontSize: "0.65rem",
            fontWeight: 600,
            color: accent,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontFamily: "monospace"
          }}>
            Intuitive
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {intuitiveItems.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "0.5rem 0.75rem",
                  backgroundColor: `${accent}15`,
                  borderRadius: "0.5rem",
                  fontSize: "0.8rem",
                  color: "#d4d4d8",
                  lineHeight: 1.4
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status label */}
      <div style={{
        padding: "0.75rem 1rem",
        backgroundColor: `${accent}15`,
        borderRadius: "0.5rem",
        fontSize: "0.7rem",
        textAlign: "center",
        color: accent,
        marginBottom: "0.75rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        fontFamily: "monospace"
      }}>
        {getConflictLabel()}
      </div>

      {/* Insight */}
      <div style={{
        padding: "1rem",
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderLeft: `3px solid ${accent}`,
        borderRadius: "0.75rem",
        fontSize: "0.85rem",
        color: "#d4d4d8",
        lineHeight: 1.6,
        fontStyle: "italic",
        fontWeight: 500
      }}>
        <span style={{ color: accent, fontWeight: 600, fontStyle: "normal" }}>Ritmos</span> keeps attention on the left — so during performance, it's fully on the right.
      </div>
    </div>
  );
}
