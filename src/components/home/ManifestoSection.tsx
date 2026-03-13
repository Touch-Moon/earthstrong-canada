"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import Link from "next/link";

const lines = [
  "BRINGING CANADIAN PRODUCERS",
  "THE NEXT LEVEL OF NUTRITION",
  "MANAGEMENT THAT MAXIMIZES",
  "YIELDS AND PROFITS.",
];

// Spotlight opacity: distance 0=active, 1,2,3+
const SPOTLIGHT_OPACITIES = [1.0, 0.34, 0.1, 0.06];

function getLineOpacity(lineIndex: number, activeIndex: number): number {
  const distance = Math.abs(lineIndex - activeIndex);
  return SPOTLIGHT_OPACITIES[Math.min(distance, 3)];
}

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Spotlight update: recalculate all line opacities based on activeIndex
      const updateSpotlight = (activeIndex: number) => {
        lineRefs.current.forEach((el, i) => {
          if (!el) return;
          el.style.opacity = String(getLineOpacity(i, activeIndex));
        });
      };

      // Initial state: all lines dimmed (0.06)
      lineRefs.current.forEach((el) => {
        if (el) el.style.opacity = "0.06";
      });

      // ScrollTrigger per line — spotlight moves when line enters viewport at 65%
      lineRefs.current.forEach((el, index) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 65%",
          onEnter: () => updateSpotlight(index),
          onEnterBack: () => updateSpotlight(index),
        });
      });

      // Subtext fade-up
      if (subtextRef.current) {
        gsap.fromTo(
          subtextRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: subtextRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // CTA button fade-up
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="es-manifesto">
      <div className="es-manifesto__inner">
        <div className="es-manifesto__text-wrap">
          {lines.map((line, i) => (
            <div key={i} className="es-manifesto__line">
              <span
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className="es-scroll-line es-manifesto__line-text"
                style={{
                  opacity: 0.06,
                  // Original: opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1)
                  transition: "opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1)",
                  willChange: "opacity",
                }}
              >
                {line}
              </span>
            </div>
          ))}

          <div className="es-manifesto__sub">
            <p
              ref={subtextRef}
              className="es-manifesto__sub-text"
              style={{ opacity: 0 }}
            >
              Partnering science-based nutrition solutions refined over three
              decades of research with cutting-edge soil analysis technology.
            </p>
          </div>

          <div ref={ctaRef} className="es-manifesto__cta" style={{ opacity: 0 }}>
            <Link href="/vision" className="es-manifesto__cta-link">
              Our Vision
              <span>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
