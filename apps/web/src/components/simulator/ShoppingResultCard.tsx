import type { MockProductResult } from "./types";

interface ShoppingResultCardProps {
  product: MockProductResult;
  onAddToCart?: (productName: string) => void;
}

export function ShoppingResultCard({ onAddToCart, product }: ShoppingResultCardProps) {
  return (
    <article className="border border-borderSoft bg-surfaceWhite p-4">
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-bold leading-tight">{product.name}</h4>
        <span className="font-mono text-[0.66rem] text-textSecondary">{product.rating}</span>
      </div>
      <div className="mt-3 grid gap-2 text-sm text-textSecondary">
        <p>
          <strong className="text-primaryBlack">Age:</strong> {product.age}
        </p>
        <p>
          <strong className="text-primaryBlack">Price:</strong> {product.price}
        </p>
        <p>
          <strong className="text-primaryBlack">Sugar:</strong> {product.sugar}
        </p>
        <p>
          <strong className="text-primaryBlack">Caution:</strong> {product.caution}
        </p>
        <p>
          <strong className="text-primaryBlack">Seller:</strong> {product.sellerTrust}
        </p>
      </div>
      {onAddToCart ? (
        <button
          className="mt-4 w-full border border-primaryBlack bg-surfaceWhite px-3 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] transition hover:bg-primaryBlack hover:text-white"
          onClick={() => onAddToCart(product.name)}
          type="button"
        >
          Add To Cart
        </button>
      ) : null}
    </article>
  );
}
