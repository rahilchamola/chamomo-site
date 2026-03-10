export default function SeriesNav({ current, total, prevSlug, nextSlug, seriesTitle }) {
  const progressPct = (current / total) * 100;

  return (
    <div style={{
      maxWidth: "56rem",
      margin: "2.5rem auto",
      borderRadius: "1rem",
      border: "1px solid rgba(255,255,255,0.06)",
      backgroundColor: "rgba(255,255,255,0.02)",
      padding: "1.25rem 1.5rem",
    }}>
      {/* Top row: series title + part indicator */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <span style={{
          fontSize: "0.65rem",
          fontFamily: "monospace",
          color: "#818cf8",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          fontWeight: "600",
        }}>
          {seriesTitle || "Series"}
        </span>
        <span style={{
          fontSize: "0.7rem",
          fontFamily: "monospace",
          color: "#71717a",
        }}>
          Part {current} of {total}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{
        height: "3px",
        backgroundColor: "rgba(255,255,255,0.06)",
        borderRadius: "2px",
        marginBottom: "1rem",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${progressPct}%`,
          borderRadius: "2px",
          background: "linear-gradient(90deg, #818cf8, #c084fc, #ec4899)",
          transition: "width 0.5s ease",
        }} />
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {prevSlug ? (
          <a
            href={`/writing/${prevSlug}`}
            style={{
              fontSize: "0.8rem",
              color: "#a5b4fc",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.35rem 0.75rem",
              borderRadius: "0.5rem",
              backgroundColor: "rgba(129,140,248,0.08)",
              transition: "background-color 0.2s",
            }}
          >
            ← Previous
          </a>
        ) : (
          <span />
        )}

        {nextSlug ? (
          <a
            href={`/writing/${nextSlug}`}
            style={{
              fontSize: "0.8rem",
              color: "#a5b4fc",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.35rem 0.75rem",
              borderRadius: "0.5rem",
              backgroundColor: "rgba(129,140,248,0.08)",
              transition: "background-color 0.2s",
            }}
          >
            Next →
          </a>
        ) : (
          <span style={{
            fontSize: "0.75rem",
            fontFamily: "monospace",
            color: "#818cf8",
            padding: "0.35rem 0.75rem",
            borderRadius: "0.5rem",
            backgroundColor: "rgba(129,140,248,0.08)",
          }}>
            ✦ Series complete
          </span>
        )}
      </div>
    </div>
  );
}
