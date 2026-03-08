import Image from "next/image";
import { partners } from "@/data/partners";

export default function ClientShowcase() {
  return (
    <section className="es-showcase">
      <div className="es-showcase__inner">
        <p className="es-showcase__tag">Dealer Network</p>
        <h2 className="es-showcase__title">Our Partners</h2>

        <div className="es-showcase__grid">
          {partners.map((partner) => (
            <div key={partner.name} className="es-showcase__item">
              <div className="es-showcase__logo">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              <p className="es-showcase__name">
                {partner.location}, {partner.province}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
