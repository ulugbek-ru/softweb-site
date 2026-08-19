"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            onComplete?.();
          }, 300);
          return 100;
        }
        // Smooth random stepping
        const increment = Math.floor(Math.random() * 12) + 6;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07080c] overflow-hidden"
        >
          {/* Ambient Glow in background */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-brand-indigo/15 blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6">
            {/* Top Tag */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                Digital Engineering Studio
              </span>
            </motion.div>

            {/* Brand Logo & Typography */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue via-brand-indigo to-brand-purple flex items-center justify-center shadow-glow-sm">
                <span className="font-display font-black text-xl text-white">S</span>
              </div>
              <span className="font-display text-3xl font-extrabold tracking-tight text-white">
                SOFT<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">WEB</span>
              </span>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-full bg-surface-100/80 rounded-full h-1.5 overflow-hidden border border-white/10 p-[1px] mb-4">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-purple"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Counter & Status */}
            <div className="w-full flex items-center justify-between font-mono text-xs text-zinc-400">
              <span>INITIALIZING SYSTEM</span>
              <span className="text-brand-blue font-bold tabular-nums">{progress}%</span>
            </div>
          </div>

          {/* Grid lines background */}
          <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
