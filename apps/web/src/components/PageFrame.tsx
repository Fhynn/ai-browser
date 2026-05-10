import { motion } from "framer-motion";
import type { PropsWithChildren, ReactNode } from "react";

interface PageFrameProps {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
  actions?: ReactNode;
}

export function PageFrame({ actions, children, description, eyebrow, meta, title }: PropsWithChildren<PageFrameProps>) {
  return (
    <section className="px-5 py-10 md:px-8 md:py-16">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="grid gap-8 border-b border-borderSoft pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="technical-label">{eyebrow}</p>
            <h1 className="mt-5 max-w-5xl font-display text-5xl font-black uppercase leading-[0.88] md:text-7xl lg:text-8xl">
              {title}
            </h1>
          </div>
          <div className="space-y-5">
            <p className="max-w-2xl text-lg leading-8 text-textSecondary">{description}</p>
            {meta ? <p className="technical-label text-textSecondary">{meta}</p> : null}
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </div>
        <div className="py-10">{children}</div>
      </motion.div>
    </section>
  );
}
