import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";

interface NextProductProps {
  product: Product;
}

export default function NextProduct({ product }: NextProductProps) {
  return (
    <Link href={`/products/${product.slug}`} className="es-next-product">
      {/* Background image */}
      <Image
        src={product.thumbnailImage}
        alt={product.name}
        fill
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="es-next-product__overlay" />

      {/* Content */}
      <div className="es-next-product__inner">
        <p className="es-next-product__label">Next Product</p>
        <h2 className="es-next-product__title">
          {product.name}
          <span className="es-next-product__arrow">→</span>
        </h2>
        <p className="es-next-product__tagline">{product.tagline}</p>
      </div>
    </Link>
  );
}
