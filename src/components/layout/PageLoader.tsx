"use client";

import { useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap-config";

/* ━━ 사이트 전체 페이지 로더 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   2레이어 마스크 시스템:
     Layer 2 (z-[100]): 검은 마스크 — scaleY 커튼 애니메이션
     Layer 1 (z-[99]):  흰 배경   — opacity 페이드

   [초기 로드]
     이미 완전히 덮인 상태에서 리빌만 실행 (HeroSlider와 타이밍 맞춤)
     검은 마스크: scaleY 1→0 (1s, 커튼 올라감)
     흰 배경: opacity 1→0 (0.6s, t=0.5 시작)

   [페이지 전환]
     1단계 - 덮기 (sudden black 방지): 흰 배경 페이드인 → 검은 마스크 아래로 내려옴
     2단계 - 리빌: 검은 마스크 위로 올라감 → 흰 배경 페이드아웃
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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
      /* ── 초기 로드: 이미 덮인 상태 → 바로 리빌 ── */
      gsap.set(mask, {
        display: "block",
        scaleY: 1,
        transformOrigin: "top center",
      });
      gsap.set(bg, { display: "block", opacity: 1 });

      // 검은 마스크 위로 올라감 (커튼 열림)
      tl.to(mask, { scaleY: 0, duration: 1, ease: "power2.inOut" }, 0);
      // 흰 배경 페이드아웃
      tl.to(bg, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 0.5);
    } else {
      /* ── 페이지 전환: 부드럽게 덮은 후 리빌 ── */

      // 1단계: 흰 배경 페이드인 + 검은 마스크 위에서 내려옴
      gsap.set(bg, { display: "block", opacity: 0 });
      gsap.set(mask, {
        display: "block",
        scaleY: 0,
        transformOrigin: "top center",
      });

      // 흰 배경: 빠르게 페이드인 (새 페이지 콘텐츠 가리기)
      tl.to(bg, { opacity: 1, duration: 0.25, ease: "none" }, 0);
      // 검은 마스크: 위에서 아래로 내려옴 (0.1s 딜레이 — 흰 배경 먼저)
      tl.to(mask, { scaleY: 1, duration: 0.45, ease: "power2.in" }, 0.1);

      // 2단계: 검은 마스크 위로 올라감 (커튼 열림)
      tl.to(mask, { scaleY: 0, duration: 1, ease: "power2.inOut" }, 0.65);
      // 흰 배경 페이드아웃
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
      {/* Layer 1: 흰 배경 (낮은 z) — 페이드아웃으로 콘텐츠 노출 */}
      <div
        ref={bgRef}
        className="es-loader__bg"
        style={{ zIndex: 99 }}
      />
      {/* Layer 2: 검은 마스크 (높은 z) — scaleY 커튼으로 흰 배경 노출 */}
      <div
        ref={maskRef}
        className="es-loader__mask"
        style={{ zIndex: 100, transformOrigin: "top center" }}
      />
    </>
  );
}
