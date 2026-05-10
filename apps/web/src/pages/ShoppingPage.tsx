import {
  askClarifyingQuestion,
  classifySensitiveAction,
  createPlan,
  detectMode,
  executeMockStep,
  generateStepId,
  summarizeResults,
  type AgentMode,
  type AgentPlan,
  type AgentStep,
  type TaskHistoryItem,
  type ToolResult
} from "@browsepilot/shared";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ProductComparisonGrid } from "../components/shopping/ProductComparisonGrid";
import { ProductPreviewModal } from "../components/shopping/ProductPreviewModal";
import { ShoppingBrowserPanel } from "../components/shopping/ShoppingBrowserPanel";
import { ShoppingClarificationPanel } from "../components/shopping/ShoppingClarificationPanel";
import { ShoppingCommandPanel } from "../components/shopping/ShoppingCommandPanel";
import { ShoppingConfirmationModal } from "../components/shopping/ShoppingConfirmationModal";
import { ShoppingPlanPanel } from "../components/shopping/ShoppingPlanPanel";
import { ShoppingSafetyNote } from "../components/shopping/ShoppingSafetyNote";
import { ShoppingSummaryCard } from "../components/shopping/ShoppingSummaryCard";
import {
  DEFAULT_SHOPPING_COMMAND,
  shoppingProducts,
  shoppingRecommendation
} from "../components/shopping/shoppingData";
import type { ShoppingConfirmation, ShoppingProduct, ShoppingRunState } from "../components/shopping/types";
import type { RoutePageProps } from "../routes";

const TASK_HISTORY_KEY = "browsepilot:task-history";
const SAVED_PRODUCTS_KEY = "browsepilot:saved-products";
const STEP_DELAY_MS = 520;

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function nowIso() {
  return new Date().toISOString();
}

function createShoppingSteps(): AgentStep[] {
  const stepData = [
    ["read_page", "Memahami kebutuhan anak dan budget", "Menggunakan umur, alergi, dan budget sebagai batasan awal."],
    ["search", "Membuka pencarian produk simulasi", "Mencari produk demo tanpa membuka marketplace nyata."],
    ["extract", "Memfilter kecocokan usia", "Memastikan semua opsi memakai label usia yang sesuai."],
    ["compare", "Membandingkan harga, ukuran, rating, dan seller trust", "Mengecek sinyal belanja umum tanpa klaim medis."],
    ["read_page", "Mengecek catatan gula/komposisi secara umum", "Mencatat sinyal gula dan komposisi secara umum."],
    ["summarize", "Menyusun rekomendasi", "Meringkas opsi terbaik berdasarkan kebutuhan dan sinyal produk."],
    ["ask_confirmation", "Menunggu konfirmasi sebelum aksi sensitif", "Add to cart, checkout, dan pembayaran tetap menunggu persetujuan user."]
  ] as const;

  return stepData.map(([type, title, description]) => ({
    id: generateStepId(),
    type,
    title,
    description,
    safetyLevel: type === "ask_confirmation" ? "needs_confirmation" : "safe",
    requiresConfirmation: type === "ask_confirmation",
    status: "pending"
  }));
}

export function ShoppingPage(_props: RoutePageProps) {
  const [command, setCommand] = useState(DEFAULT_SHOPPING_COMMAND);
  const [runState, setRunState] = useState<ShoppingRunState>("idle");
  const [mode, setMode] = useState<AgentMode | null>(null);
  const [plan, setPlan] = useState<AgentPlan | null>(null);
  const [steps, setSteps] = useState<AgentStep[]>([]);
  const [toolResults, setToolResults] = useState<ToolResult[]>([]);
  const [clarificationQuestion, setClarificationQuestion] = useState<string | null>(null);
  const [clarificationAnswer, setClarificationAnswer] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<ShoppingProduct | null>(null);
  const [pendingConfirmation, setPendingConfirmation] = useState<ShoppingConfirmation | null>(null);
  const [savedProductIds, setSavedProductIds] = useState<string[]>(() => loadSavedProductIds());
  const [copied, setCopied] = useState(false);
  const [savedTask, setSavedTask] = useState(false);
  const [cartMessage, setCartMessage] = useState<string | null>(null);
  const [blockedMessage, setBlockedMessage] = useState<string | null>(null);

  const detectedModeLabel = useMemo(() => (mode ? mode.toUpperCase() : "WAITING"), [mode]);

  const updateStepStatus = (stepId: string, status: AgentStep["status"]) => {
    setSteps((current) => current.map((step) => (step.id === stepId ? { ...step, status } : step)));
  };

  const runAgent = async (answer: string | null = clarificationAnswer) => {
    const cleanCommand = command.trim();
    if (!cleanCommand) {
      return;
    }

    setSavedTask(false);
    setCopied(false);
    setCartMessage(null);
    setBlockedMessage(null);
    setPendingConfirmation(null);
    setPreviewProduct(null);
    setShowResults(false);
    setToolResults([]);

    const detectedMode = detectMode(cleanCommand);
    setMode(detectedMode);

    const question = answer ? null : askClarifyingQuestion(cleanCommand);
    if (question) {
      setRunState("asking_clarification");
      setClarificationQuestion(question);
      return;
    }

    const finalCommand = answer ? `${cleanCommand} ${answer}` : cleanCommand;
    const sharedPlan = createPlan(finalCommand);
    const shoppingSteps = createShoppingSteps();
    const shoppingPlan: AgentPlan = {
      ...sharedPlan,
      mode: "shopping",
      clarificationQuestion: null,
      steps: shoppingSteps,
      safetyLevel: "needs_confirmation",
      summary: "Shopping mode plan for simulated product discovery and safe confirmation."
    };

    setPlan(shoppingPlan);
    setSteps(shoppingSteps);
    setClarificationQuestion(null);
    setRunState("planning");
    await wait(STEP_DELAY_MS);

    const results: ToolResult[] = [];
    for (const step of shoppingSteps) {
      setRunState(step.type === "search" || step.type === "extract" ? "searching" : "comparing");
      updateStepStatus(step.id, "running");
      await wait(STEP_DELAY_MS);

      if (step.requiresConfirmation) {
        updateStepStatus(step.id, "blocked");
        setShowResults(true);
        setRunState("completed");
        continue;
      }

      const result = executeMockStep(step);
      results.push({
        ...result,
        data: {
          ...(result.data ?? {}),
          taskId: shoppingPlan.taskId,
          demoProducts: true
        }
      });
      setToolResults([...results]);
      updateStepStatus(step.id, "completed");
      if (step.type === "extract" || step.type === "compare") {
        setShowResults(true);
      }
      await wait(180);
    }

    setShowResults(true);
    setRunState("completed");
    const agentResult = summarizeResults(results);
    saveTaskHistory(shoppingPlan, finalCommand, "completed", agentResult.summary || shoppingRecommendation);
  };

  const answerClarification = (answer: string) => {
    setClarificationAnswer(answer);
    void runAgent(answer);
  };

  const reset = () => {
    setCommand(DEFAULT_SHOPPING_COMMAND);
    setRunState("idle");
    setMode(null);
    setPlan(null);
    setSteps([]);
    setToolResults([]);
    setClarificationQuestion(null);
    setClarificationAnswer(null);
    setShowResults(false);
    setPreviewProduct(null);
    setPendingConfirmation(null);
    setCopied(false);
    setSavedTask(false);
    setCartMessage(null);
    setBlockedMessage(null);
  };

  const simulateVoice = () => {
    setRunState("listening");
    window.setTimeout(() => {
      setCommand(DEFAULT_SHOPPING_COMMAND);
      setRunState("idle");
    }, 1000);
  };

  const openProduct = (product: ShoppingProduct) => {
    setPreviewProduct(product);
  };

  const requestAddToCart = (product: ShoppingProduct) => {
    const actionText = `add to cart ${product.name}`;
    if (!classifySensitiveAction(actionText)) {
      return;
    }
    setRunState("waiting_confirmation");
    setPendingConfirmation({ actionText, product });
  };

  const approveAction = () => {
    setPendingConfirmation(null);
    setRunState("completed");
    setCartMessage("Produk demo berhasil disiapkan ke keranjang simulasi.");
    setBlockedMessage(null);
    if (plan) {
      saveTaskHistory(plan, command, "completed", "Produk demo berhasil disiapkan ke keranjang simulasi.");
    }
  };

  const cancelAction = () => {
    setPendingConfirmation(null);
    setRunState("blocked_sensitive_action");
    const message = "Aksi dibatalkan. BrowsePilot hanya menampilkan rekomendasi tanpa mengeksekusi aksi belanja.";
    setBlockedMessage(message);
    setCartMessage(null);
    if (plan) {
      saveTaskHistory(plan, command, "blocked_sensitive_action", message);
    }
  };

  const saveProduct = (product: ShoppingProduct) => {
    const current = loadSavedProducts();
    const next = [product, ...current.filter((item) => item.id !== product.id)].slice(0, 20);
    window.localStorage.setItem(SAVED_PRODUCTS_KEY, JSON.stringify(next));
    setSavedProductIds(next.map((item) => item.id));
  };

  const copySummary = () => {
    void navigator.clipboard?.writeText(shoppingRecommendation).catch(() => undefined);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const saveTask = () => {
    const taskPlan = plan ?? createPlan(command);
    saveTaskHistory(taskPlan, command, runState === "blocked_sensitive_action" ? "blocked_sensitive_action" : "completed", shoppingRecommendation);
    setSavedTask(true);
  };

  return (
    <section className="px-5 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-[1680px]">
        <header className="border-b border-borderSoft pb-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 18 }} transition={{ duration: 0.35 }}>
              <p className="technical-label text-textSecondary">MODE / SHOPPING</p>
              <h1 className="mt-5 font-display text-6xl font-black uppercase leading-[0.85] md:text-8xl">
                Shopping
                <br />
                Agent Mode
              </h1>
            </motion.div>
            <div>
              <p className="max-w-2xl text-xl leading-8 text-textSecondary">
                Cari produk, bandingkan harga dan kualitas, lalu siapkan aksi belanja dengan konfirmasi aman.
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {[
                  "TASK / PRODUCT DISCOVERY",
                  "SAFETY / CONFIRM BEFORE ACTION",
                  "OUTPUT / COMPARISON CARDS",
                  `STATE / ${runState.toUpperCase()}`,
                  `MODE / ${detectedModeLabel}`,
                  `TOOL CALLS / ${toolResults.length}`
                ].map((label) => (
                  <div className="border border-borderSoft bg-surfaceWhite px-3 py-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-textSecondary" key={label}>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="mt-6 grid gap-5 xl:grid-cols-[0.78fr_1.16fr_0.78fr]">
          <div className="grid gap-5">
            <ShoppingCommandPanel
              command={command}
              onChangeCommand={setCommand}
              onReset={reset}
              onRun={() => void runAgent()}
              onSimulateVoice={simulateVoice}
              runState={runState}
            />
            <ShoppingClarificationPanel answer={clarificationAnswer} onAnswer={answerClarification} question={clarificationQuestion} />
          </div>
          <ShoppingBrowserPanel command={command} runState={runState} showResults={showResults} />
          <ShoppingPlanPanel steps={steps} />
        </div>

        <div className="mt-5 grid gap-5">
          {showResults ? (
            <>
              <ShoppingSafetyNote />
              <ProductComparisonGrid
                onAddToCart={requestAddToCart}
                onOpenProduct={openProduct}
                onSave={saveProduct}
                products={shoppingProducts}
                savedProductIds={savedProductIds}
              />
              <ShoppingSummaryCard
                blockedMessage={blockedMessage}
                cartMessage={cartMessage}
                copied={copied}
                onCopy={copySummary}
                onSaveTask={saveTask}
                savedTask={savedTask}
              />
            </>
          ) : (
            <section className="border border-dashed border-borderSoft bg-surfaceWhite p-8 text-center">
              <p className="technical-label text-textSecondary">Output Waiting</p>
              <p className="mt-3 text-2xl font-black uppercase">Run the shopping agent to generate simulated product comparison results.</p>
              <p className="mt-3 text-textSecondary">No product is opened, added to cart, purchased, checked out, or paid automatically.</p>
            </section>
          )}
        </div>
      </div>
      <ProductPreviewModal onClose={() => setPreviewProduct(null)} product={previewProduct} />
      <ShoppingConfirmationModal confirmation={pendingConfirmation} onApprove={approveAction} onCancel={cancelAction} />
    </section>
  );
}

function loadSavedProducts(): ShoppingProduct[] {
  try {
    return JSON.parse(window.localStorage.getItem(SAVED_PRODUCTS_KEY) ?? "[]") as ShoppingProduct[];
  } catch {
    return [];
  }
}

function loadSavedProductIds(): string[] {
  return loadSavedProducts().map((product) => product.id);
}

function saveTaskHistory(plan: AgentPlan, command: string, status: "completed" | "blocked_sensitive_action", summary: string) {
  const item: TaskHistoryItem = {
    taskId: plan.taskId,
    command,
    mode: "shopping",
    status,
    createdAt: plan.createdAt,
    updatedAt: nowIso(),
    plan,
    result: {
      taskId: plan.taskId,
      status,
      summary,
      results: [],
      safetyLevel: status === "blocked_sensitive_action" ? "needs_confirmation" : "safe",
      completedAt: nowIso()
    },
    confirmationRequests: plan.steps.flatMap((step) => (step.confirmationRequest ? [step.confirmationRequest] : []))
  };

  try {
    const current = JSON.parse(window.localStorage.getItem(TASK_HISTORY_KEY) ?? "[]") as TaskHistoryItem[];
    window.localStorage.setItem(TASK_HISTORY_KEY, JSON.stringify([item, ...current].slice(0, 30)));
  } catch {
    window.localStorage.setItem(TASK_HISTORY_KEY, JSON.stringify([item]));
  }
}
