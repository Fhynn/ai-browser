import { workflowSummary } from "./mockData";

interface WorkflowSummaryCardProps {
  onCopy: () => void;
  copied: boolean;
}

export function WorkflowSummaryCard({ copied, onCopy }: WorkflowSummaryCardProps) {
  return (
    <article className="border border-borderSoft bg-surfaceWhite p-4">
      <p className="technical-label text-textSecondary">Workflow Summary</p>
      <p className="mt-3 leading-7 text-textSecondary">{workflowSummary.summary}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <h4 className="font-bold uppercase">Key Points</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-textSecondary">
            {workflowSummary.keyPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold uppercase">Presentation Bullets</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-textSecondary">
            {workflowSummary.presentationBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <button
        className="mt-4 border border-primaryBlack bg-surfaceWhite px-4 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] transition hover:bg-primaryBlack hover:text-white"
        onClick={onCopy}
        type="button"
      >
        {copied ? "Copied" : "Copy Summary"}
      </button>
    </article>
  );
}
