import { useState } from "react";

const LAYERS = [
  {
    id: "runtime",
    label: "Runtime Engine",
    subtitle: "Session state, AI pipeline, effect processing, validation",
    color: "#f43f5e",
    badge: "L3",
    details: [
      "Multi-step AI pipeline (simulate → direct → narrate)",
      "State mutation engine processes typed effects",
      "5-layer coherence validation",
      "Provider-agnostic AI abstraction",
    ],
  },
  {
    id: "dynamic",
    label: "Cast & Scenario",
    subtitle: "Dynamic character states, relationships, quest progression",
    color: "#c084fc",
    badge: "L2",
    details: [
      "6-dimensional relationship model per character pair",
      "Autonomous NPC behavior between player turns",
      "Quest system with typed objectives",
      "Progressive skill/ability discovery",
    ],
  },
  {
    id: "world",
    label: "World Definition",
    subtitle: "Static typed modules: lore, geography, characters, arcs, rules",
    color: "#818cf8",
    badge: "L1",
    details: [
      "TypeScript modules — type-safe, version-controllable",
      "World protocols: toggleable game systems",
      "Director persona selection (AI narrative personality)",
      "Shareable and reproducible",
    ],
  },
];

const PIPELINE_STEPS = [
  { label: "Player Input", description: "Choice selection or free text", color: "#34d399", tag: "INPUT" },
  { label: "Simulation", description: "What changes in the world?", sublabel: "Fast model, structured JSON", color: "#818cf8", tag: "STEP 1" },
  { label: "Direction", description: "What should the player experience?", sublabel: "Scene setup, choice framing", color: "#c084fc", tag: "STEP 2" },
  { label: "Narration", description: "How should this be written?", sublabel: "Quality model, literary prose", color: "#f43f5e", tag: "STEP 3" },
  { label: "Player Experience", description: "Cinematic story with choices", color: "#f59e0b", tag: "OUTPUT" },
];

export default function ArchitectureDiagram() {
  const [activeLayer, setActiveLayer] = useState(null);
  const [view, setView] = useState("layers");

  return (
    <div style={{ maxWidth: "56rem", margin: "3rem auto" }}>
      {/* View toggle */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", justifyContent: "center" }}>
        {[
          { id: "layers", label: "Three-Layer Architecture" },
          { id: "pipeline", label: "AI Pipeline" },
        ].map((v) => {
          const isActive = view === v.id;
          return (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "9999px",
                fontSize: "0.8rem",
                fontFamily: "monospace",
                fontWeight: isActive ? "600" : "400",
                cursor: "pointer",
                border: "none",
                backgroundColor: isActive ? "rgba(129,140,248,0.15)" : "rgba(255,255,255,0.03)",
                color: isActive ? "#a5b4fc" : "#71717a",
                transition: "all 0.2s ease",
              }}
            >
              {v.label}
            </button>
          );
        })}
      </div>

      {view === "layers" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {LAYERS.map((layer, i) => {
            const isActive = activeLayer === i;
            return (
              <div
                key={layer.id}
                onClick={() => setActiveLayer(isActive ? null : i)}
                style={{ cursor: "pointer" }}
              >
                <div style={{
                  borderRadius: "1rem",
                  border: `1px solid ${isActive ? layer.color + "40" : "rgba(255,255,255,0.06)"}`,
                  backgroundColor: isActive ? `${layer.color}08` : "rgba(255,255,255,0.02)",
                  padding: "1.25rem 1.5rem",
                  transition: "all 0.3s ease",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      width: "2.25rem",
                      height: "2.25rem",
                      borderRadius: "0.625rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.7rem",
                      fontWeight: "800",
                      fontFamily: "monospace",
                      color: "#fff",
                      backgroundColor: `${layer.color}30`,
                      border: `1px solid ${layer.color}40`,
                      flexShrink: 0,
                    }}>
                      {layer.badge}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#f4f4f5", margin: 0 }}>{layer.label}</h3>
                      <p style={{ fontSize: "0.8rem", color: "#71717a", margin: "0.15rem 0 0 0" }}>{layer.subtitle}</p>
                    </div>
                  </div>

                  {isActive && (
                    <div style={{ marginTop: "1rem", paddingLeft: "3rem" }}>
                      {layer.details.map((d, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.4rem" }}>
                          <span style={{ color: layer.color, fontSize: "0.5rem", marginTop: "0.35rem" }}>●</span>
                          <span style={{ fontSize: "0.85rem", color: "#d4d4d8", lineHeight: 1.5 }}>{d}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Pipeline view */
        <div style={{ position: "relative", paddingLeft: "2rem" }}>
          {/* Vertical connector */}
          <div style={{
            position: "absolute",
            left: "0.75rem",
            top: "0.75rem",
            bottom: "0.75rem",
            width: "2px",
            background: "linear-gradient(180deg, #34d399, #818cf8, #c084fc, #f43f5e, #f59e0b)",
            opacity: 0.3,
            borderRadius: "1px",
          }} />

          {PIPELINE_STEPS.map((step, i) => (
            <div key={step.label} style={{ display: "flex", alignItems: "flex-start", position: "relative", marginBottom: i < PIPELINE_STEPS.length - 1 ? "0.75rem" : 0 }}>
              {/* Node */}
              <div style={{
                position: "absolute",
                left: "-2rem",
                top: "1rem",
                width: "1.5rem",
                height: "1.5rem",
                borderRadius: "50%",
                border: `2px solid ${step.color}`,
                backgroundColor: `${step.color}15`,
                zIndex: 2,
              }} />

              {/* Card */}
              <div style={{
                flex: 1,
                borderRadius: "1rem",
                border: `1px solid ${step.color}20`,
                backgroundColor: `${step.color}06`,
                padding: "1rem 1.25rem",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                  <span style={{
                    fontSize: "0.6rem",
                    fontFamily: "monospace",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: step.color,
                    padding: "0.2rem 0.5rem",
                    borderRadius: "0.25rem",
                    backgroundColor: `${step.color}15`,
                  }}>
                    {step.tag}
                  </span>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#f4f4f5", margin: 0 }}>{step.label}</h4>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#a1a1aa", margin: 0, lineHeight: 1.5 }}>{step.description}</p>
                {step.sublabel && (
                  <p style={{ fontSize: "0.7rem", fontFamily: "monospace", color: "#52525b", margin: "0.25rem 0 0 0" }}>{step.sublabel}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
