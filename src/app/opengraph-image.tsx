import { ImageResponse } from "next/og";

export const alt = "Deezaina Studios — Diagnose Before Design";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050505",
          padding: "80px",
          color: "#F4F2EC",
          fontFamily: "system-ui, sans-serif",
          border: "12px solid #121212",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                backgroundColor: "#E61515",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: "24px",
                fontWeight: 900,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              DEEZAINA STUDIOS
            </span>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            {["STRATEGY", "BRANDING", "WEB"].map((item) => (
              <span
                key={item}
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  padding: "6px 14px",
                  border: "1px solid rgba(244, 242, 236, 0.2)",
                  color: "#F4F2EC",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 800,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#E61515",
            }}
          >
            CORE CREED
          </span>
          <h1
            style={{
              fontSize: "84px",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            DIAGNOSE BEFORE DESIGN.
          </h1>
        </div>

        {/* Bottom Subtitle / Tagline */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "2px solid rgba(244, 242, 236, 0.15)",
            paddingTop: "32px",
          }}
        >
          <p
            style={{
              fontSize: "22px",
              color: "rgba(244, 242, 236, 0.65)",
              maxWidth: "680px",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            We help ambitious businesses become easier to understand, trust, and
            choose.
          </p>

          <span
            style={{
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#E61515",
              fontFamily: "monospace",
            }}
          >
            WWW.DEEZAINA.PRO
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
