"use client";

export default function ScrollUpBadge() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className="es-scroll-up-badge"
      aria-label="Scroll to top"
    >
      {/* Rotating text circle */}
      <svg
        viewBox="0 0 100 100"
        width="80"
        height="80"
        className="es-scroll-up-badge__svg"
      >
        <defs>
          <path
            id="scrollUpCircle"
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text fill="white" fontSize="10" letterSpacing="3">
          <textPath href="#scrollUpCircle">
            SCROLL UP · SCROLL UP · SCROLL UP ·
          </textPath>
        </text>
      </svg>
      {/* Arrow */}
      <span className="es-scroll-up-badge__arrow">↑</span>
    </button>
  );
}
