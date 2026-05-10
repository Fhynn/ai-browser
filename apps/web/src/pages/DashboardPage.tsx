import { PageFrame } from "../components/PageFrame";
import { PlaceholderCard } from "../components/PlaceholderCard";
import { RouteButton } from "../components/RouteButton";
import type { RoutePageProps } from "../routes";
import { getPlanMeta } from "./pageContent";

const sampleCommand = "Bantu isi form ini tapi jangan submit";

export function DashboardPage({ onNavigate }: RoutePageProps) {
  return (
    <PageFrame
      actions={
        <>
          <RouteButton href="/demo" label="Run Demo" onNavigate={onNavigate} variant="dark" />
          <RouteButton href="/safety" label="Review Safety" onNavigate={onNavigate} />
        </>
      }
      description="The dashboard route renders now. Phase 10 will add persisted task history, mode totals, awaiting-confirmation counts, completed tasks, recent summaries, and safety block cards."
      eyebrow="07 / Task Dashboard"
      meta={getPlanMeta(sampleCommand)}
      title="Task Dashboard"
    >
      <div className="grid gap-5 md:grid-cols-3">
        <PlaceholderCard
          body="Total tasks, research tasks, shopping tasks, workflow tasks, awaiting confirmations, and completed task cards will be added later."
          label="Metrics"
          title="Task Totals"
        />
        <PlaceholderCard
          body="The future table will list task ID, mode, user command, status, created time, and result."
          label="History"
          title="Local Storage"
        />
        <PlaceholderCard
          body="Recent research, shopping, summaries, and safety blocks will use the same route shell and card system."
          label="Sections"
          title="Operational Views"
        />
      </div>
    </PageFrame>
  );
}
