import { ShoppingProductCard } from "./ShoppingProductCard";
import type { ShoppingProduct } from "./types";

interface ProductComparisonGridProps {
  products: ShoppingProduct[];
  savedProductIds: string[];
  onOpenProduct: (product: ShoppingProduct) => void;
  onAddToCart: (product: ShoppingProduct) => void;
  onSave: (product: ShoppingProduct) => void;
}

export function ProductComparisonGrid({
  onAddToCart,
  onOpenProduct,
  onSave,
  products,
  savedProductIds
}: ProductComparisonGridProps) {
  return (
    <section className="border border-borderSoft bg-surfaceWhite p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="technical-label text-textSecondary">Product Comparison Grid</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-none">Demo Product Options</h2>
        </div>
        <span className="technical-label text-textSecondary">Simulated demo products only</span>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {products.map((product) => (
          <ShoppingProductCard
            key={product.id}
            onAddToCart={onAddToCart}
            onOpenProduct={onOpenProduct}
            onSave={onSave}
            product={product}
            saved={savedProductIds.includes(product.id)}
          />
        ))}
      </div>
    </section>
  );
}
