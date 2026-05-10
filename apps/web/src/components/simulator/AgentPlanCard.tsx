import type { AgentMode, AgentPlan, AgentStep, SafetyLevel } from "@browsepilot/shared";
import { AnimatePresence } from "framer-motion";
import { AgentStepItem } from "./AgentStepItem";

interface AgentPlanCardProps {
  command: string;
  mode: AgentMode | null;
  plan: AgentPlan | null;
  safetyLevel: SafetyLevel;
  steps: AgentStep[];
  clarificationAnswer: string | null;
}

export function AgentPlanCard({ clarificationAnswer, command, mode, plan, safetyLevel, steps }: AgentPlanCardProps) {
  return (
    <section className="border border-borderSoft bg-surfaceWhite p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="technical-label text-textSecondary">Right Panel</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-none">Agent Plan</h2>
        </div>
        <span className="border border-borderSoft px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-textSecondary">
          {mode ? mode.replace("_", " ") : "No Mode"}
        </span>
      </div>
      <div className="mt-5 grid gap-3 border-y border-borderSoft py-4 text-sm leading-6 text-textSecondary">
        <p>
          <strong className="text-primaryBlack">Goal:</strong> {command || "No command submitted yet."}
        </p>
        <p>
          <strong className="text-primaryBlack">Mode:</strong> {mode ? mode.replace("_", " ") : "idle"}
        </p>
        <p>
          <strong className="text-primaryBlack">Safety level:</strong> {safetyLevel.replace("_", " ")}
        </p>
        <p>
          <strong className="text-primaryBlack">Assumptions:</strong>{" "}
          {clarificationAnswer || plan?.clarificationQuestion || "BrowsePilot will keep sensitive actions behind confirmation gates."}
        </p>
      </div>
      <ol className="mt-5 space-y-3">
        <AnimatePresence>
          {steps.length > 0 ? (
            steps.map((step, index) => <AgentStepItem index={index} key={step.id} step={step} />)
          ) : (
            <li className="border border-dashed border-borderSoft bg-surfaceLight p-5 text-sm text-textSecondary">
              Plan steps will appear after the agent creates a plan.
            </li>
          )}
        </AnimatePresence>
      </ol>
    </section>
  );
}
