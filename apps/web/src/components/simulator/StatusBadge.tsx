import type { AgentSimulatorState } from "./types";

const stateLabels: Record<AgentSimulatorState, string> = {
  idle: "IDLE",
  listening: "LISTENING",
  planning: "PLANNING",
  asking_clarification: "ASKING CLARIFICATION",
  executing: "EXECUTING",
  waiting_confirmation: "WAITING CONFIRMATION",
  completed: "COMPLETED",
  blocked_sensitive_action: "BLOCKED SENSITIVE ACTION",
  error: "ERROR"
};

export function StatusBadge({ state }: { state: AgentSimulatorState }) {
  const isCritical = state === "waiting_confirmation" || state === "blocked_sensitive_action" || state === "error";
  const isDone = state === "completed";
  const className = isCritical
    ? "border-primaryBlack bg-primaryBlack text-white"
    : isDone
      ? "border-primaryBlack bg-surfaceWhite text-primaryBlack"
      : "border-borderSoft bg-surfaceLight text-textSecondary";

  return <span className={`inline-flex border px-3 py-1 font-mono text-[0.66rem] font-bold uppercase tracking-[0.16em] ${className}`}>{stateLabels[state]}</span>;
}
