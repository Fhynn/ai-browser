import { AnimatePresence, motion } from "framer-motion";
import { shoppingFilters, shoppingProducts } from "./shoppingData";
import type { ShoppingRunState } from "./types";

interface ShoppingBrowserPanelProps {
  command: string;
  runState: ShoppingRunState;
  showResults: boolean;
}

export function ShoppingBrowserPanel({ command, runState, showResults }: ShoppingBrowserPanelProps) {
  const loading = ["planning", "searching", "comparing"].includes(runState);

  return (
    <section className="border border-primaryBlack bg-surfaceWhite">
      <div className="flex items-center gap-3 border-b border-primaryBlack bg-surfaceLight px-4 py-3">
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 border border-primaryBlack bg-primaryBlack" />
          <span className="h-2.5 w-2.5 border border-primaryBlack" />
          <span className="h-2.5 w-2.5 border border-primaryBlack" />
        </div>
        <div className="min-w-0 flex-1 border border-borderSoft bg-surfaceWhite px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-textSecondary">
          https://browsepilot.demo/shop/search
        </div>
      </div>
      <div className="grid gap-4 p-5">
        <div>
          <p className="technical-label text-textSecondary">Simulated Shopping Browser</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-none">Product Search</h2>
        </div>
        <div className="border border-borderSoft bg-surfaceLight p-3 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-textSecondary">
          Query / {command || "Waiting for command"}
        </div>
        <div className="flex flex-wrap gap-2">
          {shoppingFilters.map((filter) => (
            <span className="border border-borderSoft bg-surfaceLight px-3 py-2 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-textSecondary" key={filter}>
              {filter}
            </span>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div animate={{ opacity: 1 }} className="grid gap-3" exit={{ opacity: 0 }} initial={{ opacity: 0 }} key="loading">
              {[0, 1, 2].map((item) => (
                <div className="border border-borderSoft bg-surfaceLight p-4" key={item}>
                  <div className="h-4 w-7/12 bg-borderSoft" />
                  <div className="mt-3 h-3 w-4/12 bg-borderSoft" />
                  <div className="mt-5 h-20 border border-borderSoft bg-surfaceWhite" />
                </div>
              ))}
            </motion.div>
          ) : showResults ? (
            <motion.div animate={{ opacity: 1, y: 0 }} className="grid gap-3 md:grid-cols-2" exit={{ opacity: 0 }} initial={{ opacity: 0, y: 10 }} key="results">
              {shoppingProducts.slice(0, 4).map((product) => (
                <article className="border border-borderSoft bg-surfaceLight p-4" key={product.id}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold leading-tight">{product.name}</h3>
                    <span className="border border-primaryBlack bg-surfaceWhite px-2 py-1 font-mono text-[0.62rem]">{product.rating}</span>
                  </div>
                  <p className="technical-label mt-3 text-textSecondary">
                    {product.price} / {product.size} / {product.ageSuitability}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-textSecondary">{product.whyRecommended}</p>
                </article>
              ))}
            </motion.div>
          ) : (
            <motion.div animate={{ opacity: 1 }} className="border border-dashed border-borderSoft bg-surfaceLight p-8 text-center" exit={{ opacity: 0 }} initial={{ opacity: 0 }} key="idle">
              <p className="technical-label text-textSecondary">Ready</p>
              <p className="mt-3 text-2xl font-black uppercase">Shopping browser siap mencari produk demo.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
