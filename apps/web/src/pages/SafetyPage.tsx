import { classifySensitiveAction } from "@browsepilot/shared";
import { PageFrame } from "../components/PageFrame";
import { PlaceholderCard } from "../components/PlaceholderCard";
import { RouteButton } from "../components/RouteButton";
import type { RoutePageProps } from "../routes";

const sensitiveSample = classifySensitiveAction("add to cart and checkout") ? "confirmation required" : "safe";

export function SafetyPage({ onNavigate }: RoutePageProps) {
  return (
    <PageFrame
      actions={
        <>
          <RouteButton href="/extension" label="Extension Preview" onNavigate={onNavigate} variant="dark" />
          <RouteButton href="/architecture" label="Architecture" onNavigate={onNavigate} />
        </>
      }
      description="The safety route is available. Phase 12 will fully explain allowed actions, confirmation-required actions, blocked behaviors, and the user-control model."
      eyebrow="09 / Safety"
      meta={`ADD TO CART + CHECKOUT / ${sensitiveSample.toUpperCase()}`}
      title="Safety Confirmations"
    >
      <div className="grid gap-5 md:grid-cols-3">
        <PlaceholderCard
          body="Search, read, compare, summarize, open links, scroll, prepare forms, and type into approved fields will be documented here."
          label="Allowed"
          title="Safe Browser Work"
        />
        <PlaceholderCard
          body="Checkout, payment, submit, send, login, upload, download, account changes, and add to cart require explicit confirmation."
          label="Confirm"
          title="Sensitive Actions"
        />
        <PlaceholderCard
          body="BrowsePilot will not bypass CAPTCHA, bypass paywalls, purchase without approval, submit forms without approval, or automate harmful actions."
          label="Blocked"
          title="Hard Limits"
        />
      </div>
    </PageFrame>
  );
}
