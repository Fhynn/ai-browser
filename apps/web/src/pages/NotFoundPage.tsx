import { PageFrame } from "../components/PageFrame";
import { RouteButton } from "../components/RouteButton";
import type { RoutePageProps } from "../routes";

export function NotFoundPage({ onNavigate }: RoutePageProps) {
  return (
    <PageFrame
      actions={<RouteButton href="/" label="Back Home" onNavigate={onNavigate} variant="dark" />}
      description="This route is not part of the BrowsePilot AI Phase 3 map. Use the app navigation to return to a wired route."
      eyebrow="Route Missing"
      title="Not Found"
    >
      <div className="border border-borderSoft bg-surfaceWhite p-6">
        <p className="text-textSecondary">The requested route does not exist in the current web app route table.</p>
      </div>
    </PageFrame>
  );
}
