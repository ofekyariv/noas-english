"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { digraphs } from "@/lib/data";
import QuizCard from "@/components/QuizCard";

interface Props {
  onProgress: (current: number, total: number) => void;
  onComplete: (score: number, total: number) => void;
}

type Phase = "intro" | "quiz" | "eeCards" | "done";

const DIGRAPH_OPTIONS = ["ch", "sh", "th", "ph"];
const TOTAL_QUIZ = digraphs.basic.length; // 4 quiz questions
const TOTAL = TOTAL_QUIZ; // tracked questions

export default function SoundPairs({ onProgress, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [introIdx, setIntroIdx] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [eeIdx, setEeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (phase === "quiz") onProgress(quizIdx, TOTAL);
  }, [phase, quizIdx, onProgress]);

  const handleIntroContinue = () => {
    if (introIdx + 1 < digraphs.basic.length) {
      setIntroIdx((i) => i + 1);
    } else {
      setPhase("quiz");
    }
  };

  const handleQuizAnswer = (isCorrect: boolean) => {
    const newScore = isCorrect ? score + 1 : score;
    if (quizIdx + 1 >= TOTAL_QUIZ) {
      setScore(newScore);
      setPhase("eeCards");
    } else {
      setScore(newScore);
      setTimeout(() => {
        setQuizIdx((i) => i + 1);
        setKey((k) => k + 1);
      }, 100);
    }
  };

  const handleEeContinue = () => {
    if (eeIdx + 1 < digraphs.ee.length) {
      setEeIdx((i) => i + 1);
    } else {
      onComplete(score, TOTAL);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <AnimatePresence mode="wait">
        {/* INTRO: digraph cards */}
        {phase === "intro" && (
          <motion.div
            key={`intro-${introIdx}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="w-full max-w-xs"
          >
            <div className="bg-gradient-to-br from-teal-400 to-cyan-500 rounded-3xl shadow-xl p-8 text-center text-white">
              <p className="text-sm font-bold opacity-80 mb-2" dir="ltr">
                צמד {introIdx + 1} מתוך {digraphs.basic.length}
              </p>
              <div className="bg-white/20 rounded-2xl px-6 py-3 mb-4 inline-block" dir="ltr">
                <span className="text-6xl font-black tracking-widest">
                  {digraphs.basic[introIdx].digraph.toUpperCase()}
                </span>
              </div>
              <div className="text-7xl mb-3">
                {digraphs.basic[introIdx].emoji}
              </div>
              <p className="text-3xl font-black mb-1" dir="ltr">
                {digraphs.basic[introIdx].word}
              </p>
              <p className="text-sm opacity-75 mb-6">
                שתי אותיות עושות צליל אחד:{" "}
                <span dir="ltr">&ldquo;{digraphs.basic[introIdx].digraph}&rdquo;</span>
              </p>
              <button
                onClick={handleIntroContinue}
                className="bg-white text-teal-600 font-black text-lg px-8 py-3 rounded-2xl
                  shadow-md border-b-4 border-teal-200 active:border-b-2 active:translate-y-0.5
                  transition-all"
              >
                {introIdx + 1 < digraphs.basic.length ? "הבא ➡️" : "!בואי נבחן 🎯"}
              </button>
            </div>
          </motion.div>
        )}

        {/* QUIZ: which digraph? */}
        {phase === "quiz" && (
          <motion.div
            key={`quiz-${quizIdx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-xs"
          >
            <div className="bg-white rounded-3xl shadow-xl p-6 text-center mb-4">
              <div className="text-6xl mb-3">
                {digraphs.basic[quizIdx].emoji}
              </div>
              <p className="text-4xl font-black text-gray-700 mb-2" dir="ltr">
                {digraphs.basic[quizIdx].word}
              </p>
              <p className="text-gray-500 font-semibold text-sm">
                ?איזה צמד צלילים נמצא במילה
              </p>
            </div>

            <div key={key}>
              <QuizCard
                options={DIGRAPH_OPTIONS}
                correct={digraphs.basic[quizIdx].digraph}
                onAnswer={handleQuizAnswer}
              />
            </div>
            <p className="text-center text-gray-400 font-semibold text-sm mt-4" dir="ltr">
              ניקוד: {score} / {quizIdx}
            </p>
          </motion.div>
        )}

        {/* EE CARDS */}
        {phase === "eeCards" && (
          <motion.div
            key={`ee-${eeIdx}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-xs"
          >
            <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl shadow-xl p-8 text-center text-white mb-4">
              <p className="text-sm font-bold opacity-80 mb-1">
                🎵 הצליל &ldquo;EE&rdquo;!
              </p>
              <div className="bg-white/20 rounded-2xl px-4 py-2 mb-4 inline-block" dir="ltr">
                <span className="text-4xl font-black">ee</span>
              </div>
              <div className="text-7xl mb-3">{digraphs.ee[eeIdx].emoji}</div>
              <p className="text-4xl font-black mb-1" dir="ltr">{digraphs.ee[eeIdx].word}</p>
              <p className="text-sm opacity-75 mb-6">
                ?שומעים את הצליל ee? 👂
              </p>
              <button
                onClick={handleEeContinue}
                className="bg-white text-orange-600 font-black text-lg px-8 py-3 rounded-2xl
                  shadow-md border-b-4 border-orange-200 active:border-b-2 active:translate-y-0.5
                  transition-all"
              >
                {eeIdx + 1 < digraphs.ee.length ? "הבא ➡️" : "סיום! 🎉"}
              </button>
            </div>
            <p className="text-center text-gray-400 font-semibold text-sm" dir="ltr">
              {eeIdx + 1} / {digraphs.ee.length} מילות ee
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
