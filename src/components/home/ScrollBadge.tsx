"use client";

export default function ScrollBadge() {
  const handleClick = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className="es-scroll-badge"
      style={{ width: "106px", height: "106px" }}
      aria-label="Scroll down"
    >
      {/* Rotating circular text — SCSS handles es-spin animation */}
      <svg
        viewBox="0 0 100 100"
        width="106"
        height="106"
        className="es-scroll-badge__svg"
      >
        <defs>
          <path
            id="scrollDownCircle"
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text fill="white" fontSize="10" letterSpacing="3">
          <textPath href="#scrollDownCircle">
            SCROLL · SCROLL · SCROLL · SCROLL ·
          </textPath>
        </text>
      </svg>

      {/* Bouncing arrow — SCSS handles es-scroll-arrow animation */}
      <span
        className="es-scroll-badge__arrow"
        style={{ animation: "es-scroll-arrow 1.6s ease-in-out infinite" }}
      >
        ↓
      </span>
    </button>
  );
}
