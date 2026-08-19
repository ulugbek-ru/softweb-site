"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dictionary } from "@/lib/i18n";

interface ProcessSectionProps {
  dict: Dictionary;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ dict }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      number: "01",
      step: "PHASE 01",
      title: dict.process.step1Title,
      description: dict.process.step1Desc,
      duration: "2–4 Days",
    },
    {
      number: "02",
      step: "PHASE 02",
      title: dict.process.step2Title,
      description: dict.process.step2Desc,
      duration: "3–6 Days",
    },
    {
      number: "03",
      step: "PHASE 03",
      title: dict.process.step3Title,
      description: dict.process.step3Desc,
      duration: "5–10 Days",
    },
    {
      number: "04",
      step: "PHASE 04",
      title: dict.process.step4Title,
      description: dict.process.step4Desc,
      duration: "1–3 Weeks",
    },
    {
      number: "05",
      step: "PHASE 05",
      title: dict.process.step5Title,
      description: dict.process.step5Desc,
      duration: "2–4 Days",
    },
  ];

  return (
    <section id="process" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-brand-green/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="04"
          badge={dict.process.badge}
          title={
            <>
              {dict.process.title} <br />
              <span className="text-brand-green">
                {dict.process.titleAccent}
              </span>
            </>
          }
          subtitle={dict.process.subtitle}
        />

        {/* Step Navigator Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 max-w-4xl mx-auto">
          {steps.map((stepItem, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={stepItem.number}
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl font-mono text-xs font-bold whitespace-nowrap transition-all duration-300 border",
                  isActive
                    ? "bg-brand-green text-white border-brand-green shadow-glow-green"
                    : "dark:bg-surface-dark-100/60 bg-white dark:text-zinc-400 text-slate-600 dark:border-white/5 border-slate-200 hover:border-brand-green"
                )}
              >
                <span
                  className={cn(
                    "w-5 h-5 rounded-md flex items-center justify-center text-[10px]",
                    isActive ? "bg-white text-brand-green font-bold" : "dark:bg-white/10 bg-slate-100 dark:text-zinc-400 text-slate-600"
                  )}
                >
                  {stepItem.number}
                </span>
                <span>{stepItem.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className="max-w-4xl mx-auto">
          {steps.map((stepItem, idx) => {
            if (activeStep !== idx) return null;

            return (
              <motion.div
                key={stepItem.number}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-8 sm:p-12 rounded-3xl dark:bg-surface-dark-100/90 bg-white border dark:border-white/10 border-slate-200 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute right-6 -bottom-6 font-sans font-extrabold text-8xl sm:text-9xl dark:text-white/[0.03] text-slate-900/[0.03] select-none pointer-events-none">
                  {stepItem.number}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs text-brand-orange uppercase tracking-widest font-bold">
                      {stepItem.step}
                    </span>
                    <span className="text-slate-400">•</span>
                    <div className="flex items-center gap-1 text-xs font-mono text-brand-green bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-bold">
                      <Clock className="w-3.5 h-3.5 text-brand-green" />
                      <span>Est: {stepItem.duration}</span>
                    </div>
                  </div>

                  <h3 className="font-sans text-2xl sm:text-3xl font-bold dark:text-white text-slate-900 mb-4">
                    {stepItem.title}
                  </h3>

                  <p className="dark:text-zinc-300 text-slate-600 text-base font-normal leading-relaxed mb-8 max-w-2xl">
                    {stepItem.description}
                  </p>

                  {/* Step controls */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      disabled={activeStep === 0}
                      onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                      className="px-4 py-2 rounded-xl text-xs font-mono dark:bg-white/5 bg-slate-100 disabled:opacity-30 disabled:pointer-events-none dark:text-zinc-300 text-slate-700 border dark:border-white/5 border-slate-200 font-bold"
                    >
                      {dict.calculator.prev}
                    </button>

                    <button
                      disabled={activeStep === steps.length - 1}
                      onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono bg-brand-green text-white disabled:opacity-30 disabled:pointer-events-none font-bold shadow-sm hover:bg-brand-greenHover transition-colors"
                    >
                      <span>{dict.calculator.next}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
