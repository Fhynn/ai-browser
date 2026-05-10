import { AnimatePresence, motion } from "framer-motion";
import { workflowSections } from "./workflowData";
import type { WorkflowRunState } from "./types";

interface WorkflowBrowserPanelProps {
  command: string;
  runState: WorkflowRunState;
  activeSectionIndex: number;
  showOutputs: boolean;
}

export function WorkflowBrowserPanel({ activeSectionIndex, command, runState, showOutputs }: WorkflowBrowserPanelProps) {
  const loading = ["planning", "reading", "extracting"].includes(runState) && !showOutputs;

  return (
    <section className="border border-primaryBlack bg-surfaceWhite">
      <div className="flex items-center gap-3 border-b border-primaryBlack bg-surfaceLight px-4 py-3">
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 border border-primaryBlack bg-primaryBlack" />
          <span className="h-2.5 w-2.5 border border-primaryBlack" />
          <span className="h-2.5 w-2.5 border border-primaryBlack" />
        </div>
        <div className="min-w-0 flex-1 border border-borderSoft bg-surfaceWhite px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-textSecondary">
          https://browsepilot.demo/docs/cloud-run-ai-studio
        </div>
      </div>
      <div className="grid gap-4 p-5">
        <div>
          <p className="technical-label text-textSecondary">Simulated Article Browser</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-none">Deploy Web App ke Cloud Run dari AI Studio</h2>
        </div>
        <div className="border border-borderSoft bg-surfaceLight p-3 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-textSecondary">
          Command / {command || "Waiting for command"}
        </div>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div animate={{ opacity: 1 }} className="grid gap-3" exit={{ opacity: 0 }} initial={{ opacity: 0 }} key="loading">
              {[0, 1, 2].map((item) => (
                <div className="border border-borderSoft bg-surfaceLight p-4" key={item}>
                  <div className="h-4 w-7/12 bg-borderSoft" />
                  <div className="mt-3 h-3 w-10/12 bg-borderSoft" />
                  <div className="mt-2 h-3 w-8/12 bg-borderSoft" />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div animate={{ opacity: 1, y: 0 }} className="grid gap-4" exit={{ opacity: 0 }} initial={{ opacity: 0, y: 10 }} key="article">
              <article className="border border-borderSoft bg-surfaceLight p-5">
                <p className="technical-label text-textSecondary">Intro</p>
                <p className="mt-3 leading-7 text-textSecondary">
                  Artikel simulasi ini menjelaskan alur deploy web app dari AI Studio menuju Cloud Run, mulai dari persiapan project sampai verifikasi URL publik.
                </p>
              </article>
              <div className="grid gap-3">
                {workflowSections.map((section, index) => {
                  const active = index === activeSectionIndex;
                  return (
                    <article
                      className={`border p-4 transition ${active ? "border-primaryBlack bg-surfaceWhite shadow-[6px_6px_0_#D7DADD]" : "border-borderSoft bg-surfaceLight"}`}
                      key={section.id}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="text-xl font-black uppercase leading-tight">{section.title}</h3>
                        <span className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-textSecondary">
                          {active ? "Reading" : "Section"}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-textSecondary">{section.body}</p>
                      {section.snippet ? (
                        <pre className="mt-3 overflow-auto border border-borderSoft bg-surfaceWhite p-3 font-mono text-[0.68rem] text-textSecondary">
                          {section.snippet}
                        </pre>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
