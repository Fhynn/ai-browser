import { motion } from "framer-motion";
import { BROWSEPILOT_APP_NAME, createPlan } from "@browsepilot/shared";
import type { RoutePageProps } from "../routes";

const categories = ["RESEARCH AGENT", "SHOPPING ASSISTANT", "PAGE SUMMARIZER", "WORKFLOW HELPER", "SAFE EXECUTOR"];

const samplePlan = createPlan("Carikan jurnal terbaru tentang YOLO untuk deteksi sampah");

const sectionData = [
  {
    index: "01",
    title: "Problem",
    label: "Browser work is fragmented",
    body: "People search, compare, summarize, and prepare actions across many tabs. The browser gives access, but not a controlled execution layer that understands intent and safety."
  },
  {
    index: "02",
    title: "How BrowsePilot Works",
    label: `${samplePlan.steps.length} step mock plan generated`,
    body: "BrowsePilot turns a natural command into an inspectable plan: understand the task, read context, search sources, compare results, summarize findings, and pause before sensitive actions."
  },
  {
    index: "03",
    title: "Agent Modes",
    label: "Research / Shopping / Workflow",
    body: "The shared planner routes commands into focused modes for papers, products, page summaries, form assistance, documentation workflows, and general browser help."
  },
  {
    index: "04",
    title: "Safety Confirmations",
    label: "User control remains central",
    body: "Checkout, payment, submit, login, upload, download, delete, send, and add-to-cart actions are blocked until the user explicitly confirms the next move."
  },
  {
    index: "05",
    title: "Extension + Web App Ecosystem",
    label: "One agent core, two surfaces",
    body: "The web app demonstrates the agent and dashboard. The Chrome extension brings the same planning and confirmation model into a side panel beside real browser pages."
  }
];

export function HomePage({ onNavigate }: RoutePageProps) {
  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[calc(100vh-132px)] px-5 py-8 md:px-8 md:py-12">
        <div className="pointer-events-none absolute inset-x-5 top-8 h-px bg-borderSoft md:inset-x-8" />
        <div className="pointer-events-none absolute bottom-10 left-5 right-5 h-px bg-borderSoft md:left-8 md:right-8" />
        <div className="pointer-events-none absolute left-5 top-8 h-[calc(100%-72px)] w-px bg-borderSoft md:left-8" />
        <div className="pointer-events-none absolute right-5 top-8 h-[calc(100%-72px)] w-px bg-borderSoft md:right-8" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:min-h-[calc(100vh-220px)] lg:grid-cols-[1.02fr_0.9fr_0.48fr] lg:items-center">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 pt-8"
            initial={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="technical-label text-textSecondary">ASISTEN AI YANG HIDUP DI BROWSER</p>
            <h1 className="mt-6 max-w-4xl font-display text-[4rem] font-black uppercase leading-[0.82] tracking-normal sm:text-[5.6rem] md:text-[7.5rem] lg:text-[7.2rem] xl:text-[8.6rem]">
              AI Browser
              <br />
              Execution
              <br />
              Companion
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-textSecondary md:text-xl">
              BrowsePilot membantu kamu mencari, membaca, membandingkan, dan mengeksekusi tugas browser - tanpa
              kehilangan kontrol.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LandingButton label="TRY NOW ↗" onClick={() => onNavigate("/demo")} variant="dark" />
              <LandingButton label="EXPLORE AGENT ↗" onClick={() => onNavigate("/simulator")} />
            </div>
          </motion.div>

          <HeroDevice />

          <motion.aside
            animate={{ opacity: 1, x: 0 }}
            className="relative z-10 border-l border-borderSoft pl-5 lg:self-stretch lg:py-16"
            initial={{ opacity: 0, x: 24 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          >
            <p className="technical-label text-textSecondary">Agent Categories</p>
            <div className="mt-8 space-y-0 border-y border-borderSoft">
              {categories.map((category, index) => (
                <div className="flex items-center justify-between border-b border-borderSoft py-4 last:border-b-0" key={category}>
                  <span className="text-xl font-black uppercase leading-none">{category}</span>
                  <span className="font-mono text-xs text-textSecondary">{String(index + 1).padStart(2, "0")}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-primaryBlack" />
              <span className="font-mono text-xs uppercase tracking-[0.18em]">01 - 05</span>
            </div>
          </motion.aside>
        </div>

        <div className="mx-auto mt-10 grid max-w-7xl gap-8 border-t border-borderSoft pt-7 md:grid-cols-[0.75fr_1fr]">
          <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ delay: 0.42, duration: 0.5 }}>
            <p className="text-2xl font-black">ブラウズパイロット</p>
            <p className="technical-label mt-2 text-textSecondary">AI Browser Companion System</p>
          </motion.div>
          <motion.p
            animate={{ opacity: 1 }}
            className="max-w-2xl justify-self-end text-sm leading-7 text-textSecondary md:text-right"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.52, duration: 0.5 }}
          >
            Designed for students, builders, researchers, shoppers, and busy people who want their browser to work
            with them.
          </motion.p>
        </div>
      </section>

      <section className="border-y border-borderSoft px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="technical-label text-textSecondary">{BROWSEPILOT_APP_NAME} / Landing Sections</p>
          <div className="mt-8 divide-y divide-borderSoft border-y border-borderSoft">
            {sectionData.map((section) => (
              <LandingSection body={section.body} index={section.index} key={section.title} label={section.label} title={section.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 border border-primaryBlack bg-surfaceWhite p-6 md:grid-cols-[1fr_0.55fr] md:p-10">
          <div>
            <p className="technical-label text-textSecondary">Live Demo CTA</p>
            <h2 className="mt-5 max-w-4xl font-display text-5xl font-black uppercase leading-[0.9] md:text-7xl">
              See the agent plan before it acts.
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-4">
            <p className="leading-8 text-textSecondary">
              Open the guided demo or jump into the simulator to watch BrowsePilot classify commands, create plans,
              and stop at confirmation gates.
            </p>
            <div className="flex flex-wrap gap-3">
              <LandingButton label="TRY NOW ↗" onClick={() => onNavigate("/demo")} variant="dark" />
              <LandingButton label="EXPLORE AGENT ↗" onClick={() => onNavigate("/simulator")} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function LandingButton({ label, onClick, variant = "light" }: { label: string; onClick: () => void; variant?: "light" | "dark" }) {
  const className =
    variant === "dark"
      ? "border border-primaryBlack bg-primaryBlack px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-surfaceWhite hover:text-primaryBlack"
      : "border border-primaryBlack bg-surfaceWhite px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-primaryBlack transition hover:bg-primaryBlack hover:text-white";

  return (
    <button className={className} onClick={onClick} type="button">
      {label}
    </button>
  );
}

function HeroDevice() {
  return (
    <motion.div
      animate={{ opacity: 1, y: [0, -10, 0], rotate: -2 }}
      className="relative z-10 mx-auto h-[440px] w-full max-w-[520px] lg:h-[560px]"
      initial={{ opacity: 0, y: 30, rotate: -6 }}
      transition={{
        opacity: { duration: 0.5, delay: 0.1 },
        rotate: { duration: 0.6, delay: 0.1 },
        y: { duration: 7, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <div className="absolute left-1/2 top-1/2 h-[68%] w-[84%] -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] border border-primaryBlack bg-surfaceWhite shadow-[18px_18px_0_#D7DADD]">
        <div className="flex h-10 items-center gap-2 border-b border-primaryBlack px-4">
          <span className="h-2 w-2 border border-primaryBlack bg-primaryBlack" />
          <span className="h-2 w-2 border border-primaryBlack" />
          <span className="h-2 w-2 border border-primaryBlack" />
          <span className="ml-auto font-mono text-[0.62rem] uppercase tracking-[0.16em] text-textSecondary">Browser Surface</span>
        </div>
        <div className="grid h-[calc(100%-2.5rem)] grid-cols-[1fr_0.58fr]">
          <div className="border-r border-borderSoft p-5">
            <div className="h-8 border border-borderSoft bg-surfaceLight px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-textSecondary">
              Search / Read / Compare
            </div>
            <div className="mt-7 space-y-3">
              <DeviceLine width="w-11/12" />
              <DeviceLine width="w-8/12" />
              <DeviceLine width="w-10/12" />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <DeviceModule label="Search" />
              <DeviceModule label="Read" />
              <DeviceModule label="Compare" />
              <DeviceModule label="Confirm" />
            </div>
          </div>
          <div className="bg-surfaceLight p-4">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-textSecondary">Extension Panel</p>
            <div className="mt-4 space-y-3">
              <CommandChip text="Carikan jurnal YOLO" />
              <CommandChip text="Ringkas halaman ini" />
              <CommandChip text="Jangan submit dulu" />
            </div>
            <div className="mt-5 border border-primaryBlack bg-surfaceWhite p-3">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em]">Action Log</p>
              <div className="mt-3 space-y-2">
                <DeviceLine width="w-full" />
                <DeviceLine width="w-9/12" />
                <DeviceLine width="w-11/12" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ x: [0, 10, 0], y: [0, -6, 0] }}
        className="absolute bottom-16 left-7 border border-primaryBlack bg-surfaceWhite px-4 py-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] shadow-[8px_8px_0_#D7DADD]"
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        Cursor / User Confirmed
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        className="absolute right-5 top-16 border border-primaryBlack bg-surfaceWhite px-4 py-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] shadow-[8px_8px_0_#D7DADD]"
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Safe Mode ON
      </motion.div>
      <div className="absolute left-0 top-20 h-px w-24 bg-primaryBlack" />
      <div className="absolute bottom-24 right-0 h-px w-28 bg-primaryBlack" />
    </motion.div>
  );
}

function DeviceLine({ width }: { width: string }) {
  return <div className={`h-2 ${width} bg-borderSoft`} />;
}

function DeviceModule({ label }: { label: string }) {
  return (
    <div className="border border-borderSoft bg-surfaceWhite p-3">
      <div className="mb-4 h-8 border border-borderSoft bg-surfaceLight" />
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em]">{label}</p>
    </div>
  );
}

function CommandChip({ text }: { text: string }) {
  return <div className="border border-borderSoft bg-surfaceWhite px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.1em]">{text}</div>;
}

function LandingSection({ body, index, label, title }: { body: string; index: string; label: string; title: string }) {
  return (
    <article className="grid gap-5 py-8 md:grid-cols-[0.18fr_0.82fr] md:py-10">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-textSecondary">{index}</div>
      <div className="grid gap-5 lg:grid-cols-[0.55fr_1fr]">
        <div>
          <p className="technical-label text-textSecondary">{label}</p>
          <h2 className="mt-4 text-4xl font-black uppercase leading-none md:text-5xl">{title}</h2>
        </div>
        <p className="max-w-3xl text-lg leading-8 text-textSecondary">{body}</p>
      </div>
    </article>
  );
}
