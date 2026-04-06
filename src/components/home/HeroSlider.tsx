"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import Image from "next/image";
import ScrollBadge from "./ScrollBadge";

/* ━━ Slide Data ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const slides = [
  {
    image: "/images/hero/homepage-hero.webp",
    title: "Maximizing Yields & Profits",
    subtitle: "Advanced crop nutrition for Canadian farmers",
  },
  {
    image: "/images/backgrounds/large-section-bg.webp",
    title: "Science-Based Soil Solutions",
    subtitle: "Patented Solumetrix technology",
  },
  {
    image: "/images/hero/hero-slide-3.webp",
    title: "Rooted In Efficiency",
    subtitle: "Total Nutrition Management",
  },
];

const INTERVAL = 5000; // ms — shared by dot progress bar and auto-advance

/* ━━ Main Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function HeroSlider() {
  const sectionRef   = useRef<HTMLElement>(null);
  const mediaRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef      = useRef<HTMLDivElement>(null);
  const dotFillRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const badgeRef     = useRef<HTMLDivElement>(null);

  const currentRef      = useRef(0);
  const [current, setCurrent] = useState(0);
  const isAnimatingRef  = useRef(false);
  const progressTwRef   = useRef<gsap.core.Tween | null>(null);

  /* ── forward refs (prevent stale closures) ──────────────── */
  const goToRef          = useRef<(index: number) => void>(() => {});
  const startProgressRef = useRef<(index: number) => void>(() => {});

  /* ── Start dot progress bar ─────────────────────────────────
     Fills the dot for slide [index] from scaleX 0→1 over INTERVAL ms,
     then auto-advances to the next slide on completion.
  ────────────────────────────────────────────────────────── */
  const startProgress = useCallback((index: number) => {
    // Kill any in-progress tween
    if (progressTwRef.current) progressTwRef.current.kill();

    // Reset all fills
    dotFillRefs.current.forEach((fill) => {
      if (fill) gsap.set(fill, { scaleX: 0 });
    });

    const fill = dotFillRefs.current[index];
    if (!fill) return;

    progressTwRef.current = gsap.fromTo(
      fill,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: INTERVAL / 1000,
        ease: "none",
        onComplete: () => {
          const next = (index + 1) % slides.length;
          goToRef.current(next);
        },
      }
    );
  }, []);

  startProgressRef.current = startProgress;

  /* ── Slide transition ───────────────────────────────────────
     Timing extracted from the original (generousbranding.com):
     t=0.0  Outgoing image: opacity 1→0.2, xPercent 0→-10 (1.3s, power2.inOut)
     t=0.0  Outgoing text: opacity→0 (0.3s)
     t=0.1  Incoming image: xPercent 100→0 (1.2s, power2.inOut)
     t=0.8  Incoming words: yPercent 100→0, opacity 0→1 (1s, stagger 0.08)
     t=1.2  Incoming subtitle: opacity/yPercent (0.5s)
  ────────────────────────────────────────────────────────── */
  const goTo = useCallback((index: number) => {
    if (isAnimatingRef.current || index === currentRef.current) return;
    isAnimatingRef.current = true;

    // Pause progress bar (stop during transition)
    if (progressTwRef.current) progressTwRef.current.kill();

    const oldIndex = currentRef.current;
    currentRef.current = index;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;

        // Clean up the outgoing slide
        const oldMedia = mediaRefs.current[oldIndex];
        if (oldMedia) gsap.set(oldMedia, { opacity: 0, xPercent: 0, zIndex: 1 });

        // Normalize z-index of the incoming slide
        const newMedia = mediaRefs.current[index];
        if (newMedia) gsap.set(newMedia, { zIndex: 2 });

        setCurrent(index);
        // Start progress bar for the new slide
        startProgressRef.current(index);
      },
    });

    // ── Outgoing slide ──
    const oldMedia = mediaRefs.current[oldIndex];
    if (oldMedia) {
      tl.fromTo(
        oldMedia,
        { opacity: 1, xPercent: 0, zIndex: 2 },
        { opacity: 0.2, xPercent: -10, duration: 1.3, ease: "power2.inOut" },
        0
      );
    }

    const oldContent = contentRefs.current[oldIndex];
    if (oldContent) {
      const oldWords = oldContent.querySelectorAll<HTMLElement>(".es-hero__word");
      const oldSub   = oldContent.querySelector<HTMLElement>(".es-hero__subtitle");
      if (oldWords.length) {
        tl.to(
          oldWords,
          { opacity: 0, yPercent: -30, duration: 0.4, ease: "power2.in" },
          0
        );
      }
      if (oldSub) {
        tl.to(oldSub, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0);
      }
    }

    // ── Incoming slide ──
    const newMedia = mediaRefs.current[index];
    if (newMedia) {
      gsap.set(newMedia, { opacity: 1, xPercent: 100, zIndex: 3 });
      tl.to(newMedia, { xPercent: 0, duration: 1.2, ease: "power2.inOut" }, 0.1);
    }

    const newContent = contentRefs.current[index];
    if (newContent) {
      const newWords = newContent.querySelectorAll<HTMLElement>(".es-hero__word");
      const newSub   = newContent.querySelector<HTMLElement>(".es-hero__subtitle");

      if (newWords.length) {
        tl.fromTo(
          newWords,
          { opacity: 0, yPercent: 100 },
          { opacity: 1, yPercent: 0, duration: 1, ease: "power2.inOut", stagger: 0.08 },
          0.8
        );
      }
      if (newSub) {
        tl.fromTo(
          newSub,
          { opacity: 0, yPercent: 10 },
          { opacity: 1, yPercent: 0, duration: 0.5, ease: "power2.inOut" },
          1.2
        );
      }
    }
  }, []);

  goToRef.current = goTo;

  /* ── Intro timeline (runs once on page load) ────────────── */
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Reset flags on Fast Refresh / Strict Mode remount
      isAnimatingRef.current = false;
      if (progressTwRef.current) progressTwRef.current.kill();

      const tl = gsap.timeline();

      // 1. Fade in first slide image
      const firstMedia = mediaRefs.current[0];
      if (firstMedia) {
        tl.to(firstMedia, { opacity: 1, duration: 1.35, ease: "none" }, 0);
      }

      // 2. Title words reveal bottom→top
      const firstContent = contentRefs.current[0];
      if (firstContent) {
        const words    = firstContent.querySelectorAll<HTMLElement>(".es-hero__word");
        const subtitle = firstContent.querySelector<HTMLElement>(".es-hero__subtitle");

        if (words.length) {
          tl.fromTo(
            words,
            { opacity: 0, yPercent: 100 },
            { opacity: 1, yPercent: 0, duration: 1.2, ease: "power2.inOut", stagger: 0.08 },
            0.1
          );
        }
        if (subtitle) {
          tl.fromTo(
            subtitle,
            { opacity: 0, yPercent: 10 },
            { opacity: 1, yPercent: 0, duration: 0.5, ease: "power2.inOut" },
            0.5
          );
        }
      }

      // 3. Scroll badge entrance
      if (badgeRef.current) {
        tl.to(badgeRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.5);
      }

      // 4. Dots staggered entrance
      if (dotsRef.current) {
        const dots = dotsRef.current.querySelectorAll<HTMLElement>(".es-hero__dot");
        if (dots.length) {
          tl.fromTo(
            dots,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 },
            0.7
          );
        }
      }

      // 5. Start first slide progress bar after intro completes
      tl.call(() => startProgressRef.current(0), [], ">");
    },
    { scope: sectionRef }
  );

  /* ━━ Render ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  return (
    <section ref={sectionRef} className="es-hero">
      {/* ── Slide image layers ── */}
      {slides.map((slide, i) => (
        <div
          key={i}
          ref={(el) => { mediaRefs.current[i] = el; }}
          className="es-hero__media"
          style={{ zIndex: i === 0 ? 2 : 1 }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* ── Dark gradient overlay (decorative — hidden from screen readers) ── */}
      <div className="es-hero__overlay" aria-hidden="true" />

      {/* ── Per-slide text content ── */}
      {slides.map((slide, i) => (
        <div
          key={i}
          ref={(el) => { contentRefs.current[i] = el; }}
          className="es-hero__content"
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            // Ensure spacing from dots — dots at bottom:36px + sufficient margin
            padding: "0 40px 110px",
            pointerEvents: i === current ? "auto" : "none",
          }}
        >
          <div className="es-hero__content-inner">
            <p className="es-hero__subtitle">{slide.subtitle}</p>
            <h1
              className="es-hero__title"
              style={{ clipPath: "inset(-0.075em -1em)" }}
            >
              {slide.title.split(" ").map((word, wi) => (
                <span
                  key={wi}
                  className="es-hero__word"
                  style={{ marginRight: "0.25em", willChange: "opacity, transform" }}
                >
                  {word}
                </span>
              ))}
            </h1>
          </div>
        </div>
      ))}

      {/* ── Dot progress bar pagination ── */}
      <div
        ref={dotsRef}
        className="es-hero__dots"
        style={{ bottom: "36px", left: "40px" }}
      >
        <div className="es-hero__dots-row" role="tablist" aria-label="Hero slides">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`es-hero__dot${i === current ? " es-hero__dot--active" : ""}`}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1} of ${slides.length}`}
            >
              {/* Fill nested inside track (overflow:hidden) — height and rounding match exactly */}
              <span className="es-hero__dot-track">
                <span
                  ref={(el) => { dotFillRefs.current[i] = el; }}
                  className="es-hero__dot-fill"
                />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Scroll badge ── */}
      <div
        ref={badgeRef}
        className="es-hero__badge"
        style={{ bottom: "36px", right: "40px" }}
      >
        <ScrollBadge />
      </div>
    </section>
  );
}
