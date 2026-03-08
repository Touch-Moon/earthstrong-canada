import Link from "next/link";
import Image from "next/image";
import { footerNavItems } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import ScrollUpBadge from "./ScrollUpBadge";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="es-footer">
      <div className="es-footer__inner">
        {/* Main footer grid */}
        <div className="es-footer__grid">
          {/* Col 1: Logo + Tagline */}
          <div className="es-footer__brand">
            <Link href="/" className="es-footer__logo">
              <Image
                src="/images/logo/earthstrong-logo.svg"
                alt="Earthstrong Canada"
                width={175}
                height={32}
                unoptimized
              />
            </Link>
            <p className="es-footer__tagline">
              {siteConfig.tagline}
            </p>
            <p className="es-footer__desc">
              A subsidiary of {siteConfig.parentCompany}.<br />
              Est. 2021 — Western Canada.
            </p>
          </div>

          {/* Col 2: Nav Links */}
          <div>
            <h3 className="es-footer__col-title">Menu</h3>
            <nav className="es-footer__nav">
              {footerNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="es-footer__nav-link"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h3 className="es-footer__col-title">Contact Us</h3>
            <a
              href={`mailto:${siteConfig.email}`}
              className="es-footer__email"
            >
              {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="es-footer__phone"
            >
              {siteConfig.phone}
            </a>
          </div>

          {/* Col 4: Scroll Up */}
          <div className="es-footer__col4">
            <div>
              <h3 className="es-footer__col-title">Follow us</h3>
              <p className="es-footer__social-placeholder">Coming soon</p>
            </div>
            <div className="es-footer__badge">
              <ScrollUpBadge />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="es-footer__bottom">
          <p className="es-footer__copy">
            © {currentYear} {siteConfig.companyName}. All rights reserved.
          </p>
          <div className="es-footer__legal">
            <Link href="/legal" className="es-footer__legal-link">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="es-footer__legal-link">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
