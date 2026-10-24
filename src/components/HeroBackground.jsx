import React from "react";

/**
 * Configuration for falling vertical lines
 * Easily customize density, speed, length, opacity, and glow
 */
const DEFAULT_LINES = [
  // Left side background (behind intro & headline)
  { left: "4%", width: "1.5px", height: "130px", duration: "5.5s", delay: "0s", opacity: 0.45, glow: true, hasDot: true },
  { left: "8%", width: "1px", height: "80px", duration: "7.2s", delay: "2.4s", opacity: 0.3, glow: false, hasDot: false, desktopOnly: true },
  { left: "13%", width: "1.5px", height: "160px", duration: "4.8s", delay: "1.1s", opacity: 0.55, glow: true, hasDot: true },
  { left: "18%", width: "1px", height: "95px", duration: "6.5s", delay: "3.7s", opacity: 0.35, glow: false, hasDot: false },
  { left: "23%", width: "1px", height: "140px", duration: "8.0s", delay: "0.5s", opacity: 0.4, glow: false, hasDot: true, desktopOnly: true },
  { left: "28%", width: "1.5px", height: "175px", duration: "5.2s", delay: "4.2s", opacity: 0.6, glow: true, hasDot: true },
  { left: "34%", width: "1px", height: "110px", duration: "6.8s", delay: "1.8s", opacity: 0.35, glow: false, hasDot: false },
  { left: "39%", width: "1px", height: "75px", duration: "7.5s", delay: "5.0s", opacity: 0.3, glow: false, hasDot: false, desktopOnly: true },

  // Center / transition zone
  { left: "45%", width: "1.5px", height: "150px", duration: "5.8s", delay: "2.9s", opacity: 0.5, glow: true, hasDot: true },
  { left: "51%", width: "1px", height: "100px", duration: "6.2s", delay: "0.8s", opacity: 0.35, glow: false, hasDot: false },
  { left: "57%", width: "1.5px", height: "180px", duration: "4.5s", delay: "3.3s", opacity: 0.55, glow: true, hasDot: true, desktopOnly: true },
  { left: "62%", width: "1px", height: "90px", duration: "7.0s", delay: "1.5s", opacity: 0.3, glow: false, hasDot: false },

  // Right side background (ambient behind portrait)
  { left: "68%", width: "1.5px", height: "165px", duration: "5.4s", delay: "4.7s", opacity: 0.45, glow: true, hasDot: true, desktopOnly: true },
  { left: "74%", width: "1px", height: "120px", duration: "6.6s", delay: "0.2s", opacity: 0.35, glow: false, hasDot: false },
  { left: "80%", width: "1.5px", height: "145px", duration: "5.0s", delay: "2.1s", opacity: 0.5, glow: true, hasDot: true },
  { left: "86%", width: "1px", height: "85px", duration: "7.8s", delay: "4.0s", opacity: 0.3, glow: false, hasDot: false, desktopOnly: true },
  { left: "92%", width: "1.5px", height: "170px", duration: "4.9s", delay: "1.3s", opacity: 0.55, glow: true, hasDot: true },
  { left: "97%", width: "1px", height: "105px", duration: "6.4s", delay: "3.0s", opacity: 0.35, glow: false, hasDot: false },
];

const HeroBackground = ({ lines = DEFAULT_LINES, showTracks = true }) => {
  return (
    <div className="hero-background" aria-hidden="true">
      {/* Subtle Vertical Guide Tracks */}
      {showTracks &&
        lines.map((line, idx) => (
          <div
            key={`track-${idx}`}
            className={`hero-track-line ${line.desktopOnly ? "desktop-only" : ""}`}
            style={{ left: line.left }}
          />
        ))}

      {/* Falling Purple Light Streaks */}
      {lines.map((line, idx) => (
        <div
          key={`streak-${idx}`}
          className={`falling-streak ${line.glow ? "has-glow" : ""} ${
            line.desktopOnly ? "desktop-only" : ""
          }`}
          style={{
            left: line.left,
            "--streak-width": line.width,
            "--streak-height": line.height,
            "--streak-duration": line.duration,
            "--streak-delay": line.delay,
            "--streak-opacity": line.opacity,
          }}
        >
          {line.hasDot && <span className="streak-dot" />}
        </div>
      ))}
    </div>
  );
};

export default HeroBackground;
