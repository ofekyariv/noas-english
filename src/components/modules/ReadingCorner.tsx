"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { readingPassages, readAndCircle, sentenceBuilder } from "@/lib/data";
import QuizCard from "@/components/QuizCard";
import { fireSmallConfetti } from "@/lib/confetti";

interface Props {
  onProgress: (current: number, total: number) => void;
  onComplete: (score: number, total: number) => void;
}

type Phase =
  | { kind: "reading"; passageIdx: number }
  | { kind: "question"; passageIdx: number; qIdx: number }
  | { kind: "circleIntro" }
  | { kind: "circle"; qIdx: number }
  | { kind: "builderIntro" }
  | { kind: "builder"; qIdx: number }
  | { kind: "done" };

const TOTAL_QUESTIONS =
  readingPassages.reduce((a, p) => a + p.questions.length, 0) +
  readAndCircle.length +
  sentenceBuilder.length;

export default function ReadingCorner({ onProgress, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>({ kind: "reading", passageIdx: 0 });
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [quizKey, setQuizKey] = useState(0);

  // Sentence builder state
  const [builtWords, setBuiltWords] = useState<string[]>([]);
  const [available, setAvailable] = useState<string[]>([]);
  const [builderFeedback, setBuilderFeedback] = useState<"idle" | "correct" | "wrong">("idle");

  useEffect(() => {
    onProgress(answered, TOTAL_QUESTIONS);
  }, [answered, onProgress]);

  const advance = useCallback(
    (newScore: number, newAnswered: number) => {
      setScore(newScore);
      setAnswered(newAnswered);
      setQuizKey((k) => k + 1);

      setPhase((p) => {
        if (p.kind === "reading") {
          return { kind: "question", passageIdx: p.passageIdx, qIdx: 0 };
        }

        if (p.kind === "question") {
          const passage = readingPassages[p.passageIdx];
          if (p.qIdx + 1 < passage.questions.length) {
            return { kind: "question", passageIdx: p.passageIdx, qIdx: p.qIdx + 1 };
          }
          // Move to next passage or circleIntro
          if (p.passageIdx + 1 < readingPassages.length) {
            return { kind: "reading", passageIdx: p.passageIdx + 1 };
          }
          return { kind: "circleIntro" };
        }

        if (p.kind === "circleIntro") {
          return { kind: "circle", qIdx: 0 };
        }

        if (p.kind === "circle") {
          if (p.qIdx + 1 < readAndCircle.length) {
            return { kind: "circle", qIdx: p.qIdx + 1 };
          }
          return { kind: "builderIntro" };
        }

        if (p.kind === "builderIntro") {
          return { kind: "builder", qIdx: 0 };
        }

        if (p.kind === "builder") {
          if (p.qIdx + 1 < sentenceBuilder.length) {
            return { kind: "builder", qIdx: p.qIdx + 1 };
          }
          return { kind: "done" };
        }

        return p;
      });
    },
    []
  );

  // Handle done
  useEffect(() => {
    if (phase.kind === "done") {
      onComplete(score, TOTAL_QUESTIONS);
    }
  }, [phase, score, onComplete, TOTAL_QUESTIONS]);

  // Init sentence builder
  useEffect(() => {
    if (phase.kind === "builder") {
      const q = sentenceBuilder[phase.qIdx];
      const shuffled = [...q.words].sort(() => Math.random() - 0.5);
      setAvailable(shuffled);
      setBuiltWords([]);
      setBuilderFeedback("idle");
    }
  }, [phase]);

  const handleQuizAnswer = (isCorrect: boolean) => {
    const newScore = isCorrect ? score + 1 : score;
    const newAnswered = answered + 1;
    setTimeout(() => advance(newScore, newAnswered), 100);
  };

  const handleBuilderTap = (word: string, fromAvailable: boolean) => {
    if (builderFeedback !== "idle") return;
    if (fromAvailable) {
      setAvailable((prev) => {
        const i = prev.indexOf(word);
        return [...prev.slice(0, i), ...prev.slice(i + 1)];
      });
      setBuiltWords((prev) => [...prev, word]);
    } else {
      setBuiltWords((prev) => {
        const i = prev.lastIndexOf(word);
        return [...prev.slice(0, i), ...prev.slice(i + 1)];
      });
      setAvailable((prev) => [...prev, word]);
    }
  };

  const handleBuilderCheck = () => {
    if (phase.kind !== "builder") return;
    const q = sentenceBuilder[phase.qIdx];
    const built = builtWords.join(" ") + ".";
    const isCorrect = built === q.correct;
    setBuilderFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) fireSmallConfetti();
    const newScore = isCorrect ? score + 1 : score;
    const newAnswered = answered + 1;
    setTimeout(() => {
      setBuilderFeedback("idle");
      advance(newScore, newAnswered);
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <AnimatePresence mode="wait">
        {/* READING phase */}
        {phase.kind === "reading" && (
          <motion.div
            key={`reading-${phase.passageIdx}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm"
          >
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <div className="text-center mb-4">
                <span className="text-3xl">📖</span>
                <h3 className="text-xl font-black text-gray-700 mt-1">
                  {readingPassages[phase.passageIdx].title}
                </h3>
              </div>
              <div className="bg-amber-50 rounded-2xl p-4 mb-5">
                {readingPassages[phase.passageIdx].text.split("\n").map((line, i) => (
                  <p key={i} className="text-lg font-bold text-gray-700 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
              <button
                onClick={() => advance(score, answered)}
                className="w-full bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-black
                  text-lg py-3 rounded-2xl shadow-md border-b-4 border-fuchsia-700
                  active:border-b-2 active:translate-y-0.5 transition-all"
              >
                Answer Questions! 🎯
              </button>
            </div>
          </motion.div>
        )}

        {/* QUESTION phase */}
        {phase.kind === "question" && (
          <motion.div
            key={`q-${phase.passageIdx}-${phase.qIdx}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm"
          >
            <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
              <p className="text-center text-sm font-bold text-fuchsia-500 mb-2">
                📝 {readingPassages[phase.passageIdx].title}
              </p>
              <p className="text-xl font-black text-gray-700 text-center">
                {readingPassages[phase.passageIdx].questions[phase.qIdx].question}
              </p>
            </div>
            <div key={quizKey}>
              <QuizCard
                options={readingPassages[phase.passageIdx].questions[phase.qIdx].options}
                correct={readingPassages[phase.passageIdx].questions[phase.qIdx].correct}
                onAnswer={handleQuizAnswer}
              />
            </div>
          </motion.div>
        )}

        {/* CIRCLE INTRO */}
        {phase.kind === "circleIntro" && (
          <motion.div
            key="circle-intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm"
          >
            <div className="bg-gradient-to-br from-orange-400 to-pink-400 rounded-3xl p-8 text-center text-white shadow-xl">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-black mb-2">Read and Circle!</h3>
              <p className="text-white/80 font-semibold mb-6">
                Read the sentence and pick the right picture!
              </p>
              <button
                onClick={() => advance(score, answered)}
                className="bg-white text-orange-600 font-black text-lg px-8 py-3 rounded-2xl
                  shadow-md border-b-4 border-orange-200 active:border-b-2 active:translate-y-0.5 transition-all"
              >
                Let&apos;s go! 🚀
              </button>
            </div>
          </motion.div>
        )}

        {/* READ AND CIRCLE */}
        {phase.kind === "circle" && (
          <motion.div
            key={`circle-${phase.qIdx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm"
          >
            <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
              <p className="text-xl font-black text-gray-700 text-center">
                {readAndCircle[phase.qIdx].sentence}
              </p>
            </div>
            {/* Emoji options */}
            <div className="grid grid-cols-3 gap-3" key={quizKey}>
              {readAndCircle[phase.qIdx].options.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => {
                    const isCorrect = opt === readAndCircle[phase.qIdx].correct;
                    if (isCorrect) fireSmallConfetti();
                    const newScore = isCorrect ? score + 1 : score;
                    const newAnswered = answered + 1;
                    setTimeout(() => advance(newScore, newAnswered), 900);
                  }}
                  className="bg-white rounded-2xl shadow-md p-4 text-5xl text-center
                    border-4 border-transparent hover:border-fuchsia-300
                    active:scale-95 transition-all"
                >
                  <div>{readAndCircle[phase.qIdx].emojis[i]}</div>
                  <p className="text-xs font-bold text-gray-500 mt-2">{opt}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* BUILDER INTRO */}
        {phase.kind === "builderIntro" && (
          <motion.div
            key="builder-intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm"
          >
            <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl p-8 text-center text-white shadow-xl">
              <div className="text-6xl mb-4">🧩</div>
              <h3 className="text-2xl font-black mb-2">Sentence Builder!</h3>
              <p className="text-white/80 font-semibold mb-6">
                Tap the words in the right order to make a sentence!
              </p>
              <button
                onClick={() => advance(score, answered)}
                className="bg-white text-blue-600 font-black text-lg px-8 py-3 rounded-2xl
                  shadow-md border-b-4 border-blue-200 active:border-b-2 active:translate-y-0.5 transition-all"
              >
                Let&apos;s build! 🔨
              </button>
            </div>
          </motion.div>
        )}

        {/* SENTENCE BUILDER */}
        {phase.kind === "builder" && (
          <motion.div
            key={`builder-${phase.qIdx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm"
          >
            <p className="text-center text-sm font-bold text-gray-400 mb-2">
              🧩 Put the words in order:
            </p>

            {/* Answer area */}
            <div
              className={`bg-white rounded-2xl shadow-md min-h-[64px] p-3 mb-4 flex flex-wrap gap-2 items-center border-4 transition-colors
                ${builderFeedback === "correct" ? "border-green-400 bg-green-50" : ""}
                ${builderFeedback === "wrong" ? "border-red-400 bg-red-50" : ""}
                ${builderFeedback === "idle" ? "border-blue-200" : ""}
              `}
            >
              {builtWords.length === 0 ? (
                <p className="text-gray-300 font-semibold text-sm">
                  Tap words below to build the sentence...
                </p>
              ) : (
                builtWords.map((w, i) => (
                  <button
                    key={`built-${i}`}
                    onClick={() => handleBuilderTap(w, false)}
                    className="bg-blue-100 text-blue-700 font-black px-3 py-1.5 rounded-xl
                      text-base hover:bg-blue-200 active:scale-95 transition-all"
                  >
                    {w}
                  </button>
                ))
              )}
            </div>

            {/* Available words */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {available.map((w, i) => (
                <button
                  key={`avail-${i}-${w}`}
                  onClick={() => handleBuilderTap(w, true)}
                  className="bg-indigo-500 hover:bg-indigo-400 text-white font-black px-4 py-2
                    rounded-2xl shadow-md border-b-4 border-indigo-700
                    active:border-b-2 active:translate-y-0.5 active:scale-95 transition-all text-base"
                >
                  {w}
                </button>
              ))}
            </div>

            {/* Check button */}
            <button
              onClick={handleBuilderCheck}
              disabled={builtWords.length === 0 || builderFeedback !== "idle"}
              className="w-full bg-green-500 disabled:bg-gray-300 hover:bg-green-400
                text-white font-black text-lg py-3 rounded-2xl shadow-md
                border-b-4 border-green-700 disabled:border-gray-400
                active:border-b-2 active:translate-y-0.5 transition-all"
            >
              {builderFeedback === "correct"
                ? "✅ Correct!"
                : builderFeedback === "wrong"
                ? "❌ Try again..."
                : "Check! ✅"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-gray-400 font-semibold text-sm">
        Score: {score} / {answered}
      </p>
    </div>
  );
}
