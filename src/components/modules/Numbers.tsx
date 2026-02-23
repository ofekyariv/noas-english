"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { numberWords } from "@/lib/data";
import QuizCard from "@/components/QuizCard";

interface Props {
  onProgress: (current: number, total: number) => void;
  onComplete: (score: number, total: number) => void;
}

const EMOJI_POOL = [
  "🍎", "⭐", "🐱", "🌸", "🎈", "🦋", "🌙", "🐸", "🎵", "🍕",
  "🦄", "🐶", "🌈", "🎀", "🍩", "🚀", "🐧", "🌺",
];

interface NumberQuestion {
  number: number;
  word: string;
  emoji: string;
  options: string[];
}

function buildQuestions(): NumberQuestion[] {
  // Pick 12 numbers: first 5, then spread up to 20
  const nums = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 18, 20];
  return nums.map((n, idx) => {
    const word = numberWords[n - 1];
    const em = EMOJI_POOL[idx % EMOJI_POOL.length];
    // Pick 2 wrong options
    const wrongIndices: number[] = [];
    const pool = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 17, 19].filter(
      (i) => i !== n - 1
    );
    // deterministic shuffle based on index
    const shuffled = [...pool].sort((a, b) => ((a * 7 + idx * 3) % 19) - ((b * 7 + idx * 3) % 19));
    wrongIndices.push(shuffled[0], shuffled[1]);
    const opts = [word, numberWords[wrongIndices[0]], numberWords[wrongIndices[1]]];
    // deterministic sort
    opts.sort((a, b) => ((a.charCodeAt(0) + idx) % 5) - ((b.charCodeAt(0) + idx) % 5));
    return { number: n, word, emoji: em, options: opts };
  });
}

export default function Numbers({ onProgress, onComplete }: Props) {
  const questions = useMemo(() => buildQuestions(), []);
  const TOTAL = questions.length;
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    onProgress(index, TOTAL);
  }, [index, TOTAL, onProgress]);

  const current = questions[index];

  const handleAnswer = (isCorrect: boolean) => {
    const newScore = isCorrect ? score + 1 : score;
    if (index + 1 >= TOTAL) {
      onComplete(newScore, TOTAL);
    } else {
      setScore(newScore);
      setTimeout(() => {
        setIndex((i) => i + 1);
        setKey((k) => k + 1);
      }, 100);
    }
  };

  // Render N emojis (capped visually for large numbers)
  const displayCount = Math.min(current.number, 10);
  const hasMore = current.number > 10;

  return (
    <div className="flex flex-col items-center gap-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
          className="bg-white rounded-3xl shadow-xl p-6 text-center w-full max-w-xs"
        >
          {/* Big number */}
          <div className="text-7xl font-black text-blue-500 mb-3">
            {current.number}
          </div>

          {/* Emoji display */}
          <div className="flex flex-wrap justify-center gap-1 mb-3 min-h-[80px]">
            {Array.from({ length: displayCount }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05, type: "spring" }}
                className="text-3xl"
              >
                {current.emoji}
              </motion.span>
            ))}
            {hasMore && (
              <span className="text-2xl font-black text-gray-400 self-center">
                +{current.number - 10}
              </span>
            )}
          </div>

          <p className="text-gray-500 font-semibold text-sm">
            Which word says the number?
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="w-full max-w-xs" key={key}>
        <QuizCard
          options={current.options}
          correct={current.word}
          onAnswer={handleAnswer}
        />
      </div>

      <p className="text-gray-400 font-semibold text-sm">
        Score: {score} / {index}
      </p>
    </div>
  );
}
