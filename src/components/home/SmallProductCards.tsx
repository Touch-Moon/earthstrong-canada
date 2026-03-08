"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import Image from "next/image";
import Link from "next/link";

const smallProducts = [
  {
    slug: "cove",
    title: "Cove",
    description: "Nutrient protection that keeps applied fertilizers available and working.",
    image: "/images/products/cove.jpg",
  },
  {
    slug: "fjord",
    title: "Fjord",
    description: "Foliar nutrients up to 10x more available than soil-applied equivalents.",
    image: "/images/products/fjord.jpg",
  },
  {
    slug: "advanced-crop-nutrition",
    title: "Advanced Crop Nutrition",
    description: "Nitrogen management, soil aeration, and late-season crop support.",
    image: "/images/products/specialty-brands.webp",
  },
];

export default function SmallProductCards() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll<HTMLElement>(".es-small-cards__item");
      if (!cards.length) return;

      // stagger 0.12s fade-up — 소형 카드 3열 순차 등장
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
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
    <section className="es-small-cards">
      <div className="es-small-cards__inner">
        <div ref={gridRef} className="es-small-cards__list">
          {smallProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="es-small-cards__item"
              style={{ opacity: 0 }}
            >
              <div className="es-small-cards__thumb">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="es-small-cards__title">
                {product.title}{" "}
                <span className="es-small-cards__arrow">→</span>
              </h3>
              <p className="es-small-cards__desc">{product.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
