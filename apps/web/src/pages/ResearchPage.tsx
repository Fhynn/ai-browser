import {
  askClarifyingQuestion,
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
import { PaperComparisonTable } from "../components/research/PaperComparisonTable";
import { PaperResultCard } from "../components/research/PaperResultCard";
import { ResearchBrowserPanel } from "../components/research/ResearchBrowserPanel";
import { ResearchClarificationPanel } from "../components/research/ResearchClarificationPanel";
import { ResearchCommandPanel } from "../components/research/ResearchCommandPanel";
import { ResearchPlanPanel } from "../components/research/ResearchPlanPanel";
import { ResearchSummaryCard } from "../components/research/ResearchSummaryCard";
import { SourcePreviewModal } from "../components/research/SourcePreviewModal";
import { DEFAULT_RESEARCH_COMMAND, researchPapers, researchRecommendation } from "../components/research/researchData";
import type { ResearchPaper, ResearchRunState } from "../components/research/types";
import type { RoutePageProps } from "../routes";

const TASK_HISTORY_KEY = "browsepilot:task-history";
const SAVED_RESEARCH_KEY = "browsepilot:saved-research";
const STEP_DELAY_MS = 520;

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function nowIso() {
  return new Date().toISOString();
}

function createResearchSteps(): AgentStep[] {
  const stepData = [
    ["search", "Menentukan kata kunci riset", "Menyusun query utama dari topik AI, YOLO, deteksi sampah, dan target prototype."],
    ["open_tab", "Membuka pencarian jurnal simulasi", "Membuka workspace browser simulasi untuk mencari paper demo."],
    ["read_page", "Memprioritaskan paper tahun 2021-2026", "Memfilter hasil berdasarkan rentang tahun terbaru yang relevan untuk prototype."],
    ["read_page", "Membaca judul dan abstrak", "Membaca ringkasan setiap hasil untuk memahami fokus dan batasan paper."],
    ["extract", "Mengekstrak metode, dataset, dan kontribusi", "Mengambil metode, dataset, kontribusi, dan catatan kegunaan."],
    ["compare", "Membandingkan relevansi", "Membandingkan paper berdasarkan metode, dataset, dan kecocokan dengan prototype IoT."],
    ["summarize", "Menyusun rekomendasi sumber", "Menyusun rekomendasi akhir dan tabel perbandingan."]
  ] as const;

  return stepData.map(([type, title, description]) => ({
    id: generateStepId(),
    type,
    title,
    description,
    safetyLevel: "safe",
    requiresConfirmation: false,
    status: "pending"
  }));
}

export function ResearchPage(_props: RoutePageProps) {
  const [command, setCommand] = useState(DEFAULT_RESEARCH_COMMAND);
  const [runState, setRunState] = useState<ResearchRunState>("idle");
  const [mode, setMode] = useState<AgentMode | null>(null);
  const [plan, setPlan] = useState<AgentPlan | null>(null);
  const [steps, setSteps] = useState<AgentStep[]>([]);
  const [toolResults, setToolResults] = useState<ToolResult[]>([]);
  const [clarificationQuestion, setClarificationQuestion] = useState<string | null>(null);
  const [clarificationAnswer, setClarificationAnswer] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [sourcePreview, setSourcePreview] = useState<ResearchPaper | null>(null);
  const [savedPaperIds, setSavedPaperIds] = useState<string[]>(() => loadSavedPaperIds());
  const [copied, setCopied] = useState(false);
  const [savedToDashboard, setSavedToDashboard] = useState(false);

  const detectedModeLabel = useMemo(() => (mode ? mode.toUpperCase() : "WAITING"), [mode]);

  const updateStepStatus = (stepId: string, status: AgentStep["status"]) => {
    setSteps((current) => current.map((step) => (step.id === stepId ? { ...step, status } : step)));
  };

  const runAgent = async (answer: string | null = clarificationAnswer) => {
    const cleanCommand = command.trim();
    if (!cleanCommand) {
      return;
    }

    setSavedToDashboard(false);
    setCopied(false);
    setShowResults(false);
    setToolResults([]);
    setSourcePreview(null);

    const detectedMode = detectMode(cleanCommand);
    setMode(detectedMode);

    const question = answer ? null : askClarifyingQuestion(cleanCommand);
    if (question) {
      setRunState("asking_clarification");
      setClarificationQuestion("Fokus risetnya untuk skripsi, prototype IoT, atau implementasi industri?");
      return;
    }

    const finalCommand = answer ? `${cleanCommand} ${answer}` : cleanCommand;
    const sharedPlan = createPlan(finalCommand);
    const researchSteps = createResearchSteps();
    const researchPlan = {
      ...sharedPlan,
      mode: "research" as const,
      clarificationQuestion: null,
      steps: researchSteps,
      summary: "Research mode plan for simulated paper discovery and comparison."
    };

    setPlan(researchPlan);
    setSteps(researchSteps);
    setClarificationQuestion(null);
    setRunState("planning");
    await wait(STEP_DELAY_MS);

    const results: ToolResult[] = [];
    for (const step of researchSteps) {
      setRunState(step.type === "search" || step.type === "open_tab" ? "searching" : "reading");
      updateStepStatus(step.id, "running");
      await wait(STEP_DELAY_MS);
      const result = executeMockStep(step);
      results.push({
        ...result,
        data: {
          ...(result.data ?? {}),
          taskId: researchPlan.taskId,
          demoResults: true
        }
      });
      setToolResults([...results]);
      updateStepStatus(step.id, "completed");
      if (step.type === "read_page" || step.type === "extract") {
        setShowResults(true);
      }
      await wait(180);
    }

    setShowResults(true);
    setRunState("completed");
    const agentResult = summarizeResults(results);
    saveTaskHistory(researchPlan, finalCommand, agentResult.summary);
  };

  const answerClarification = (answer: string) => {
    setClarificationAnswer(answer);
    void runAgent(answer);
  };

  const reset = () => {
    setCommand(DEFAULT_RESEARCH_COMMAND);
    setRunState("idle");
    setMode(null);
    setPlan(null);
    setSteps([]);
    setToolResults([]);
    setClarificationQuestion(null);
    setClarificationAnswer(null);
    setShowResults(false);
    setSourcePreview(null);
    setCopied(false);
    setSavedToDashboard(false);
  };

  const savePaper = (paper: ResearchPaper) => {
    const current = loadSavedPapers();
    const next = [paper, ...current.filter((item) => item.id !== paper.id)].slice(0, 20);
    window.localStorage.setItem(SAVED_RESEARCH_KEY, JSON.stringify(next));
    setSavedPaperIds(next.map((item) => item.id));
  };

  const copySummary = () => {
    void navigator.clipboard?.writeText(researchRecommendation).catch(() => undefined);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const saveDashboard = () => {
    if (!plan) {
      const fallbackPlan = createPlan(command);
      saveTaskHistory(fallbackPlan, command, researchRecommendation);
    } else {
      saveTaskHistory(plan, command, researchRecommendation);
    }
    setSavedToDashboard(true);
  };

  return (
    <section className="px-5 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-[1680px]">
        <header className="border-b border-borderSoft pb-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 18 }} transition={{ duration: 0.35 }}>
              <p className="technical-label text-textSecondary">MODE / RESEARCH</p>
              <h1 className="mt-5 font-display text-6xl font-black uppercase leading-[0.85] md:text-8xl">
                Research
                <br />
                Agent Mode
              </h1>
            </motion.div>
            <div>
              <p className="max-w-2xl text-xl leading-8 text-textSecondary">
                Cari jurnal, baca abstrak, bandingkan metode, dan ubah hasil riset menjadi ringkasan yang siap dipakai.
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {[
                  "TASK / PAPER DISCOVERY",
                  "SAFETY / SOURCE CHECK",
                  "OUTPUT / COMPARISON TABLE",
                  `STATE / ${runState.toUpperCase()}`,
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
            <ResearchCommandPanel command={command} onChangeCommand={setCommand} onReset={reset} onRun={() => void runAgent()} runState={runState} />
            <ResearchClarificationPanel answer={clarificationAnswer} onAnswer={answerClarification} question={clarificationQuestion} />
          </div>
          <ResearchBrowserPanel command={command} runState={runState} showResults={showResults} />
          <ResearchPlanPanel steps={steps} />
        </div>

        <div className="mt-5 grid gap-5">
          {showResults ? (
            <>
              <PaperComparisonTable papers={researchPapers} />
              <section className="grid gap-5 lg:grid-cols-2">
                {researchPapers.map((paper) => (
                  <PaperResultCard
                    key={paper.id}
                    onOpenSource={setSourcePreview}
                    onSave={savePaper}
                    paper={paper}
                    saved={savedPaperIds.includes(paper.id)}
                  />
                ))}
              </section>
              <ResearchSummaryCard copied={copied} onCopy={copySummary} onSaveDashboard={saveDashboard} savedToDashboard={savedToDashboard} />
              <section className="border border-borderSoft bg-surfaceWhite p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="technical-label text-textSecondary">Source List</p>
                    <h2 className="mt-3 text-3xl font-black uppercase leading-none">Simulated Sources</h2>
                  </div>
                  <span className="technical-label text-textSecondary">Demo research results — simulated for prototype.</span>
                </div>
                <div className="mt-5 grid gap-2">
                  {researchPapers.map((paper) => (
                    <div className="border border-borderSoft bg-surfaceLight p-3 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-textSecondary" key={paper.id}>
                      {paper.title} / {paper.source}
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <section className="border border-dashed border-borderSoft bg-surfaceWhite p-8 text-center">
              <p className="technical-label text-textSecondary">Output Waiting</p>
              <p className="mt-3 text-2xl font-black uppercase">Run the research agent to generate simulated paper comparison results.</p>
              <p className="mt-3 text-textSecondary">Current mode detector: {detectedModeLabel}</p>
            </section>
          )}
        </div>
      </div>
      <SourcePreviewModal onClose={() => setSourcePreview(null)} paper={sourcePreview} />
    </section>
  );
}

function loadSavedPapers(): ResearchPaper[] {
  try {
    return JSON.parse(window.localStorage.getItem(SAVED_RESEARCH_KEY) ?? "[]") as ResearchPaper[];
  } catch {
    return [];
  }
}

function loadSavedPaperIds(): string[] {
  return loadSavedPapers().map((paper) => paper.id);
}

function saveTaskHistory(plan: AgentPlan, command: string, summary: string) {
  const item: TaskHistoryItem = {
    taskId: plan.taskId,
    command,
    mode: "research",
    status: "completed",
    createdAt: plan.createdAt,
    updatedAt: nowIso(),
    plan,
    result: {
      taskId: plan.taskId,
      status: "completed",
      summary,
      results: [],
      safetyLevel: "safe",
      completedAt: nowIso()
    },
    confirmationRequests: []
  };

  try {
    const current = JSON.parse(window.localStorage.getItem(TASK_HISTORY_KEY) ?? "[]") as TaskHistoryItem[];
    window.localStorage.setItem(TASK_HISTORY_KEY, JSON.stringify([item, ...current].slice(0, 30)));
  } catch {
    window.localStorage.setItem(TASK_HISTORY_KEY, JSON.stringify([item]));
  }
}
