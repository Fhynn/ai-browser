import { AnimatePresence, motion } from "framer-motion";
import { importantTerms, workflowSections } from "./workflowData";

export function ExtractedStructurePanel({ showOutputs }: { showOutputs: boolean }) {
  return (
    <section className="border border-borderSoft bg-surfaceWhite p-5">
      <p className="technical-label text-textSecondary">Extracted Structure</p>
      <h2 className="mt-3 text-3xl font-black uppercase leading-none">Page Anatomy</h2>
      <div className="mt-5 grid gap-4">
        <div className="border border-borderSoft bg-surfaceLight p-4">
          <p className="technical-label text-textSecondary">Page Title</p>
          <p className="mt-2 font-semibold">Deploy Web App ke Cloud Run dari AI Studio</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Metric label="Reading Time" value="6 minutes" />
          <Metric label="Source Type" value="Documentation" />
        </div>
        <div>
          <p className="technical-label text-textSecondary">Detected Headings</p>
          <div className="mt-3 grid gap-2">
            <AnimatePresence>
              {(showOutputs ? workflowSections : workflowSections.slice(0, 2)).map((section) => (
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  className="border border-borderSoft bg-surfaceLight px-3 py-2 text-sm text-textSecondary"
                  initial={{ opacity: 0, x: 10 }}
                  key={section.id}
                >
                  {section.title}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div>
          <p className="technical-label text-textSecondary">Important Terms</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {importantTerms.map((term) => (
              <span className="border border-borderSoft bg-surfaceLight px-3 py-2 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-textSecondary" key={term}>
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-borderSoft bg-surfaceLight p-4">
      <p className="technical-label text-textSecondary">{label}</p>
      <p className="mt-2 font-semibold uppercase">{value}</p>
    </div>
  );
}
