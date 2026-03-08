import Link from "next/link";

interface ButtonProps {
  href: string;
  label: string;
  variant?: "outline" | "filled";
  className?: string;
}

export default function Button({
  href,
  label,
  variant = "outline",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`es-btn ${variant === "filled" ? "es-btn--filled" : "es-btn--outline"} ${className}`}
    >
      {label}
    </Link>
  );
}
