import { PageFrame } from "../components/PageFrame";
import { PlaceholderCard } from "../components/PlaceholderCard";
import { RouteButton } from "../components/RouteButton";
import type { RoutePageProps } from "../routes";
import { getPlanMeta } from "./pageContent";

const sampleCommand = "Cari dokumentasi deploy Cloud Run";

export function WorkflowPage({ onNavigate }: RoutePageProps) {
  return (
    <PageFrame
      actions={
        <>
          <RouteButton href="/architecture" label="Architecture" onNavigate={onNavigate} variant="dark" />
          <RouteButton href="/simulator" label="Simulator" onNavigate={onNavigate} />
        </>
      }
      description="The workflow and page-summary route is in place. Phase 8 will add page reading, heading extraction, summary output, presentation bullets, action items, and copy interaction."
      eyebrow="06 / Workflow Use Case"
      meta={getPlanMeta(sampleCommand)}
      title="Workflow Helper"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <PlaceholderCard
          body="The later workflow surface will turn page content or documentation into structured steps and practical next actions."
          label="Output"
          title="Actionable Summary"
        />
        <PlaceholderCard
          body="The Cloud Run documentation prompt is already classified through the shared planner as a workflow task."
          label="Shared Core"
          title="Mode Detection"
        />
      </div>
    </PageFrame>
  );
}
