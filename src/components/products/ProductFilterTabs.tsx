"use client";

import { useState } from "react";
import type { Product, ExpertiseCategory } from "@/types";
import { expertiseCategoryLabels } from "@/types";
import ProductCard from "./ProductCard";

interface ProductFilterTabsProps {
  products: Product[];
}

type FilterMode = "all" | "expertise";

export default function ProductFilterTabs({ products }: ProductFilterTabsProps) {
  const [mode, setMode] = useState<FilterMode>("all");
  const [activeCategory, setActiveCategory] = useState<ExpertiseCategory | null>(null);

  const allCategories = Array.from(
    new Set(products.flatMap((p) => p.categories))
  ) as ExpertiseCategory[];

  const filtered =
    mode === "all" || !activeCategory
      ? products
      : products.filter((p) => p.categories.includes(activeCategory));

  return (
    <div>
      {/* Mode Tabs */}
      <div className="es-filter-tabs__modes">
        {(["all", "expertise"] as FilterMode[]).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              if (m === "all") setActiveCategory(null);
            }}
            className={`es-filter-tabs__mode-btn ${mode === m ? "es-filter-tabs__mode-btn--active" : ""}`}
          >
            {m === "all" ? "All Products" : "By Expertise"}
          </button>
        ))}
      </div>

      {/* Expertise sub-tabs */}
      {mode === "expertise" && (
        <div className="es-filter-tabs__expertise">
          {allCategories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? null : cat)
                }
                className={`es-filter-tabs__exp-btn ${active ? "es-filter-tabs__exp-btn--active" : ""}`}
              >
                {expertiseCategoryLabels[cat]}
              </button>
            );
          })}
        </div>
      )}

      {/* Products grid */}
      <div className="es-filter-tabs__grid">
        {filtered.map((product) => (
          <div key={product.slug} className="es-filter-tabs__grid-item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
