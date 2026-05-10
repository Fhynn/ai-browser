import { AnimatePresence, motion } from "framer-motion";
import { createWorkflowMarkdown } from "./workflowData";

interface MarkdownExportModalProps {
  open: boolean;
  copied: boolean;
  onClose: () => void;
  onCopy: () => void;
}

export function MarkdownExportModal({ copied, onClose, onCopy, open }: MarkdownExportModalProps) {
  const markdown = createWorkflowMarkdown();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-primaryBlack/35 px-5"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="max-h-[86vh] w-full max-w-4xl overflow-auto border border-primaryBlack bg-surfaceWhite p-6 shadow-[12px_12px_0_#0A0A0A]"
            exit={{ opacity: 0, y: 14 }}
            initial={{ opacity: 0, y: 18 }}
          >
            <p className="technical-label text-textSecondary">Markdown Export</p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-none">Generated Markdown</h2>
            <pre className="mt-5 max-h-[52vh] overflow-auto border border-borderSoft bg-surfaceLight p-4 whitespace-pre-wrap font-mono text-sm leading-7 text-textSecondary">
              {markdown}
            </pre>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="border border-primaryBlack bg-primaryBlack px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-surfaceWhite hover:text-primaryBlack"
                onClick={onCopy}
                type="button"
              >
                {copied ? "Copied Markdown" : "Copy Markdown"}
              </button>
              <button
                className="border border-primaryBlack bg-surfaceWhite px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-primaryBlack hover:text-white"
                onClick={onClose}
                type="button"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
