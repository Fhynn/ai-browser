import { workflowOutput } from "./workflowData";

interface WorkflowSummaryPanelProps {
  copied: boolean;
  onCopy: () => void;
}

export function WorkflowSummaryPanel({ copied, onCopy }: WorkflowSummaryPanelProps) {
  return (
    <section className="border border-borderSoft bg-surfaceWhite p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="technical-label text-textSecondary">Summary Panel</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-none">Concise Summary</h2>
        </div>
        <button
          className="border border-primaryBlack bg-surfaceWhite px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-primaryBlack hover:text-white"
          onClick={onCopy}
          type="button"
        >
          {copied ? "Copied" : "Copy Summary"}
        </button>
      </div>
      <p className="mt-5 text-lg leading-8 text-textSecondary">{workflowOutput.summary}</p>
      <div className="mt-5 grid gap-2">
        {workflowOutput.keyPoints.map((point) => (
          <div className="border border-borderSoft bg-surfaceLight p-3 text-sm leading-6 text-textSecondary" key={point}>
            {point}
          </div>
        ))}
      </div>
    </section>
  );
}
