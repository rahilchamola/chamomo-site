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
  const [attentionPos, setAttentionPos] = useState(50); // 0 = left (prep), 100 = right (performance)

  const isConflict = attentionPos > 30 && attentionPos < 70;
  const isLeft = attentionPos < 30;
  const isRight = attentionPos > 70;

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

  return (
    <div style={{
      padding: "24px",
      backgroundColor: "#0f0f0f",
      borderRadius: "8px",
      color: "#fff",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <h3 style={{ margin: "0 0 24px 0", fontSize: "18px", fontWeight: "600" }}>
        Two Kinds of Work in DJing
      </h3>

      {/* Split screen columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 60px 1fr",
        gap: "16px",
        marginBottom: "32px"
      }}>
        {/* Left: Technical Work */}
        <div style={{
          padding: "20px",
          backgroundColor: "#1a1a1a",
          borderRadius: "6px",
          border: "1px solid #4A9EDE40",
          opacity: getTechOpacity(),
          transition: "opacity 0.2s"
        }}>
          <h4 style={{
            margin: "0 0 16px 0",
            fontSize: "14px",
            fontWeight: "600",
            color: "#4A9EDE",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            Technical Work
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {technicalItems.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#4A9EDE20",
                  borderRadius: "4px",
                  fontSize: "13px",
                  color: "#4A9EDE"
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Center: Attention bar */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          minHeight: "200px"
        }}>
          <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}>
            {/* Vertical bar background */}
            <div style={{
              position: "absolute",
              width: "8px",
              height: "100%",
              backgroundColor: "#2a2a2a",
              borderRadius: "4px",
              top: 0
            }} />

            {/* Filled portion */}
            <svg
              width="8"
              height="200"
              style={{
                position: "absolute",
                top: 0,
                left: "26px"
              }}
            >
              <defs>
                <linearGradient id="attentionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset={`${attentionPos}%`} stopColor="#D946A8" />
                  <stop offset={`${attentionPos}%`} stopColor="#4A9EDE" />
                </linearGradient>
              </defs>
              <rect width="8" height="200" fill="url(#attentionGradient)" />
            </svg>

            {/* Draggable thumb */}
            <div
              draggable
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = "move";
              }}
              onDrag={(e) => {
                if (e.clientY === 0) return;
                const container = e.currentTarget.parentElement.parentElement;
                const rect = container.getBoundingClientRect();
                const newPos = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
                setAttentionPos(newPos);
              }}
              style={{
                position: "absolute",
                width: "32px",
                height: "12px",
                backgroundColor: "#fff",
                borderRadius: "6px",
                cursor: "grab",
                top: `calc(${100 - attentionPos}% - 6px)`,
                left: "16px",
                border: "2px solid #D946A8",
                transition: attentionPos === 50 ? "none" : "none",
                zIndex: 10
              }}
            />
          </div>
        </div>

        {/* Right: Intuitive Work */}
        <div style={{
          padding: "20px",
          backgroundColor: "#1a1a1a",
          borderRadius: "6px",
          border: "1px solid #D946A840",
          opacity: getIntuitionOpacity(),
          transition: "opacity 0.2s"
        }}>
          <h4 style={{
            margin: "0 0 16px 0",
            fontSize: "14px",
            fontWeight: "600",
            color: "#D946A8",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            Intuitive Work
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {intuitiveItems.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#D946A820",
                  borderRadius: "4px",
                  fontSize: "13px",
                  color: "#D946A8"
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
        padding: "12px 16px",
        backgroundColor: isConflict ? "#8B4513" : isLeft ? "#4A9EDE30" : "#D946A830",
        borderRadius: "4px",
        fontSize: "13px",
        textAlign: "center",
        color: isConflict ? "#FFB84D" : "#888",
        marginBottom: "16px",
        fontWeight: "500",
        textTransform: "uppercase",
        letterSpacing: "0.5px"
      }}>
        {getConflictLabel()}
      </div>

      {/* Message */}
      <div style={{
        padding: "16px",
        backgroundColor: "#1a1a1a",
        borderRadius: "6px",
        borderLeft: "3px solid #D946A8",
        fontSize: "13px",
        color: "#bbb",
        lineHeight: "1.6"
      }}>
        <strong style={{ color: "#D946A8" }}>Ritmos</strong> keeps the attention bar on the left side — so during performance, it's fully on the right.
      </div>
    </div>
  );
}