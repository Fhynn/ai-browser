import type { AgentSimulatorState } from "./types";

interface VoiceCommandButtonProps {
  disabled: boolean;
  state: AgentSimulatorState;
  onClick: () => void;
}

export function VoiceCommandButton({ disabled, onClick, state }: VoiceCommandButtonProps) {
  const listening = state === "listening";

  return (
    <button
      className="border border-primaryBlack bg-surfaceWhite px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-primaryBlack hover:text-white disabled:cursor-not-allowed disabled:border-borderSoft disabled:text-textMuted"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {listening ? "LISTENING..." : "SIMULATE VOICE"}
    </button>
  );
}
