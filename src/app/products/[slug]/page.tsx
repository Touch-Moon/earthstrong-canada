import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { products, getProductBySlug, getNextProduct } from "@/data/products";
import { expertiseCategoryLabels } from "@/types";
import Badge from "@/components/shared/Badge";
import NextProduct from "@/components/products/NextProduct";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const nextProduct = getNextProduct(slug);

  return (
    <>
      {/* Hero */}
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
            {product.categories.map((cat) => (
              <Badge
                key={cat}
                label={expertiseCategoryLabels[cat]}
                className="es-product-detail__hero-badge"
              />
            ))}
          </div>
          <h1 className="es-product-detail__hero-title">{product.name}</h1>
          <p className="es-product-detail__hero-tagline">{product.tagline}</p>
        </div>
      </section>

      {/* Metadata bar */}
      <section className="es-product-detail__meta">
        <div className="es-product-detail__meta-inner">
          <div className="es-product-detail__meta-item">
            <p className="es-product-detail__meta-label">Category</p>
            <p className="es-product-detail__meta-value">
              {product.categories.map((c) => expertiseCategoryLabels[c]).join(", ")}
            </p>
          </div>
          <div className="es-product-detail__meta-item">
            <p className="es-product-detail__meta-label">Parent Brand</p>
            <p className="es-product-detail__meta-value">Earthstrong Canada</p>
          </div>
          <div className="es-product-detail__meta-item">
            <p className="es-product-detail__meta-label">Application</p>
            <p className="es-product-detail__meta-value">
              {product.categories.includes("foliar-application")
                ? "Foliar & Soil"
                : "Soil Applied"}
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="es-product-detail__body">
        <div className="es-product-detail__body-inner">
          {/* Left: Description */}
          <div>
            <p className="es-product-detail__overview-tag">Overview</p>
            <p className="es-product-detail__overview-text">
              {product.description}
            </p>
          </div>

          {/* Right: Features */}
          <div className="es-product-detail__features">
            <p className="es-product-detail__features-tag">Key Benefits</p>
            {product.features.map((feature, i) => (
              <div key={i} className="es-product-detail__feature">
                <h3 className="es-product-detail__feature-title">
                  {feature.title}
                </h3>
                <p className="es-product-detail__feature-desc">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-products */}
      {product.subProducts && product.subProducts.length > 0 && (
        <section className="es-product-detail__subproducts">
          <div className="es-product-detail__subproducts-inner">
            <p className="es-product-detail__subproducts-tag">Product Line</p>
            <h2 className="es-product-detail__subproducts-title">
              {product.name} Lineup
            </h2>
            <div className="es-product-detail__subproducts-grid">
              {product.subProducts.map((sub, i) => (
                <div key={i} className="es-product-detail__subproduct">
                  <p className="es-product-detail__subproduct-focus">
                    {sub.focus}
                  </p>
                  <h3 className="es-product-detail__subproduct-name">
                    {sub.name}
                  </h3>
                  <p className="es-product-detail__subproduct-desc">
                    {sub.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="es-product-detail__gallery">
        <div className="es-product-detail__gallery-grid">
          <div className="es-product-detail__gallery-img">
            <Image
              src="/images/fields/image-overlap-large.webp"
              alt="Field application"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="es-product-detail__gallery-img">
            <Image
              src="/images/fields/image-overlap-small.webp"
              alt="Crop detail"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Next Product */}
      <NextProduct product={nextProduct} />
    </>
  );
}
