"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Sparkles, Code2, Zap, ShieldCheck, Layers } from "lucide-react";
import { siteConfig } from "@/config/site";

interface HeroSectionProps {
  onStartProject?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartProject }) => {
  const scrollToCalculator = () => {
    if (onStartProject) {
      onStartProject();
    } else {
      const el = document.getElementById("calculator");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Lighting & Radial Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[800px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-brand-blue/20 via-brand-indigo/15 to-brand-purple/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-12 right-10 w-72 h-72 bg-brand-cyan/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Badge variant="brand" className="cursor-default">
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-ping mr-1" />
            SoftWeb Agency // Next-Gen Digital Production
          </Badge>
        </motion.div>

        {/* Expressive Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8 max-w-5xl"
        >
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05]">
            WE CRAFT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-indigo-400 to-brand-purple inline-block">
              DIGITAL EXPERIENCES
            </span> <br />
            THAT MATTER.
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-zinc-300 sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-10 text-center"
        >
          Bespoke websites, high-performance web applications, and conversion-engineered digital products built for ambitious businesses.
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
            variant="primary"
            className="w-full sm:w-auto"
            rightIcon={<Sparkles className="w-4 h-4" />}
            onClick={scrollToCalculator}
          >
            Start a Project
          </Button>

          <Button
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={scrollToServices}
          >
            Explore Services
          </Button>
        </motion.div>

        {/* Agency Highlights Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl pt-6 border-t border-white/10"
        >
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-100/60 border border-white/5 backdrop-blur-md">
            <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue">
              <Code2 className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="font-mono text-xs font-semibold text-white">100% Bespoke</div>
              <div className="text-[11px] text-zinc-500 font-mono">Zero Generic Bloat</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-100/60 border border-white/5 backdrop-blur-md">
            <div className="p-2 rounded-lg bg-brand-indigo/10 text-brand-indigo">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="font-mono text-xs font-semibold text-white">Sub-Second</div>
              <div className="text-[11px] text-zinc-500 font-mono">99+ Lighthouse Speed</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-100/60 border border-white/5 backdrop-blur-md">
            <div className="p-2 rounded-lg bg-brand-purple/10 text-brand-purple">
              <Layers className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="font-mono text-xs font-semibold text-white">Full-Stack</div>
              <div className="text-[11px] text-zinc-500 font-mono">End-to-End Delivery</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-100/60 border border-white/5 backdrop-blur-md">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="font-mono text-xs font-semibold text-white">Production-Ready</div>
              <div className="text-[11px] text-zinc-500 font-mono">High Security & Scale</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
