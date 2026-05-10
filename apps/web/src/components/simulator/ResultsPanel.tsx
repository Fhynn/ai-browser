import type { AgentMode, AgentResult, ToolResult } from "@browsepilot/shared";
import { researchResults, shoppingResults } from "./mockData";
import { ResearchResultCard } from "./ResearchResultCard";
import { ShoppingResultCard } from "./ShoppingResultCard";
import { WorkflowSummaryCard } from "./WorkflowSummaryCard";

interface ResultsPanelProps {
  mode: AgentMode | null;
  result: AgentResult | null;
  toolResults: ToolResult[];
  blockedMessage: string | null;
  copied: boolean;
  onAddToCart: (productName: string) => void;
  onCopyWorkflow: () => void;
}

export function ResultsPanel({ blockedMessage, copied, mode, onAddToCart, onCopyWorkflow, result, toolResults }: ResultsPanelProps) {
  return (
    <section className="border border-borderSoft bg-surfaceWhite p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="technical-label text-textSecondary">Output</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-none">Results</h2>
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-textSecondary">{toolResults.length} tool calls</span>
      </div>

      {blockedMessage ? <div className="mt-5 border border-primaryBlack bg-surfaceLight p-4 font-semibold">{blockedMessage}</div> : null}

      {!mode ? (
        <p className="mt-5 border border-dashed border-borderSoft bg-surfaceLight p-5 text-sm text-textSecondary">
          Results appear after the agent finishes a command.
        </p>
      ) : null}

      {mode === "research" ? <ResearchResults /> : null}
      {mode === "shopping" ? <ShoppingResults onAddToCart={onAddToCart} /> : null}
      {mode === "workflow" || mode === "summarize" ? <WorkflowSummaryCard copied={copied} onCopy={onCopyWorkflow} /> : null}
      {mode === "form_assist" ? <FormAssistResult onAddToCart={onAddToCart} /> : null}
      {mode === "general" ? <GeneralResult /> : null}

      {result ? (
        <div className="mt-5 border-t border-borderSoft pt-4">
          <p className="technical-label text-textSecondary">Final Result</p>
          <p className="mt-2 leading-7 text-textSecondary">{result.summary}</p>
        </div>
      ) : null}
    </section>
  );
}

function ResearchResults() {
  return (
    <div className="mt-5 space-y-4">
      <div className="overflow-x-auto border border-borderSoft">
        <table className="w-full min-w-[560px] border-collapse bg-surfaceWhite text-left text-sm">
          <thead className="bg-surfaceLight font-mono text-[0.66rem] uppercase tracking-[0.12em] text-textSecondary">
            <tr>
              <th className="border-b border-borderSoft p-3">Title</th>
              <th className="border-b border-borderSoft p-3">Year</th>
              <th className="border-b border-borderSoft p-3">Method</th>
              <th className="border-b border-borderSoft p-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {researchResults.map((item) => (
              <tr key={item.title}>
                <td className="border-b border-borderSoft p-3">{item.title}</td>
                <td className="border-b border-borderSoft p-3">{item.year}</td>
                <td className="border-b border-borderSoft p-3">{item.method}</td>
                <td className="border-b border-borderSoft p-3">{item.relevance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {researchResults.slice(0, 2).map((item) => (
          <ResearchResultCard key={item.title} result={item} />
        ))}
      </div>
      <p className="border border-borderSoft bg-surfaceLight p-4 text-sm leading-6 text-textSecondary">
        Recommendation: start with the 2025 YOLOv8 paper for implementation direction, then use the 2023 benchmark as evaluation support. Sources are simulated for prototype demo.
      </p>
    </div>
  );
}

function ShoppingResults({ onAddToCart }: { onAddToCart: (productName: string) => void }) {
  return (
    <div className="mt-5 space-y-4">
      <div className="grid gap-3">
        {shoppingResults.map((product) => (
          <ShoppingResultCard key={product.name} onAddToCart={(productName) => onAddToCart(`add to cart ${productName}`)} product={product} />
        ))}
      </div>
      <p className="border border-primaryBlack bg-surfaceLight p-4 text-sm leading-6">
        Informasi ini bukan pengganti saran dokter. Untuk alergi, kondisi khusus, atau bayi, konsultasikan dengan tenaga kesehatan.
      </p>
    </div>
  );
}

function FormAssistResult({ onAddToCart }: { onAddToCart: (actionText: string) => void }) {
  return (
    <div className="mt-5 border border-borderSoft bg-surfaceLight p-4">
      <p className="leading-7 text-textSecondary">Form fields are prepared in the simulated browser. BrowsePilot will not submit the form without explicit approval.</p>
      <button
        className="mt-4 border border-primaryBlack bg-primaryBlack px-4 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-surfaceWhite hover:text-primaryBlack"
        onClick={() => onAddToCart("submit form")}
        type="button"
      >
        Try Submit Action
      </button>
    </div>
  );
}

function GeneralResult() {
  return <p className="mt-5 border border-borderSoft bg-surfaceLight p-4 text-sm leading-6 text-textSecondary">BrowsePilot prepared a safe general browsing sequence.</p>;
}
