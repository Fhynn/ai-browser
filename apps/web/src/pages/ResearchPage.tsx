import { PageFrame } from "../components/PageFrame";
import { PlaceholderCard } from "../components/PlaceholderCard";
import { RouteButton } from "../components/RouteButton";
import type { RoutePageProps } from "../routes";
import { getPlanMeta } from "./pageContent";

const sampleCommand = "Carikan 5 jurnal terbaru tentang AI untuk deteksi sampah pakai YOLO";

export function ResearchPage({ onNavigate }: RoutePageProps) {
  return (
    <PageFrame
      actions={
        <>
          <RouteButton href="/simulator" label="Open Simulator" onNavigate={onNavigate} variant="dark" />
          <RouteButton href="/use-cases/workflow" label="Workflow Mode" onNavigate={onNavigate} />
        </>
      }
      description="The research use-case route is wired. Phase 6 will implement the thesis/prototype clarification flow, simulated paper set, relevance scoring, and comparison table."
      eyebrow="04 / Research Use Case"
      meta={getPlanMeta(sampleCommand)}
      title="Research Agent"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <PlaceholderCard
          body="The shared planner already detects this as research mode and asks whether the focus is thesis, IoT prototype, or industrial implementation."
          label="Agent Core"
          title="Clarifying Question"
        />
        <PlaceholderCard
          body="Later this route will display five simulated paper cards with title, year, method, dataset, source, and why each is useful."
          label="Next Phase"
          title="Mock Paper Results"
        />
      </div>
    </PageFrame>
  );
}
