import { AnimatePresence, motion } from "framer-motion";
import { commandExamples, researchClarificationAnswers, shoppingClarificationAnswers } from "./mockData";
import { VoiceCommandButton } from "./VoiceCommandButton";
import type { AgentMode } from "@browsepilot/shared";
import type { AgentSimulatorState } from "./types";

interface CommandPanelProps {
  command: string;
  state: AgentSimulatorState;
  mode: AgentMode | null;
  clarificationQuestion: string | null;
  canRun: boolean;
  onChangeCommand: (value: string) => void;
  onRun: () => void;
  onReset: () => void;
  onSimulateVoice: () => void;
  onAnswerClarification: (answer: string) => void;
}

export function CommandPanel({
  canRun,
  clarificationQuestion,
  command,
  mode,
  onAnswerClarification,
  onChangeCommand,
  onReset,
  onRun,
  onSimulateVoice,
  state
}: CommandPanelProps) {
  const clarificationAnswers = mode === "research" ? researchClarificationAnswers : shoppingClarificationAnswers;
  const busy = ["listening", "planning", "executing", "waiting_confirmation"].includes(state);

  return (
    <section className="border border-borderSoft bg-surfaceWhite p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="technical-label text-textSecondary">Left Panel</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-none">Command Input</h2>
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-textSecondary">Agent Console</span>
      </div>
      <p className="mt-4 leading-7 text-textSecondary">Ketik atau simulasikan perintah suara untuk BrowsePilot.</p>

      <textarea
        className="mt-5 min-h-32 w-full resize-none border border-primaryBlack bg-surfaceLight p-4 text-base leading-7 outline-none transition focus:bg-surfaceWhite"
        disabled={busy}
        onChange={(event) => onChangeCommand(event.target.value)}
        placeholder="Contoh: Carikan 5 jurnal terbaru tentang YOLO untuk deteksi sampah..."
        value={command}
      />

      <div className="mt-4 grid gap-2">
        {commandExamples.map((example) => (
          <button
            className="border border-borderSoft bg-surfaceLight px-3 py-3 text-left font-mono text-[0.68rem] uppercase tracking-[0.1em] transition hover:border-primaryBlack hover:bg-surfaceWhite disabled:cursor-not-allowed disabled:text-textMuted"
            disabled={busy}
            key={example}
            onClick={() => onChangeCommand(example)}
            type="button"
          >
            {example}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <button
          className="border border-primaryBlack bg-primaryBlack px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-surfaceWhite hover:text-primaryBlack disabled:cursor-not-allowed disabled:border-borderSoft disabled:bg-borderSoft disabled:text-textMuted"
          disabled={!canRun || busy}
          onClick={onRun}
          type="button"
        >
          Run Agent
        </button>
        <button
          className="border border-primaryBlack bg-surfaceWhite px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-primaryBlack hover:text-white"
          onClick={onReset}
          type="button"
        >
          Reset
        </button>
        <VoiceCommandButton disabled={busy} onClick={onSimulateVoice} state={state} />
      </div>

      <AnimatePresence>
        {clarificationQuestion ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 border border-primaryBlack bg-surfaceLight p-4"
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, y: 10 }}
          >
            <p className="technical-label text-textSecondary">Clarification Required</p>
            <p className="mt-3 text-lg font-semibold">{clarificationQuestion}</p>
            <div className="mt-4 grid gap-2">
              {clarificationAnswers.map((answer) => (
                <button
                  className="border border-primaryBlack bg-surfaceWhite px-3 py-3 text-left font-mono text-[0.68rem] uppercase tracking-[0.1em] transition hover:bg-primaryBlack hover:text-white"
                  key={answer}
                  onClick={() => onAnswerClarification(answer)}
                  type="button"
                >
                  {answer}
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
