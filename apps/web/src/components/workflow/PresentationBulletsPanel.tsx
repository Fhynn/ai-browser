import { workflowOutput } from "./workflowData";

interface PresentationBulletsPanelProps {
  copied: boolean;
  onCopy: () => void;
}

export function PresentationBulletsPanel({ copied, onCopy }: PresentationBulletsPanelProps) {
  return (
    <section className="border border-borderSoft bg-surfaceWhite p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="technical-label text-textSecondary">Presentation Bullets</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-none">Slide Ready</h2>
        </div>
        <button
          className="border border-primaryBlack bg-surfaceWhite px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-primaryBlack hover:text-white"
          onClick={onCopy}
          type="button"
        >
          {copied ? "Copied" : "Copy Presentation Bullets"}
        </button>
      </div>
      <div className="mt-5 grid gap-3">
        {workflowOutput.presentationBullets.map((bullet) => (
          <article className="border border-borderSoft bg-surfaceLight p-4" key={bullet}>
            <p className="font-semibold uppercase">{bullet}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
