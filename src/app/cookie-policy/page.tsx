import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for Earthstrong Canada",
};

const cookieTypes = [
  {
    name: "Essential Cookies",
    description:
      "These cookies are required for the website to function. They enable basic features like page navigation and access to secure areas. The website cannot function properly without these cookies.",
  },
  {
    name: "Functional Cookies",
    description:
      "These cookies allow the website to remember choices you make (such as your language preference) to provide enhanced, more personal features.",
  },
  {
    name: "Analytics Cookies",
    description:
      "We use analytics cookies to understand how visitors interact with our website. The information collected is aggregated and anonymous, helping us improve our site's performance and content.",
  },
  {
    name: "Advertising Cookies",
    description:
      "These cookies may be set through our site by advertising partners. They may be used to build a profile of your interests and show relevant advertisements on other sites.",
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="es-legal">
      <div className="es-container es-legal__wrap">
        <h1 className="es-legal__title">Cookie Policy</h1>

        <div className="es-legal__body">
          <p className="es-legal__intro">
            This Cookie Policy explains how Earthstrong Canada uses cookies and
            similar technologies on our website.
          </p>

          <div className="es-legal__cookie-list">
            {cookieTypes.map((type, i) => (
              <div key={i} className="es-legal__cookie-item">
                <h2 className="es-legal__heading">{type.name}</h2>
                <p>{type.description}</p>
              </div>
            ))}
          </div>

          <div className="es-legal__cookie-item">
            <h2 className="es-legal__heading">Managing Cookies</h2>
            <p>
              Most web browsers allow some control of cookies through browser
              settings. To find out more about cookies, including how to see
              what cookies have been set, visit{" "}
              <a
                href="https://www.allaboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="es-legal__link"
              >
                www.allaboutcookies.org
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
