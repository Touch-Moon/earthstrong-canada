"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import Image from "next/image";
import ScrollBadge from "./ScrollBadge";

/* ━━ 슬라이드 데이터 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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
    image: "/images/hero/hero-slide-3.jpg",
    title: "Rooted In Efficiency",
    subtitle: "Total Nutrition Management",
  },
];

const INTERVAL = 5000; // ms — 도트 진행 바와 자동 전환 공용

/* ━━ 메인 컴포넌트 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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

  /* ── forward refs (stale closure 방지) ──────────────────── */
  const goToRef          = useRef<(index: number) => void>(() => {});
  const startProgressRef = useRef<(index: number) => void>(() => {});

  /* ── 도트 진행 바 시작 ──────────────────────────────────────
     index번 슬라이드의 fill을 INTERVAL ms 동안 scaleX 0→1 로 채우고
     완료되면 다음 슬라이드로 자동 전환.
  ────────────────────────────────────────────────────────── */
  const startProgress = useCallback((index: number) => {
    // 기존 진행 중인 tween 종료
    if (progressTwRef.current) progressTwRef.current.kill();

    // 모든 fill 리셋
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

  /* ── 슬라이드 전환 ──────────────────────────────────────────
     원본 (generousbranding.com) 타이밍 추출:
     t=0.0  나가는 이미지: opacity 1→0.2, xPercent 0→-10 (1.3s, power2.inOut)
     t=0.0  나가는 텍스트: opacity→0 (0.3s)
     t=0.1  들어오는 이미지: xPercent 100→0 (1.2s, power2.inOut)
     t=0.8  들어오는 단어: yPercent 100→0, opacity 0→1 (1s, stagger 0.08)
     t=1.2  들어오는 서브타이틀: opacity/yPercent (0.5s)
  ────────────────────────────────────────────────────────── */
  const goTo = useCallback((index: number) => {
    if (isAnimatingRef.current || index === currentRef.current) return;
    isAnimatingRef.current = true;

    // 진행 bar 일시 중지 (전환 중에는 멈춤)
    if (progressTwRef.current) progressTwRef.current.kill();

    const oldIndex = currentRef.current;
    currentRef.current = index;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;

        // 나간 슬라이드 정리
        const oldMedia = mediaRefs.current[oldIndex];
        if (oldMedia) gsap.set(oldMedia, { opacity: 0, xPercent: 0, zIndex: 1 });

        // 들어온 슬라이드 z-index 정규화
        const newMedia = mediaRefs.current[index];
        if (newMedia) gsap.set(newMedia, { zIndex: 2 });

        setCurrent(index);
        // 새 슬라이드의 진행 바 시작
        startProgressRef.current(index);
      },
    });

    // ── 나가는 슬라이드 ──
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

    // ── 들어오는 슬라이드 ──
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

  /* ── 인트로 타임라인 (페이지 로드 1회) ─────────────────────── */
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Fast Refresh / Strict Mode 재마운트 시 플래그 초기화
      isAnimatingRef.current = false;
      if (progressTwRef.current) progressTwRef.current.kill();

      const tl = gsap.timeline();

      // 1. 첫 슬라이드 이미지 페이드인
      const firstMedia = mediaRefs.current[0];
      if (firstMedia) {
        tl.to(firstMedia, { opacity: 1, duration: 1.35, ease: "none" }, 0);
      }

      // 2. 타이틀 단어 아래→위 리빌
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

      // 3. 스크롤 배지 등장
      if (badgeRef.current) {
        tl.to(badgeRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.5);
      }

      // 4. 도트 순차 등장
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

      // 5. 인트로 완료 후 첫 슬라이드 진행 바 시작
      tl.call(() => startProgressRef.current(0), [], ">");
    },
    { scope: sectionRef }
  );

  /* ━━ 렌더링 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  return (
    <section ref={sectionRef} className="es-hero">
      {/* ── 슬라이드 이미지 레이어 ── */}
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
            priority={i < 2}
            sizes="100vw"
          />
        </div>
      ))}

      {/* ── 어두운 그라디언트 오버레이 ── */}
      <div className="es-hero__overlay" />

      {/* ── 슬라이드별 텍스트 콘텐츠 ── */}
      {slides.map((slide, i) => (
        <div
          key={i}
          ref={(el) => { contentRefs.current[i] = el; }}
          className="es-hero__content"
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            // 도트와의 간격 확보 — 도트 bottom:36px + 충분한 여백
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

      {/* ── 도트 진행 바 페이지네이션 ── */}
      <div
        ref={dotsRef}
        className="es-hero__dots"
        style={{ bottom: "36px", left: "40px" }}
      >
        <div className="es-hero__dots-row">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`es-hero__dot${i === current ? " es-hero__dot--active" : ""}`}
              aria-label={`Go to slide ${i + 1}`}
            >
              {/* 트랙 (overflow:hidden) 안에 fill을 중첩 — 높이·라운드 완전 일치 */}
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

      {/* ── 스크롤 배지 ── */}
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
