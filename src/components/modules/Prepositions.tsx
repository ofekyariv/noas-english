"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { prepositionExercises, thereIsAreExercises, type PrepExercise } from "@/lib/data";
import QuizCard from "@/components/QuizCard";

interface Props {
  onProgress: (current: number, total: number) => void;
  onComplete: (score: number, total: number) => void;
}

const PREP_OPTIONS = ["in", "on", "under"];
const THERE_OPTIONS = ["is", "are"];

const TOTAL = prepositionExercises.length + thereIsAreExercises.length;

type Phase = "prepositions" | "thereIsAre";

/** Visual scene showing spatial relationship */
function PrepScene({ exercise }: { exercise: PrepExercise }) {
  const { correct, subject, object, objectEmoji } = exercise;

  // Table: represented as a flat rectangle. We use inline CSS boxes.
  const surfaceLabel = object.charAt(0).toUpperCase() + object.slice(1);

  if (correct === "on") {
    return (
      <div className="flex flex-col items-center gap-0 my-4 select-none" dir="ltr">
        {/* Subject sits on top */}
        <div className="text-5xl leading-none mb-1">{subject}</div>
        {/* Surface */}
        <div className="relative">
          <div
            className="bg-amber-700 rounded-t-sm"
            style={{ width: 140, height: 12 }}
          />
          <div
            className="bg-amber-800 rounded-b-sm mx-auto"
            style={{ width: 100, height: 40 }}
          />
        </div>
        <div className="text-xs text-gray-400 font-semibold mt-1">{objectEmoji} {surfaceLabel}</div>
      </div>
    );
  }

  if (correct === "under") {
    return (
      <div className="flex flex-col items-center gap-0 my-4 select-none" dir="ltr">
        {/* Surface (furniture) */}
        <div className="relative">
          <div
            className="bg-amber-700 rounded-t-sm"
            style={{ width: 140, height: 12 }}
          />
          <div
            className="bg-amber-800 rounded-b-sm mx-auto"
            style={{ width: 100, height: 40 }}
          />
        </div>
        {/* Subject sits underneath */}
        <div className="text-5xl leading-none mt-1">{subject}</div>
        <div className="text-xs text-gray-400 font-semibold mt-1">{objectEmoji} {surfaceLabel}</div>
      </div>
    );
  }

  // in
  return (
    <div className="flex flex-col items-center my-4 select-none" dir="ltr">
      <div
        className="relative flex items-center justify-center rounded-2xl border-4 border-amber-700 bg-amber-50"
        style={{ width: 120, height: 100 }}
      >
        <div className="text-5xl">{subject}</div>
        {/* small opening hint at top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-3 bg-white" />
      </div>
      <div className="text-xs text-gray-400 font-semibold mt-1">{objectEmoji} {surfaceLabel}</div>
    </div>
  );
}

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
                📦 ?איפה זה
              </span>
            </div>

            <div className="bg-white rounded-3xl shadow-xl px-6 pt-4 pb-6 text-center mb-4">
              {/* Visual scene illustration */}
              <PrepScene exercise={currentPrep} />

              {/* Sentence with blank */}
              <p className="text-xl font-black text-gray-700 leading-loose" dir="ltr">
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
              <p className="text-xl font-black text-gray-700 leading-loose" dir="ltr">
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

      <p className="text-gray-400 font-semibold text-sm" dir="ltr">
        ניקוד: {score} / {globalIdx}
      </p>
    </div>
  );
}
