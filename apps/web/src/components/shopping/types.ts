import type { AgentPlan, AgentStep, ToolResult } from "@browsepilot/shared";

export type ShoppingRunState =
  | "idle"
  | "listening"
  | "asking_clarification"
  | "planning"
  | "searching"
  | "comparing"
  | "completed"
  | "waiting_confirmation"
  | "blocked_sensitive_action";

export interface ShoppingProduct {
  id: string;
  name: string;
  ageSuitability: string;
  price: string;
  size: string;
  rating: string;
  sellerTrust: string;
  sugarNote: string;
  caution: string;
  whyRecommended: string;
  link: string;
}

export interface ShoppingConfirmation {
  actionText: string;
  product?: ShoppingProduct;
}

export interface ShoppingWorkspaceState {
  command: string;
  runState: ShoppingRunState;
  plan: AgentPlan | null;
  steps: AgentStep[];
  results: ToolResult[];
  clarificationQuestion: string | null;
  clarificationAnswer: string | null;
  previewProduct: ShoppingProduct | null;
  pendingConfirmation: ShoppingConfirmation | null;
  savedProductIds: string[];
  copied: boolean;
  savedTask: boolean;
  cartMessage: string | null;
  blockedMessage: string | null;
}
