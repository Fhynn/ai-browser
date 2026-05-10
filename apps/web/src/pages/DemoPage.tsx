import { PageFrame } from "../components/PageFrame";
import { PlaceholderCard } from "../components/PlaceholderCard";
import { RouteButton } from "../components/RouteButton";
import type { RoutePageProps } from "../routes";
import { getPlanMeta } from "./pageContent";

const sampleCommand = "Carikan 5 jurnal terbaru tentang YOLO untuk deteksi sampah";

export function DemoPage({ onNavigate }: RoutePageProps) {
  return (
    <PageFrame
      actions={
        <>
          <RouteButton href="/simulator" label="Open Simulator" onNavigate={onNavigate} variant="dark" />
          <RouteButton href="/extension" label="Preview Extension" onNavigate={onNavigate} />
        </>
      }
      description="The guided demo route is available. Phase 9 will add the 14-step judge walkthrough with previous, next, reset, simulator moments, shopping clarification, and safety confirmation."
      eyebrow="02 / Guided Demo"
      meta={getPlanMeta(sampleCommand)}
      title="Demo Mode"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <PlaceholderCard
          body="Later this page will present Demo 1/14 through Demo 14/14 with controlled progress and reset behavior."
          label="Sequence"
          title="Judge Walkthrough"
        />
        <PlaceholderCard
          body="The demo will connect research, shopping, extension preview, dashboard, and safety messaging into one flow."
          label="Narrative"
          title="Competition Story"
        />
        <PlaceholderCard
          body="For Phase 3, the route renders and links correctly without introducing premature demo state logic."
          label="Scope"
          title="Route Placeholder"
        />
      </div>
    </PageFrame>
  );
}
