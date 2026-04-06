"use client";

import { useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap-config";

/* ━━ Stairs Page Transition ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Five columns rise and fall in a staggered sequence on every route change.
   Inspired by K72 Agency Portfolio style — implemented with GSAP.

   Layer structure:
     z-[101]: White background (flash guard — masks the new page before columns clear)
     z-[102]: Five dark columns (the stairs)

   [Initial Load]
     Columns start at scaleY:1 (fully covering the viewport)
     → Stagger left-to-right: scaleY 1→0 (curtain lifts)

   [Page Transition]
     Phase 1 — Cover:  columns scaleY 0→1, transformOrigin "bottom center"
     Phase 2 — Reveal: columns scaleY 1→0, transformOrigin "top center"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const NUM_COLUMNS = 5;
const STAGGER = 0.07;         // delay between each column
const COVER_DURATION = 0.45;  // time for each column to rise (cover phase)
const REVEAL_DURATION = 0.55; // time for each column to drop (reveal phase)

export default function PageLoader() {
  const bgRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isFirstLoadRef = useRef(true);
  const pathname = usePathname();

  const setColRef = (i: number) => (el: HTMLDivElement | null) => {
    colRefs.current[i] = el;
  };

  const playReveal = useCallback((isInitial: boolean) => {
    const bg = bgRef.current;
    const cols = colRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!bg || cols.length === 0) return;

    gsap.killTweensOf([bg, ...cols]);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(bg, { display: "none" });
        gsap.set(cols, { display: "none" });
      },
    });

    if (isInitial) {
      /* ── Initial load: columns already cover viewport → stagger reveal ── */
      gsap.set(bg, { display: "block", opacity: 1 });
      gsap.set(cols, {
        display: "block",
        scaleY: 1,
        transformOrigin: "top center",
      });

      // Fade out white background first (disappears behind columns)
      tl.to(bg, { opacity: 0, duration: 0.4, ease: "none" }, 0);

      // Columns lift left → right in stagger
      tl.to(
        cols,
        {
          scaleY: 0,
          duration: REVEAL_DURATION,
          ease: "power3.inOut",
          stagger: {
            each: STAGGER,
            from: "start",
          },
        },
        0.1
      );
    } else {
      /* ── Page transition: Cover → Reveal ── */

      // Phase 1: show flash guard + columns rise to cover
      gsap.set(bg, { display: "block", opacity: 0 });
      gsap.set(cols, {
        display: "block",
        scaleY: 0,
        transformOrigin: "bottom center",
      });

      // Flash background in immediately to prevent page flicker
      tl.to(bg, { opacity: 1, duration: 0.15, ease: "none" }, 0);

      // Columns stagger up (cover)
      tl.to(
        cols,
        {
          scaleY: 1,
          duration: COVER_DURATION,
          ease: "power3.in",
          stagger: {
            each: STAGGER,
            from: "start",
          },
        },
        0
      );

      // Phase 2: columns drop (reveal) — begins after the last column has fully risen
      const coverEnd = COVER_DURATION + STAGGER * (NUM_COLUMNS - 1);
      const revealStart = coverEnd + 0.05;

      // Switch transformOrigin inside the timeline to avoid immediate execution
      tl.call(() => {
        gsap.set(cols, { transformOrigin: "top center" });
      }, [], revealStart);

      tl.to(
        cols,
        {
          scaleY: 0,
          duration: REVEAL_DURATION,
          ease: "power3.inOut",
          stagger: {
            each: STAGGER,
            from: "start",
          },
        },
        revealStart
      );

      // Fade out white background after columns have cleared
      tl.to(
        bg,
        { opacity: 0, duration: 0.3, ease: "none" },
        revealStart + REVEAL_DURATION
      );
    }
  }, []);

  useEffect(() => {
    const isInitial = isFirstLoadRef.current;
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
    }
    playReveal(isInitial);
  }, [pathname, playReveal]);

  return (
    <>
      {/* White flash-guard background */}
      <div ref={bgRef} className="es-loader__bg" />

      {/* Five stair columns */}
      <div className="es-loader__stairs">
        {Array.from({ length: NUM_COLUMNS }).map((_, i) => (
          <div
            key={i}
            ref={setColRef(i)}
            className="es-loader__col"
          />
        ))}
      </div>
    </>
  );
}
