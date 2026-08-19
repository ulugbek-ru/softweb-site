"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { processSteps, ProcessStep } from "@/config/process";
import { Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="process" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-brand-indigo/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="04"
          badge="Execution Framework"
          title={
            <>
              How We Work <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-purple">
                From Concept to Production.
              </span>
            </>
          }
          subtitle="A battle-tested 5-phase delivery process guaranteeing radical clarity, velocity, and flawless technical execution."
        />

        {/* Interactive Step Navigator Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 max-w-4xl mx-auto [mask-image:linear-gradient(to_right,black_90%,transparent)]">
          {processSteps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl font-mono text-xs font-semibold whitespace-nowrap transition-all duration-300 border",
                  isActive
                    ? "bg-surface-100 text-white border-brand-blue/50 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                    : "bg-surface-100/40 text-zinc-400 border-white/5 hover:border-white/20 hover:text-zinc-200"
                )}
              >
                <span
                  className={cn(
                    "w-5 h-5 rounded-md flex items-center justify-center text-[10px]",
                    isActive ? "bg-brand-blue text-black font-bold" : "bg-white/10 text-zinc-400"
                  )}
                >
                  {step.number}
                </span>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className="max-w-5xl mx-auto">
          {processSteps.map((step: ProcessStep, idx: number) => {
            if (activeStep !== idx) return null;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-8 sm:p-12 rounded-3xl bg-glass border border-white/10 shadow-2xl relative overflow-hidden"
              >
                {/* Big Phase Watermark */}
                <div className="absolute right-6 -bottom-6 font-display font-black text-8xl sm:text-9xl text-white/[0.03] select-none pointer-events-none">
                  {step.number}
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-xs text-brand-blue uppercase tracking-widest font-bold">
                        {step.step}
                      </span>
                      <span className="text-zinc-600">•</span>
                      <div className="flex items-center gap-1 text-xs font-mono text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                        <Clock className="w-3 h-3 text-brand-purple" />
                        <span>Est: {step.duration}</span>
                      </div>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                      {step.title}
                    </h3>

                    <p className="text-zinc-300 text-sm sm:text-base font-medium mb-4">
                      {step.subtitle}
                    </p>

                    <p className="text-zinc-400 text-sm leading-relaxed font-light mb-6">
                      {step.description}
                    </p>

                    {/* Step navigation buttons */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                        className="px-4 py-2 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-zinc-300 border border-white/5"
                      >
                        Previous Phase
                      </button>

                      <button
                        disabled={activeStep === processSteps.length - 1}
                        onClick={() => setActiveStep((prev) => Math.min(processSteps.length - 1, prev + 1))}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue border border-brand-blue/30 disabled:opacity-30 disabled:pointer-events-none font-semibold"
                      >
                        <span>Next Phase</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Deliverables List Card */}
                  <div className="lg:col-span-5 p-6 rounded-2xl bg-surface-200/80 border border-white/10">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-4 flex items-center justify-between">
                      <span>Phase Deliverables</span>
                      <span className="text-[10px] text-brand-blue">100% Verified</span>
                    </h4>

                    <div className="space-y-3">
                      {step.deliverables.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 p-2.5 rounded-xl bg-surface-100/60 border border-white/5 text-xs text-zinc-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
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
