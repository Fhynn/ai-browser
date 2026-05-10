export const BROWSEPILOT_APP_NAME = "BrowsePilot AI";

export type AgentMode = "research" | "shopping" | "workflow" | "summarize" | "form_assist" | "general";

export type SafetyLevel = "safe" | "needs_confirmation" | "blocked";

export type AgentStepType =
  | "open_tab"
  | "search"
  | "read_page"
  | "click"
  | "type"
  | "scroll"
  | "extract"
  | "summarize"
  | "compare"
  | "ask_confirmation"
  | "ask_clarification"
  | "finish";

export type BrowserActionType = "open_tab" | "search" | "read_page" | "click" | "type" | "scroll" | "extract";

export type TaskStatus =
  | "idle"
  | "planning"
  | "asking_clarification"
  | "executing"
  | "waiting_confirmation"
  | "completed"
  | "blocked_sensitive_action"
  | "error";

export interface AgentCommand {
  id: string;
  text: string;
  mode: AgentMode;
  createdAt: string;
  pageContext?: PageContext;
}

export interface PageContext {
  title?: string;
  url?: string;
  selectedText?: string;
  visibleText?: string;
  headings?: string[];
  links?: Array<{
    text: string;
    href: string;
  }>;
}

export interface BrowserAction {
  type: BrowserActionType;
  target?: string;
  value?: string;
  description: string;
  safetyLevel: SafetyLevel;
}

export interface AgentStep {
  id: string;
  type: AgentStepType;
  title: string;
  description: string;
  action?: BrowserAction;
  safetyLevel: SafetyLevel;
  requiresConfirmation: boolean;
  status: "pending" | "running" | "completed" | "blocked" | "failed";
  confirmationRequest?: ConfirmationRequest;
}

export interface AgentPlan {
  id: string;
  taskId: string;
  command: string;
  mode: AgentMode;
  summary: string;
  steps: AgentStep[];
  clarificationQuestion: string | null;
  safetyLevel: SafetyLevel;
  createdAt: string;
}

export interface ToolResult {
  stepId: string;
  type: AgentStepType;
  success: boolean;
  safetyLevel: SafetyLevel;
  blocked: boolean;
  message: string;
  data?: Record<string, unknown>;
  createdAt: string;
}

export interface AgentResult {
  taskId: string;
  status: "completed" | "blocked_sensitive_action" | "error";
  summary: string;
  results: ToolResult[];
  safetyLevel: SafetyLevel;
  completedAt: string;
}

export interface ConfirmationRequest {
  id: string;
  stepId: string;
  actionText: string;
  reason: string;
  safetyLevel: SafetyLevel;
  confirmed: boolean;
  createdAt: string;
}

export interface TaskHistoryItem {
  taskId: string;
  command: string;
  mode: AgentMode;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  plan?: AgentPlan;
  result?: AgentResult;
  confirmationRequests: ConfirmationRequest[];
}

export type MockAgentMode = AgentMode;

export interface MockAgentStatus {
  mode: MockAgentMode;
  mockMode: true;
}

const SENSITIVE_ACTION_KEYWORDS = [
  "submit",
  "bayar",
  "payment",
  "checkout",
  "beli",
  "kirim",
  "send",
  "login",
  "masuk",
  "daftar",
  "register",
  "upload",
  "download",
  "delete",
  "hapus",
  "add to cart",
  "keranjang"
] as const;

function normalizeCommand(command: string): string {
  return command.toLowerCase().replace(/\s+/g, " ").trim();
}

function hasAny(text: string, keywords: readonly string[]): boolean {
  return keywords.some((keyword) => text.includes(keyword));
}

function nowIso(): string {
  return new Date().toISOString();
}

function generateId(prefix: string): string {
  const randomPart = Math.random().toString(36).slice(2, 8);
  return `${prefix}_${Date.now().toString(36)}_${randomPart}`;
}

export function generateTaskId(): string {
  return generateId("task");
}

export function generateStepId(): string {
  return generateId("step");
}

function generatePlanId(): string {
  return generateId("plan");
}

function generateConfirmationId(): string {
  return generateId("confirm");
}

export function createMockAgentStatus(mode: MockAgentMode = "general"): MockAgentStatus {
  return {
    mode,
    mockMode: true
  };
}

export function detectMode(command: string): AgentMode {
  const normalized = normalizeCommand(command);

  if (hasAny(normalized, ["jurnal", "paper", "artikel ilmiah", "research", "riset", "yolo", "dataset"])) {
    return "research";
  }

  if (hasAny(normalized, ["susu", "baju", "murah", "produk", "harga", "seller", "toko", "belanja"])) {
    return "shopping";
  }

  if (hasAny(normalized, ["ringkas", "summarize", "summary", "rangkum"])) {
    return "summarize";
  }

  if (hasAny(normalized, ["form", "isi form", "jangan submit", "submit dulu"])) {
    return "form_assist";
  }

  if (hasAny(normalized, ["dokumentasi", "deploy", "cloud run", "workflow", "bantu isi", "buat poin"])) {
    return "workflow";
  }

  return "general";
}

export function classifySensitiveAction(actionText: string): boolean {
  const normalized = normalizeCommand(actionText);
  return SENSITIVE_ACTION_KEYWORDS.some((keyword) => {
    if (keyword.includes(" ")) {
      return normalized.includes(keyword);
    }

    return new RegExp(`(^|[^a-z0-9])${keyword}([^a-z0-9]|$)`, "i").test(normalized);
  });
}

export function askClarifyingQuestion(command: string): string | null {
  const normalized = normalizeCommand(command);
  const mode = detectMode(command);

  if (mode === "shopping" && normalized.includes("susu")) {
    return "Anak kakak usia berapa tahun? Ada alergi susu sapi atau lactose intolerance? Budget berapa?";
  }

  if (mode === "shopping" && normalized.includes("baju")) {
    return "Bajunya untuk siapa, ukuran apa, gaya seperti apa, dan budget maksimal berapa?";
  }

  if (mode === "research" && (normalized.includes("jurnal") || normalized.includes("yolo"))) {
    return "Fokusnya untuk skripsi, prototype IoT, atau implementasi industri?";
  }

  if (mode === "form_assist" && !normalized.includes("jangan submit")) {
    return "Field apa saja yang boleh diisi, dan apakah BrowsePilot harus berhenti sebelum tombol submit?";
  }

  return null;
}

export function createPlan(command: string, context?: PageContext): AgentPlan {
  const mode = detectMode(command);
  const taskId = generateTaskId();
  const clarificationQuestion = askClarifyingQuestion(command);
  const baseSteps = createStepsForMode(command, mode, context);
  const clarificationStep = clarificationQuestion
    ? [
        makeStep("ask_clarification", "Ask a clarifying question", clarificationQuestion, {
          safetyLevel: "safe"
        })
      ]
    : [];
  const steps = [...clarificationStep, ...baseSteps];
  const needsConfirmation = steps.some((step) => step.requiresConfirmation);

  return {
    id: generatePlanId(),
    taskId,
    command,
    mode,
    summary: createPlanSummary(command, mode, needsConfirmation),
    steps,
    clarificationQuestion,
    safetyLevel: needsConfirmation ? "needs_confirmation" : "safe",
    createdAt: nowIso()
  };
}

export function executeMockStep(step: AgentStep): ToolResult {
  if (step.requiresConfirmation || step.type === "ask_confirmation") {
    return {
      stepId: step.id,
      type: step.type,
      success: false,
      safetyLevel: "needs_confirmation",
      blocked: true,
      message: "Sensitive action is blocked until the user confirms.",
      data: {
        confirmationRequest: step.confirmationRequest ?? null
      },
      createdAt: nowIso()
    };
  }

  return {
    stepId: step.id,
    type: step.type,
    success: true,
    safetyLevel: step.safetyLevel,
    blocked: false,
    message: createMockStepMessage(step),
    data: createMockStepData(step),
    createdAt: nowIso()
  };
}

export function summarizeResults(results: ToolResult[]): AgentResult {
  const blockedResults = results.filter((result) => result.blocked);
  const failedResults = results.filter((result) => !result.success && !result.blocked);
  const completedResults = results.filter((result) => result.success);
  const taskId = extractTaskIdFromResults(results);

  if (blockedResults.length > 0) {
    return {
      taskId,
      status: "blocked_sensitive_action",
      summary: `${blockedResults.length} sensitive action blocked. User confirmation is required before continuing.`,
      results,
      safetyLevel: "needs_confirmation",
      completedAt: nowIso()
    };
  }

  if (failedResults.length > 0) {
    return {
      taskId,
      status: "error",
      summary: `${failedResults.length} mock step failed. Review the action log before continuing.`,
      results,
      safetyLevel: "safe",
      completedAt: nowIso()
    };
  }

  return {
    taskId,
    status: "completed",
    summary: `Completed ${completedResults.length} mock browser steps and prepared a safe result summary.`,
    results,
    safetyLevel: "safe",
    completedAt: nowIso()
  };
}

function createStepsForMode(command: string, mode: AgentMode, context?: PageContext): AgentStep[] {
  if (mode === "research") {
    return [
      makeStep("search", "Search recent research", `Search for recent papers matching: ${command}`, {
        actionType: "search",
        target: "web",
        value: command
      }),
      makeStep("read_page", "Read result cards", "Read titles, years, snippets, and source metadata from search results."),
      makeStep("extract", "Extract paper details", "Extract title, year, method, dataset, contribution, and source link."),
      makeStep("compare", "Compare relevance", "Compare paper relevance for the user's stated goal."),
      makeStep("summarize", "Summarize research options", "Create a concise comparison summary for the user."),
      makeStep("finish", "Finish research task", "Return the simulated research result set.")
    ];
  }

  if (mode === "shopping") {
    return [
      makeStep("search", "Search products", `Search shopping options matching: ${command}`, {
        actionType: "search",
        target: "web",
        value: command
      }),
      makeStep("extract", "Extract product signals", "Extract price, size, suitability, rating, seller trust, and caution notes."),
      makeStep("compare", "Compare product options", "Compare options without recommending unsafe purchases."),
      makeStep("summarize", "Summarize shopping options", "Show top options and concise safety notes."),
      makeStep("ask_confirmation", "Confirm before cart action", "Ask before add to cart, checkout, payment, or purchase.", {
        safetyLevel: "needs_confirmation",
        actionType: "click",
        target: "add to cart",
        value: "add to cart"
      }),
      makeStep("finish", "Finish shopping task", "Return safe product comparison results.")
    ];
  }

  if (mode === "summarize") {
    return [
      makeStep("read_page", "Read current page", context?.url ? `Read current page: ${context.url}` : "Read the current page content."),
      makeStep("extract", "Extract page structure", "Extract headings, key paragraphs, and visible page context."),
      makeStep("summarize", "Summarize page", "Summarize the page into clear key points."),
      makeStep("finish", "Finish summary task", "Return the page summary.")
    ];
  }

  if (mode === "form_assist") {
    return [
      makeStep("read_page", "Inspect form page", "Read visible labels, input names, and current form state."),
      makeStep("type", "Prepare safe form input", "Type only the user-approved form values.", {
        actionType: "type",
        target: "focused form field",
        value: command
      }),
      makeStep("ask_confirmation", "Stop before submit", "Ask before submit, send, login, upload, or account changes.", {
        safetyLevel: "needs_confirmation",
        actionType: "click",
        target: "submit",
        value: "submit"
      }),
      makeStep("finish", "Finish form assist task", "Leave the form prepared without submitting it.")
    ];
  }

  if (mode === "workflow") {
    return [
      makeStep("search", "Find workflow documentation", `Search for workflow documentation matching: ${command}`, {
        actionType: "search",
        target: "web",
        value: command
      }),
      makeStep("read_page", "Read official sources", "Read relevant documentation pages and implementation notes."),
      makeStep("extract", "Extract steps", "Extract commands, prerequisites, warnings, and deployment sequence."),
      makeStep("summarize", "Summarize workflow", "Create a step-by-step workflow summary."),
      makeStep("finish", "Finish workflow task", "Return the prepared workflow result.")
    ];
  }

  return [
    makeStep("search", "Understand command", `Search or inspect context for: ${command}`, {
      actionType: "search",
      target: "web",
      value: command
    }),
    makeStep("read_page", "Read relevant page", "Read the most relevant available page."),
    makeStep("summarize", "Summarize findings", "Summarize the findings and suggest a safe next action."),
    makeStep("finish", "Finish task", "Return the mock task result.")
  ];
}

function makeStep(
  type: AgentStepType,
  title: string,
  description: string,
  options: {
    actionType?: BrowserActionType;
    target?: string;
    value?: string;
    safetyLevel?: SafetyLevel;
  } = {}
): AgentStep {
  const actionText = [description, options.target, options.value].filter(Boolean).join(" ");
  const sensitive = classifySensitiveAction(actionText);
  const safetyLevel = options.safetyLevel ?? (sensitive ? "needs_confirmation" : "safe");
  const requiresConfirmation = safetyLevel === "needs_confirmation" || sensitive || type === "ask_confirmation";
  const id = generateStepId();
  const action = options.actionType
    ? {
        type: options.actionType,
        target: options.target,
        value: options.value,
        description,
        safetyLevel
      }
    : undefined;

  return {
    id,
    type,
    title,
    description,
    action,
    safetyLevel,
    requiresConfirmation,
    status: requiresConfirmation ? "blocked" : "pending",
    confirmationRequest: requiresConfirmation
      ? {
          id: generateConfirmationId(),
          stepId: id,
          actionText: actionText || title,
          reason: "This action can change account, transaction, device, file, or submitted data state.",
          safetyLevel: "needs_confirmation",
          confirmed: false,
          createdAt: nowIso()
        }
      : undefined
  };
}

function createPlanSummary(command: string, mode: AgentMode, needsConfirmation: boolean): string {
  const safetySuffix = needsConfirmation
    ? " Sensitive actions will be blocked until the user confirms."
    : " No sensitive action is scheduled.";

  return `Mock ${mode} plan for "${command}".${safetySuffix}`;
}

function createMockStepMessage(step: AgentStep): string {
  switch (step.type) {
    case "ask_clarification":
      return step.description;
    case "search":
      return "Mock search completed with simulated result cards.";
    case "read_page":
      return "Mock page read completed.";
    case "extract":
      return "Mock extraction completed.";
    case "compare":
      return "Mock comparison completed.";
    case "summarize":
      return "Mock summary prepared.";
    case "type":
      return "Mock typing prepared without submitting.";
    case "click":
      return "Mock click completed.";
    case "scroll":
      return "Mock scroll completed.";
    case "open_tab":
      return "Mock tab opened.";
    case "finish":
      return "Mock task finished.";
    case "ask_confirmation":
      return "Confirmation is required before this action.";
  }
}

function createMockStepData(step: AgentStep): Record<string, unknown> {
  if (step.type === "search") {
    return {
      query: step.action?.value ?? step.description,
      results: [
        "Demo result 1 - simulated for prototype",
        "Demo result 2 - simulated for prototype",
        "Demo result 3 - simulated for prototype"
      ]
    };
  }

  if (step.type === "summarize") {
    return {
      bullets: [
        "Goal understood from the user command.",
        "Browser actions were prepared in a safe sequence.",
        "Sensitive actions remain blocked until confirmation."
      ]
    };
  }

  return {
    title: step.title,
    description: step.description
  };
}

function extractTaskIdFromResults(results: ToolResult[]): string {
  const taskId = results.find((result) => typeof result.data?.taskId === "string")?.data?.taskId;
  return typeof taskId === "string" ? taskId : generateTaskId();
}
