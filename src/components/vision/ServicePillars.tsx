"use client";

import { useEffect, useRef } from "react";

const pillars = [
  {
    number: "01",
    title: "Soil Analysis",
    description:
      "Understanding your soil is the foundation. Our patented Solumetrix technology reveals what nutrients are truly accessible to your crops — not just present, but plant-available.",
  },
  {
    number: "02",
    title: "Crop Nutrition",
    description:
      "Organically chelated nutrients with Soil To Cell Technology ensure every element assimilates directly in the plant cell without tie-up. Maximum efficiency from application to uptake.",
  },
  {
    number: "03",
    title: "Nutrient Protection",
    description:
      "Protecting your investment. Our Cove and Fjord lines ensure applied nutrients stay available and work harder — from soil-applied phosphorus to foliar calcium and magnesium.",
  },
];

export default function ServicePillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardsRef.current.forEach((card, i) => {
              if (!card) return;
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, i * 150);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="es-pillars">
      <div className="es-pillars__inner">
        <p className="es-pillars__tag">What We Do</p>
        <h2 className="es-pillars__title">
          Three pillars that define total nutrition management.
        </h2>

        <div className="es-pillars__list">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="es-pillars__item"
              style={{
                opacity: 0,
                transform: "translateY(30px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
              }}
            >
              <p className="es-pillars__num">{pillar.number}</p>
              <h3 className="es-pillars__pillar-title">{pillar.title}</h3>
              <p className="es-pillars__desc">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
