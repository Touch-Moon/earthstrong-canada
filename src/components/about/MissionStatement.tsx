"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import SubpageHero from "@/components/shared/SubpageHero";

/* ━━ About 페이지 인트로 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   VisionHero와 동일 구조:
   ① SubpageHero (마키 타이틀)
   ② b-scroll-text 라인 리빌 (bg-white, container-main pb-20 md:pb-32)
   overlay color = #ffffff (white bg와 일치)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const missionLines = [
  "Earthstrong Canada was",
  "established in 2021 as a",
  "subsidiary of Floratine Products",
  "Group, bringing three decades",
  "of science-based nutrition to",
  "Canadian producers.",
];

export default function MissionStatement() {
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
      {/* ── 마키 타이틀 ── */}
      <SubpageHero title="About" duration={8} />

      {/* ── b-scroll-text 미션 ── */}
      <section className="es-mission">
        <div className="es-mission__inner">
          <div ref={textRef} className="es-mission__text-wrap">
            {missionLines.map((line, i) => (
              <div
                key={i}
                className="es-scroll-line es-mission__line"
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  lineHeight: 1.08,
                }}
              >
                {line}
                <div
                  className="es-scroll-overlay es-mission__overlay-bg"
                  style={{ backgroundColor: "#ffffff" }}
                />
              </div>
            ))}
            <p
              className="es-mission__desc"
              style={{ opacity: 0.85 }}
            >
              Serving agricultural producers across Manitoba, Saskatchewan, and
              Alberta with total nutrition management solutions — from soil
              analysis through nutrient application.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
