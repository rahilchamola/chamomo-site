import { useState } from "react";

const transitions = [
  {
    trackA: { title: "Espresso", artist: "Sabrina Carpenter", bpm: 104, key: "Bm", energy: 6 },
    trackB: { title: "Levitating", artist: "Dua Lipa", bpm: 103, key: "Bm", energy: 7 },
    bpmDelta: -1,
    keyCompat: "perfect",
    rationale: "Identical tempo, same key. Smooth energy bridge — crowd stays locked before the BPM ramp."
  },
  {
    trackA: { title: "Levitating", artist: "Dua Lipa", bpm: 103, key: "Bm", energy: 7 },
    trackB: { title: "Taste", artist: "Sabrina Carpenter", bpm: 111, key: "C#m", energy: 8 },
    bpmDelta: 8,
    keyCompat: "compatible",
    rationale: "Largest BPM jump in the set — placed here because crowd commitment is high enough to absorb the shift. Relative minor key compatibility smooths it."
  }
];

function TrackCard({ track, showEnergy = true }) {
  return (
    <div style={{
      padding: "16px",
      backgroundColor: "#1a1a1a",
      borderRadius: "6px",
      border: "1px solid #333"
    }}>
      <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>
        {track.artist}
      </div>
      <div style={{ fontSize: "15px", fontWeight: "600", color: "#fff", marginBottom: "12px" }}>
        {track.title}
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
        fontSize: "13px"
      }}>
        <div>
          <div style={{ color: "#888", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.3px" }}>
            BPM
          </div>
          <div style={{ color: "#D946A8", fontSize: "18px", fontWeight: "700", marginTop: "4px" }}>
            {track.bpm}
          </div>
        </div>
        <div>
          <div style={{ color: "#888", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.3px" }}>
            Key
          </div>
          <div style={{ color: "#4A9EDE", fontSize: "16px", fontWeight: "700", marginTop: "4px" }}>
            {track.key}
          </div>
        </div>
      </div>
      {showEnergy && (
        <div style={{ marginTop: "12px" }}>
          <div style={{ color: "#888", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.3px", marginBottom: "6px" }}>
            Energy
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: "4px",
                  backgroundColor: i <= track.energy ? "#D946A8" : "#2a2a2a",
                  borderRadius: "2px"
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TransitionCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const transition = transitions[activeIndex];

  const getKeyCompatColor = () => {
    if (transition.keyCompat === "perfect") return "#4ADE80";
    if (transition.keyCompat === "compatible") return "#FBBF24";
    return "#EF4444";
  };

  const getKeyCompatLabel = () => {
    return transition.keyCompat.charAt(0).toUpperCase() + transition.keyCompat.slice(1);
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
        Track-to-Track Transitions
      </h3>

      {/* Navigation */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {transitions.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: i === activeIndex ? "#D946A8" : "#2a2a2a",
              border: `2px solid ${i === activeIndex ? "#D946A8" : "#444"}`,
              color: i === activeIndex ? "#000" : "#888",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "13px",
              transition: "all 0.2s"
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Transition display */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        gap: "16px",
        alignItems: "center",
        marginBottom: "24px"
      }}>
        {/* Track A */}
        <TrackCard track={transition.trackA} />

        {/* Arrow and info */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px"
        }}>
          <div style={{ fontSize: "24px", color: "#D946A8" }}>→</div>

          {/* BPM Delta badge */}
          <div style={{
            padding: "6px 10px",
            backgroundColor: transition.bpmDelta === 0 ? "#4ADE80" : transition.bpmDelta > 0 ? "#FBBF24" : "#4A9EDE",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: "600",
            color: "#000",
            whiteSpace: "nowrap"
          }}>
            {transition.bpmDelta > 0 ? "+" : ""}{transition.bpmDelta} BPM
          </div>

          {/* Key compatibility dot */}
          <div style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: getKeyCompatColor(),
            border: `2px solid ${getKeyCompatColor()}`,
            title: getKeyCompatLabel()
          }} />
        </div>

        {/* Track B */}
        <TrackCard track={transition.trackB} />
      </div>

      {/* Rationale */}
      <div style={{
        padding: "16px",
        backgroundColor: "#1a1a1a",
        borderRadius: "6px",
        borderLeft: "3px solid #D946A8",
        fontSize: "13px",
        color: "#bbb",
        lineHeight: "1.7",
        fontStyle: "italic",
        marginBottom: "16px"
      }}>
        {transition.rationale}
      </div>

      {/* Legend */}
      <div style={{
        padding: "12px",
        backgroundColor: "#1a1a1a",
        borderRadius: "6px",
        fontSize: "11px",
        color: "#666",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "16px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#4ADE80"
          }} />
          Perfect Key
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#FBBF24"
          }} />
          Compatible Key
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#EF4444"
          }} />
          Key Clash
        </div>
      </div>
    </div>
  );
}