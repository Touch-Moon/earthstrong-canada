"use client";

import { useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap-config";

/* ━━ Site-wide Page Loader ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   2-layer mask system:
     Layer 2 (z-[100]): Black mask — scaleY curtain animation
     Layer 1 (z-[99]):  White background — opacity fade

   [Initial Load]
     Already fully covered; only the reveal runs (timed with HeroSlider)
     Black mask: scaleY 1→0 (1s, curtain rises)
     White background: opacity 1→0 (0.6s, starts at t=0.5)

   [Page Transition]
     Phase 1 - Cover (prevent sudden black flash): white bg fades in → black mask slides down
     Phase 2 - Reveal: black mask slides up → white bg fades out
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function PageLoader() {
  const maskRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const isFirstLoadRef = useRef(true);
  const pathname = usePathname();

  const playReveal = useCallback((isInitial: boolean) => {
    const mask = maskRef.current;
    const bg = bgRef.current;
    if (!mask || !bg) return;

    gsap.killTweensOf([mask, bg]);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(mask, { display: "none" });
        gsap.set(bg, { display: "none" });
      },
    });

    if (isInitial) {
      /* ── Initial load: already covered → reveal immediately ── */
      gsap.set(mask, {
        display: "block",
        scaleY: 1,
        transformOrigin: "top center",
      });
      gsap.set(bg, { display: "block", opacity: 1 });

      // Black mask slides up (curtain opens)
      tl.to(mask, { scaleY: 0, duration: 1, ease: "power2.inOut" }, 0);
      // White background fades out
      tl.to(bg, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 0.5);
    } else {
      /* ── Page transition: smoothly cover then reveal ── */

      // Phase 1: White background fades in + black mask slides down from top
      gsap.set(bg, { display: "block", opacity: 0 });
      gsap.set(mask, {
        display: "block",
        scaleY: 0,
        transformOrigin: "top center",
      });

      // White background: quick fade-in (hide new page content)
      tl.to(bg, { opacity: 1, duration: 0.25, ease: "none" }, 0);
      // Black mask: slides down from top (0.1s delay — white bg goes first)
      tl.to(mask, { scaleY: 1, duration: 0.45, ease: "power2.in" }, 0.1);

      // Phase 2: Black mask slides up (curtain opens)
      tl.to(mask, { scaleY: 0, duration: 1, ease: "power2.inOut" }, 0.65);
      // White background fades out
      tl.to(bg, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 1.15);
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
      {/* Layer 1: White background (lower z) — fades out to reveal content */}
      <div
        ref={bgRef}
        className="es-loader__bg"
        style={{ zIndex: 99 }}
      />
      {/* Layer 2: Black mask (higher z) — scaleY curtain reveals white background */}
      <div
        ref={maskRef}
        className="es-loader__mask"
        style={{ zIndex: 100, transformOrigin: "top center" }}
      />
    </>
  );
}
