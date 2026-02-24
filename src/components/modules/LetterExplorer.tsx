"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { letterExercises } from "@/lib/data";
import QuizCard from "@/components/QuizCard";

interface Props {
  onProgress: (current: number, total: number) => void;
  onComplete: (score: number, total: number) => void;
}

const questions = letterExercises.matchToWord;
const TOTAL = questions.length;

export default function LetterExplorer({ onProgress, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showEmoji, setShowEmoji] = useState(true);

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
      setShowEmoji(false);
      setTimeout(() => {
        setIndex((i) => i + 1);
        setShowEmoji(true);
      }, 100);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Word card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl shadow-xl p-8 text-center w-full max-w-xs"
        >
          {showEmoji && (
            <div className="text-7xl mb-4 select-none">{current.image}</div>
          )}
          <p className="text-4xl font-black text-gray-700 tracking-widest uppercase" dir="ltr">
            {current.word}
          </p>
          <p className="text-gray-400 font-semibold mt-2 text-sm">
            ?באיזו אות מתחילה המילה
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Letter buttons (big!) */}
      <div className="w-full max-w-xs">
        <QuizCard
          options={current.options}
          correct={current.correctLetter}
          onAnswer={handleAnswer}
        />
      </div>

      {/* Score */}
      <p className="text-gray-400 font-semibold text-sm" dir="ltr">
        ניקוד: {score} / {index}
      </p>
    </div>
  );
}
