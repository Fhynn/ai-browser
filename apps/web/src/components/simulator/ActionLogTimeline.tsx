import { AnimatePresence, motion } from "framer-motion";
import type { ActionLogEntry } from "./types";

export function ActionLogTimeline({ logs }: { logs: ActionLogEntry[] }) {
  return (
    <section className="border border-borderSoft bg-surfaceWhite p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="technical-label text-textSecondary">Bottom Timeline</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-none">Action Log</h2>
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-textSecondary">{logs.length} entries</span>
      </div>
      <div className="mt-5 grid max-h-[320px] gap-3 overflow-auto pr-1 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence>
          {logs.length > 0 ? (
            logs.map((log) => (
              <motion.article
                animate={{ opacity: 1, y: 0 }}
                className="border border-borderSoft bg-surfaceLight p-3"
                exit={{ opacity: 0, y: -8 }}
                initial={{ opacity: 0, y: 10 }}
                key={log.id}
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-bold uppercase leading-tight">{log.label}</h4>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-textSecondary">{log.state}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-textSecondary">{log.detail}</p>
                <p className="technical-label mt-3 text-textSecondary">{new Date(log.createdAt).toLocaleTimeString()}</p>
              </motion.article>
            ))
          ) : (
            <p className="border border-dashed border-borderSoft bg-surfaceLight p-5 text-sm text-textSecondary">
              Action log entries will stream in as the agent runs.
            </p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
