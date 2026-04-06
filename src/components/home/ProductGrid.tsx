"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import Image from "next/image";
import Link from "next/link";

const gridProducts = [
  {
    slug: "harbor-brands",
    title: "Harbor Brands",
    description:
      "Over 9 organically chelated micro and macronutrient solutions using Soil To Cell Technology.",
    image: "/images/products/harbour-nutrients.webp",
  },
  {
    slug: "collect-n-go",
    title: "Collect-N-Go",
    description:
      "Patented soil sampling equipment for precise, repeatable field analysis.",
    image: "/images/products/collect-n-go.webp",
  },
];

export default function ProductGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll<HTMLElement>(".es-product-grid__card");
      if (!cards.length) return;

      // stagger 0.15s fade-up — original card entrance animation
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: gridRef }
  );

  return (
    <section className="es-product-grid">
      <div className="es-product-grid__inner">
        <div ref={gridRef} className="es-product-grid__list">
          {gridProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="es-product-grid__card"
              style={{ opacity: 0 }}
            >
              <div className="es-product-grid__thumb">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="es-product-grid__title">
                {product.title}{" "}
                <span className="es-product-grid__arrow">→</span>
              </h3>
              <p className="es-product-grid__desc">{product.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
