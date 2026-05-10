import type { ResearchPaper } from "./types";

export function PaperComparisonTable({ papers }: { papers: ResearchPaper[] }) {
  return (
    <section className="border border-borderSoft bg-surfaceWhite p-5">
      <p className="technical-label text-textSecondary">Comparison Table</p>
      <h2 className="mt-3 text-3xl font-black uppercase leading-none">Paper Comparison</h2>
      <div className="mt-5 overflow-x-auto border border-borderSoft">
        <table className="w-full min-w-[920px] border-collapse text-left text-sm">
          <thead className="bg-surfaceLight font-mono text-[0.66rem] uppercase tracking-[0.12em] text-textSecondary">
            <tr>
              <th className="border-b border-borderSoft p-3">Title</th>
              <th className="border-b border-borderSoft p-3">Year</th>
              <th className="border-b border-borderSoft p-3">Method</th>
              <th className="border-b border-borderSoft p-3">Dataset</th>
              <th className="border-b border-borderSoft p-3">Best For</th>
              <th className="border-b border-borderSoft p-3">Relevance</th>
              <th className="border-b border-borderSoft p-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {papers.map((paper) => (
              <tr key={paper.id}>
                <td className="border-b border-borderSoft p-3 font-semibold">{paper.title}</td>
                <td className="border-b border-borderSoft p-3">{paper.year}</td>
                <td className="border-b border-borderSoft p-3">{paper.method}</td>
                <td className="border-b border-borderSoft p-3">{paper.dataset}</td>
                <td className="border-b border-borderSoft p-3">{paper.bestFor}</td>
                <td className="border-b border-borderSoft p-3">{paper.relevance}</td>
                <td className="border-b border-borderSoft p-3">{paper.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
