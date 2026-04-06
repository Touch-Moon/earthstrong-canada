"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import SubpageHero from "@/components/shared/SubpageHero";
import { nutritionProducts, type NutritionProduct } from "@/data/nutrition";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NutritionClient — /nutrition
// 6 main products, flat sidebar, in-page text-focused detail view
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PRODUCTS = nutritionProducts;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ProductDetail — text-focused inline detail (generousbranding style)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ProductDetail({ product, onBack }: { product: NutritionProduct; onBack: () => void }) {
  const detailRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!detailRef.current) return;
      const tl = gsap.timeline();

      const nameWords = detailRef.current.querySelectorAll<HTMLElement>(".es-nutr-detail__name-word");
      const topLeft   = detailRef.current.querySelector<HTMLElement>(".es-nutr-detail__top-left");
      const topRight  = detailRef.current.querySelector<HTMLElement>(".es-nutr-detail__top-right");
      const benefits  = detailRef.current.querySelectorAll<HTMLElement>(".es-nutr-detail__benefit");
      const subs      = detailRef.current.querySelectorAll<HTMLElement>(".es-nutr-detail__subproduct");

      if (nameWords.length) {
        tl.fromTo(
          nameWords,
          { opacity: 0, yPercent: 90 },
          { opacity: 1, yPercent: 0, duration: 0.85, ease: "power3.out", stagger: 0.05 },
          0
        );
      }
      if (topLeft) {
        tl.fromTo(topLeft, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.3);
      }
      if (topRight) {
        tl.fromTo(topRight, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.4);
      }
      if (benefits.length) {
        tl.fromTo(
          benefits,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", stagger: 0.07 },
          0.5
        );
      }
      if (subs.length) {
        tl.fromTo(
          subs,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.05 },
          0.6
        );
      }
    },
    { scope: detailRef }
  );

  return (
    <div ref={detailRef} className="es-nutr-detail">
      {/* ── Back button ──────────────────────────────────────── */}
      <button onClick={onBack} className="es-nutr-detail__back-btn" aria-label="Back to product list">
        ← All Products
      </button>

      {/* ── Header: category + large name ────────────────────── */}
      <div className="es-nutr-detail__header">
        <p className="es-nutr-detail__category-tag">{product.categoryLabel}</p>
        <h2 className="es-nutr-detail__name">
          {product.name.split(" ").map((word, i, arr) => (
            <span key={i} className="es-nutr-detail__name-word">
              {word}
              {i === arr.length - 1 && product.trademark && (
                <sup className="es-nutr-detail__trademark">{product.trademark}</sup>
              )}
            </span>
          ))}
        </h2>
      </div>

      {/* ── Top 2-col (generousbranding s-text-rows style) ────── */}
      <div className="es-nutr-detail__top">
        {/* Left: tagline + meta */}
        <div className="es-nutr-detail__top-left">
          <p className="es-nutr-detail__tagline">{product.tagline}</p>
          <ul className="es-nutr-detail__meta-list">
            <li className="es-nutr-detail__meta-item">
              <span className="es-nutr-detail__meta-key">Category</span>
              <span className="es-nutr-detail__meta-val">{product.categoryLabel}</span>
            </li>
            {product.subProducts && (
              <li className="es-nutr-detail__meta-item">
                <span className="es-nutr-detail__meta-key">Formulations</span>
                <span className="es-nutr-detail__meta-val">{product.subProducts.length} products</span>
              </li>
            )}
          </ul>
        </div>

        {/* Right: full description */}
        <div className="es-nutr-detail__top-right">
          <p className="es-nutr-detail__overview-text">{product.description}</p>
        </div>
      </div>

      {/* ── Key Benefits grid ─────────────────────────────────── */}
      <div className="es-nutr-detail__benefits">
        <span className="es-nutr-detail__section-label">Key Benefits</span>
        <div className="es-nutr-detail__benefits-grid">
          {product.features.map((f, i) => (
            <div key={i} className="es-nutr-detail__benefit">
              <h3 className="es-nutr-detail__benefit-title">{f.title}</h3>
              <p className="es-nutr-detail__benefit-desc">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sub-products list ─────────────────────────────────── */}
      {product.subProducts && product.subProducts.length > 0 && (
        <div className="es-nutr-detail__subproducts">
          <span className="es-nutr-detail__section-label">Product Line</span>
          <div className="es-nutr-detail__subproducts-list">
            {product.subProducts.map((sub, i) => (
              <div key={i} className="es-nutr-detail__subproduct">
                <div className="es-nutr-detail__subproduct-info">
                  <h4 className="es-nutr-detail__subproduct-name">{sub.name}</h4>
                  <p className="es-nutr-detail__subproduct-focus">{sub.focus}</p>
                  <p className="es-nutr-detail__subproduct-desc">{sub.description}</p>
                </div>
                {sub.pdfUrl && (
                  <a
                    href={sub.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="es-nutr-detail__pdf-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Info Sheet
                    <span className="es-nutr-detail__pdf-icon" aria-hidden="true">↓</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Main Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function NutritionClient() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const contentRef = useRef<HTMLElement>(null);
  const bodyRef   = useRef<HTMLDivElement>(null);

  const activeProduct: NutritionProduct | null = activeSlug
    ? PRODUCTS.find((p) => p.slug === activeSlug) ?? null
    : null;

  // ── Scroll to the top of the body section (below hero) ──
  const scrollToBody = useCallback(() => {
    if (!bodyRef.current) return;
    const top = bodyRef.current.getBoundingClientRect().top + window.scrollY - 80; // 80px = fixed header
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  // ── Handle product click (in-page navigation) ────────────
  const handleProductClick = useCallback((slug: string) => {
    scrollToBody(); // scroll first, then transition content
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setActiveSlug(slug);
          window.history.pushState(null, "", `/nutrition#${slug}`);
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 0 },
            { opacity: 1, duration: 0.3, ease: "power2.out" }
          );
        },
      });
    } else {
      setActiveSlug(slug);
      window.history.pushState(null, "", `/nutrition#${slug}`);
    }
  }, [scrollToBody]);

  // ── Handle back to list ──────────────────────────────────
  const handleBack = useCallback(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setActiveSlug(null);
          window.history.pushState(null, "", "/nutrition");
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 0 },
            { opacity: 1, duration: 0.3, ease: "power2.out" }
          );
        },
      });
    } else {
      setActiveSlug(null);
      window.history.pushState(null, "", "/nutrition");
    }
  }, []);

  // ── Browser back/forward support ────────────────────────
  useEffect(() => {
    function handlePopState() {
      // URL is now hash-based (/nutrition#slug), so read from hash
      const hash = window.location.hash.replace("#", "");
      setActiveSlug(hash || null);
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div className="es-nutrition">
      {/* Marquee hero title */}
      <SubpageHero title="NUTRITION" duration={12} />

      <div ref={bodyRef} className="es-nutrition__body">

        {/* ── Left Sidebar (desktop only, flat list) ───────── */}
        <aside className="es-nutrition__sidebar">
          <nav className="es-nutrition__categories" aria-label="Products">
            {PRODUCTS.map((product) => (
              <button
                key={product.slug}
                className={`es-nutrition__category${
                  activeSlug === product.slug ? " es-nutrition__category--active" : ""
                }`}
                onClick={() => handleProductClick(product.slug)}
              >
                {product.name}
                {product.trademark && (
                  <sup className="es-nutrition__trademark">{product.trademark}</sup>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Mobile Dropdown ──────────────────────────────── */}
        <div className="es-nutrition__mobile-nav">
          <select
            className="es-nutrition__mobile-select"
            defaultValue=""
            onChange={(e) => {
              const slug = e.target.value;
              if (slug) handleProductClick(slug);
              e.target.value = "";
            }}
            aria-label="Select product"
          >
            <option value="" disabled>Select product...</option>
            {PRODUCTS.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}{p.trademark ?? ""}
              </option>
            ))}
          </select>
        </div>

        {/* ── Right Content ─────────────────────────────────── */}
        <main ref={contentRef} className="es-nutrition__content">
          {activeProduct ? (
            // ── Detail view ────────────────────────────────
            <ProductDetail product={activeProduct} onBack={handleBack} />
          ) : (
            // ── Product list view ───────────────────────────
            <section className="es-nutrition__section">
              <ul className="es-nutrition__products" role="list">
                {PRODUCTS.map((product) => (
                  <li key={product.slug} className="es-nutrition__product">
                    <button
                      className="es-nutrition__product-link"
                      onClick={() => handleProductClick(product.slug)}
                      aria-label={`View ${product.name} details`}
                    >
                      {/* Product name */}
                      <h3 className="es-nutrition__product-name">
                        {product.name}
                        {product.trademark && (
                          <sup className="es-nutrition__product-trademark">
                            {product.trademark}
                          </sup>
                        )}
                      </h3>

                      {/* Short description */}
                      <p className="es-nutrition__product-desc">
                        {product.shortDescription}
                      </p>

                      {/* Sub-product count */}
                      {product.subProducts && (
                        <p className="es-nutrition__product-meta">
                          {product.subProducts.length} formulations
                        </p>
                      )}

                      {/* CTA */}
                      <span className="es-nutrition__product-cta">
                        View Product
                        <span className="es-nutrition__product-cta-arrow" aria-hidden="true">
                          →
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
