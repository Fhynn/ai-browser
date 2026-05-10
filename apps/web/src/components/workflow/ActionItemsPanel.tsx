import { workflowOutput } from "./workflowData";

interface ActionItemsPanelProps {
  copied: boolean;
  savedTask: boolean;
  onCopy: () => void;
  onSave: () => void;
  onExport: () => void;
}

export function ActionItemsPanel({ copied, onCopy, onExport, onSave, savedTask }: ActionItemsPanelProps) {
  return (
    <section className="border border-primaryBlack bg-surfaceWhite p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="technical-label text-textSecondary">Action Items</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-none">Next Work</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="border border-primaryBlack bg-surfaceWhite px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-primaryBlack hover:text-white"
            onClick={onCopy}
            type="button"
          >
            {copied ? "Copied" : "Copy Action Items"}
          </button>
          <button
            className="border border-primaryBlack bg-primaryBlack px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-surfaceWhite hover:text-primaryBlack"
            onClick={onSave}
            type="button"
          >
            {savedTask ? "Saved" : "Save Workflow Task"}
          </button>
          <button
            className="border border-primaryBlack bg-surfaceWhite px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-primaryBlack hover:text-white"
            onClick={onExport}
            type="button"
          >
            Export As Markdown
          </button>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {workflowOutput.actionItems.map((item) => (
          <div className="border border-borderSoft bg-surfaceLight p-4 text-sm leading-6 text-textSecondary" key={item}>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
