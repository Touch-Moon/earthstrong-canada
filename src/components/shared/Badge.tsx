interface BadgeProps {
  label: string;
  className?: string;
}

export default function Badge({ label, className = "" }: BadgeProps) {
  return (
    <span className={`es-badge ${className}`}>
      {label}
    </span>
  );
}
