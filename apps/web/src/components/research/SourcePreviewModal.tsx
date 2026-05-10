import { AnimatePresence, motion } from "framer-motion";
import type { ResearchPaper } from "./types";

interface SourcePreviewModalProps {
  paper: ResearchPaper | null;
  onClose: () => void;
}

export function SourcePreviewModal({ onClose, paper }: SourcePreviewModalProps) {
  return (
    <AnimatePresence>
      {paper ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-primaryBlack/35 px-5"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl border border-primaryBlack bg-surfaceWhite p-6 shadow-[12px_12px_0_#0A0A0A]"
            exit={{ opacity: 0, y: 14 }}
            initial={{ opacity: 0, y: 18 }}
          >
            <p className="technical-label text-textSecondary">Demo Source Preview</p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-none">{paper.title}</h2>
            <p className="mt-5 leading-7 text-textSecondary">
              Demo source preview — pada versi production, BrowsePilot akan membuka sumber asli di browser.
            </p>
            <div className="mt-5 border border-borderSoft bg-surfaceLight p-4">
              <p className="technical-label text-textSecondary">Mock Source Link</p>
              <p className="mt-2 font-mono text-sm">{paper.source}</p>
              <p className="mt-3 text-sm leading-6 text-textSecondary">
                This is a simulated demo result, not a real citation or external source.
              </p>
            </div>
            <button
              className="mt-6 border border-primaryBlack bg-primaryBlack px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-surfaceWhite hover:text-primaryBlack"
              onClick={onClose}
              type="button"
            >
              Close Preview
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
