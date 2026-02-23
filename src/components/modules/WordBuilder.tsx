"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cvcWords } from "@/lib/data";
import QuizCard from "@/components/QuizCard";

interface Props {
  onProgress: (current: number, total: number) => void;
  onComplete: (score: number, total: number) => void;
}

interface CvcItem {
  word: string;
  vowel: string;
  blanked: string;
}

const VOWELS = ["a", "e", "i", "o", "u"];

function buildWordList(): CvcItem[] {
  const entries = Object.entries(cvcWords) as [string, string[]][]; // [vowel, words[]]
  // Interleave: take one from each vowel group in rotation
  const maxLen = Math.max(...entries.map(([, words]) => words.length));
  const result: CvcItem[] = [];
  for (let i = 0; i < maxLen; i++) {
    for (const [vowel, words] of entries) {
      if (i < words.length) {
        const word = words[i];
        // Find the vowel position (should be index 1 for CVC, but let's find it)
        const vowelIdx = word.split("").findIndex((ch) => VOWELS.includes(ch));
        const blanked =
          vowelIdx >= 0
            ? word.slice(0, vowelIdx) + "_" + word.slice(vowelIdx + 1)
            : word;
        result.push({ word, vowel, blanked });
      }
    }
  }
  return result;
}

const WORD_EMOJIS: Record<string, string> = {
  mat: "🛏️", sat: "🪑", cat: "🐱", bat: "🦇",
  pen: "✏️", hen: "🐔", ten: "🔟", men: "👨", red: "🔴", bed: "🛏️",
  pig: "🐷", wig: "👩", fin: "🐟", fit: "💪", hit: "👊",
  box: "📦", fox: "🦊", mop: "🧹", top: "🌀", pop: "🎈",
  bug: "🐛", hug: "🤗", rug: "🪣", bus: "🚌", sun: "☀️",
};

export default function WordBuilder({ onProgress, onComplete }: Props) {
  const words = useMemo(() => buildWordList(), []);
  const TOTAL = words.length;
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    onProgress(index, TOTAL);
  }, [index, TOTAL, onProgress]);

  const current = words[index];

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
      {/* Word display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white rounded-3xl shadow-xl p-8 text-center w-full max-w-xs"
        >
          <div className="text-6xl mb-3">{WORD_EMOJIS[current.word] || "📝"}</div>
          {/* Blanked word */}
          <div className="flex justify-center items-end gap-1 mb-2">
            {current.word.split("").map((ch, i) => {
              const isVowel = VOWELS.includes(ch);
              return (
                <div key={i} className="flex flex-col items-center">
                  <span
                    className={`text-4xl font-black ${
                      isVowel
                        ? "text-transparent border-b-4 border-purple-400 px-1"
                        : "text-gray-700"
                    }`}
                  >
                    {isVowel ? "\u00a0\u00a0" : ch}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-purple-500 font-black text-2xl tracking-[0.3em] mt-1">
            {current.blanked}
          </p>
          <p className="text-gray-400 font-semibold mt-3 text-sm">
            Which vowel fills the blank?
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Vowel buttons */}
      <div className="w-full max-w-xs" key={key}>
        <QuizCard
          options={VOWELS}
          correct={current.vowel}
          onAnswer={handleAnswer}
        />
      </div>

      <p className="text-gray-400 font-semibold text-sm">
        Score: {score} / {index}
      </p>
    </div>
  );
}
