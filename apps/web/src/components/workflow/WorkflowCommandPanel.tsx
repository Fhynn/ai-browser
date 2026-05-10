import { workflowExampleChips } from "./workflowData";
import type { WorkflowRunState } from "./types";

interface WorkflowCommandPanelProps {
  command: string;
  runState: WorkflowRunState;
  onChangeCommand: (value: string) => void;
  onRun: () => void;
  onReset: () => void;
  onSimulatePageRead: () => void;
}

export function WorkflowCommandPanel({
  command,
  onChangeCommand,
  onReset,
  onRun,
  onSimulatePageRead,
  runState
}: WorkflowCommandPanelProps) {
  const busy = ["planning", "reading", "extracting", "summarizing"].includes(runState);

  return (
    <section className="border border-borderSoft bg-surfaceWhite p-5">
      <p className="technical-label text-textSecondary">Workflow Command</p>
      <h2 className="mt-3 text-3xl font-black uppercase leading-none">Page Summary Input</h2>
      <textarea
        className="mt-5 min-h-32 w-full resize-none border border-primaryBlack bg-surfaceLight p-4 text-base leading-7 outline-none transition focus:bg-surfaceWhite"
        disabled={busy}
        onChange={(event) => onChangeCommand(event.target.value)}
        value={command}
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {workflowExampleChips.map((chip) => (
          <button
            className="border border-borderSoft bg-surfaceLight px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] transition hover:border-primaryBlack hover:bg-surfaceWhite disabled:cursor-not-allowed disabled:text-textMuted"
            disabled={busy}
            key={chip}
            onClick={() => onChangeCommand(chip)}
            type="button"
          >
            {chip}
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <button
          className="border border-primaryBlack bg-primaryBlack px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-surfaceWhite hover:text-primaryBlack disabled:cursor-not-allowed disabled:border-borderSoft disabled:bg-borderSoft disabled:text-textMuted"
          disabled={busy || !command.trim()}
          onClick={onRun}
          type="button"
        >
          Run Workflow Agent
        </button>
        <button
          className="border border-primaryBlack bg-surfaceWhite px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-primaryBlack hover:text-white"
          onClick={onReset}
          type="button"
        >
          Reset
        </button>
        <button
          className="border border-primaryBlack bg-surfaceWhite px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-primaryBlack hover:text-white disabled:cursor-not-allowed disabled:border-borderSoft disabled:text-textMuted"
          disabled={busy}
          onClick={onSimulatePageRead}
          type="button"
        >
          Simulate Page Read
        </button>
      </div>
    </section>
  );
}
