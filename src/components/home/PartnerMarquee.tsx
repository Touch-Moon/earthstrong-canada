"use client";

import { useState } from "react";

const partners = [
  "Pioneer Co-op",
  "Emerge Agro",
  "NuEra Seeds",
  "Kindersley Co-Op",
  "Agro Plus",
  "Knee Hill Soil Services",
];

export default function PartnerMarquee() {
  const items = [...partners, ...partners]; // duplicate for seamless loop
  const [paused, setPaused] = useState(false);

  return (
    <section className="es-partner-marquee" aria-label="Our partners">
      <button
        onClick={() => setPaused(!paused)}
        aria-label={paused ? "Play marquee" : "Pause marquee"}
        className="sr-only"
      >
        {paused ? "Play" : "Pause"}
      </button>
      <div className="es-partner-marquee__track-wrap es-pause-anim">
        <div
          className="es-partner-marquee__track es-anim-marquee"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {items.map((name, i) => (
            <span key={i} className="es-partner-marquee__item">
              {name}
              <span className="es-partner-marquee__sep">+</span>
            </span>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div
          aria-hidden
          className="es-partner-marquee__track es-anim-marquee"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {items.map((name, i) => (
            <span key={i} className="es-partner-marquee__item">
              {name}
              <span className="es-partner-marquee__sep">+</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
