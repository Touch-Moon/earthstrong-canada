import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { expertiseCategoryLabels } from "@/types";
import Badge from "@/components/shared/Badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="es-product-card">
      <div className="es-product-card__thumb">
        <Image
          src={product.thumbnailImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="es-product-card__badges">
        {product.categories.map((cat) => (
          <Badge key={cat} label={expertiseCategoryLabels[cat]} />
        ))}
      </div>
      <h3 className="es-product-card__title">
        {product.name}
        <span className="es-product-card__arrow">→</span>
      </h3>
      <p className="es-product-card__desc">{product.shortDescription}</p>
    </Link>
  );
}
