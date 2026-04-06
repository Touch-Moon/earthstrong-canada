import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { nutritionProducts, type NutritionProduct } from "@/data/nutrition";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Nutrition Product Detail — /nutrition/[slug]
// 6 main products, text-focused layout, 1 hero image only.
// Based on generousbranding.com text layout style.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function generateStaticParams() {
  return nutritionProducts.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = nutritionProducts.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name}${product.trademark ?? ""} | Earthstrong Canada`,
    description: product.description.slice(0, 160),
  };
}

export default async function NutritionProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = nutritionProducts.find((p) => p.slug === slug);

  if (!product) {
    redirect("/nutrition");
  }

  return (
    <>
      {/* ── Hero (single image) ──────────────────────────────── */}
      <section className="es-product-detail__hero">
        <Image
          src={product.heroImage}
          alt={product.name}
          fill
          priority
          sizes="100vw"
        />
        <div className="es-product-detail__hero-overlay" />
        <div className="es-product-detail__hero-inner">
          <div className="es-product-detail__hero-badges">
            <span className="es-product-detail__hero-badge">
              {product.categoryLabel}
            </span>
          </div>
          <h1 className="es-product-detail__hero-title">
            {product.name}
            {product.trademark && <sup className="es-trademark">{product.trademark}</sup>}
          </h1>
          <p className="es-product-detail__hero-tagline">{product.tagline}</p>
        </div>
      </section>

      {/* ── Top content: 2-col (generousbranding s-text-rows style) ── */}
      <section className="es-nutr-single__top">
        <div className="es-nutr-single__top-inner">
          {/* Left: category + name + meta */}
          <div className="es-nutr-single__left">
            <p className="es-nutr-single__category">{product.categoryLabel}</p>
            <h2 className="es-nutr-single__name">
              {product.name}
              {product.trademark && <sup className="es-trademark">{product.trademark}</sup>}
            </h2>
            <div className="es-nutr-single__specs">
              {[
                { key: "Company", val: product.company },
                product.subProducts
                  ? { key: "Formulations", val: `${product.subProducts.length} products` }
                  : null,
              ]
                .filter(Boolean)
                .map((row) => {
                  const r = row as { key: string; val: string };
                  return (
                    <div key={r.key} className="es-nutr-single__spec-row">
                      <span className="es-nutr-single__spec-key">{r.key}</span>
                      <span className="es-nutr-single__spec-val">{r.val}</span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Right: overview description */}
          <div className="es-nutr-single__right">
            <span className="es-nutr-single__overview-label">Overview</span>
            <p className="es-nutr-single__overview-text">{product.description}</p>
          </div>
        </div>
      </section>

      {/* ── Key Benefits ─────────────────────────────────────── */}
      <section className="es-nutr-single__benefits">
        <div className="es-nutr-single__benefits-inner">
          <span className="es-nutr-single__benefits-label">Key Benefits</span>
          <div className="es-nutr-single__benefits-grid">
            {product.features.map((feature, i) => (
              <div key={i} className="es-nutr-single__benefit">
                <h3 className="es-nutr-single__benefit-title">{feature.title}</h3>
                <p className="es-nutr-single__benefit-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sub-products (if any) ────────────────────────────── */}
      {product.subProducts && product.subProducts.length > 0 && (
        <section className="es-nutr-single__subproducts">
          <div className="es-nutr-single__subproducts-inner">
            <span className="es-nutr-single__subproducts-label">Product Line</span>
            <div className="es-nutr-single__subproducts-list">
              {product.subProducts.map((sub, i) => (
                <div key={i} className="es-nutr-single__subproduct">
                  <div className="es-nutr-single__subproduct-info">
                    <h4 className="es-nutr-single__subproduct-name">{sub.name}</h4>
                    <p className="es-nutr-single__subproduct-focus">{sub.focus}</p>
                    <p className="es-nutr-single__subproduct-desc">{sub.description}</p>
                  </div>
                  {sub.pdfUrl && (
                    <a
                      href={sub.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="es-nutr-single__pdf-btn"
                    >
                      Info Sheet
                      <span className="es-nutr-single__pdf-icon" aria-hidden="true">↓</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Back to Nutrition (plain dark, no image) ──────────── */}
      <Link href="/nutrition" className="es-nutr-single__back">
        <div className="es-nutr-single__back-inner">
          <p className="es-nutr-single__back-label">Back to</p>
          <h2 className="es-nutr-single__back-title">
            <span className="es-nutr-single__back-arrow">←</span>
            Nutrition
          </h2>
        </div>
      </Link>
    </>
  );
}
