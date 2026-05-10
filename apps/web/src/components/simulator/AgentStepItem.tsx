import { motion } from "framer-motion";
import type { AgentStep } from "@browsepilot/shared";

export function AgentStepItem({ index, step }: { index: number; step: AgentStep }) {
  const statusClass =
    step.status === "completed"
      ? "bg-primaryBlack text-white border-primaryBlack"
      : step.status === "running"
        ? "bg-surfaceWhite text-primaryBlack border-primaryBlack"
        : step.status === "blocked" || step.status === "failed"
          ? "bg-primaryBlack text-white border-primaryBlack"
          : "bg-surfaceLight text-textSecondary border-borderSoft";

  return (
    <motion.li
      animate={{ opacity: 1, x: 0 }}
      className="grid grid-cols-[2.2rem_1fr] gap-3 border border-borderSoft bg-surfaceWhite p-3"
      initial={{ opacity: 0, x: 12 }}
      layout
    >
      <div className="flex h-8 w-8 items-center justify-center border border-primaryBlack font-mono text-xs">{String(index + 1).padStart(2, "0")}</div>
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-bold uppercase leading-tight">{step.title}</h4>
          <span className={`border px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] ${statusClass}`}>{step.status}</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-textSecondary">{step.description}</p>
        <p className="technical-label mt-2 text-textSecondary">{step.type}</p>
      </div>
    </motion.li>
  );
}
