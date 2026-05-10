import type { AgentPlan, AgentStep, ToolResult } from "@browsepilot/shared";

export type ResearchRunState = "idle" | "asking_clarification" | "planning" | "searching" | "reading" | "completed";

export interface ResearchPaper {
  id: string;
  title: string;
  year: string;
  method: string;
  dataset: string;
  bestFor: string;
  relevance: number;
  summary: string;
  whyUseful: string;
  source: string;
  notes: string;
}

export interface ResearchSourcePreview {
  paper: ResearchPaper;
}

export interface ResearchWorkspaceState {
  command: string;
  runState: ResearchRunState;
  plan: AgentPlan | null;
  steps: AgentStep[];
  results: ToolResult[];
  clarificationQuestion: string | null;
  clarificationAnswer: string | null;
  sourcePreview: ResearchSourcePreview | null;
  copied: boolean;
  savedPaperIds: string[];
  savedToDashboard: boolean;
}
