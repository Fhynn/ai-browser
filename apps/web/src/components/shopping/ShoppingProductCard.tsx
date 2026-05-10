import type { ShoppingProduct } from "./types";

interface ShoppingProductCardProps {
  product: ShoppingProduct;
  saved: boolean;
  onOpenProduct: (product: ShoppingProduct) => void;
  onAddToCart: (product: ShoppingProduct) => void;
  onSave: (product: ShoppingProduct) => void;
}

export function ShoppingProductCard({ onAddToCart, onOpenProduct, onSave, product, saved }: ShoppingProductCardProps) {
  return (
    <article className="border border-borderSoft bg-surfaceWhite p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="max-w-xl text-2xl font-black uppercase leading-tight">{product.name}</h3>
        <span className="border border-primaryBlack bg-surfaceLight px-2 py-1 font-mono text-[0.64rem] uppercase tracking-[0.12em]">
          {product.rating}
        </span>
      </div>
      <div className="mt-5 grid gap-2 text-sm leading-6 text-textSecondary sm:grid-cols-2">
        <p><strong className="text-primaryBlack">Price:</strong> {product.price}</p>
        <p><strong className="text-primaryBlack">Size:</strong> {product.size}</p>
        <p><strong className="text-primaryBlack">Age:</strong> {product.ageSuitability}</p>
        <p><strong className="text-primaryBlack">Seller:</strong> {product.sellerTrust}</p>
      </div>
      <div className="mt-4 border border-borderSoft bg-surfaceLight p-4">
        <p className="technical-label text-textSecondary">Sugar / Composition Note</p>
        <p className="mt-2 text-sm leading-6 text-textSecondary">{product.sugarNote}</p>
      </div>
      <div className="mt-4 border border-primaryBlack bg-surfaceLight p-4">
        <p className="technical-label text-textSecondary">Caution</p>
        <p className="mt-2 text-sm leading-6 text-textSecondary">{product.caution}</p>
      </div>
      <p className="mt-4 leading-7 text-textSecondary">{product.whyRecommended}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          className="border border-primaryBlack bg-surfaceWhite px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-primaryBlack hover:text-white"
          onClick={() => onOpenProduct(product)}
          type="button"
        >
          Open Product
        </button>
        <button
          className="border border-primaryBlack bg-primaryBlack px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-surfaceWhite hover:text-primaryBlack"
          onClick={() => onAddToCart(product)}
          type="button"
        >
          Add To Cart
        </button>
        <button
          className="border border-primaryBlack bg-surfaceWhite px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-primaryBlack hover:text-white"
          onClick={() => onSave(product)}
          type="button"
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </article>
  );
}
