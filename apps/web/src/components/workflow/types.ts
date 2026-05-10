import type { AgentPlan, AgentStep, ToolResult } from "@browsepilot/shared";

export type WorkflowRunState = "idle" | "planning" | "reading" | "extracting" | "summarizing" | "completed";

export interface WorkflowSection {
  id: string;
  title: string;
  body: string;
  snippet?: string;
}

export interface WorkflowOutput {
  summary: string;
  keyPoints: string[];
  presentationBullets: string[];
  actionItems: string[];
}

export interface WorkflowWorkspaceState {
  command: string;
  runState: WorkflowRunState;
  plan: AgentPlan | null;
  steps: AgentStep[];
  results: ToolResult[];
  activeSectionIndex: number;
  showOutputs: boolean;
  copiedTarget: string | null;
  exportOpen: boolean;
  savedTask: boolean;
}
