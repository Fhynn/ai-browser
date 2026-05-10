import { BROWSEPILOT_APP_NAME, createMockAgentStatus } from "@browsepilot/shared";

const status = createMockAgentStatus();

export function SidePanelApp() {
  return (
    <main className="panel-shell">
      <header className="panel-header">
        <span>{BROWSEPILOT_APP_NAME}</span>
        <small>MV3</small>
      </header>
      <section className="panel-card">
        <p className="eyebrow">Mock agent</p>
        <h1>{status.mode}</h1>
        <p>Side panel scaffold is ready for the extension phases.</p>
      </section>
      <button type="button">Prepare command</button>
    </main>
  );
}
