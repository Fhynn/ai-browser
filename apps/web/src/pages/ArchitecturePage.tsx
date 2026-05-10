import { PageFrame } from "../components/PageFrame";
import { PlaceholderCard } from "../components/PlaceholderCard";
import { RouteButton } from "../components/RouteButton";
import type { RoutePageProps } from "../routes";
import { getPlanMeta } from "./pageContent";

const sampleCommand = "Cari dokumentasi deploy Cloud Run";

export function ArchitecturePage({ onNavigate }: RoutePageProps) {
  return (
    <PageFrame
      actions={
        <>
          <RouteButton href="/extension" label="Extension" onNavigate={onNavigate} variant="dark" />
          <RouteButton href="/safety" label="Safety Model" onNavigate={onNavigate} />
        </>
      }
      description="The architecture route is wired. Phase 13 will add the visual system diagram for web app, side panel, content script, background worker, shared planner, Gemini placeholder, Cloud Run, and confirmation system."
      eyebrow="10 / Architecture"
      meta={getPlanMeta(sampleCommand)}
      title="System Architecture"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <PlaceholderCard
          body="The web app hosts landing, demo, simulator, use cases, dashboard, safety, and architecture routes."
          label="Layer"
          title="Web App"
        />
        <PlaceholderCard
          body="The extension layer includes side panel, background service worker, content script, and permission-aware browser tools."
          label="Layer"
          title="Extension"
        />
        <PlaceholderCard
          body="The shared package owns mode detection, mock planning, safety classification, and result summarization."
          label="Layer"
          title="Agent Core"
        />
        <PlaceholderCard
          body="Cloud Run readiness and Gemini function calling will be documented and implemented in later phases."
          label="Layer"
          title="Deployment"
        />
      </div>
    </PageFrame>
  );
}
