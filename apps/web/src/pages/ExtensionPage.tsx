import { PageFrame } from "../components/PageFrame";
import { PlaceholderCard } from "../components/PlaceholderCard";
import { RouteButton } from "../components/RouteButton";
import type { RoutePageProps } from "../routes";
import { getPlanMeta } from "./pageContent";

const sampleCommand = "Bantu isi form ini tapi jangan submit";

export function ExtensionPage({ onNavigate }: RoutePageProps) {
  return (
    <PageFrame
      actions={
        <>
          <RouteButton href="/simulator" label="Open Simulator" onNavigate={onNavigate} variant="dark" />
          <RouteButton href="/architecture" label="View Architecture" onNavigate={onNavigate} />
        </>
      }
      description="The extension route is wired. Phase 11 will add the side-panel mockup, install steps, permission explanation, architecture diagram, and simulator CTA."
      eyebrow="08 / Chrome Extension"
      meta={getPlanMeta(sampleCommand)}
      title="Extension Preview"
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <PlaceholderCard
          body="The full page will show the MV3 side panel with command box, plan view, action log, results, confirmation modal, and permission notice."
          label="Side Panel"
          title="Extension Surface"
        />
        <PlaceholderCard
          body="Install guidance will point users to building the extension, opening chrome://extensions, enabling Developer Mode, and loading apps/extension/dist."
          label="Install"
          title="Load Unpacked Flow"
        />
      </div>
    </PageFrame>
  );
}
