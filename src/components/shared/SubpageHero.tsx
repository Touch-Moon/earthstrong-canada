"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-config";

/* ━━ SubpageHero ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Reproducing generousbranding.com .s-marquee-title--hero:
   - Large uppercase title filling the full viewport width
   - Infinite left-to-right scroll via CSS keyframes (translateX -10% -> -110%)
   - On mount GSAP: word translateY(83%) -> 0 reveal
   - 2 ghosts: continuous loop so text never breaks
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
interface SubpageHeroProps {
  title: string;
  /** Marquee speed (seconds). Shorter text should use faster speeds */
  duration?: number;
}

export default function SubpageHero({ title, duration = 10 }: SubpageHeroProps) {
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const word = wordRef.current;
    if (!word) return;

    const items = word.querySelectorAll<HTMLElement>(".es-word-inner, .es-word-ghost");
    if (!items.length) return;

    gsap.to(items, {
      y: 0,
      duration: 1.2,
      ease: "power2.out",
      delay: 0.3,
    });
  }, []);

  return (
    /* Top margin matching header height (138px) */
    <div style={{ paddingTop: "138px" }}>
      <h1 className="es-marquee-title">
        <span
          ref={wordRef}
          className="es-marquee-word"
          style={{ "--duration": `${duration}s` } as React.CSSProperties}
        >
          <span className="es-word-inner">{title}</span>
          {/* ghost 1 — left: 100% */}
          <span className="es-word-ghost" aria-hidden="true" data-title={title} />
          {/* ghost 2 — left: 200% */}
          <span className="es-word-ghost" aria-hidden="true" data-title={title} />
        </span>
      </h1>
    </div>
  );
}
