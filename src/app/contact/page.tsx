import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { partnersByProvince } from "@/data/partners";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Earthstrong Canada.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero contact info */}
      <section className="es-contact-hero">
        <div className="es-contact-hero__inner">
          <h1 className="sr-only">Contact Earthstrong Canada</h1>
          <p className="es-contact-hero__tag">{siteConfig.tagline}</p>

          <a
            href={`mailto:${siteConfig.email}`}
            className="es-contact-hero__email"
          >
            {siteConfig.email}
            <span className="es-contact-hero__arrow">↗</span>
          </a>

          <a
            href={`tel:${siteConfig.phone}`}
            className="es-contact-hero__phone"
          >
            {siteConfig.phone}
          </a>

          <div className="es-contact-hero__parent">
            <p className="es-contact-hero__parent-label">A subsidiary of</p>
            <p className="es-contact-hero__parent-name">
              {siteConfig.parentCompany}
            </p>
          </div>
        </div>
      </section>

      {/* Partner locations */}
      <section className="es-contact-partners">
        <div className="es-contact-partners__inner">
          <p className="es-contact-partners__tag">Dealer Network</p>
          <h2 className="es-contact-partners__title">
            Find Earthstrong Canada Near You
          </h2>

          <div className="es-contact-partners__grid">
            {Object.keys(partnersByProvince)
              .sort()
              .map((province) => (
                <div key={province}>
                  <h3 className="es-contact-partners__province-title">
                    {province}
                  </h3>
                  {partnersByProvince[province].map((partner) => (
                    <div key={partner.name} className="es-contact-partners__partner">
                      <p className="es-contact-partners__partner-name">
                        {partner.name}
                      </p>
                      <p className="es-contact-partners__partner-loc">
                        {partner.location}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
          </div>

          <Link href="/about" className="es-contact-partners__cta">
            View Full About Page <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
