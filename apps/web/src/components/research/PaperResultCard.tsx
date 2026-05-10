import type { ResearchPaper } from "./types";

interface PaperResultCardProps {
  paper: ResearchPaper;
  saved: boolean;
  onOpenSource: (paper: ResearchPaper) => void;
  onSave: (paper: ResearchPaper) => void;
}

export function PaperResultCard({ onOpenSource, onSave, paper, saved }: PaperResultCardProps) {
  return (
    <article className="border border-borderSoft bg-surfaceWhite p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="max-w-xl text-2xl font-black uppercase leading-tight">{paper.title}</h3>
        <div className="flex gap-2">
          <span className="border border-primaryBlack bg-surfaceLight px-2 py-1 font-mono text-[0.64rem] uppercase tracking-[0.12em]">{paper.year}</span>
          <span className="border border-primaryBlack bg-surfaceLight px-2 py-1 font-mono text-[0.64rem] uppercase tracking-[0.12em]">{paper.method}</span>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between font-mono text-[0.66rem] uppercase tracking-[0.14em] text-textSecondary">
          <span>Relevance</span>
          <span>{paper.relevance}/100</span>
        </div>
        <div className="mt-2 h-3 border border-primaryBlack bg-surfaceLight">
          <div className="h-full bg-primaryBlack" style={{ width: `${paper.relevance}%` }} />
        </div>
      </div>
      <p className="mt-5 leading-7 text-textSecondary">{paper.summary}</p>
      <div className="mt-4 border border-borderSoft bg-surfaceLight p-4">
        <p className="technical-label text-textSecondary">Why Useful</p>
        <p className="mt-2 text-sm leading-6 text-textSecondary">{paper.whyUseful}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          className="border border-primaryBlack bg-surfaceWhite px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-primaryBlack hover:text-white"
          onClick={() => onOpenSource(paper)}
          type="button"
        >
          Open Source
        </button>
        <button
          className="border border-primaryBlack bg-primaryBlack px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-surfaceWhite hover:text-primaryBlack"
          onClick={() => onSave(paper)}
          type="button"
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </article>
  );
}
