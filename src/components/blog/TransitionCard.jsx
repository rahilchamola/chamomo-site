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
      padding: "0.85rem",
      backgroundColor: "rgba(255,255,255,0.02)",
      borderRadius: "0.5rem",
      border: "1px solid rgba(255,255,255,0.06)"
    }}>
      <div style={{ fontSize: "0.65rem", color: "#71717a", marginBottom: "0.25rem", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {track.artist}
      </div>
      <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#f4f4f5", marginBottom: "0.5rem" }}>
        {track.title}
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.5rem",
        fontSize: "0.8rem"
      }}>
        <div>
          <div style={{ color: "#71717a", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace", fontWeight: 600, marginBottom: "0.25rem" }}>
            BPM
          </div>
          <div style={{ color: "#D946A8", fontSize: "1.1rem", fontWeight: 700, fontFamily: "monospace" }}>
            {track.bpm}
          </div>
        </div>
        <div>
          <div style={{ color: "#71717a", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace", fontWeight: 600, marginBottom: "0.25rem" }}>
            Key
          </div>
          <div style={{ color: "#d4d4d8", fontSize: "1rem", fontWeight: 700, fontFamily: "monospace" }}>
            {track.key}
          </div>
        </div>
      </div>
      {showEnergy && (
        <div style={{ marginTop: "0.5rem" }}>
          <div style={{ color: "#71717a", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace", fontWeight: 600, marginBottom: "0.35rem" }}>
            Energy
          </div>
          <div style={{ display: "flex", gap: "0.25rem" }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: "3px",
                  backgroundColor: i <= track.energy ? "#D946A8" : "rgba(255,255,255,0.05)",
                  borderRadius: "1.5px"
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
    if (transition.keyCompat === "perfect") return "#22c55e";
    if (transition.keyCompat === "compatible") return "#eab308";
    return "#ef4444";
  };

  const getKeyCompatLabel = () => {
    return transition.keyCompat.charAt(0).toUpperCase() + transition.keyCompat.slice(1);
  };

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
        Track-to-Track Transitions
      </h3>

      {/* Navigation */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {transitions.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: i === activeIndex ? "#D946A808" : "rgba(255,255,255,0.03)",
              border: `1px solid ${i === activeIndex ? "#D946A840" : "rgba(255,255,255,0.06)"}`,
              color: i === activeIndex ? "#D946A8" : "#71717a",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.75rem",
              transition: "all 0.3s ease",
              fontFamily: "monospace"
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
        gap: "0.75rem",
        alignItems: "center",
        marginBottom: "1rem"
      }}>
        {/* Track A */}
        <TrackCard track={transition.trackA} />

        {/* Arrow and info */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          minWidth: "50px"
        }}>
          <div style={{ fontSize: "1.2rem", color: "#D946A8", fontWeight: 600 }}>→</div>

          {/* BPM Delta badge */}
          <div style={{
            padding: "0.4rem 0.6rem",
            backgroundColor: transition.bpmDelta === 0 ? "rgba(34,197,94,0.2)" : transition.bpmDelta > 0 ? "rgba(234,179,8,0.2)" : "rgba(59,130,246,0.2)",
            border: `1px solid ${transition.bpmDelta === 0 ? "rgba(34,197,94,0.5)" : transition.bpmDelta > 0 ? "rgba(234,179,8,0.5)" : "rgba(59,130,246,0.5)"}`,
            borderRadius: "0.35rem",
            fontSize: "0.6rem",
            fontWeight: 600,
            color: transition.bpmDelta === 0 ? "#22c55e" : transition.bpmDelta > 0 ? "#eab308" : "#3b82f6",
            whiteSpace: "nowrap",
            fontFamily: "monospace"
          }}>
            {transition.bpmDelta > 0 ? "+" : ""}{transition.bpmDelta}
          </div>

          {/* Key compatibility dot */}
          <div style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            backgroundColor: getKeyCompatColor(),
            border: `2px solid ${getKeyCompatColor()}`,
            boxShadow: `0 0 8px ${getKeyCompatColor()}40`,
            title: getKeyCompatLabel()
          }} />
        </div>

        {/* Track B */}
        <TrackCard track={transition.trackB} />
      </div>

      {/* Rationale */}
      <div style={{
        padding: "1rem",
        backgroundColor: "rgba(217,70,168,0.08)",
        border: "1px solid rgba(217,70,168,0.3)",
        borderLeft: "3px solid #D946A8",
        borderRadius: "0.75rem",
        fontSize: "0.8rem",
        color: "#d4d4d8",
        lineHeight: 1.6,
        fontStyle: "italic",
        marginBottom: "0.75rem"
      }}>
        {transition.rationale}
      </div>

      {/* Legend */}
      <div style={{
        padding: "0.75rem",
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "0.5rem",
        fontSize: "0.65rem",
        color: "#71717a",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "0.75rem",
        fontFamily: "monospace",
        textTransform: "uppercase",
        letterSpacing: "0.08em"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <div style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#22c55e"
          }} />
          Perfect
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <div style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#eab308"
          }} />
          Compatible
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <div style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#ef4444"
          }} />
          Clash
        </div>
      </div>
    </div>
  );
}