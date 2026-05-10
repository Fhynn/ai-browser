import { createPlan, detectMode, type AgentMode } from "@browsepilot/shared";

export interface PlaceholderPanel {
  label: string;
  title: string;
  body: string;
}

export interface PageSpec {
  eyebrow: string;
  title: string;
  description: string;
  sampleCommand: string;
  nextPhase: string;
  panels: PlaceholderPanel[];
}

export function getModeLabel(command: string): AgentMode {
  return detectMode(command);
}

export function getPlanMeta(command: string): string {
  const plan = createPlan(command);
  const confirmationCopy = plan.safetyLevel === "needs_confirmation" ? "confirmation gate included" : "safe sequence";

  return `${plan.mode.toUpperCase()} / ${plan.steps.length} planned steps / ${confirmationCopy}`;
}
