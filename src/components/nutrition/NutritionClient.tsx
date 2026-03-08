"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import SubpageHero from "@/components/shared/SubpageHero";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NutritionClient — /nutrition
// 6 main products, flat sidebar, in-page text-focused detail view
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Types ────────────────────────────────────────────────────
interface SubProductEntry {
  name: string;
  focus: string;
  description: string;
  pdfUrl?: string;
}

interface ProductEntry {
  slug: string;
  name: string;
  trademark?: string;
  tagline: string;
  shortDescription: string;
  description: string;
  categoryLabel: string;
  features: { title: string; description: string }[];
  subProducts?: SubProductEntry[];
}

// ── Data ─────────────────────────────────────────────────────
const PRODUCTS: ProductEntry[] = [
  {
    slug: "solumetrix",
    name: "Solumetrix",
    trademark: "™",
    tagline: "See What Your Soil Really Holds",
    shortDescription:
      "Patented soil testing technology that identifies what nutrients are truly soluble and accessible to your plants.",
    description:
      "Based on thousands of data correlations refined over three decades, Solumetrix goes beyond standard soil tests. It reveals the nutrients that are actually available to your crops at any given moment, enabling balanced fertility recommendations that maximize yield while minimizing waste.",
    categoryLabel: "Soil Analysis",
    features: [
      { title: "Patented Analysis", description: "Proprietary technology correlating thousands of data points to identify truly soluble nutrients in your specific soil conditions." },
      { title: "Balanced Recommendations", description: "Receive fertility recommendations that reflect what your crops actually need — not just what's present, but what's accessible." },
      { title: "Data-Driven Results", description: "Three decades of agricultural research condensed into actionable, field-proven recommendations for Western Canadian conditions." },
      { title: "Waste Reduction", description: "Stop over-applying nutrients that aren't reaching your crops. Maximize ROI by targeting only what's genuinely deficient." },
    ],
  },
  {
    slug: "harbor-brands",
    name: "Harbor Brands",
    trademark: "™",
    tagline: "Soil To Cell Technology",
    shortDescription:
      "Over 9 organically chelated micro and macronutrient solutions using Soil To Cell Technology.",
    description:
      "Harbor's lineup of organically chelated nutrients ensures each element assimilates directly in the plant cell without tie-up in the soil. Tank-mix compatible and proven across Western Canadian conditions.",
    categoryLabel: "Crop Nutrition",
    features: [
      { title: "Organic Chelation", description: "Every Harbor nutrient is organically chelated, preventing soil tie-up and ensuring direct plant cell assimilation." },
      { title: "Tank-Mix Compatible", description: "Seamlessly integrate Harbor products into your existing spray programs without compatibility issues." },
      { title: "Full Spectrum Coverage", description: "Address macro and micronutrient deficiencies with a complete lineup: Boron, Copper, Iron, Potassium, Sulphur, Zinc, and more." },
      { title: "Western Canadian Proven", description: "Formulated and tested specifically for prairie soil and climate conditions." },
    ],
    subProducts: [
      { name: "HARBOR-B", focus: "Boron", description: "Organically chelated boron for canola, alfalfa, and legume applications." },
      { name: "HARBOR-Cl", focus: "Chloride", description: "Chloride supplementation for cereal grains and root crops." },
      { name: "HARBOR-Cu", focus: "Copper", description: "Chelated copper for wheat and barley on copper-deficient soils." },
      { name: "HARBOR-Fe", focus: "Iron", description: "Iron chelate for correcting chlorosis in a wide range of crops." },
      { name: "HARBOR-K", focus: "Potassium", description: "Potassium foliar supplement for yield and quality enhancement." },
      { name: "HARBOR-S", focus: "Sulphur", description: "Sulphur solution for canola and pulse crop applications." },
      { name: "HARBOR-Zn", focus: "Zinc", description: "Chelated zinc for corn and pulse crops on alkaline soils." },
      { name: "HARBOR-Mn", focus: "Manganese", description: "Manganese chelate for soybeans and cereals." },
      { name: "HARBOR 3-18", focus: "Blend", description: "Balanced macro and micronutrient blend for foliar feeding programs." },
    ],
  },
  {
    slug: "collect-n-go",
    name: "Collect-N-Go",
    tagline: "Precision Starts With The Sample",
    shortDescription:
      "Patented soil sampling equipment for precise, repeatable field analysis.",
    description:
      "Collect-N-Go provides standardized, repeatable soil sampling that forms the foundation of precision agriculture. Consistent sampling means consistent data, leading to better nutrient management decisions season after season.",
    categoryLabel: "Soil Sampling",
    features: [
      { title: "Patented Technology", description: "Purpose-built equipment engineered for consistent depth and volume, eliminating sampling variability." },
      { title: "Repeatable Results", description: "Year-over-year comparable data that lets you track soil health trends and measure program effectiveness." },
      { title: "Field-Ready Design", description: "Rugged construction built for Western Canadian field conditions from spring mud to fall frost." },
      { title: "Integration Ready", description: "Works seamlessly with Solumetrix analysis for a complete soil intelligence workflow." },
    ],
  },
  {
    slug: "cove",
    name: "Cove",
    tagline: "Protect Your Nutrient Investment",
    shortDescription:
      "Nutrient protection that keeps applied fertilizers available and working.",
    description:
      "Cove products protect applied nutrients from becoming unavailable in the soil. By reducing salt effects and promoting root development, Cove ensures your fertilizer investment delivers maximum return.",
    categoryLabel: "Nutrient Protection",
    features: [
      { title: "Nitrogen Protection", description: "COVE-N keeps applied nitrogen in plant-available form longer, reducing volatilization and leaching losses." },
      { title: "Phosphorus Protection", description: "COVE-P prevents phosphorus tie-up in cold, wet soils — critical for early-season prairie conditions." },
      { title: "Salt Effect Reduction", description: "Mitigate fertilizer salt stress at seeding to promote stronger germination and early root development." },
      { title: "ROI Amplification", description: "Every dollar spent on Cove multiplies the effectiveness of your existing fertilizer program." },
    ],
    subProducts: [
      { name: "COVE-N", focus: "Nitrogen", description: "Nitrogen protection additive that reduces volatilization and keeps N in the ammonium form longer.", pdfUrl: "https://strongterra.com/wp-content/uploads/2026/02/ESC-Cove-N-Active-Pack-Info-Sheet-11.18.2025.pdf" },
      { name: "COVE-P", focus: "Phosphorus", description: "Phosphorus protection for cold soil conditions, preventing early-season tie-up.", pdfUrl: "https://strongterra.com/wp-content/uploads/2026/02/ESC-Cove-P-Active-Pack-Info-Sheet-11.18.2025.pdf" },
      { name: "COVE-P RTU", focus: "Phosphorus (Ready-To-Use)", description: "Pre-diluted phosphorus protection formula ready for direct application.", pdfUrl: "https://strongterra.com/wp-content/uploads/2026/02/ESC-COVE-Brands-Info-Sheet-11.18.2025.pdf" },
    ],
  },
  {
    slug: "fjord",
    name: "Fjord",
    tagline: "Foliar Efficiency Redefined",
    shortDescription:
      "Foliar nutrients up to 10x more available than soil-applied equivalents.",
    description:
      "Fjord delivers critical nutrients directly through the leaf when crops need them most. Bypassing soil tie-up, Fjord products provide phosphate, calcium, and magnesium at efficiencies far exceeding traditional soil application.",
    categoryLabel: "Foliar Application",
    features: [
      { title: "10x Availability", description: "Foliar-applied Fjord nutrients are up to 10 times more available to the plant than equivalent soil applications." },
      { title: "Bypass Soil Tie-Up", description: "Deliver nutrients directly to where photosynthesis and growth happen — the leaf — not the soil." },
      { title: "Critical Stage Timing", description: "Apply at key growth stages (heading, flowering, grain fill) for targeted nutrient support when it matters most." },
      { title: "Multi-Nutrient Coverage", description: "Address phosphorus, calcium, and magnesium deficiencies with purpose-built foliar formulations." },
    ],
    subProducts: [
      { name: "Fjord-P", focus: "Phosphate + Potassium", description: "High-efficiency foliar phosphate and potassium for early-season establishment and grain fill.", pdfUrl: "https://strongterra.com/fjord-p-tech-sheet-esc-01-16-2026-2/" },
      { name: "Fjord-Ca", focus: "Calcium", description: "Foliar calcium for improved cell wall strength and stress tolerance.", pdfUrl: "https://strongterra.com/fjord-ca-esc-tech-sheet-01-16-2025/" },
      { name: "Fjord-Mg", focus: "Magnesium", description: "Magnesium foliar supplement to support chlorophyll production and photosynthesis.", pdfUrl: "https://strongterra.com/esc-fjord-mg-tech-sheet-12-02-2025/" },
    ],
  },
  {
    slug: "advanced-crop-nutrition",
    name: "Advanced Crop Nutrition",
    tagline: "Complete Season Support",
    shortDescription:
      "Nitrogen management, soil aeration, and late-season crop support.",
    description:
      "A complete suite of advanced products supporting every stage of crop growth — from nitrogen management with Augusta Max to soil mineralization with CaL AIR, carbohydrate support with FleKsy, and nitrogen conversion with MoNi.",
    categoryLabel: "Nitrogen Management",
    features: [
      { title: "Nitrogen Management", description: "Augusta Max optimizes nitrogen conversion and utilization for improved NUE across all crop types." },
      { title: "Soil Aeration & Mineralization", description: "CaL AIR improves soil structure, promotes calcium availability, and enhances microbial activity." },
      { title: "Late-Season Support", description: "FleKsy provides carbohydrate support during grain fill and ripening for improved quality and test weight." },
      { title: "Nitrogen Conversion", description: "MoNi supports the conversion of ammonium to nitrate, improving plant-available nitrogen throughout the season." },
    ],
    subProducts: [
      { name: "Augusta Max", focus: "Nitrogen Management", description: "Improves nitrogen use efficiency by optimizing conversion and reducing losses.", pdfUrl: "https://strongterra.com/wp-content/uploads/2026/02/ESC-AUGUSTA-Max-Info-Sheet-12.08.2025.pdf" },
      { name: "CaL AIR™", focus: "Soil Aeration", description: "Enhances soil structure, calcium availability, and beneficial microbial populations.", pdfUrl: "https://strongterra.com/wp-content/uploads/2026/02/ESC-CaL-AIR-Tech-Sheet-12.02.2025.pdf" },
      { name: "FleKsy™", focus: "Late-Season Carbohydrates", description: "Carbohydrate support for grain fill, ripening, and end-of-season crop quality.", pdfUrl: "https://strongterra.com/wp-content/uploads/2026/02/ESC-fleKsy-Info-Sheet-11.10.2025.pdf" },
      { name: "MoNi™", focus: "Nitrogen Conversion", description: "Supports ammonium-to-nitrate conversion for consistent plant-available nitrogen.", pdfUrl: "https://strongterra.com/wp-content/uploads/2026/02/ESC-MoNi-Tech-Sheet-12.01.2025.pdf" },
    ],
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ProductDetail — text-focused inline detail (generousbranding style)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ProductDetail({ product, onBack }: { product: ProductEntry; onBack: () => void }) {
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

  const activeProduct = activeSlug
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
