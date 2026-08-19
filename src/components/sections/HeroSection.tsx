"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Sparkles, Code2, Zap, ShieldCheck, Layers } from "lucide-react";
import { Dictionary } from "@/lib/i18n";

interface HeroSectionProps {
  dict: Dictionary;
  onStartProject?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ dict, onStartProject }) => {
  const scrollToCalculator = () => {
    if (onStartProject) {
      onStartProject();
    } else {
      const el = document.getElementById("calculator");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Ambient Radial Mesh Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[800px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-brand-green/15 via-emerald-500/10 to-brand-orange/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-16 right-12 w-64 h-64 bg-brand-orange/10 blur-[110px] rounded-full pointer-events-none" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Badge variant="brand" className="cursor-default">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-ping mr-1.5" />
            {dict.hero.badge}
          </Badge>
        </motion.div>

        {/* Expressive Headline with Rubik Spray Accent */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8 max-w-4xl"
        >
          <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight dark:text-white text-slate-900 leading-[1.08]">
            {dict.hero.titleLine1}{" "}
            <span className="text-brand-green">{dict.hero.titleLine2}</span>{" "}
            {dict.hero.titleLine3}{" "}
            <span className="font-spray text-brand-orange text-glow-orange inline-block transform hover:rotate-1 transition-transform">
              {dict.hero.titleSprayWord}
            </span>{" "}
            {dict.hero.titleLine4}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="dark:text-zinc-300 text-slate-600 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-10 text-center"
        >
          {dict.hero.subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16"
        >
          <Button
            size="lg"
            variant="orange"
            className="w-full sm:w-auto"
            rightIcon={<Sparkles className="w-4.5 h-4.5" />}
            onClick={scrollToCalculator}
          >
            {dict.hero.ctaPrimary}
          </Button>

          <Button
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto"
            rightIcon={<ArrowRight className="w-4.5 h-4.5" />}
            onClick={scrollToContact}
          >
            {dict.hero.ctaSecondary}
          </Button>
        </motion.div>

        {/* Agency Highlights Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl pt-8 border-t dark:border-white/10 border-slate-200"
        >
          <div className="flex items-center gap-3 p-3.5 rounded-2xl dark:bg-surface-dark-100/60 bg-white border dark:border-white/5 border-slate-200 shadow-sm">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-brand-green">
              <Code2 className="w-4.5 h-4.5" />
            </div>
            <div className="text-left">
              <div className="font-mono text-xs font-bold dark:text-white text-slate-900">
                {dict.hero.stat1Title}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-500 font-mono">
                {dict.hero.stat1Sub}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl dark:bg-surface-dark-100/60 bg-white border dark:border-white/5 border-slate-200 shadow-sm">
            <div className="p-2 rounded-xl bg-orange-500/10 text-brand-orange">
              <Zap className="w-4.5 h-4.5" />
            </div>
            <div className="text-left">
              <div className="font-mono text-xs font-bold dark:text-white text-slate-900">
                {dict.hero.stat2Title}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-500 font-mono">
                {dict.hero.stat2Sub}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl dark:bg-surface-dark-100/60 bg-white border dark:border-white/5 border-slate-200 shadow-sm">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-brand-green">
              <Layers className="w-4.5 h-4.5" />
            </div>
            <div className="text-left">
              <div className="font-mono text-xs font-bold dark:text-white text-slate-900">
                {dict.hero.stat3Title}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-500 font-mono">
                {dict.hero.stat3Sub}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl dark:bg-surface-dark-100/60 bg-white border dark:border-white/5 border-slate-200 shadow-sm">
            <div className="p-2 rounded-xl bg-orange-500/10 text-brand-orange">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <div className="text-left">
              <div className="font-mono text-xs font-bold dark:text-white text-slate-900">
                {dict.hero.stat4Title}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-500 font-mono">
                {dict.hero.stat4Sub}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
