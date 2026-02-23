"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { prepositionExercises, thereIsAreExercises } from "@/lib/data";
import QuizCard from "@/components/QuizCard";

interface Props {
  onProgress: (current: number, total: number) => void;
  onComplete: (score: number, total: number) => void;
}

const PREP_OPTIONS = ["in", "on", "under"];
const THERE_OPTIONS = ["is", "are"];

const TOTAL = prepositionExercises.length + thereIsAreExercises.length;

type Phase = "prepositions" | "thereIsAre";

export default function Prepositions({ onProgress, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("prepositions");
  const [prepIdx, setPrepIdx] = useState(0);
  const [thereIdx, setThereIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [key, setKey] = useState(0);
  const [globalIdx, setGlobalIdx] = useState(0);

  useEffect(() => {
    onProgress(globalIdx, TOTAL);
  }, [globalIdx, onProgress]);

  const handlePrepAnswer = (isCorrect: boolean) => {
    const newScore = isCorrect ? score + 1 : score;
    const newGlobal = globalIdx + 1;
    if (prepIdx + 1 >= prepositionExercises.length) {
      setScore(newScore);
      setGlobalIdx(newGlobal);
      setTimeout(() => {
        setPhase("thereIsAre");
        setKey((k) => k + 1);
      }, 100);
    } else {
      setScore(newScore);
      setGlobalIdx(newGlobal);
      setTimeout(() => {
        setPrepIdx((i) => i + 1);
        setKey((k) => k + 1);
      }, 100);
    }
  };

  const handleThereAnswer = (isCorrect: boolean) => {
    const newScore = isCorrect ? score + 1 : score;
    const newGlobal = globalIdx + 1;
    if (thereIdx + 1 >= thereIsAreExercises.length) {
      onComplete(newScore, TOTAL);
    } else {
      setScore(newScore);
      setGlobalIdx(newGlobal);
      setTimeout(() => {
        setThereIdx((i) => i + 1);
        setKey((k) => k + 1);
      }, 100);
    }
  };

  const currentPrep = prepositionExercises[prepIdx];
  const currentThere = thereIsAreExercises[thereIdx];

  return (
    <div className="flex flex-col items-center gap-6">
      <AnimatePresence mode="wait">
        {phase === "prepositions" && (
          <motion.div
            key={`prep-${prepIdx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm"
          >
            {/* Phase label */}
            <div className="text-center mb-3">
              <span className="bg-lime-100 text-lime-700 font-black px-4 py-1 rounded-full text-sm">
                📦 Where is it?
              </span>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 text-center mb-4">
              <div className="text-6xl mb-4">{currentPrep.emoji}</div>
              <p className="text-xl font-black text-gray-700 leading-loose">
                {currentPrep.sentence.split("___").map((part, i) => (
                  <span key={i}>
                    {part}
                    {i === 0 && (
                      <span className="inline-block mx-2 px-4 py-1 rounded-xl border-b-4 border-dashed border-lime-400 text-lime-400">
                        ___
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </div>

            <div key={key}>
              <QuizCard
                options={PREP_OPTIONS}
                correct={currentPrep.correct}
                onAnswer={handlePrepAnswer}
              />
            </div>
          </motion.div>
        )}

        {phase === "thereIsAre" && (
          <motion.div
            key={`there-${thereIdx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm"
          >
            {/* Phase label */}
            <div className="text-center mb-3">
              <span className="bg-sky-100 text-sky-700 font-black px-4 py-1 rounded-full text-sm">
                🏠 There is / There are
              </span>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 text-center mb-4">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-xl font-black text-gray-700 leading-loose">
                {currentThere.sentence.split("___").map((part, i) => (
                  <span key={i}>
                    {part}
                    {i === 0 && (
                      <span className="inline-block mx-2 px-4 py-1 rounded-xl border-b-4 border-dashed border-sky-400 text-sky-400">
                        ___
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </div>

            <div key={`there-card-${key}`}>
              <QuizCard
                options={THERE_OPTIONS}
                correct={currentThere.correct}
                onAnswer={handleThereAnswer}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-gray-400 font-semibold text-sm">
        Score: {score} / {globalIdx}
      </p>
    </div>
  );
}
