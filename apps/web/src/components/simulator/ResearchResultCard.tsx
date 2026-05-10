import type { MockResearchResult } from "./types";

export function ResearchResultCard({ result }: { result: MockResearchResult }) {
  return (
    <article className="border border-borderSoft bg-surfaceWhite p-4">
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-bold leading-tight">{result.title}</h4>
        <span className="border border-primaryBlack px-2 py-1 font-mono text-[0.62rem]">{result.relevance}</span>
      </div>
      <p className="technical-label mt-3 text-textSecondary">
        {result.year} / {result.method}
      </p>
      <p className="mt-3 text-sm leading-6 text-textSecondary">{result.summary}</p>
    </article>
  );
}
