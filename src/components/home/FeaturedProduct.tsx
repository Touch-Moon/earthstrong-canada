"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedProduct() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 텍스트 영역 fade-up
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // 이미지 영역 fade-up (0.15s 딜레이)
      if (imageWrapRef.current) {
        gsap.fromTo(
          imageWrapRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.15,
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: "top 80%",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="es-featured">
      <div className="es-featured__inner">
        {/* Left: Text (40%) */}
        <div ref={textRef} className="es-featured__text" style={{ opacity: 0 }}>
          <p className="es-featured__tag">Featured Product</p>
          <Link href="/products/solumetrix" className="es-featured__link">
            <h2 className="es-featured__title">
              Solumetrix{" "}
              <span className="es-featured__arrow">→</span>
            </h2>
          </Link>
          <p className="es-featured__desc">
            Patented soil testing technology that identifies what nutrients
            are truly soluble and accessible to your plants at any given
            moment.
          </p>
          <p className="es-featured__note">
            Based on thousands of data correlations refined over three
            decades, Solumetrix goes beyond standard soil tests — enabling
            balanced fertility recommendations that maximize yield while
            minimizing waste.
          </p>
          <Link href="/products/solumetrix" className="es-featured__more">
            Explore Solumetrix <span>→</span>
          </Link>
        </div>

        {/* Right: Image (60%) — hover scale handled by SCSS img selector */}
        <div
          ref={imageWrapRef}
          className="es-featured__img-wrap"
          style={{ opacity: 0 }}
        >
          <Image
            src="/images/products/solumetrix.webp"
            alt="Solumetrix soil analysis technology"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>
      </div>
    </section>
  );
}
