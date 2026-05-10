import type { AgentMode, AgentPlan, AgentStep, AgentStepType, SafetyLevel, ToolResult } from "@browsepilot/shared";

export type AgentSimulatorState =
  | "idle"
  | "listening"
  | "planning"
  | "asking_clarification"
  | "executing"
  | "waiting_confirmation"
  | "completed"
  | "blocked_sensitive_action"
  | "error";

export type BrowserStage =
  | "idle"
  | "searching"
  | "reading"
  | "extracting"
  | "comparing"
  | "summarizing"
  | "confirmation"
  | "results"
  | "blocked";

export interface ActionLogEntry {
  id: string;
  label: string;
  detail: string;
  createdAt: string;
  state: AgentSimulatorState;
}

export interface PendingConfirmation {
  title: string;
  body: string;
  actionText: string;
  step?: AgentStep;
  source: "agent_step" | "result_action";
}

export interface SimulatorSnapshot {
  state: AgentSimulatorState;
  command: string;
  mode: AgentMode | null;
  plan: AgentPlan | null;
  steps: AgentStep[];
  results: ToolResult[];
  resultSummary: string;
  clarificationQuestion: string | null;
  clarificationAnswer: string | null;
  browserStage: BrowserStage;
  pendingConfirmation: PendingConfirmation | null;
  blockedMessage: string | null;
}

export interface MockResearchResult {
  title: string;
  year: string;
  method: string;
  relevance: string;
  summary: string;
  source: string;
}

export interface MockProductResult {
  name: string;
  age: string;
  price: string;
  rating: string;
  sugar: string;
  caution: string;
  sellerTrust: string;
}

export interface MockWorkflowSummary {
  summary: string;
  keyPoints: string[];
  presentationBullets: string[];
}

export interface StepStatusView {
  type: AgentStepType;
  safetyLevel: SafetyLevel;
}
