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

  // Calculate gathering phase length based on crowd energy
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

  const energyLabels = {
    "cold": "🥶 Cold",
    "warm": "🔥 Warm",
    "hot": "🌡️ Hot"
  };

  const recognitionLabels = {
    "all-bangers": "All Bangers",
    "deep-cuts": "Deep Cuts"
  };

  return (
    <div style={{
      padding: "24px",
      backgroundColor: "#0f0f0f",
      borderRadius: "8px",
      color: "#fff",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <h3 style={{ margin: "0 0 20px 0", fontSize: "18px", fontWeight: "600" }}>
        Brief Builder
      </h3>

      {/* Presets */}
      <div style={{ marginBottom: "24px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {presets.map((preset, i) => (
          <button
            key={i}
            onClick={() => applyPreset(preset)}
            style={{
              padding: "8px 12px",
              backgroundColor: "#D946A830",
              border: "1px solid #D946A850",
              borderRadius: "4px",
              color: "#D946A8",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "500",
              transition: "all 0.2s",
              textTransform: "uppercase",
              letterSpacing: "0.3px"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#D946A850";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#D946A830";
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
        gap: "24px"
      }}>
        {/* Left: Inputs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Theme display */}
          <div>
            <label style={{ fontSize: "12px", color: "#888", textTransform: "uppercase", letterSpacing: "0.3px" }}>
              Theme
            </label>
            <div style={{
              marginTop: "8px",
              padding: "12px",
              backgroundColor: "#1a1a1a",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#D946A8"
            }}>
              {theme}
            </div>
          </div>

          {/* BPM Start */}
          <div>
            <label style={{ fontSize: "12px", color: "#888", textTransform: "uppercase", letterSpacing: "0.3px" }}>
              Starting BPM: {bpmStart}
            </label>
            <input
              type="range"
              min="95"
              max="120"
              value={bpmStart}
              onChange={(e) => setBpmStart(parseInt(e.target.value))}
              style={{
                width: "100%",
                height: "6px",
                marginTop: "8px",
                backgroundColor: "#2a2a2a",
                borderRadius: "3px",
                outline: "none",
                accentColor: "#D946A8"
              }}
            />
          </div>

          {/* BPM Peak */}
          <div>
            <label style={{ fontSize: "12px", color: "#888", textTransform: "uppercase", letterSpacing: "0.3px" }}>
              Peak BPM: {bpmPeak}
            </label>
            <input
              type="range"
              min="120"
              max="140"
              value={bpmPeak}
              onChange={(e) => setBpmPeak(parseInt(e.target.value))}
              style={{
                width: "100%",
                height: "6px",
                marginTop: "8px",
                backgroundColor: "#2a2a2a",
                borderRadius: "3px",
                outline: "none",
                accentColor: "#D946A8"
              }}
            />
          </div>

          {/* Crowd Energy */}
          <div>
            <label style={{ fontSize: "12px", color: "#888", textTransform: "uppercase", letterSpacing: "0.3px" }}>
              Crowd Energy
            </label>
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              {["cold", "warm", "hot"].map(option => (
                <button
                  key={option}
                  onClick={() => setCrowdEnergy(option)}
                  style={{
                    flex: 1,
                    padding: "8px",
                    backgroundColor: crowdEnergy === option ? "#D946A8" : "#2a2a2a",
                    border: `1px solid ${crowdEnergy === option ? "#D946A8" : "#444"}`,
                    borderRadius: "4px",
                    color: crowdEnergy === option ? "#000" : "#888",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "500",
                    transition: "all 0.2s"
                  }}
                >
                  {energyLabels[option]}
                </button>
              ))}
            </div>
          </div>

          {/* Recognition */}
          <div>
            <label style={{ fontSize: "12px", color: "#888", textTransform: "uppercase", letterSpacing: "0.3px" }}>
              Recognition
            </label>
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              {["all-bangers", "deep-cuts"].map(option => (
                <button
                  key={option}
                  onClick={() => setRecognition(option)}
                  style={{
                    flex: 1,
                    padding: "8px",
                    backgroundColor: recognition === option ? "#D946A8" : "#2a2a2a",
                    border: `1px solid ${recognition === option ? "#D946A8" : "#444"}`,
                    borderRadius: "4px",
                    color: recognition === option ? "#000" : "#888",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "500",
                    transition: "all 0.2s"
                  }}
                >
                  {recognitionLabels[option]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live preview */}
        <div style={{
          padding: "20px",
          backgroundColor: "#1a1a1a",
          borderRadius: "6px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <h4 style={{ margin: "0 0 16px 0", fontSize: "13px", color: "#888", textTransform: "uppercase", letterSpacing: "0.3px" }}>
            Set Shape Preview
          </h4>
          <svg width="100%" height="180" viewBox="0 0 150 110" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="previewGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D946A8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#D946A8" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path d={fillPath} fill="url(#previewGradient)" />
            <path d={pathData} stroke="#D946A8" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
          </svg>
          <div style={{ marginTop: "12px", fontSize: "11px", color: "#666", textAlign: "center" }}>
            BPM: {bpmStart} → {bpmPeak}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div style={{
        marginTop: "24px",
        padding: "16px",
        backgroundColor: "#1a1a1a",
        borderRadius: "6px",
        fontSize: "12px",
        color: "#aaa",
        lineHeight: "1.6"
      }}>
        <strong style={{ color: "#D946A8" }}>Brief Summary:</strong> {theme} set, {bpmStart}–{bpmPeak} BPM, {crowdEnergy} crowd, {recognitionLabels[recognition].toLowerCase()}.
      </div>
    </div>
  );
}