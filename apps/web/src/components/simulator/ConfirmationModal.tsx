import { AnimatePresence, motion } from "framer-motion";
import type { PendingConfirmation } from "./types";

interface ConfirmationModalProps {
  confirmation: PendingConfirmation | null;
  onApprove: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({ confirmation, onApprove, onCancel }: ConfirmationModalProps) {
  return (
    <AnimatePresence>
      {confirmation ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-primaryBlack/35 px-5"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl border border-primaryBlack bg-surfaceWhite p-6 shadow-[12px_12px_0_#0A0A0A]"
            exit={{ opacity: 0, y: 14 }}
            initial={{ opacity: 0, y: 18 }}
          >
            <p className="technical-label text-textSecondary">Sensitive Action</p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-none">Aksi ini butuh persetujuan</h2>
            <p className="mt-5 leading-7 text-textSecondary">
              BrowsePilot tidak akan melakukan checkout, pembayaran, submit form, login, upload, download, atau add to cart tanpa izin kamu.
            </p>
            <div className="mt-5 border border-borderSoft bg-surfaceLight p-4">
              <p className="technical-label text-textSecondary">Action</p>
              <p className="mt-2 font-semibold">{confirmation.actionText}</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                className="border border-primaryBlack bg-primaryBlack px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-surfaceWhite hover:text-primaryBlack"
                onClick={onApprove}
                type="button"
              >
                Approve Action
              </button>
              <button
                className="border border-primaryBlack bg-surfaceWhite px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-primaryBlack hover:text-white"
                onClick={onCancel}
                type="button"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
