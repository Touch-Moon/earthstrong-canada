import Image from "next/image";
import Link from "next/link";
import { partnersByProvince } from "@/data/partners";

export default function ClientGrid() {
  const provinces = Object.keys(partnersByProvince).sort();

  return (
    <section className="es-client-grid">
      <div className="es-client-grid__inner">
        <p className="es-client-grid__tag">Dealer Network</p>
        <h2 className="es-client-grid__title">Where to Find Us</h2>

        <div className="es-client-grid__provinces">
          {provinces.map((province) => (
            <div key={province} className="es-client-grid__province">
              <h3 className="es-client-grid__province-title">{province}</h3>
              <div className="es-client-grid__partners">
                {partnersByProvince[province].map((partner) => (
                  <div key={partner.name} className="es-client-grid__partner">
                    <div className="es-client-grid__partner-logo">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain"
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <p className="es-client-grid__partner-name">
                        {partner.name}
                      </p>
                      <p className="es-client-grid__partner-loc">
                        {partner.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="es-client-grid__cta">
          <p className="es-client-grid__cta-text">
            Interested in becoming a dealer?{" "}
            <Link href="/contact" className="es-client-grid__cta-link">
              Contact us →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
