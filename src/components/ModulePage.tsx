"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { modules } from "@/lib/data";
import { saveModuleProgress } from "@/lib/progress";
import { fireBigConfetti } from "@/lib/confetti";

// Module components
import LetterExplorer from "@/components/modules/LetterExplorer";
import WordBuilder from "@/components/modules/WordBuilder";
import MagicE from "@/components/modules/MagicE";
import SoundPairs from "@/components/modules/SoundPairs";
import Colors from "@/components/modules/Colors";
import Numbers from "@/components/modules/Numbers";
import Pronouns from "@/components/modules/Pronouns";
import AmIsAre from "@/components/modules/AmIsAre";
import Prepositions from "@/components/modules/Prepositions";
import ReadingCorner from "@/components/modules/ReadingCorner";

function getStars(score: number, total: number): number {
  if (total === 0) return 1;
  const pct = score / total;
  if (pct >= 0.85) return 3;
  if (pct >= 0.55) return 2;
  return 1;
}

interface ModuleProps {
  onProgress: (current: number, total: number) => void;
  onComplete: (score: number, total: number) => void;
}

function getModuleComponent(
  moduleId: string,
  props: ModuleProps
): React.ReactNode {
  switch (moduleId) {
    case "letters":
      return <LetterExplorer {...props} />;
    case "cvc":
      return <WordBuilder {...props} />;
    case "magic-e":
      return <MagicE {...props} />;
    case "digraphs":
      return <SoundPairs {...props} />;
    case "colors":
      return <Colors {...props} />;
    case "numbers":
      return <Numbers {...props} />;
    case "pronouns":
      return <Pronouns {...props} />;
    case "am-is-are":
      return <AmIsAre {...props} />;
    case "prepositions":
      return <Prepositions {...props} />;
    case "reading":
      return <ReadingCorner {...props} />;
    default:
      return null;
  }
}

export default function ModulePageClient({
  moduleId,
}: {
  moduleId: string;
}) {
  const module = modules.find((m) => m.id === moduleId);

  const [phase, setPhase] = useState<"exercise" | "results">("exercise");
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [finalScore, setFinalScore] = useState({ score: 0, total: 0 });
  const [confettiFired, setConfettiFired] = useState(false);

  const handleProgress = useCallback((current: number, total: number) => {
    setProgress({ current, total });
  }, []);

  const handleComplete = useCallback(
    (score: number, total: number) => {
      const stars = getStars(score, total);
      saveModuleProgress(moduleId, {
        completed: total,
        total,
        score,
        stars,
      });
      setFinalScore({ score, total });
      setPhase("results");
    },
    [moduleId]
  );

  // Fire confetti when results appear
  useEffect(() => {
    if (phase === "results" && !confettiFired) {
      setConfettiFired(true);
      fireBigConfetti();
    }
  }, [phase, confettiFired]);

  if (!module) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🤔</div>
        <h2 className="text-2xl font-black text-gray-700 mb-4">
          Module not found!
        </h2>
        <Link
          href="/"
          className="bg-purple-500 text-white font-black px-6 py-3 rounded-2xl"
        >
          Back Home
        </Link>
      </div>
    );
  }

  const stars = getStars(finalScore.score, finalScore.total);
  const progressPct =
    progress.total > 0 ? (progress.current / progress.total) * 100 : 0;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/"
          className="bg-white rounded-full p-2 shadow-md text-gray-600 hover:bg-gray-50
            active:bg-gray-100 transition-colors text-xl flex-shrink-0"
        >
          ←
        </Link>
        <div className="flex-1 min-w-0">
          <h2 className="font-black text-gray-700 text-xl leading-tight">
            {module.emoji} {module.title}
          </h2>
          <p className="text-gray-400 text-xs font-semibold" dir="rtl">
            {module.titleHe}
          </p>
        </div>
        {progress.total > 0 && phase === "exercise" && (
          <div className="text-right text-sm font-black text-gray-500 flex-shrink-0">
            {progress.current}/{progress.total}
          </div>
        )}
      </div>

      {/* Progress bar */}
      {progress.total > 0 && phase === "exercise" && (
        <div className="bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${module.color} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {phase === "exercise" ? (
          <motion.div
            key="exercise"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {getModuleComponent(moduleId, {
              onProgress: handleProgress,
              onComplete: handleComplete,
            })}
          </motion.div>
        ) : (
          /* RESULTS SCREEN */
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="text-center"
          >
            <div
              className={`bg-gradient-to-br ${module.color} rounded-3xl p-8 shadow-xl text-white mb-6`}
            >
              {/* Stars */}
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3].map((s) => (
                  <motion.span
                    key={s}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.3 + s * 0.15,
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                    }}
                    className={`text-5xl ${
                      stars >= s ? "opacity-100" : "opacity-25"
                    }`}
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-5xl mb-3">
                  {stars === 3 ? "🏆" : stars === 2 ? "🎉" : "💪"}
                </p>
                <h3 className="text-3xl font-black mb-2">
                  {stars === 3
                    ? "Amazing!"
                    : stars === 2
                    ? "Great job!"
                    : "Keep going!"}
                </h3>
                <p className="text-white/80 font-semibold text-lg">
                  {finalScore.score} out of {finalScore.total} correct
                </p>

                {/* Hebrew encouragement */}
                <p className="text-white/70 text-sm font-semibold mt-2" dir="rtl">
                  {stars === 3
                    ? "מדהים! כל הכבוד נועה! 🌟"
                    : stars === 2
                    ? "כל הכבוד! עבודה טובה! 👍"
                    : "!בסדר, תמשיכי לנסות 💕"}
                </p>
              </motion.div>
            </div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="flex flex-col gap-3"
            >
              <button
                onClick={() => {
                  setPhase("exercise");
                  setProgress({ current: 0, total: 0 });
                  setConfettiFired(false);
                }}
                className={`bg-gradient-to-r ${module.color} text-white font-black text-xl
                  py-4 rounded-2xl shadow-lg border-b-4 border-white/20
                  active:border-b-2 active:translate-y-0.5 transition-all`}
              >
                Try Again! 🔄
              </button>
              <Link
                href="/"
                className="bg-white text-gray-700 font-black text-xl py-4 rounded-2xl shadow-md
                  border-b-4 border-gray-200 active:border-b-2 active:translate-y-0.5
                  transition-all block"
              >
                🏠 Back to Home
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
