"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import SubpageHero from "@/components/shared/SubpageHero";

/* ━━ Vision page intro text lines ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Reproducing b-scroll-text:
   - Large text (~60px) split into individual lines
   - Each line: white overlay scaleX(1 -> 0) left-to-right reveal
   - Timing uses sequential per-line delay
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const introLines = [
  "Rooted in efficiency —",
  "our approach begins with",
  "understanding what your soil",
  "truly holds.",
];

export default function VisionHero() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = textRef.current;
    if (!container) return;

    const lines = container.querySelectorAll<HTMLElement>(".es-scroll-line");
    const overlays = container.querySelectorAll<HTMLElement>(".es-scroll-overlay");

    lines.forEach((line, i) => {
      const overlay = overlays[i];

      ScrollTrigger.create({
        trigger: line,
        start: "top 88%",
        once: true,
        onEnter: () => {
          const delay = i * 0.1;
          gsap.to(line, { opacity: 1, duration: 1.2, ease: "power2.out", delay });
          gsap.to(overlay, {
            scaleX: 0,
            transformOrigin: "100% 50%",
            duration: 1.2,
            ease: "power3.inOut",
            delay,
          });
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <>
      {/* ── Marquee title ── */}
      <SubpageHero title="Vision" duration={9} />

      {/* ── b-scroll-text intro ── */}
      <section className="es-vision-intro">
        <div className="es-vision-intro__inner">
          <div ref={textRef} className="es-vision-intro__text-wrap">
            {introLines.map((line, i) => (
              <div
                key={i}
                className="es-scroll-line es-vision-intro__line"
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  lineHeight: 1.08,
                }}
              >
                {line}
                <div
                  className="es-scroll-overlay es-vision-intro__overlay-bg"
                  style={{ backgroundColor: "#ffffff" }}
                />
              </div>
            ))}
            <p
              className="es-vision-intro__desc"
              style={{ opacity: 0.85 }}
            >
              Partnering science-based nutrition solutions refined over three
              decades of research with cutting-edge soil analysis technology.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
