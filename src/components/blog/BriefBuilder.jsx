import { useState } from "react";

const presets = [
  { name: "ISB Friday Night", theme: "English Pop", bpmStart: 100, bpmPeak: 130, crowdEnergy: "cold", recognition: "all-bangers" },
  { name: "Club Set", theme: "House / Tech", bpmStart: 122, bpmPeak: 128, crowdEnergy: "hot", recognition: "deep-cuts" },
  { name: "Wedding Reception", theme: "Bollywood Mix", bpmStart: 95, bpmPeak: 140, crowdEnergy: "warm", recognition: "all-bangers" }
];

export default function BriefBuilder() {
  const [theme, setTheme] = useState("English Pop");
  const [bpmStart, setBpmStart] = useState(100);
  const [bpmPeak, setBpmPeak] = useState(130);
  const [crowdEnergy, setCrowdEnergy] = useState("cold");
  const [recognition, setRecognition] = useState("all-bangers");

  const applyPreset = (preset) => {
    setTheme(preset.theme);
    setBpmStart(preset.bpmStart);
    setBpmPeak(preset.bpmPeak);
    setCrowdEnergy(preset.crowdEnergy);
    setRecognition(preset.recognition);
  };

  const gatheringLength = crowdEnergy === "hot" ? 5 : crowdEnergy === "warm" ? 8 : 10;
  const arcPoints = [
    { x: 0, y: 20 + (bpmStart - 95) / 45 * 30 },
    { x: gatheringLength, y: 20 + (bpmStart + 5 - 95) / 45 * 30 },
    { x: gatheringLength + 8, y: 30 + (bpmPeak - 95) / 45 * 35 },
    { x: gatheringLength + 13, y: 30 + (bpmPeak - 95) / 45 * 35 },
    { x: gatheringLength + 18, y: 20 + (bpmPeak - 10 - 95) / 45 * 30 }
  ];

  const pathData = arcPoints.map((p, i) => {
    if (i === 0) return `M ${p.x * 2.5} ${100 - p.y}`;
    const prev = arcPoints[i - 1];
    const cp1x = (prev.x + p.x) / 2 * 2.5;
    const cp1y = 100 - prev.y;
    const cp2x = (prev.x + p.x) / 2 * 2.5;
    const cp2y = 100 - p.y;
    return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x * 2.5} ${100 - p.y}`;
  }).join(" ");

  const fillPath = pathData + ` L ${arcPoints[arcPoints.length - 1].x * 2.5} 100 L 0 100 Z`;

  const energyLabels = { "cold": "Cold", "warm": "Warm", "hot": "Hot" };
  const recognitionLabels = { "all-bangers": "All Bangers", "deep-cuts": "Deep Cuts" };

  return (
    <div style={{
      padding: "1.25rem 1.5rem",
      backgroundColor: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "1rem",
      color: "#f4f4f5",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "1rem", fontWeight: 700, color: "#f4f4f5", lineHeight: 1.3 }}>
        Brief Builder
      </h3>

      {/* Presets */}
      <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {presets.map((preset, i) => (
          <button
            key={i}
            onClick={() => applyPreset(preset)}
            style={{
              padding: "0.5rem 0.75rem",
              backgroundColor: "#D946A815",
              border: "1px solid #D946A840",
              borderRadius: "0.5rem",
              color: "#D946A8",
              cursor: "pointer",
              fontSize: "0.65rem",
              fontWeight: 600,
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontFamily: "monospace"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#D946A825";
              e.target.style.borderColor = "#D946A860";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#D946A815";
              e.target.style.borderColor = "#D946A840";
            }}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Main grid: left inputs, right preview */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem"
      }}>
        {/* Left: Inputs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Theme display */}
          <div>
            <label style={{ fontSize: "0.65rem", color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace", fontWeight: 600 }}>
              Theme
            </label>
            <div style={{
              marginTop: "0.35rem",
              padding: "0.75rem",
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(217,70,168,0.2)",
              borderRadius: "0.5rem",
              fontSize: "0.85rem",
              fontWeight: 500,
              color: "#D946A8",
              fontFamily: "monospace"
            }}>
              {theme}
            </div>
          </div>

          {/* BPM Start */}
          <div>
            <label style={{ fontSize: "0.65rem", color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace", fontWeight: 600, display: "flex", justifyContent: "space-between" }}>
              <span>Starting BPM</span>
              <span style={{ color: "#D946A8" }}>{bpmStart}</span>
            </label>
            <input
              type="range"
              min="95"
              max="120"
              value={bpmStart}
              onChange={(e) => setBpmStart(parseInt(e.target.value))}
              style={{
                width: "100%",
                height: "5px",
                marginTop: "0.35rem",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: "3px",
                outline: "none",
                accentColor: "#D946A8",
                cursor: "pointer"
              }}
            />
          </div>

          {/* BPM Peak */}
          <div>
            <label style={{ fontSize: "0.65rem", color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace", fontWeight: 600, display: "flex", justifyContent: "space-between" }}>
              <span>Peak BPM</span>
              <span style={{ color: "#D946A8" }}>{bpmPeak}</span>
            </label>
            <input
              type="range"
              min="120"
              max="140"
              value={bpmPeak}
              onChange={(e) => setBpmPeak(parseInt(e.target.value))}
              style={{
                width: "100%",
                height: "5px",
                marginTop: "0.35rem",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: "3px",
                outline: "none",
                accentColor: "#D946A8",
                cursor: "pointer"
              }}
            />
          </div>

          {/* Crowd Energy */}
          <div>
            <label style={{ fontSize: "0.65rem", color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace", fontWeight: 600 }}>
              Crowd Energy
            </label>
            <div style={{ display: "flex", gap: "0.35rem", marginTop: "0.35rem" }}>
              {["cold", "warm", "hot"].map(option => (
                <button
                  key={option}
                  onClick={() => setCrowdEnergy(option)}
                  style={{
                    flex: 1,
                    padding: "0.6rem 0.5rem",
                    backgroundColor: crowdEnergy === option ? "#D946A808" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${crowdEnergy === option ? "#D946A840" : "rgba(255,255,255,0.06)"}`,
                    borderRadius: "0.35rem",
                    color: crowdEnergy === option ? "#D946A8" : "#71717a",
                    cursor: "pointer",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontFamily: "monospace",
                    transition: "all 0.3s ease"
                  }}
                >
                  {energyLabels[option]}
                </button>
              ))}
            </div>
          </div>

          {/* Recognition */}
          <div>
            <label style={{ fontSize: "0.65rem", color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace", fontWeight: 600 }}>
              Recognition
            </label>
            <div style={{ display: "flex", gap: "0.35rem", marginTop: "0.35rem" }}>
              {["all-bangers", "deep-cuts"].map(option => (
                <button
                  key={option}
                  onClick={() => setRecognition(option)}
                  style={{
                    flex: 1,
                    padding: "0.6rem 0.5rem",
                    backgroundColor: recognition === option ? "#D946A808" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${recognition === option ? "#D946A840" : "rgba(255,255,255,0.06)"}`,
                    borderRadius: "0.35rem",
                    color: recognition === option ? "#D946A8" : "#71717a",
                    cursor: "pointer",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontFamily: "monospace",
                    transition: "all 0.3s ease"
                  }}
                >
                  {recognitionLabels[option].split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live preview */}
        <div style={{
          padding: "1rem",
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "0.75rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "0.65rem", color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace", fontWeight: 600 }}>
            Shape
          </h4>
          <svg width="100%" height="120" viewBox="0 0 150 110" preserveAspectRatio="xMidYMid meet" style={{ display: "block" }}>
            <defs>
              <linearGradient id="previewGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D946A8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#D946A8" stopOpacity="0.08" />
              </linearGradient>
            </defs>
            <path d={fillPath} fill="url(#previewGradient)" />
            <path d={pathData} stroke="#D946A8" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
          </svg>
          <div style={{ marginTop: "0.5rem", fontSize: "0.65rem", color: "#71717a", textAlign: "center", fontFamily: "monospace" }}>
            {bpmStart} → {bpmPeak} bpm
          </div>
        </div>
      </div>

      {/* Summary */}
      <div style={{
        marginTop: "1rem",
        padding: "1rem",
        backgroundColor: "rgba(217,70,168,0.08)",
        border: "1px solid rgba(217,70,168,0.3)",
        borderLeft: "3px solid #D946A8",
        borderRadius: "0.75rem",
        fontSize: "0.8rem",
        color: "#d4d4d8",
        lineHeight: 1.6,
        fontStyle: "italic"
      }}>
        <span style={{ color: "#D946A8", fontWeight: 600, fontStyle: "normal", fontFamily: "monospace" }}>Brief:</span> {theme} set, {bpmStart}–{bpmPeak} BPM, {crowdEnergy} crowd, {recognitionLabels[recognition].toLowerCase()}.
      </div>
    </div>
  );
}