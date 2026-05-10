import type { AgentMode } from "@browsepilot/shared";
import { BrowserViewport } from "./BrowserViewport";
import type { BrowserStage } from "./types";

interface SimulatedBrowserProps {
  command: string;
  mode: AgentMode | null;
  stage: BrowserStage;
}

export function SimulatedBrowser({ command, mode, stage }: SimulatedBrowserProps) {
  return <BrowserViewport command={command} mode={mode} stage={stage} />;
}
