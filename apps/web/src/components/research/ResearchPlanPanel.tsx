import { AnimatePresence } from "framer-motion";
import { AgentStepItem } from "../simulator/AgentStepItem";
import type { AgentStep } from "@browsepilot/shared";

interface ResearchPlanPanelProps {
  steps: AgentStep[];
}

export function ResearchPlanPanel({ steps }: ResearchPlanPanelProps) {
  return (
    <section className="border border-borderSoft bg-surfaceWhite p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="technical-label text-textSecondary">Agent Plan</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-none">Research Steps</h2>
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-textSecondary">{steps.length} steps</span>
      </div>
      <ol className="mt-5 space-y-3">
        <AnimatePresence>
          {steps.length > 0 ? (
            steps.map((step, index) => <AgentStepItem index={index} key={step.id} step={step} />)
          ) : (
            <li className="border border-dashed border-borderSoft bg-surfaceLight p-5 text-sm text-textSecondary">
              Research plan appears after clarification.
            </li>
          )}
        </AnimatePresence>
      </ol>
    </section>
  );
}
