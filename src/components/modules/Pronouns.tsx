"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pronounExercises } from "@/lib/data";
import QuizCard from "@/components/QuizCard";

interface Props {
  onProgress: (current: number, total: number) => void;
  onComplete: (score: number, total: number) => void;
}

const questions = pronounExercises;
const TOTAL = questions.length;

export default function Pronouns({ onProgress, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    onProgress(index, TOTAL);
  }, [index, onProgress]);

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

  return (
    <div className="flex flex-col items-center gap-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="bg-white rounded-3xl shadow-xl p-8 text-center w-full max-w-xs"
        >
          {/* Big emoji */}
          <div className="text-7xl mb-4 select-none">{current.emoji}</div>

          {/* Label */}
          <div className="bg-green-50 rounded-2xl px-6 py-3 mb-4 inline-block">
            <p className="text-2xl font-black text-gray-700">{current.label}</p>
          </div>

          <p className="text-gray-500 font-semibold text-sm">
            Which pronoun fits? 👆
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="w-full max-w-xs" key={key}>
        <QuizCard
          options={current.options}
          correct={current.correct}
          onAnswer={handleAnswer}
        />
      </div>

      <p className="text-gray-400 font-semibold text-sm">
        Score: {score} / {index}
      </p>
    </div>
  );
}
