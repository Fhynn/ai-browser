import { PageFrame } from "../components/PageFrame";
import { PlaceholderCard } from "../components/PlaceholderCard";
import { RouteButton } from "../components/RouteButton";
import type { RoutePageProps } from "../routes";
import { getPlanMeta } from "./pageContent";

const sampleCommand = "Carikan susu yang bagus untuk anak saya";

export function ShoppingPage({ onNavigate }: RoutePageProps) {
  return (
    <PageFrame
      actions={
        <>
          <RouteButton href="/safety" label="Safety Rules" onNavigate={onNavigate} variant="dark" />
          <RouteButton href="/dashboard" label="Task Dashboard" onNavigate={onNavigate} />
        </>
      }
      description="The shopping use-case route is ready. Phase 7 will add the age, allergy, and budget clarification flow, product cards, medical caution note, and add-to-cart confirmation gate."
      eyebrow="05 / Shopping Use Case"
      meta={getPlanMeta(sampleCommand)}
      title="Shopping Assistant"
    >
      <div className="grid gap-5 md:grid-cols-3">
        <PlaceholderCard
          body="The shared planner treats child milk shopping as clarification-first instead of immediately recommending products."
          label="Clarify"
          title="Age And Allergy"
        />
        <PlaceholderCard
          body="Future product cards will compare price, size, sugar note, age suitability, rating, and seller trust."
          label="Compare"
          title="Product Signals"
        />
        <PlaceholderCard
          body="Cart, checkout, payment, and purchase actions remain blocked until explicit user confirmation."
          label="Safety"
          title="Confirmation Gate"
        />
      </div>
    </PageFrame>
  );
}
