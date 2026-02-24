"use client";

import { useState, useCallback } from "react";
import { fireSmallConfetti } from "@/lib/confetti";

const BUTTON_COLORS = [
  "bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 border-yellow-500",
  "bg-sky-400 hover:bg-sky-300 active:bg-sky-500 border-sky-500",
  "bg-green-400 hover:bg-green-300 active:bg-green-500 border-green-500",
  "bg-pink-400 hover:bg-pink-300 active:bg-pink-500 border-pink-500",
  "bg-orange-400 hover:bg-orange-300 active:bg-orange-500 border-orange-500",
];

interface QuizCardProps {
  question?: string;
  options: string[];
  correct: string;
  onAnswer: (isCorrect: boolean) => void;
  /** delay in ms before calling onAnswer after selection (default 900) */
  delay?: number;
}

export default function QuizCard({
  question,
  options,
  correct,
  onAnswer,
  delay = 900,
}: QuizCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);

  const handleSelect = useCallback(
    (opt: string) => {
      if (selected !== null) return; // already answered
      setSelected(opt);
      const isCorrect = opt === correct;

      if (isCorrect) {
        fireSmallConfetti();
      } else {
        setShaking(true);
        setTimeout(() => setShaking(false), 600);
      }

      setTimeout(() => {
        setSelected(null);
        onAnswer(isCorrect);
      }, delay);
    },
    [selected, correct, onAnswer, delay]
  );

  return (
    <div className="w-full">
      {question && (
        <p className="text-center text-lg font-bold text-gray-700 mb-4 leading-snug">
          {question}
        </p>
      )}
      <div
        dir="ltr"
        className={`grid gap-3 ${
          options.length <= 3
            ? "grid-cols-3"
            : options.length === 4
            ? "grid-cols-2"
            : "grid-cols-3"
        }`}
      >
        {options.map((opt, i) => {
          const isSelected = selected === opt;
          const isCorrectOpt = opt === correct;
          let stateClass = "";

          if (isSelected) {
            stateClass = isCorrectOpt
              ? "!bg-green-400 !border-green-600 scale-105 bounce-in"
              : "!bg-red-400 !border-red-600";
          } else if (selected !== null && isCorrectOpt) {
            // Show correct answer if wrong one was picked
            stateClass = "!bg-green-300 !border-green-500 opacity-90";
          } else if (selected !== null) {
            stateClass = "opacity-50";
          }

          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`
                ${BUTTON_COLORS[i % BUTTON_COLORS.length]}
                ${stateClass}
                ${isSelected && !isCorrectOpt && shaking ? "shake" : ""}
                min-h-[56px] px-3 py-3 rounded-2xl border-b-4
                text-white font-black text-lg uppercase
                transition-all duration-150 select-none
                shadow-md active:translate-y-0.5 active:border-b-2
              `}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
