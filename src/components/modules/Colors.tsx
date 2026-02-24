"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colorExercises } from "@/lib/data";
import QuizCard from "@/components/QuizCard";

interface Props {
  onProgress: (current: number, total: number) => void;
  onComplete: (score: number, total: number) => void;
}

const questions = colorExercises.popsicleQuiz;
const TOTAL = questions.length;

// Popsicle SVG component
function Popsicle({ color }: { color: string }) {
  return (
    <svg width="120" height="160" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* stick */}
      <rect x="52" y="110" width="16" height="50" rx="8" fill="#D2A679" />
      {/* popsicle body */}
      <rect x="10" y="10" width="100" height="110" rx="50" fill={color} />
      {/* shine */}
      <ellipse cx="35" cy="40" rx="12" ry="22" fill="white" opacity="0.3" />
    </svg>
  );
}

export default function Colors({ onProgress, onComplete }: Props) {
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
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-white rounded-3xl shadow-xl p-8 text-center w-full max-w-xs"
        >
          <div className="flex justify-center mb-4">
            <Popsicle color={current.color} />
          </div>
          <p className="text-gray-500 font-semibold text-sm">
            ?איזה צבע יש לגלידה 🍦
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

      <p className="text-gray-400 font-semibold text-sm" dir="ltr">
        ניקוד: {score} / {index}
      </p>
    </div>
  );
}
