import { AnimatePresence, motion } from "framer-motion";
import { shoppingClarificationAnswers } from "./shoppingData";

interface ShoppingClarificationPanelProps {
  question: string | null;
  answer: string | null;
  onAnswer: (answer: string) => void;
}

export function ShoppingClarificationPanel({ answer, onAnswer, question }: ShoppingClarificationPanelProps) {
  return (
    <section className="border border-borderSoft bg-surfaceWhite p-5">
      <p className="technical-label text-textSecondary">Clarification Panel</p>
      <h2 className="mt-3 text-3xl font-black uppercase leading-none">Need Context First</h2>
      <AnimatePresence mode="wait">
        {question ? (
          <motion.div animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: 10 }} key="question">
            <p className="mt-5 text-lg font-semibold">{question}</p>
            <div className="mt-4 grid gap-2">
              {shoppingClarificationAnswers.map((option) => (
                <button
                  className="border border-primaryBlack bg-surfaceWhite px-3 py-3 text-left font-mono text-[0.68rem] uppercase tracking-[0.12em] transition hover:bg-primaryBlack hover:text-white"
                  key={option}
                  onClick={() => onAnswer(option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.p animate={{ opacity: 1 }} className="mt-5 leading-7 text-textSecondary" exit={{ opacity: 0 }} initial={{ opacity: 0 }} key="answer">
            {answer
              ? `Context selected: ${answer}. BrowsePilot can compare options, but still blocks shopping actions until confirmation.`
              : "For child products, BrowsePilot asks age, allergies, and budget before showing recommendations."}
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
