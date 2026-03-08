import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Earthstrong Canada",
};

export default function LegalPage() {
  return (
    <div className="es-legal">
      <div className="es-container es-legal__wrap">
        <h1 className="es-legal__title">Privacy Policy</h1>

        <div className="es-legal__body">
          <p>
            <strong>Last updated: March 2025</strong>
          </p>

          <h2 className="es-legal__heading">Company Information</h2>
          <p>
            {siteConfig.companyName} is a subsidiary of{" "}
            {siteConfig.parentCompany}, established in 2021. We provide
            agricultural crop nutrition and soil analysis solutions for
            Canadian farmers across Manitoba, Saskatchewan, and Alberta.
          </p>
          <p>
            Contact:{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="es-legal__link"
            >
              {siteConfig.email}
            </a>{" "}
            |{" "}
            <a
              href={`tel:${siteConfig.phone}`}
              className="es-legal__link"
            >
              {siteConfig.phone}
            </a>
          </p>

          <h2 className="es-legal__heading">Information We Collect</h2>
          <p>
            We may collect information you provide directly to us, such as when
            you contact us via email or phone, request product information, or
            apply to become a dealer partner.
          </p>

          <h2 className="es-legal__heading">How We Use Your Information</h2>
          <p>
            We use the information we collect to respond to your inquiries,
            provide product information and support, and improve our services.
            We do not sell or share your personal information with third parties
            for marketing purposes.
          </p>

          <h2 className="es-legal__heading">Contact</h2>
          <p>
            For any privacy concerns or questions, please contact us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="es-legal__link"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
