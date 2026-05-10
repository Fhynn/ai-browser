import { shoppingRecommendation } from "./shoppingData";

interface ShoppingSummaryCardProps {
  copied: boolean;
  savedTask: boolean;
  cartMessage: string | null;
  blockedMessage: string | null;
  onCopy: () => void;
  onSaveTask: () => void;
}

export function ShoppingSummaryCard({
  blockedMessage,
  cartMessage,
  copied,
  onCopy,
  onSaveTask,
  savedTask
}: ShoppingSummaryCardProps) {
  return (
    <section className="border border-primaryBlack bg-surfaceWhite p-6">
      <p className="technical-label text-textSecondary">Final Recommendation</p>
      <h2 className="mt-4 text-4xl font-black uppercase leading-none">Safe Shopping Summary</h2>
      <p className="mt-5 max-w-4xl text-lg leading-8 text-textSecondary">{shoppingRecommendation}</p>
      {cartMessage ? <p className="mt-5 border border-primaryBlack bg-surfaceLight p-4 font-semibold">{cartMessage}</p> : null}
      {blockedMessage ? <p className="mt-5 border border-primaryBlack bg-surfaceLight p-4 font-semibold">{blockedMessage}</p> : null}
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
          onClick={onSaveTask}
          type="button"
        >
          {savedTask ? "Task Saved" : "Save Task"}
        </button>
      </div>
    </section>
  );
}
