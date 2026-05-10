import { AnimatePresence, motion } from "framer-motion";
import type { AgentMode } from "@browsepilot/shared";
import { getBrowserUrl, getModeTitle, researchResults, shoppingResults, workflowSummary } from "./mockData";
import { ResearchResultCard } from "./ResearchResultCard";
import { ShoppingResultCard } from "./ShoppingResultCard";
import type { BrowserStage } from "./types";

interface BrowserViewportProps {
  command: string;
  mode: AgentMode | null;
  stage: BrowserStage;
}

export function BrowserViewport({ command, mode, stage }: BrowserViewportProps) {
  return (
    <section className="border border-primaryBlack bg-surfaceWhite">
      <div className="flex items-center gap-3 border-b border-primaryBlack bg-surfaceLight px-4 py-3">
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 border border-primaryBlack bg-primaryBlack" />
          <span className="h-2.5 w-2.5 border border-primaryBlack" />
          <span className="h-2.5 w-2.5 border border-primaryBlack" />
        </div>
        <div className="min-w-0 flex-1 border border-borderSoft bg-surfaceWhite px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-textSecondary">
          {getBrowserUrl(mode)}
        </div>
      </div>
      <div className="border-b border-borderSoft px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="technical-label text-textSecondary">Simulated Browser Viewport</p>
            <h2 className="mt-2 text-2xl font-black uppercase leading-none">{getModeTitle(mode)}</h2>
          </div>
          <span className="border border-borderSoft px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-textSecondary">
            {stage.replace("_", " ")}
          </span>
        </div>
      </div>
      <div className="min-h-[560px] bg-surfaceLight p-4">
        <div className="border border-borderSoft bg-surfaceWhite p-3">
          <div className="border border-borderSoft bg-surfaceLight px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-textSecondary">
            {command || "Search field ready"}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, y: 10 }}
            key={`${mode}-${stage}`}
            transition={{ duration: 0.22 }}
          >
            <BrowserContent mode={mode} stage={stage} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function BrowserContent({ mode, stage }: { mode: AgentMode | null; stage: BrowserStage }) {
  if (stage === "idle" || !mode) {
    return (
      <div className="mt-4 flex min-h-[420px] items-center justify-center border border-dashed border-borderSoft bg-surfaceWhite p-8 text-center">
        <div>
          <p className="technical-label text-textSecondary">Idle Workspace</p>
          <p className="mt-3 text-2xl font-black uppercase">Browser workspace siap menerima perintah.</p>
        </div>
      </div>
    );
  }

  if (mode === "research") {
    return (
      <div className="mt-4 space-y-4">
        <div className="grid gap-3 md:grid-cols-3">
          <Metric label="Query" value="YOLO Waste Detection" />
          <Metric label="Filter" value="2021-2026" />
          <Metric label="Mode" value="Research" />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {researchResults.map((result) => (
            <ResearchResultCard key={result.title} result={result} />
          ))}
        </div>
      </div>
    );
  }

  if (mode === "shopping") {
    return (
      <div className="mt-4 space-y-4">
        <div className="grid gap-3 md:grid-cols-3">
          <Metric label="Age" value="3+ Demo" />
          <Metric label="Budget" value="100K Range" />
          <Metric label="Safety" value="No Checkout" />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {shoppingResults.map((product) => (
            <ShoppingResultCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    );
  }

  if (mode === "workflow" || mode === "summarize") {
    return (
      <div className="mt-4 grid gap-4">
        <article className="border border-borderSoft bg-surfaceWhite p-5">
          <p className="technical-label text-textSecondary">Documentation Page</p>
          <h3 className="mt-3 text-3xl font-black uppercase leading-none">Deploy a web app to Cloud Run</h3>
          <p className="mt-4 leading-7 text-textSecondary">{workflowSummary.summary}</p>
        </article>
        <div className="grid gap-3 md:grid-cols-2">
          {workflowSummary.keyPoints.map((point) => (
            <div className="border border-borderSoft bg-surfaceWhite p-4 text-sm leading-6 text-textSecondary" key={point}>
              {point}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mode === "form_assist") {
    return (
      <div className="mt-4 border border-borderSoft bg-surfaceWhite p-5">
        <p className="technical-label text-textSecondary">Mock Form Page</p>
        <div className="mt-5 grid gap-4">
          <MockField label="Full Name" value="Prepared by BrowsePilot" />
          <MockField label="Email" value="user@example.demo" />
          <MockField label="Message" value="Prepared text. Submission requires approval." />
          <button className="w-fit border border-primaryBlack bg-primaryBlack px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-white" type="button">
            Submit
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-borderSoft bg-surfaceWhite p-3">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-textSecondary">{label}</p>
      <p className="mt-2 font-bold uppercase">{value}</p>
    </div>
  );
}

function MockField({ label, value }: { label: string; value: string }) {
  return (
    <label className="grid gap-2">
      <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-textSecondary">{label}</span>
      <input className="border border-borderSoft bg-surfaceLight px-3 py-3" readOnly value={value} />
    </label>
  );
}
