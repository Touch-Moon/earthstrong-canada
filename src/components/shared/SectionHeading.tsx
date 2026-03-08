interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`es-section-heading${centered ? " es-section-heading--centered" : ""}${light ? " es-section-heading--light" : ""}`}>
      <h2 className="es-section-heading__title">
        {title}
      </h2>
      {subtitle && (
        <p className="es-section-heading__subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
}
