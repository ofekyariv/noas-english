"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { beVerbExercises } from "@/lib/data";
import QuizCard from "@/components/QuizCard";

interface Props {
  onProgress: (current: number, total: number) => void;
  onComplete: (score: number, total: number) => void;
}

const questions = beVerbExercises;
const TOTAL = questions.length;
const OPTIONS = ["am", "is", "are"];

// Color coding: am=blue, is=green, are=purple
const VERB_COLORS: Record<string, string> = {
  am: "bg-blue-100 text-blue-600 border-blue-300",
  is: "bg-green-100 text-green-600 border-green-300",
  are: "bg-purple-100 text-purple-600 border-purple-300",
};

function SentenceDisplay({ sentence, answered, correct }: {
  sentence: string;
  answered: boolean;
  correct: string;
}) {
  const parts = sentence.split("___");
  return (
    <p className="text-2xl font-black text-gray-700 text-center leading-loose" dir="ltr">
      {parts[0]}
      {answered ? (
        <span className={`inline-block mx-1 px-3 py-1 rounded-xl border-2 ${VERB_COLORS[correct]}`}>
          {correct}
        </span>
      ) : (
        <span className="inline-block mx-1 px-4 py-1 rounded-xl border-b-4 border-dashed border-gray-300 text-gray-300 font-black">
          ___
        </span>
      )}
      {parts[1]}
    </p>
  );
}

export default function AmIsAre({ onProgress, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [key, setKey] = useState(0);
  const [lastAnswered, setLastAnswered] = useState(false);

  useEffect(() => {
    onProgress(index, TOTAL);
  }, [index, onProgress]);

  const current = questions[index];

  const handleAnswer = (isCorrect: boolean) => {
    setLastAnswered(true);
    const newScore = isCorrect ? score + 1 : score;
    setTimeout(() => {
      setLastAnswered(false);
      if (index + 1 >= TOTAL) {
        onComplete(newScore, TOTAL);
      } else {
        setScore(newScore);
        setIndex((i) => i + 1);
        setKey((k) => k + 1);
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Legend */}
      <div className="flex gap-3 justify-center flex-wrap">
        {OPTIONS.map((v) => (
          <span
            key={v}
            className={`px-3 py-1 rounded-full text-sm font-black border-2 ${VERB_COLORS[v]}`}
          >
            {v}
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-3xl shadow-xl p-8 text-center w-full max-w-sm"
        >
          {/* Subject hint */}
          <p className="text-sm font-bold text-gray-400 mb-3" dir="ltr">
            נושא: <span className="text-gray-600">{current.subject}</span>
          </p>

          <SentenceDisplay
            sentence={current.sentence}
            answered={lastAnswered}
            correct={current.correct}
          />
        </motion.div>
      </AnimatePresence>

      <div className="w-full max-w-xs" key={key}>
        <QuizCard
          options={OPTIONS}
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
