import { shoppingBehaviorNote, shoppingSafetyNote } from "./shoppingData";

export function ShoppingSafetyNote() {
  return (
    <section className="grid gap-5 md:grid-cols-2">
      <article className="border border-primaryBlack bg-surfaceWhite p-5">
        <p className="technical-label text-textSecondary">Safety Note</p>
        <p className="mt-4 leading-7 text-textSecondary">{shoppingSafetyNote}</p>
      </article>
      <article className="border border-borderSoft bg-surfaceWhite p-5">
        <p className="technical-label text-textSecondary">BrowsePilot Behavior</p>
        <p className="mt-4 leading-7 text-textSecondary">{shoppingBehaviorNote}</p>
      </article>
    </section>
  );
}
