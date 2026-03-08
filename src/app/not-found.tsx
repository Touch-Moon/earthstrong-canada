import Link from "next/link";

export default function NotFound() {
  return (
    <div className="es-not-found">
      <div className="es-not-found__inner">
        <p className="es-not-found__tag">404 — Page Not Found</p>
        <h1 className="es-not-found__title">Oops.</h1>
        <p className="es-not-found__desc">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="es-not-found__cta">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
