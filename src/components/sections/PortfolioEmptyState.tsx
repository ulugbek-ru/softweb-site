"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Plus, Sparkles, ArrowRight, Layers, Layout, Monitor } from "lucide-react";

interface PortfolioEmptyStateProps {
  onStartProject?: () => void;
}

export const PortfolioEmptyState: React.FC<PortfolioEmptyStateProps> = ({
  onStartProject,
}) => {
  const handleAction = () => {
    if (onStartProject) {
      onStartProject();
    } else {
      const el = document.getElementById("calculator");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-brand-indigo/15 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="05"
          badge="Featured Works"
          title={
            <>
              Selected Work // <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-indigo-400 to-brand-purple">
                Next In Line.
              </span>
            </>
          }
          subtitle="We believe in radical authenticity. Rather than displaying fabricated case studies, we invite you to claim the spotlight."
        />

        {/* Bespoke Interactive Showcase Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-surface-100/80 via-surface-200/50 to-surface-300/80 border border-white/15 p-8 sm:p-14 lg:p-16 text-center shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Subtle Grid Inside Frame */}
          <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

          {/* Floating Aesthetic Plus Marks */}
          <div className="absolute top-6 left-6 text-zinc-600 font-mono text-xs flex items-center gap-1">
            <Plus className="w-4 h-4 text-brand-blue" />
            <span>FRAME_01 // FLAGSHIP_SLOT</span>
          </div>

          <div className="absolute top-6 right-6 text-zinc-600 font-mono text-xs flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-zinc-400">READY FOR PRODUCTION</span>
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto my-6 sm:my-10">
            {/* Center Visual Mockup Blueprint Icon */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-surface-100 border border-brand-indigo/40 flex items-center justify-center text-brand-blue shadow-[0_0_40px_rgba(99,102,241,0.25)] mb-8"
            >
              <Monitor className="w-10 h-10 text-brand-blue" />
            </motion.div>

            {/* Giant Headline */}
            <h3 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
              YOUR PROJECT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-indigo-400 to-brand-purple">
                COULD BE HERE.
              </span>
            </h3>

            {/* Description */}
            <p className="text-zinc-300 text-base sm:text-lg font-light leading-relaxed mb-10 max-w-xl">
              SoftWeb is currently engineering its next collection of flagship digital experiences. Partner with us and become our premier featured showcase.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                variant="primary"
                className="w-full sm:w-auto shadow-[0_0_35px_rgba(99,102,241,0.5)]"
                rightIcon={<Sparkles className="w-4 h-4" />}
                onClick={handleAction}
              >
                Start Your Project
              </Button>

              <button
                onClick={() => {
                  const el = document.getElementById("calculator");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white px-5 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
              >
                <Layers className="w-4 h-4 text-brand-blue" />
                <span>Calculate Your Scope</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom Blueprint Details Bar */}
          <div className="relative z-10 pt-8 mt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left font-mono text-xs text-zinc-400">
            <div className="p-3 rounded-xl bg-surface-200/50 border border-white/5">
              <div className="text-zinc-500 text-[10px]">SLOT STATUS</div>
              <div className="text-white font-semibold">Priority Engineering Queue</div>
            </div>
            <div className="p-3 rounded-xl bg-surface-200/50 border border-white/5">
              <div className="text-zinc-500 text-[10px]">DELIVERY SPEED</div>
              <div className="text-brand-blue font-semibold">2 – 4 Weeks Average</div>
            </div>
            <div className="p-3 rounded-xl bg-surface-200/50 border border-white/5">
              <div className="text-zinc-500 text-[10px]">GUARANTEE</div>
              <div className="text-emerald-400 font-semibold">100% Bespoke Codebase</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
