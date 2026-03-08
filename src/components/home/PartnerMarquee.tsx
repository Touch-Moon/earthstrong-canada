"use client";

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

  return (
    <section className="es-partner-marquee">
      <div className="es-partner-marquee__track-wrap">
        <div className="es-partner-marquee__track">
          {items.map((name, i) => (
            <span key={i} className="es-partner-marquee__item">
              {name}
              <span className="es-partner-marquee__sep">+</span>
            </span>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div aria-hidden className="es-partner-marquee__track">
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
