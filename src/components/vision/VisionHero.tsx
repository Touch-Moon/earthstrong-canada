"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import SubpageHero from "@/components/shared/SubpageHero";

/* ━━ 비전 페이지 인트로 텍스트 라인 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   b-scroll-text 재현:
   - 대형 텍스트(~60px)를 라인별로 분리
   - 각 라인: white overlay가 scaleX(1→0)으로 왼→오른 방향 리빌
   - 타이밍은 라인별 순차 딜레이
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
      {/* ── 마키 타이틀 ── */}
      <SubpageHero title="Vision" duration={9} />

      {/* ── b-scroll-text 인트로 ── */}
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
