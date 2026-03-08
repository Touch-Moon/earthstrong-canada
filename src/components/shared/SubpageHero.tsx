"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-config";

/* ━━ SubpageHero ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   generousbranding.com .s-marquee-title--hero 재현:
   - 뷰포트 전체 너비를 채우는 대형 uppercase 타이틀
   - CSS keyframes로 무한 좌→우 스크롤 (translateX -10%→-110%)
   - 마운트 시 GSAP: word translateY(83%)→0 리빌
   - ghost 2개: 텍스트가 끊기지 않도록 연속 루프
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
interface SubpageHeroProps {
  title: string;
  /** 마키 속도 (초). 글자 수가 적을수록 빠르게 설정 권장 */
  duration?: number;
}

export default function SubpageHero({ title, duration = 10 }: SubpageHeroProps) {
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const word = wordRef.current;
    if (!word) return;

    const items = word.querySelectorAll<HTMLElement>(".es-word-inner, .es-word-ghost");
    if (!items.length) return;

    gsap.to(items, {
      y: 0,
      duration: 1.2,
      ease: "power2.out",
      delay: 0.3,
    });
  }, []);

  return (
    /* 헤더 높이(138px) 만큼 상단 여백 */
    <div style={{ paddingTop: "138px" }}>
      <h1 className="es-marquee-title">
        <span
          ref={wordRef}
          className="es-marquee-word"
          style={{ "--duration": `${duration}s` } as React.CSSProperties}
        >
          <span className="es-word-inner">{title}</span>
          {/* ghost 1 — left: 100% */}
          <span className="es-word-ghost" aria-hidden="true" data-title={title} />
          {/* ghost 2 — left: 200% */}
          <span className="es-word-ghost" aria-hidden="true" data-title={title} />
        </span>
      </h1>
    </div>
  );
}
