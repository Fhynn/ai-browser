import { shoppingExampleChips } from "./shoppingData";
import type { ShoppingRunState } from "./types";

interface ShoppingCommandPanelProps {
  command: string;
  runState: ShoppingRunState;
  onChangeCommand: (value: string) => void;
  onRun: () => void;
  onReset: () => void;
  onSimulateVoice: () => void;
}

export function ShoppingCommandPanel({
  command,
  onChangeCommand,
  onReset,
  onRun,
  onSimulateVoice,
  runState
}: ShoppingCommandPanelProps) {
  const busy = ["listening", "planning", "searching", "comparing", "waiting_confirmation"].includes(runState);
  const listening = runState === "listening";

  return (
    <section className="border border-borderSoft bg-surfaceWhite p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="technical-label text-textSecondary">Shopping Command</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-none">Product Discovery Input</h2>
        </div>
        {listening ? <span className="animate-pulse border border-primaryBlack px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.14em]">Listening</span> : null}
      </div>
      <textarea
        className="mt-5 min-h-32 w-full resize-none border border-primaryBlack bg-surfaceLight p-4 text-base leading-7 outline-none transition focus:bg-surfaceWhite"
        disabled={busy}
        onChange={(event) => onChangeCommand(event.target.value)}
        value={command}
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {shoppingExampleChips.map((chip) => (
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
          Run Shopping Agent
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
          onClick={onSimulateVoice}
          type="button"
        >
          Simulate Voice
        </button>
      </div>
    </section>
  );
}
