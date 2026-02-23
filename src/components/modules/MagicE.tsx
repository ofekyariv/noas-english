"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { magicEPairs } from "@/lib/data";
import QuizCard from "@/components/QuizCard";

interface Props {
  onProgress: (current: number, total: number) => void;
  onComplete: (score: number, total: number) => void;
}

const TOTAL = magicEPairs.length;

function getOptions(correctIdx: number): string[] {
  const correct = magicEPairs[correctIdx].with;
  const wrong: string[] = [];
  const indices = magicEPairs.map((_, i) => i).filter((i) => i !== correctIdx);
  // Shuffle and pick 2
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  for (let i = 0; i < 2; i++) {
    wrong.push(magicEPairs[indices[i]].with);
  }
  // Shuffle all 3
  const all = [correct, ...wrong];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all;
}

export default function MagicE({ onProgress, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"intro" | "quiz">("intro");
  const [key, setKey] = useState(0);

  const options = useMemo(() => getOptions(index), [index]);

  useEffect(() => {
    onProgress(index, TOTAL);
  }, [index, onProgress]);

  const current = magicEPairs[index];

  const handleAnswer = (isCorrect: boolean) => {
    const newScore = isCorrect ? score + 1 : score;
    if (index + 1 >= TOTAL) {
      onComplete(newScore, TOTAL);
    } else {
      setScore(newScore);
      setTimeout(() => {
        setIndex((i) => i + 1);
        setPhase("intro");
        setKey((k) => k + 1);
      }, 100);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <AnimatePresence mode="wait">
        {phase === "intro" ? (
          <motion.div
            key={`intro-${index}`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-xs"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className="text-5xl mb-4">✨</div>
              <p className="text-gray-500 font-semibold mb-4">The base word is:</p>
              <p className="text-5xl font-black text-gray-700 tracking-wide mb-4">
                {current.without}
              </p>
              <div className="flex items-center justify-center gap-3 bg-purple-50 rounded-2xl p-3">
                <span className="text-3xl font-black text-purple-600">
                  {current.without}
                </span>
                <span className="text-2xl">→</span>
                <span className="text-3xl font-black text-pink-500">
                  {current.without}
                  <span className="text-yellow-400">e</span>
                </span>
              </div>
              <button
                onClick={() => setPhase("quiz")}
                className="mt-6 bg-purple-500 hover:bg-purple-400 active:bg-purple-600
                  text-white font-black text-lg px-8 py-3 rounded-2xl shadow-md
                  border-b-4 border-purple-700 active:border-b-2 active:translate-y-0.5
                  transition-all"
              >
                Quiz me! 🎯
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`quiz-${index}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-xs"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center mb-4">
              <p className="text-gray-500 font-semibold mb-2">
                What does{" "}
                <span className="font-black text-purple-600 text-xl">
                  {current.without}
                </span>{" "}
                become with Magic E?
              </p>
              <p className="text-gray-400 text-sm">
                (add a silent &quot;e&quot; to the end!)
              </p>
            </div>

            <div key={key}>
              <QuizCard
                options={options}
                correct={current.with}
                onAnswer={handleAnswer}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-gray-400 font-semibold text-sm">
        Score: {score} / {index}
      </p>
    </div>
  );
}
