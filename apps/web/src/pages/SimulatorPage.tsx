import {
  askClarifyingQuestion,
  classifySensitiveAction,
  createPlan,
  detectMode,
  executeMockStep,
  summarizeResults,
  type AgentMode,
  type AgentPlan,
  type AgentResult,
  type AgentStep,
  type SafetyLevel,
  type TaskHistoryItem,
  type ToolResult
} from "@browsepilot/shared";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActionLogTimeline } from "../components/simulator/ActionLogTimeline";
import { AgentPlanCard } from "../components/simulator/AgentPlanCard";
import { CommandPanel } from "../components/simulator/CommandPanel";
import { ConfirmationModal } from "../components/simulator/ConfirmationModal";
import { ResultsPanel } from "../components/simulator/ResultsPanel";
import { SimulatedBrowser } from "../components/simulator/SimulatedBrowser";
import { StatusBadge } from "../components/simulator/StatusBadge";
import type { ActionLogEntry, AgentSimulatorState, BrowserStage, PendingConfirmation } from "../components/simulator/types";
import type { RoutePageProps } from "../routes";

const HISTORY_KEY = "browsepilot:task-history";
const VOICE_COMMAND = "Carikan susu yang bagus untuk anak saya.";
const STEP_DELAY_MS = 620;

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function normalizeExecutablePlan(plan: AgentPlan, clarificationAnswer: string | null): AgentPlan {
  const steps = plan.steps
    .filter((step) => (clarificationAnswer ? step.type !== "ask_clarification" : true))
    .map((step) => ({
      ...step,
      status: "pending" as const
    }));

  return {
    ...plan,
    clarificationQuestion: clarificationAnswer ? null : plan.clarificationQuestion,
    steps
  };
}

function getStageForStep(step: AgentStep): BrowserStage {
  if (step.requiresConfirmation || classifySensitiveAction(`${step.title} ${step.description} ${step.action?.target ?? ""}`)) {
    return "confirmation";
  }

  if (step.type === "search" || step.type === "open_tab" || step.type === "type") {
    return "searching";
  }

  if (step.type === "read_page" || step.type === "scroll") {
    return "reading";
  }

  if (step.type === "extract") {
    return "extracting";
  }

  if (step.type === "compare") {
    return "comparing";
  }

  if (step.type === "summarize" || step.type === "finish") {
    return "summarizing";
  }

  return "results";
}

function nowIso() {
  return new Date().toISOString();
}

function makeLog(label: string, detail: string, state: AgentSimulatorState): ActionLogEntry {
  return {
    id: `log_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    label,
    detail,
    state,
    createdAt: nowIso()
  };
}

export function SimulatorPage(_props: RoutePageProps) {
  const [command, setCommand] = useState("");
  const [state, setState] = useState<AgentSimulatorState>("idle");
  const [mode, setMode] = useState<AgentMode | null>(null);
  const [plan, setPlan] = useState<AgentPlan | null>(null);
  const [steps, setSteps] = useState<AgentStep[]>([]);
  const [toolResults, setToolResults] = useState<ToolResult[]>([]);
  const [agentResult, setAgentResult] = useState<AgentResult | null>(null);
  const [logs, setLogs] = useState<ActionLogEntry[]>([]);
  const [clarificationQuestion, setClarificationQuestion] = useState<string | null>(null);
  const [clarificationAnswer, setClarificationAnswer] = useState<string | null>(null);
  const [browserStage, setBrowserStage] = useState<BrowserStage>("idle");
  const [pendingConfirmation, setPendingConfirmation] = useState<PendingConfirmation | null>(null);
  const [blockedMessage, setBlockedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const confirmationResolver = useRef<((approved: boolean) => void) | null>(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  const safetyLevel: SafetyLevel = useMemo(() => {
    if (blockedMessage) {
      return "blocked";
    }

    return plan?.safetyLevel ?? "safe";
  }, [blockedMessage, plan]);

  const addLog = (label: string, detail: string, logState: AgentSimulatorState = state) => {
    setLogs((current) => [...current, makeLog(label, detail, logState)]);
  };

  const updateStepStatus = (stepId: string, status: AgentStep["status"]) => {
    setSteps((current) => current.map((step) => (step.id === stepId ? { ...step, status } : step)));
  };

  const reset = () => {
    cancelledRef.current = false;
    confirmationResolver.current = null;
    setCommand("");
    setState("idle");
    setMode(null);
    setPlan(null);
    setSteps([]);
    setToolResults([]);
    setAgentResult(null);
    setLogs([]);
    setClarificationQuestion(null);
    setClarificationAnswer(null);
    setBrowserStage("idle");
    setPendingConfirmation(null);
    setBlockedMessage(null);
    setCopied(false);
  };

  const prepareRun = async (rawCommand: string, answer: string | null) => {
    const cleanCommand = rawCommand.trim();

    if (!cleanCommand) {
      setState("error");
      addLog("Error", "Command input is empty.", "error");
      return;
    }

    cancelledRef.current = false;
    setToolResults([]);
    setAgentResult(null);
    setBlockedMessage(null);
    setPendingConfirmation(null);
    setCopied(false);
    setState("planning");
    addLog("Understanding goal", cleanCommand, "planning");
    await wait(220);

    const detectedMode = detectMode(cleanCommand);
    setMode(detectedMode);
    addLog("Detecting mode", `Mode detected as ${detectedMode}.`, "planning");

    const question = answer ? null : askClarifyingQuestion(cleanCommand);
    if (question) {
      setState("asking_clarification");
      setClarificationQuestion(question);
      addLog("Asking clarification", question, "asking_clarification");
      return;
    }

    const resolvedCommand = answer ? `${cleanCommand} ${answer}` : cleanCommand;
    const nextPlan = normalizeExecutablePlan(createPlan(resolvedCommand), answer);
    setPlan(nextPlan);
    setSteps(nextPlan.steps);
    setClarificationQuestion(null);
    setState("executing");
    addLog("Creating plan", `${nextPlan.steps.length} steps created with ${nextPlan.safetyLevel} safety level.`, "executing");
    await wait(260);
    await runPlan(nextPlan, detectedMode);
  };

  const runPlan = async (nextPlan: AgentPlan, detectedMode: AgentMode) => {
    const runResults: ToolResult[] = [];

    for (const step of nextPlan.steps) {
      if (cancelledRef.current) {
        return;
      }

      setState("executing");
      setBrowserStage(getStageForStep(step));
      updateStepStatus(step.id, "running");
      addLog(labelForStep(step), step.description, "executing");
      await wait(STEP_DELAY_MS);

      const sensitive = step.requiresConfirmation || classifySensitiveAction(`${step.title} ${step.description} ${step.action?.target ?? ""} ${step.action?.value ?? ""}`);

      if (sensitive) {
        const blockedResult = executeMockStep(step);
        addLog("Sensitive action detected", blockedResult.message, "waiting_confirmation");
        setState("waiting_confirmation");
        setBrowserStage("confirmation");
        const approved = await requestConfirmation({
          title: "Aksi ini butuh persetujuan",
          body: "BrowsePilot tidak akan melakukan aksi sensitif tanpa izin kamu.",
          actionText: step.confirmationRequest?.actionText ?? step.description,
          step,
          source: "agent_step"
        });

        if (!approved) {
          updateStepStatus(step.id, "blocked");
          runResults.push(blockedResult);
          setToolResults([...runResults]);
          setState("blocked_sensitive_action");
          setBrowserStage("blocked");
          const message = "Aksi dibatalkan. BrowsePilot hanya menyiapkan rekomendasi tanpa mengeksekusi aksi sensitif.";
          setBlockedMessage(message);
          addLog("User cancelled action", message, "blocked_sensitive_action");
          const blockedSummary = summarizeResults(runResults);
          setAgentResult(blockedSummary);
          saveHistory(nextPlan, cleanHistoryCommand(nextPlan.command), detectedMode, "blocked_sensitive_action", blockedSummary);
          return;
        }

        addLog("User approved action", "Sensitive action was approved and execution continued in the simulator.", "executing");
        const approvedResult: ToolResult = {
          ...blockedResult,
          success: true,
          blocked: false,
          message: "Sensitive action approved by user and completed in the simulator.",
          data: {
            ...(blockedResult.data ?? {}),
            taskId: nextPlan.taskId,
            approved: true
          }
        };
        runResults.push(approvedResult);
      } else {
        const result = executeMockStep(step);
        runResults.push({
          ...result,
          data: {
            ...(result.data ?? {}),
            taskId: nextPlan.taskId
          }
        });
      }

      updateStepStatus(step.id, "completed");
      setToolResults([...runResults]);
      await wait(180);
    }

    const summary = summarizeResults(runResults);
    setAgentResult(summary);
    setState("completed");
    setBrowserStage("results");
    addLog("Finished", summary.summary, "completed");
    saveHistory(nextPlan, cleanHistoryCommand(nextPlan.command), detectedMode, "completed", summary);
  };

  const requestConfirmation = (confirmation: PendingConfirmation) => {
    setPendingConfirmation(confirmation);
    return new Promise<boolean>((resolve) => {
      confirmationResolver.current = resolve;
    });
  };

  const handleApproveConfirmation = () => {
    setPendingConfirmation(null);
    confirmationResolver.current?.(true);
    confirmationResolver.current = null;
  };

  const handleCancelConfirmation = () => {
    setPendingConfirmation(null);
    confirmationResolver.current?.(false);
    confirmationResolver.current = null;
  };

  const handleRun = () => {
    void prepareRun(command, clarificationAnswer);
  };

  const handleAnswerClarification = (answer: string) => {
    setClarificationAnswer(answer);
    addLog("Clarification answered", answer, "planning");
    void prepareRun(command, answer);
  };

  const handleSimulateVoice = () => {
    setState("listening");
    setBrowserStage("idle");
    addLog("Listening", "Simulated voice input started.", "listening");
    window.setTimeout(() => {
      setCommand(VOICE_COMMAND);
      setState("idle");
      addLog("Voice captured", VOICE_COMMAND, "idle");
    }, 1000);
  };

  const handleAddToCart = (actionText: string) => {
    const sensitive = classifySensitiveAction(actionText);
    if (!sensitive) {
      return;
    }

    setState("waiting_confirmation");
    setBrowserStage("confirmation");
    setPendingConfirmation({
      title: "Aksi ini butuh persetujuan",
      body: "BrowsePilot tidak akan melakukan aksi sensitif tanpa izin kamu.",
      actionText,
      source: "result_action"
    });
    confirmationResolver.current = (approved: boolean) => {
      if (approved) {
        setState("completed");
        setBrowserStage("results");
        addLog("User approved action", `${actionText} approved from the results panel.`, "completed");
        return;
      }

      setState("blocked_sensitive_action");
      setBrowserStage("blocked");
      const message = "Aksi dibatalkan. BrowsePilot hanya menyiapkan rekomendasi tanpa mengeksekusi aksi sensitif.";
      setBlockedMessage(message);
      addLog("User cancelled action", message, "blocked_sensitive_action");
    };
  };

  const handleCopyWorkflow = () => {
    const text = "Cloud Run deployment: build the web app, package it, deploy to Cloud Run, verify routes and environment.";
    void navigator.clipboard?.writeText(text).catch(() => undefined);
    setCopied(true);
    addLog("Copy summary", "Workflow summary copied to clipboard or prepared for copy.", state);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const canRun = command.trim().length > 0;

  return (
    <section className="px-5 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-[1680px]">
        <div className="mb-7 flex flex-col gap-5 border-b border-borderSoft pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="technical-label text-textSecondary">03 / Core Product Demo</p>
            <h1 className="mt-4 font-display text-5xl font-black uppercase leading-[0.88] md:text-7xl lg:text-8xl">AI Browser Simulator</h1>
          </div>
          <div className="max-w-xl">
            <StatusBadge state={state} />
            <p className="mt-4 leading-7 text-textSecondary">
              Run a real mock-agent loop: mode detection, clarification, planning, step execution, browser state changes, results, and confirmation gates.
            </p>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[0.86fr_1.45fr_0.95fr]">
          <CommandPanel
            canRun={canRun}
            clarificationQuestion={clarificationQuestion}
            command={command}
            mode={mode}
            onAnswerClarification={handleAnswerClarification}
            onChangeCommand={setCommand}
            onReset={reset}
            onRun={handleRun}
            onSimulateVoice={handleSimulateVoice}
            state={state}
          />
          <SimulatedBrowser command={command} mode={mode} stage={browserStage} />
          <div className="grid gap-5">
            <AgentPlanCard
              clarificationAnswer={clarificationAnswer}
              command={command}
              mode={mode}
              plan={plan}
              safetyLevel={safetyLevel}
              steps={steps}
            />
            <ResultsPanel
              blockedMessage={blockedMessage}
              copied={copied}
              mode={mode}
              onAddToCart={handleAddToCart}
              onCopyWorkflow={handleCopyWorkflow}
              result={agentResult}
              toolResults={toolResults}
            />
          </div>
        </div>

        <div className="mt-5">
          <ActionLogTimeline logs={logs} />
        </div>
      </div>
      <ConfirmationModal confirmation={pendingConfirmation} onApprove={handleApproveConfirmation} onCancel={handleCancelConfirmation} />
    </section>
  );
}

function labelForStep(step: AgentStep): string {
  if (step.type === "search") {
    return "Opening simulated search page";
  }

  if (step.type === "type") {
    return "Typing query";
  }

  if (step.type === "read_page") {
    return "Reading result cards";
  }

  if (step.type === "extract") {
    return "Extracting source data";
  }

  if (step.type === "compare") {
    return "Comparing results";
  }

  if (step.type === "ask_confirmation") {
    return "Waiting for user confirmation";
  }

  if (step.type === "finish") {
    return "Finished";
  }

  return step.title;
}

function cleanHistoryCommand(command: string) {
  return command.replace(/\s+/g, " ").trim();
}

function saveHistory(plan: AgentPlan, command: string, mode: AgentMode, status: TaskHistoryItem["status"], result: AgentResult) {
  const item: TaskHistoryItem = {
    taskId: plan.taskId,
    command,
    mode,
    status,
    createdAt: plan.createdAt,
    updatedAt: nowIso(),
    plan,
    result,
    confirmationRequests: plan.steps.flatMap((step) => (step.confirmationRequest ? [step.confirmationRequest] : []))
  };

  try {
    const current = JSON.parse(window.localStorage.getItem(HISTORY_KEY) ?? "[]") as TaskHistoryItem[];
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify([item, ...current].slice(0, 20)));
  } catch {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify([item]));
  }
}
