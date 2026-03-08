"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavItems } from "@/data/navigation";

/* ━━ Header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   generousbranding.com 네비게이션 재현
   ─ 높이: 138px (기본) → 58px (스크롤)
   ─ 배경: 투명 + 흰 div가 위에서 slide-in (스크롤 시)
   ─ 링크: 12.5px / letter-spacing 0.15em / uppercase
           white(초기) → black(스크롤)
   ─ hover: underline scaleX (right→left origin 전환) via CSS ::after
   ─ 모바일: clip-path 오른쪽→전체 reveal / 60px 대형 링크
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // 홈페이지만 다크 히어로 위에 투명 헤더 (흰 텍스트)
  // 나머지 페이지는 처음부터 흰 배경 + 검은 텍스트
  const hasHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    // 페이지 전환 시 현재 스크롤 위치 즉시 반영
    setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // 라우트 변경 시 메뉴 닫기
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // 메뉴 열릴 때 body scroll 잠금
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // 헤더가 light 모드(흰 배경 + 검은 텍스트)인 조건
  const isLight = !hasHero || scrolled || menuOpen;

  return (
    <>
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header
        className="es-header"
        style={{
          height: scrolled ? "58px" : "138px",
          transition: "height 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
        }}
      >
        {/* 흰 배경 — 스크롤 시 위에서 내려옴 */}
        <div
          className={`es-header__bg ${isLight ? "es-header__bg--visible" : "es-header__bg--hidden"}`}
          style={{
            zIndex: 1,
            transform: isLight
              ? "translate3d(0,0,0)"
              : "translate3d(0,-100%,0)",
            transition: "transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
          }}
        />

        <div
          className="es-header__inner"
          style={{ zIndex: 2 }}
        >
          {/* 로고 */}
          <Link href="/" className="es-header__logo">
            <Image
              src="/images/logo/earthstrong-logo.svg"
              alt="Earthstrong Canada"
              width={175}
              height={32}
              unoptimized
              style={{
                filter: isLight ? "none" : "brightness(0) invert(1)",
                transition: "filter 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
              }}
              priority
            />
          </Link>

          {/* 데스크탑 Nav (≥lg) */}
          <nav className="es-header__nav" style={{ gap: "53px" }}>
            {mainNavItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`es-header__nav-link${isActive ? " es-header__nav-link--active" : ""}`}
                  style={{
                    fontSize: "12.5px",
                    fontWeight: 400,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: isLight ? "#000" : "#fff",
                    transition: "color 0.45s cubic-bezier(0.19, 1, 0.22, 1)",
                    textDecoration: "none",
                    lineHeight: 1,
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* 햄버거 버튼 (<lg) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="es-header__hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{ position: "relative", width: "48px", height: "48px" }}
          >
            {/* 열기: 2줄 */}
            <span
              className="es-header__ham-open"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.3s",
              }}
            >
              {[0, 1].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: "24px",
                    height: "3px",
                    backgroundColor: isLight ? "#000" : "#fff",
                    transition:
                      "background-color 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
                  }}
                />
              ))}
            </span>
            {/* 닫기: X */}
            <span
              className="es-header__ham-close"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: menuOpen ? 1 : 0,
                transition: "opacity 0.3s",
              }}
            >
              {[-45, 45].map((deg, i) => (
                <span
                  key={i}
                  style={{
                    position: "absolute",
                    width: "30px",
                    height: "3px",
                    backgroundColor: "#000",
                    transform: `rotate(${deg}deg)`,
                  }}
                />
              ))}
            </span>
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU OVERLAY ─────────────────────────────────── */}
      {/* clip-path: 오른쪽 끝에서 전체 화면으로 reveal */}
      <div
        className={`es-mobile-menu ${menuOpen ? "es-mobile-menu--open" : "es-mobile-menu--closed"}`}
        style={{
          clipPath: menuOpen
            ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
            : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: [
            "clip-path 0.6s cubic-bezier(0.86, 0, 0.07, 1)",
            "opacity 0.6s linear",
          ].join(", "),
        }}
      >
        <nav
          className="es-mobile-menu__nav"
          style={{ paddingTop: "138px" }}
        >
          {[...mainNavItems, { label: "Dealer Login", href: "/login" }].map(
            (item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="es-mobile-menu__link"
                style={{
                  display: "block",
                  fontSize: "clamp(36px, 6vw, 60px)",
                  fontWeight: 400,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "#000",
                  lineHeight: 1.1,
                  marginTop: "0.25em",
                  textDecoration: "none",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateX(0)" : "translateX(3em)",
                  transition: menuOpen
                    ? `transform 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.07}s, opacity 0.2s linear ${i * 0.07 + 0.2}s`
                    : "transform 0.8s cubic-bezier(0.755, 0.05, 0.855, 0.06), opacity 0.2s linear 0.4s",
                }}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </>
  );
}
