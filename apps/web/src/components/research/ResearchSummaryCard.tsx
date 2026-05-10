import { researchRecommendation } from "./researchData";

interface ResearchSummaryCardProps {
  copied: boolean;
  savedToDashboard: boolean;
  onCopy: () => void;
  onSaveDashboard: () => void;
}

export function ResearchSummaryCard({ copied, onCopy, onSaveDashboard, savedToDashboard }: ResearchSummaryCardProps) {
  return (
    <section className="border border-primaryBlack bg-surfaceWhite p-6">
      <p className="technical-label text-textSecondary">Final Recommendation</p>
      <h2 className="mt-4 text-4xl font-black uppercase leading-none">Prototype IoT Direction</h2>
      <p className="mt-5 max-w-4xl text-lg leading-8 text-textSecondary">{researchRecommendation}</p>
      <p className="technical-label mt-5 text-textSecondary">Demo research results — simulated for prototype.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          className="border border-primaryBlack bg-surfaceWhite px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-primaryBlack hover:text-white"
          onClick={onCopy}
          type="button"
        >
          {copied ? "Copied" : "Copy Summary"}
        </button>
        <button
          className="border border-primaryBlack bg-primaryBlack px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-surfaceWhite hover:text-primaryBlack"
          onClick={onSaveDashboard}
          type="button"
        >
          {savedToDashboard ? "Saved To Dashboard" : "Save To Dashboard"}
        </button>
      </div>
    </section>
  );
}
