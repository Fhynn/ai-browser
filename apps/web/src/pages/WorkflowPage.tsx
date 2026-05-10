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
import { ActionItemsPanel } from "../components/workflow/ActionItemsPanel";
import { ExtractedStructurePanel } from "../components/workflow/ExtractedStructurePanel";
import { MarkdownExportModal } from "../components/workflow/MarkdownExportModal";
import { PresentationBulletsPanel } from "../components/workflow/PresentationBulletsPanel";
import { WorkflowBrowserPanel } from "../components/workflow/WorkflowBrowserPanel";
import { WorkflowCommandPanel } from "../components/workflow/WorkflowCommandPanel";
import { WorkflowPlanPanel } from "../components/workflow/WorkflowPlanPanel";
import { WorkflowSummaryPanel } from "../components/workflow/WorkflowSummaryPanel";
import {
  DEFAULT_WORKFLOW_COMMAND,
  createWorkflowMarkdown,
  workflowOutput
} from "../components/workflow/workflowData";
import type { WorkflowRunState } from "../components/workflow/types";
import type { RoutePageProps } from "../routes";

const TASK_HISTORY_KEY = "browsepilot:task-history";
const SAVED_WORKFLOWS_KEY = "browsepilot:saved-workflows";
const STEP_DELAY_MS = 520;

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function nowIso() {
  return new Date().toISOString();
}

function createWorkflowSteps(): AgentStep[] {
  const stepData = [
    ["read_page", "Membaca struktur halaman", "Membaca judul, intro, section, dan potongan command dari halaman simulasi."],
    ["extract", "Mengekstrak heading dan subheading", "Mengambil struktur dokumen agar ringkasan tetap runtut."],
    ["extract", "Mengambil poin penting", "Mengambil konsep utama, command, checklist, dan masalah umum."],
    ["summarize", "Menyusun ringkasan singkat", "Mengubah isi halaman menjadi ringkasan Indonesia yang padat."],
    ["summarize", "Membuat action items", "Mengubah informasi menjadi daftar kerja yang bisa dieksekusi."],
    ["summarize", "Mengubah hasil menjadi poin presentasi", "Menyusun slide-ready bullets dari hasil pembacaan halaman."],
    ["finish", "Menyimpan hasil ke dashboard", "Menyimpan task history dan output workflow untuk dashboard."]
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

export function WorkflowPage(_props: RoutePageProps) {
  const [command, setCommand] = useState(DEFAULT_WORKFLOW_COMMAND);
  const [runState, setRunState] = useState<WorkflowRunState>("idle");
  const [mode, setMode] = useState<AgentMode | null>(null);
  const [plan, setPlan] = useState<AgentPlan | null>(null);
  const [steps, setSteps] = useState<AgentStep[]>([]);
  const [toolResults, setToolResults] = useState<ToolResult[]>([]);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [showOutputs, setShowOutputs] = useState(false);
  const [copiedTarget, setCopiedTarget] = useState<string | null>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [savedTask, setSavedTask] = useState(false);

  const detectedModeLabel = useMemo(() => (mode ? mode.toUpperCase() : "WAITING"), [mode]);

  const updateStepStatus = (stepId: string, status: AgentStep["status"]) => {
    setSteps((current) => current.map((step) => (step.id === stepId ? { ...step, status } : step)));
  };

  const runWorkflow = async () => {
    const cleanCommand = command.trim();
    if (!cleanCommand) {
      return;
    }

    setSavedTask(false);
    setCopiedTarget(null);
    setExportOpen(false);
    setShowOutputs(false);
    setToolResults([]);
    setActiveSectionIndex(0);

    const detectedMode = detectMode(cleanCommand);
    setMode(detectedMode);
    void askClarifyingQuestion(cleanCommand);

    const sharedPlan = createPlan(cleanCommand, {
      title: "Deploy Web App ke Cloud Run dari AI Studio",
      url: "https://browsepilot.demo/docs/cloud-run-ai-studio"
    });
    const workflowSteps = createWorkflowSteps();
    const workflowPlan: AgentPlan = {
      ...sharedPlan,
      mode: "workflow",
      clarificationQuestion: null,
      steps: workflowSteps,
      safetyLevel: "safe",
      summary: "Read-only workflow plan for page summary, action items, and presentation bullets."
    };

    setPlan(workflowPlan);
    setSteps(workflowSteps);
    setRunState("planning");
    await wait(STEP_DELAY_MS);

    const results: ToolResult[] = [];
    for (const [index, step] of workflowSteps.entries()) {
      setRunState(index < 3 ? "reading" : index < 6 ? "extracting" : "summarizing");
      setActiveSectionIndex(Math.min(index, 5));
      updateStepStatus(step.id, "running");
      await wait(STEP_DELAY_MS);
      const result = executeMockStep(step);
      results.push({
        ...result,
        data: {
          ...(result.data ?? {}),
          taskId: workflowPlan.taskId,
          readOnly: true
        }
      });
      setToolResults([...results]);
      updateStepStatus(step.id, "completed");
      if (index >= 2) {
        setShowOutputs(true);
      }
      await wait(180);
    }

    setShowOutputs(true);
    setRunState("completed");
    const result = summarizeResults(results);
    saveTaskHistory(workflowPlan, cleanCommand, result.summary || workflowOutput.summary);
  };

  const reset = () => {
    setCommand(DEFAULT_WORKFLOW_COMMAND);
    setRunState("idle");
    setMode(null);
    setPlan(null);
    setSteps([]);
    setToolResults([]);
    setActiveSectionIndex(0);
    setShowOutputs(false);
    setCopiedTarget(null);
    setExportOpen(false);
    setSavedTask(false);
  };

  const simulatePageRead = () => {
    setCommand(DEFAULT_WORKFLOW_COMMAND);
    setShowOutputs(true);
    setRunState("completed");
    setMode("workflow");
    if (steps.length === 0) {
      const workflowSteps = createWorkflowSteps().map((step) => ({ ...step, status: "completed" as const }));
      const workflowPlan = {
        ...createPlan(DEFAULT_WORKFLOW_COMMAND),
        mode: "workflow" as const,
        steps: workflowSteps,
        safetyLevel: "safe" as const,
        clarificationQuestion: null
      };
      setSteps(workflowSteps);
      setPlan(workflowPlan);
      saveTaskHistory(workflowPlan, DEFAULT_WORKFLOW_COMMAND, workflowOutput.summary);
    }
  };

  const copyText = (target: string, text: string) => {
    void navigator.clipboard?.writeText(text).catch(() => undefined);
    setCopiedTarget(target);
    window.setTimeout(() => setCopiedTarget(null), 1400);
  };

  const saveWorkflowTask = () => {
    const taskPlan = plan ?? createPlan(command);
    saveTaskHistory(taskPlan, command, workflowOutput.summary);
    saveWorkflowOutput(taskPlan, command);
    setSavedTask(true);
  };

  return (
    <section className="px-5 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-[1680px]">
        <header className="border-b border-borderSoft pb-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 18 }} transition={{ duration: 0.35 }}>
              <p className="technical-label text-textSecondary">MODE / WORKFLOW</p>
              <h1 className="mt-5 font-display text-6xl font-black uppercase leading-[0.85] md:text-8xl">
                Workflow
                <br />
                Summary Mode
              </h1>
            </motion.div>
            <div>
              <p className="max-w-2xl text-xl leading-8 text-textSecondary">
                Baca halaman, ekstrak poin penting, lalu ubah informasi menjadi ringkasan, action items, dan bahan presentasi.
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {[
                  "TASK / PAGE SUMMARY",
                  "SAFETY / READ ONLY",
                  "OUTPUT / SUMMARY + BULLETS",
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
          <WorkflowCommandPanel
            command={command}
            onChangeCommand={setCommand}
            onReset={reset}
            onRun={() => void runWorkflow()}
            onSimulatePageRead={simulatePageRead}
            runState={runState}
          />
          <WorkflowBrowserPanel
            activeSectionIndex={activeSectionIndex}
            command={command}
            runState={runState}
            showOutputs={showOutputs}
          />
          <WorkflowPlanPanel steps={steps} />
        </div>

        <div className="mt-5 grid gap-5">
          <ExtractedStructurePanel showOutputs={showOutputs} />
          {showOutputs ? (
            <>
              <WorkflowSummaryPanel copied={copiedTarget === "summary"} onCopy={() => copyText("summary", workflowOutput.summary)} />
              <div className="grid gap-5 xl:grid-cols-2">
                <PresentationBulletsPanel
                  copied={copiedTarget === "presentation"}
                  onCopy={() => copyText("presentation", workflowOutput.presentationBullets.join("\n"))}
                />
                <ActionItemsPanel
                  copied={copiedTarget === "actions"}
                  onCopy={() => copyText("actions", workflowOutput.actionItems.join("\n"))}
                  onExport={() => setExportOpen(true)}
                  onSave={saveWorkflowTask}
                  savedTask={savedTask}
                />
              </div>
            </>
          ) : (
            <section className="border border-dashed border-borderSoft bg-surfaceWhite p-8 text-center">
              <p className="technical-label text-textSecondary">Output Waiting</p>
              <p className="mt-3 text-2xl font-black uppercase">Run the workflow agent to extract summary, bullets, and action items.</p>
              <p className="mt-3 text-textSecondary">Workflow mode is read-only and does not execute browser actions beyond simulated page reading.</p>
            </section>
          )}
        </div>
      </div>
      <MarkdownExportModal
        copied={copiedTarget === "markdown"}
        onClose={() => setExportOpen(false)}
        onCopy={() => copyText("markdown", createWorkflowMarkdown())}
        open={exportOpen}
      />
    </section>
  );
}

function saveTaskHistory(plan: AgentPlan, command: string, summary: string) {
  const item: TaskHistoryItem = {
    taskId: plan.taskId,
    command,
    mode: "workflow",
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

function saveWorkflowOutput(plan: AgentPlan, command: string) {
  const item = {
    taskId: plan.taskId,
    command,
    createdAt: nowIso(),
    output: workflowOutput,
    markdown: createWorkflowMarkdown()
  };

  try {
    const current = JSON.parse(window.localStorage.getItem(SAVED_WORKFLOWS_KEY) ?? "[]") as unknown[];
    window.localStorage.setItem(SAVED_WORKFLOWS_KEY, JSON.stringify([item, ...current].slice(0, 20)));
  } catch {
    window.localStorage.setItem(SAVED_WORKFLOWS_KEY, JSON.stringify([item]));
  }
}
