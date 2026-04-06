"use client";

import { useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap-config";

/* ━━ Stairs Page Transition ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   5개 컬럼이 계단식(stagger)으로 올라오고 내려가는 전환 효과.
   K72 Agency Portfolio 스타일 참고, GSAP으로 구현.

   레이어 구조:
     z-[101]: 흰 배경 (flash 방지 — 새 페이지 노출 전 깜빡임 차단)
     z-[102]: 5개 다크 컬럼 (Stairs)

   [Initial Load]
     컬럼 전체가 scaleY:1 상태로 덮여 있음
     → 왼→오 stagger로 scaleY 1→0 (커튼 올라감)

   [Page Transition]
     Phase 1 - Cover: 컬럼 scaleY 0→1, transformOrigin "bottom center"
     Phase 2 - Reveal: 컬럼 scaleY 1→0, transformOrigin "top center"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const NUM_COLUMNS = 5;
const STAGGER = 0.07;        // 컬럼 간 딜레이
const COVER_DURATION = 0.45; // 각 컬럼이 올라오는 시간
const REVEAL_DURATION = 0.55; // 각 컬럼이 내려가는 시간

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
      /* ── Initial load: 이미 덮여 있음 → stagger reveal ── */
      gsap.set(bg, { display: "block", opacity: 1 });
      gsap.set(cols, {
        display: "block",
        scaleY: 1,
        transformOrigin: "top center",
      });

      // 흰 배경 먼저 페이드아웃 (컬럼 뒤로 사라짐)
      tl.to(bg, { opacity: 0, duration: 0.4, ease: "none" }, 0);

      // 컬럼들 stagger로 올라감 (left → right)
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

      // Phase 1: 흰 배경 flash 방지 + 컬럼 올라옴 (cover)
      gsap.set(bg, { display: "block", opacity: 0 });
      gsap.set(cols, {
        display: "block",
        scaleY: 0,
        transformOrigin: "bottom center",
      });

      // 흰 배경 순간 표시 (새 페이지 깜빡임 방지)
      tl.to(bg, { opacity: 1, duration: 0.15, ease: "none" }, 0);

      // 컬럼 stagger 올라옴
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

      // Phase 2: 컬럼 내려감 (reveal) — 마지막 컬럼이 완전히 올라온 뒤 시작
      const coverEnd = COVER_DURATION + STAGGER * (NUM_COLUMNS - 1);
      const revealStart = coverEnd + 0.05;

      // transformOrigin 변경을 타임라인 안에서 실행 (즉시 실행 방지)
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

      // 흰 배경 페이드아웃
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
      {/* Flash 방지 흰 배경 */}
      <div ref={bgRef} className="es-loader__bg" />

      {/* Stairs 컬럼 5개 */}
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
