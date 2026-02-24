"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { modules } from "@/lib/data";
import { getProgress, ModuleProgress } from "@/lib/progress";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function HomePage() {
  const [progress, setProgress] = useState<Record<string, ModuleProgress>>({});

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  return (
    <div>
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="text-6xl mb-3">👋</div>
        <h2 className="text-3xl font-black text-purple-700 mb-1">
          שלום, נועה!
        </h2>
        <p className="text-gray-500 font-semibold text-lg">
          בחרי שיעור כדי להתחיל! 📚
        </p>
      </motion.div>

      {/* Module grid */}
      <motion.div
        className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {modules.map((mod) => {
          const prog = progress[mod.id];
          const stars = prog?.stars ?? 0;

          return (
            <motion.div key={mod.id} variants={card}>
              <Link href={`/modules/${mod.id}`} className="block group">
                <div
                  className={`bg-gradient-to-br ${mod.color} rounded-2xl p-4 shadow-lg
                    transition-transform duration-150 group-active:scale-95 group-hover:scale-[1.03]`}
                >
                  {/* Completed badge */}
                  {stars === 3 && (
                    <div className="flex justify-end mb-1">
                      <span className="bg-white/30 text-white text-xs font-black px-2 py-0.5 rounded-full">
                        ✓ סיימתי!
                      </span>
                    </div>
                  )}

                  <div className="text-4xl mb-2 drop-shadow-sm">{mod.emoji}</div>
                  <h3 className="text-white font-black text-base leading-tight drop-shadow-sm" dir="ltr">
                    {mod.title}
                  </h3>
                  <p className="text-white/80 text-xs font-semibold mt-0.5">
                    {mod.titleHe}
                  </p>

                  {/* Stars progress */}
                  <div className="mt-3">
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map((s) => (
                        <span
                          key={s}
                          className={`text-lg ${
                            stars >= s ? "opacity-100" : "opacity-25"
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer encouragement */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center text-gray-400 font-semibold text-sm mt-10"
      >
        את יכולה, נועה! 💪✨
      </motion.p>
    </div>
  );
}
