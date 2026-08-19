"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Plus, Sparkles, ArrowRight, Monitor, Layers } from "lucide-react";
import { Dictionary } from "@/lib/i18n";

interface PortfolioEmptyStateProps {
  dict: Dictionary;
  onStartProject?: () => void;
}

export const PortfolioEmptyState: React.FC<PortfolioEmptyStateProps> = ({
  dict,
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-brand-green/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="05"
          badge={dict.portfolio.badge}
          title={
            <>
              {dict.portfolio.title} // <br />
              <span className="text-brand-orange">
                {dict.portfolio.titleAccent}
              </span>
            </>
          }
          subtitle={dict.portfolio.subtitle}
        />

        {/* Bespoke Interactive Showcase Frame */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto rounded-3xl dark:bg-surface-dark-100/90 bg-white border dark:border-white/15 border-slate-200 p-8 sm:p-14 lg:p-16 text-center shadow-2xl overflow-hidden"
        >
          {/* Subtle Grid Inside Frame */}
          <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

          {/* Top Frame Status Labels */}
          <div className="absolute top-6 left-6 dark:text-zinc-500 text-slate-500 font-mono text-xs flex items-center gap-1 font-bold">
            <Plus className="w-4 h-4 text-brand-green" />
            <span>FLAGSHIP_SLOT_01</span>
          </div>

          <div className="absolute top-6 right-6 font-mono text-xs flex items-center gap-1 font-bold">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
            <span className="text-brand-green">READY FOR PRODUCTION</span>
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto my-6 sm:my-8">
            {/* Blueprint Icon */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 rounded-3xl dark:bg-surface-dark-200 bg-emerald-500/10 border border-brand-green/30 flex items-center justify-center text-brand-green shadow-glow-green mb-8"
            >
              <Monitor className="w-10 h-10 text-brand-green" />
            </motion.div>

            {/* Headline */}
            <h3 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold dark:text-white text-slate-900 tracking-tight leading-[1.15] mb-6">
              {dict.portfolio.heading}
            </h3>

            {/* Description */}
            <p className="dark:text-zinc-300 text-slate-600 text-base font-normal leading-relaxed mb-8 max-w-lg">
              {dict.portfolio.desc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                variant="orange"
                className="w-full sm:w-auto"
                rightIcon={<Sparkles className="w-4.5 h-4.5" />}
                onClick={handleAction}
              >
                {dict.portfolio.btn}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
