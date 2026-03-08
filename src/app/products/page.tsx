import type { Metadata } from "next";
import { products } from "@/data/products";
import ProductFilterTabs from "@/components/products/ProductFilterTabs";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Earthstrong Canada's full lineup of crop nutrition and soil analysis solutions.",
};

export default function ProductsPage() {
  return (
    <div className="es-products-page">
      <div className="es-container">
        {/* Page header */}
        <div className="es-products-page__header">
          <p className="es-products-page__tag">Total Nutrition Management</p>
          <h1 className="es-products-page__title">Our Solutions</h1>
          <p className="es-products-page__intro">
            Six science-based products engineered to maximize the nutrition your
            crops can access — from the soil sample to the plant cell.
          </p>
        </div>

        {/* Filter + Grid */}
        <ProductFilterTabs products={products} />
      </div>

      <div className="es-section-spacer" />
    </div>
  );
}
