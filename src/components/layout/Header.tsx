"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavItems } from "@/data/navigation";

/* ━━ Header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Replicates generousbranding.com navigation
   ─ Height: 138px (default) → 58px (scrolled)
   ─ Background: transparent + white div slides in from top (on scroll)
   ─ Links: 12.5px / letter-spacing 0.15em / uppercase
            white (initial) → black (scrolled)
   ─ Hover: underline scaleX (right→left origin switch) via CSS ::after
   ─ Mobile: clip-path right-edge→full-screen reveal / 60px large links
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Only the homepage has a transparent header over the dark hero (white text)
  // All other pages start with a white background + black text
  const hasHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    // Immediately reflect current scroll position on page transition
    setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Focus trap: keep Tab cycling within mobile menu when open
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return;

    const focusable = menuRef.current.querySelectorAll<HTMLElement>("a, button");
    if (focusable.length) focusable[0].focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // Condition for header light mode (white background + black text)
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
        {/* White background — slides down from top on scroll */}
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
          {/* Logo */}
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

          {/* Desktop Nav (≥lg) */}
          <nav className="es-header__nav" aria-label="Main navigation" style={{ gap: "53px" }}>
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

          {/* Hamburger button (<lg) */}
          <button
            ref={hamburgerRef}
            onClick={() => setMenuOpen(!menuOpen)}
            className="es-header__hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{ position: "relative", width: "48px", height: "48px" }}
          >
            {/* Open state: 2 lines */}
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
            {/* Close state: X */}
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
      {/* clip-path: reveals from right edge to full screen */}
      <div
        ref={menuRef}
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
          aria-label="Mobile navigation"
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
