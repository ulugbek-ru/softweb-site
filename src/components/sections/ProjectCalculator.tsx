"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  projectTypeOptions,
  pageRangeOptions,
  designLevelOptions,
  featureOptions,
  deadlineOptions,
  initialCalculatorState,
  FeatureOption,
} from "@/config/calculator";
import {
  CalculatorState,
  FeatureKey,
  ProjectType,
  PageRange,
  DesignLevel,
  DeadlineSpeed,
} from "@/types/calculator";
import { calculateProjectPrice } from "@/lib/pricing";
import { formatUSD, formatUZS } from "@/config/currency";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Send,
  CheckCircle2,
  Coins,
  Clock,
  Layers,
} from "lucide-react";
import { projectOrderSchema } from "@/lib/validations";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { siteConfig } from "@/config/site";
import { Dictionary } from "@/lib/i18n";

interface ProjectCalculatorProps {
  dict: Dictionary;
}

export const ProjectCalculator: React.FC<ProjectCalculatorProps> = ({ dict }) => {
  const [step, setStep] = useState<number>(1);
  const [calcState, setCalcState] = useState<CalculatorState>(initialCalculatorState);
  const [isOrderMode, setIsOrderMode] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [submittedRequestNumber, setSubmittedRequestNumber] = useState<string>("");

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: "",
    telegram: "",
    phone: "",
    email: "",
    company: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Dynamic Price calculation with existing shared pricing engine
  const estimate = useMemo(() => {
    return calculateProjectPrice(calcState);
  }, [calcState]);

  const handleFeatureToggle = (featId: FeatureKey) => {
    setCalcState((prev) => {
      const exists = prev.features.includes(featId);
      if (exists) {
        return { ...prev, features: prev.features.filter((f) => f !== featId) };
      } else {
        return { ...prev, features: [...prev.features, featId] };
      }
    });
  };

  const handleReset = () => {
    setCalcState(initialCalculatorState);
    setStep(1);
    setIsOrderMode(false);
    setOrderSuccess(false);
    setFormErrors({});
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#22c55e", "#f97316", "#10b981", "#ffffff"],
      });
    } catch {
      // ignore
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const projectTypeName =
      projectTypeOptions.find((p) => p.id === calcState.projectType)?.uzbekTitle ||
      projectTypeOptions.find((p) => p.id === calcState.projectType)?.title ||
      calcState.projectType;

    const payload = {
      fullName: formData.fullName,
      telegram: formData.telegram,
      phone: formData.phone || undefined,
      email: formData.email,
      company: formData.company || undefined,
      projectType: projectTypeName,
      selectedServices: estimate.summaryFeatures,
      estimatedBudget: `${formatUZS(estimate.minPriceUZS)} – ${formatUZS(estimate.maxPriceUZS)} (${formatUSD(estimate.minPriceUSD, true)} – ${formatUSD(estimate.maxPriceUSD)})`,
      deadline:
        deadlineOptions.find((d) => d.id === calcState.deadline)?.uzbekTitle ||
        estimate.summaryDurationText,
      description: formData.description,
      calculatorSpecs: {
        pages: pageRangeOptions.find((p) => p.id === calcState.pageRange)?.uzbekTitle,
        design: designLevelOptions.find((d) => d.id === calcState.designLevel)?.uzbekTitle,
        features: estimate.summaryFeatures,
      },
    };

    const validationResult = projectOrderSchema.safeParse(payload);
    if (!validationResult.success) {
      const errors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setFormErrors(errors);
      toast.error(dict.calculator.disclaimer);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSubmitting(false);
        setOrderSuccess(true);
        setSubmittedRequestNumber(data.requestId || "#SW-2026");
        triggerConfetti();
        toast.success(dict.calculator.successTitle);
      } else {
        setIsSubmitting(false);
        toast.error(data.message || "Error processing request.");
      }
    } catch (err: unknown) {
      setIsSubmitting(false);
      const msg = err instanceof Error ? err.message : "Network error";
      toast.error(`Error: ${msg}`);
    }
  };

  return (
    <section id="calculator" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-brand-green/10 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          number="06"
          badge={dict.calculator.badge}
          title={
            <>
              {dict.calculator.title} // <br />
              <span className="text-brand-green">
                {dict.calculator.titleAccent}
              </span>
            </>
          }
          subtitle={dict.calculator.subtitle}
        />

        <div className="max-w-5xl mx-auto">
          {/* Main Estimator Card */}
          <div className="rounded-3xl dark:bg-surface-dark-100/90 bg-white border dark:border-white/10 border-slate-200 backdrop-blur-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Step Progress Bar */}
            {!isOrderMode && !orderSuccess && (
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-mono dark:text-zinc-400 text-slate-500 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-brand-orange font-bold">0{step} / 05</span>
                    <span>•</span>
                    <span className="dark:text-white text-slate-900 font-bold">
                      {step === 1 && dict.calculator.step1Title}
                      {step === 2 && dict.calculator.step2Title}
                      {step === 3 && dict.calculator.step3Title}
                      {step === 4 && dict.calculator.step4Title}
                      {step === 5 && dict.calculator.step5Title}
                    </span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 hover:text-brand-orange transition-colors font-bold"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{dict.calculator.reset}</span>
                  </button>
                </div>

                {/* Progress Track */}
                <div className="w-full h-2 dark:bg-white/5 bg-slate-100 rounded-full overflow-hidden border dark:border-white/5 border-slate-200">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand-green to-brand-orange rounded-full"
                    animate={{ width: `${(step / 5) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            {/* Dynamic Step Content */}
            {!isOrderMode && !orderSuccess && (
              <div>
                <AnimatePresence mode="wait">
                  {/* STEP 1: Project Type */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl sm:text-2xl font-sans font-bold dark:text-white text-slate-900 mb-2">
                        {dict.calculator.step1Title}
                      </h3>
                      <p className="dark:text-zinc-400 text-slate-600 text-sm font-normal mb-6">
                        {dict.calculator.step1Sub}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projectTypeOptions.map((opt) => {
                          const isSelected = calcState.projectType === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() =>
                                setCalcState((prev) => ({ ...prev, projectType: opt.id }))
                              }
                              className={cn(
                                "p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between relative cursor-pointer",
                                isSelected
                                  ? "dark:bg-surface-dark-200 bg-emerald-500/10 border-brand-green text-brand-green shadow-glow-green"
                                  : "dark:bg-surface-dark-200/40 bg-slate-50 border-slate-200 dark:border-white/5 hover:border-brand-green"
                              )}
                            >
                              {opt.badge && (
                                <span className="absolute top-4 right-4 text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-orange-500/10 text-brand-orange border border-orange-500/20 font-bold">
                                  {opt.badge}
                                </span>
                              )}
                              <div>
                                <h4 className="font-sans font-bold dark:text-white text-slate-900 text-base mb-1">
                                  {opt.uzbekTitle || opt.title}
                                </h4>
                                <p className="dark:text-zinc-400 text-slate-600 text-xs leading-relaxed font-normal">
                                  {opt.uzbekDesc || opt.desc}
                                </p>
                              </div>

                              <div className="mt-4 flex items-center justify-end">
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                                    isSelected
                                      ? "bg-brand-green border-brand-green text-white"
                                      : "border-slate-300 dark:border-white/20 text-transparent"
                                  )}
                                >
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Page Range */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl sm:text-2xl font-sans font-bold dark:text-white text-slate-900 mb-2">
                        {dict.calculator.step2Title}
                      </h3>
                      <p className="dark:text-zinc-400 text-slate-600 text-sm font-normal mb-6">
                        {dict.calculator.step2Sub}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {pageRangeOptions.map((opt) => {
                          const isSelected = calcState.pageRange === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() =>
                                setCalcState((prev) => ({ ...prev, pageRange: opt.id }))
                              }
                              className={cn(
                                "p-6 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                                isSelected
                                  ? "dark:bg-surface-dark-200 bg-emerald-500/10 border-brand-green shadow-glow-green"
                                  : "dark:bg-surface-dark-200/40 bg-slate-50 border-slate-200 dark:border-white/5 hover:border-brand-green"
                              )}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-sans font-bold dark:text-white text-slate-900 text-lg">
                                  {opt.uzbekTitle || opt.title}
                                </h4>
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                                    isSelected
                                      ? "bg-brand-green border-brand-green text-white"
                                      : "border-slate-300 dark:border-white/20 text-transparent"
                                  )}
                                >
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              </div>
                              <p className="dark:text-zinc-400 text-slate-600 text-xs font-normal">
                                {opt.uzbekDesc || opt.desc}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Design Level */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl sm:text-2xl font-sans font-bold dark:text-white text-slate-900 mb-2">
                        {dict.calculator.step3Title}
                      </h3>
                      <p className="dark:text-zinc-400 text-slate-600 text-sm font-normal mb-6">
                        {dict.calculator.step3Sub}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {designLevelOptions.map((opt) => {
                          const isSelected = calcState.designLevel === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() =>
                                setCalcState((prev) => ({ ...prev, designLevel: opt.id }))
                              }
                              className={cn(
                                "p-6 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                                isSelected
                                  ? "dark:bg-surface-dark-200 bg-emerald-500/10 border-brand-green shadow-glow-green"
                                  : "dark:bg-surface-dark-200/40 bg-slate-50 border-slate-200 dark:border-white/5 hover:border-brand-green"
                              )}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-sans font-bold dark:text-white text-slate-900 text-base">
                                  {opt.uzbekTitle || opt.title}
                                </h4>
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded-full border flex items-center justify-center transition-all shrink-0",
                                    isSelected
                                      ? "bg-brand-green border-brand-green text-white"
                                      : "border-slate-300 dark:border-white/20 text-transparent"
                                  )}
                                >
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              </div>
                              <p className="dark:text-zinc-400 text-slate-600 text-xs font-normal leading-relaxed">
                                {opt.uzbekDesc || opt.desc}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Features */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl sm:text-2xl font-sans font-bold dark:text-white text-slate-900 mb-2">
                        {dict.calculator.step4Title}
                      </h3>
                      <p className="dark:text-zinc-400 text-slate-600 text-sm font-normal mb-6">
                        {dict.calculator.step4Sub}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {featureOptions.map((opt: FeatureOption) => {
                          const isSelected = calcState.features.includes(opt.id);
                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleFeatureToggle(opt.id)}
                              className={cn(
                                "p-4 rounded-xl text-left transition-all duration-200 border flex items-start justify-between gap-3 cursor-pointer",
                                isSelected
                                  ? "dark:bg-surface-dark-200 bg-orange-500/10 border-brand-orange dark:text-white text-slate-900 shadow-glow-orange"
                                  : "dark:bg-surface-dark-200/40 bg-slate-50 border-slate-200 dark:border-white/5 dark:text-zinc-400 text-slate-600 hover:border-brand-green"
                              )}
                            >
                              <div>
                                <div className="font-sans font-bold text-sm dark:text-white text-slate-900 flex items-center gap-2">
                                  <span>{opt.uzbekTitle || opt.title}</span>
                                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-brand-orange font-bold">
                                    {opt.tag}
                                  </span>
                                </div>
                                <p className="dark:text-zinc-400 text-slate-600 text-[11px] mt-1 font-normal leading-tight">
                                  {opt.uzbekDesc || opt.desc}
                                </p>
                              </div>

                              <div
                                className={cn(
                                  "w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0 mt-0.5",
                                  isSelected
                                    ? "bg-brand-orange border-brand-orange text-white"
                                    : "border-slate-300 dark:border-white/20 text-transparent"
                                )}
                              >
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 5: Deadline */}
                  {step === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl sm:text-2xl font-sans font-bold dark:text-white text-slate-900 mb-2">
                        {dict.calculator.step5Title}
                      </h3>
                      <p className="dark:text-zinc-400 text-slate-600 text-sm font-normal mb-6">
                        {dict.calculator.step5Sub}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {deadlineOptions.map((opt) => {
                          const isSelected = calcState.deadline === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() =>
                                setCalcState((prev) => ({ ...prev, deadline: opt.id }))
                              }
                              className={cn(
                                "p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                                isSelected
                                  ? "dark:bg-surface-dark-200 bg-emerald-500/10 border-brand-green shadow-glow-green"
                                  : "dark:bg-surface-dark-200/40 bg-slate-50 border-slate-200 dark:border-white/5 hover:border-brand-green"
                              )}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-sans font-bold dark:text-white text-slate-900 text-base">
                                    {opt.uzbekTitle || opt.title}
                                  </h4>
                                  <div
                                    className={cn(
                                      "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                                      isSelected
                                        ? "bg-brand-green border-brand-green text-white"
                                        : "border-slate-300 dark:border-white/20 text-transparent"
                                    )}
                                  >
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  </div>
                                </div>
                                <p className="dark:text-zinc-400 text-slate-600 text-xs font-normal">
                                  {opt.uzbekDesc || opt.desc}
                                </p>
                              </div>

                              {opt.badge && (
                                <span className="mt-4 inline-block text-[10px] font-mono text-brand-orange uppercase font-bold">
                                  // {opt.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Step Controls */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t dark:border-white/10 border-slate-200">
                  <button
                    disabled={step === 1}
                    onClick={() => setStep((s) => Math.max(1, s - 1))}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-mono text-xs font-bold dark:text-zinc-400 text-slate-600 border dark:border-white/5 border-slate-300 hover:border-brand-green disabled:opacity-30 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{dict.calculator.prev}</span>
                  </button>

                  {step < 5 ? (
                    <Button
                      size="md"
                      variant="primary"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      onClick={() => setStep((s) => Math.min(5, s + 1))}
                    >
                      {dict.calculator.next}
                    </Button>
                  ) : (
                    <Button
                      size="md"
                      variant="orange"
                      rightIcon={<Sparkles className="w-4 h-4" />}
                      onClick={() => setIsOrderMode(true)}
                    >
                      {dict.calculator.review}
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* VISUALLY PROMINENT PRICE RESULT DISPLAY */}
            <div className="mt-10 p-6 sm:p-8 rounded-2xl dark:bg-surface-dark-200 bg-slate-900 text-white border border-brand-green/40 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-32 bg-brand-orange/15 blur-[80px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-green uppercase tracking-wider mb-2 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{dict.calculator.costTitle}</span>
                  </div>

                  {/* Primary UZS Display */}
                  <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-green tracking-tight tabular-nums">
                    {formatUZS(estimate.minPriceUZS)} – {formatUZS(estimate.maxPriceUZS)}
                  </div>

                  {/* Secondary USD Display */}
                  <div className="font-sans text-base sm:text-lg text-brand-orange font-bold mt-2 flex items-center gap-2">
                    <Coins className="w-4.5 h-4.5 text-brand-orange inline" />
                    <span>
                      {dict.calculator.usdEquivalent} <strong className="text-white">{formatUSD(estimate.minPriceUSD, true)} – {formatUSD(estimate.maxPriceUSD)}</strong>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-4 text-xs font-mono text-zinc-300">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-brand-green" />
                      {dict.calculator.featuresLabel} <strong className="text-white">{estimate.summaryTitle}</strong>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-orange" />
                      {dict.calculator.durationLabel} <strong className="text-white">{estimate.summaryDurationText}</strong>
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 font-normal mt-3 leading-relaxed">
                    {dict.calculator.disclaimer}
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-3 justify-end items-stretch lg:items-end">
                  {!isOrderMode && !orderSuccess && (
                    <Button
                      size="lg"
                      variant="orange"
                      className="w-full sm:w-auto shadow-glow-orange"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      onClick={() => setIsOrderMode(true)}
                    >
                      {dict.calculator.continueOrder}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* ORDER FORM INTEGRATION */}
            <AnimatePresence>
              {isOrderMode && !orderSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-10 pt-8 border-t dark:border-white/10 border-slate-200"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-sans text-2xl font-bold dark:text-white text-slate-900 mb-1">
                        {dict.calculator.formTitle}
                      </h3>
                      <p className="dark:text-zinc-400 text-slate-500 text-xs font-mono">
                        {dict.calculator.formSub}
                      </p>
                    </div>

                    <button
                      onClick={() => setIsOrderMode(false)}
                      className="text-xs font-mono text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-white/5"
                    >
                      {dict.calculator.backCalc}
                    </button>
                  </div>

                  <form onSubmit={handleSubmitOrder} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono dark:text-zinc-400 text-slate-600 mb-1.5 uppercase font-bold">
                          {dict.calculator.nameLabel} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                          }
                          placeholder="Ali Valiyev"
                          className={cn(
                            "w-full px-4 py-3 rounded-xl dark:bg-surface-dark-200 bg-slate-50 border text-sm dark:text-white text-slate-900 focus:outline-none focus:border-brand-green transition-colors",
                            formErrors.fullName ? "border-red-500" : "dark:border-white/10 border-slate-300"
                          )}
                        />
                        {formErrors.fullName && (
                          <p className="text-red-500 text-xs font-mono mt-1">{formErrors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-mono dark:text-zinc-400 text-slate-600 mb-1.5 uppercase font-bold">
                          {dict.calculator.tgLabel} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.telegram}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, telegram: e.target.value }))
                          }
                          placeholder="@username"
                          className={cn(
                            "w-full px-4 py-3 rounded-xl dark:bg-surface-dark-200 bg-slate-50 border text-sm dark:text-white text-slate-900 focus:outline-none focus:border-brand-green transition-colors",
                            formErrors.telegram ? "border-red-500" : "dark:border-white/10 border-slate-300"
                          )}
                        />
                        {formErrors.telegram && (
                          <p className="text-red-500 text-xs font-mono mt-1">{formErrors.telegram}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-mono dark:text-zinc-400 text-slate-600 mb-1.5 uppercase font-bold">
                          {dict.calculator.emailLabel} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, email: e.target.value }))
                          }
                          placeholder="client@company.com"
                          className={cn(
                            "w-full px-4 py-3 rounded-xl dark:bg-surface-dark-200 bg-slate-50 border text-sm dark:text-white text-slate-900 focus:outline-none focus:border-brand-green transition-colors",
                            formErrors.email ? "border-red-500" : "dark:border-white/10 border-slate-300"
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono dark:text-zinc-400 text-slate-600 mb-1.5 uppercase font-bold">
                          {dict.calculator.phoneLabel}
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          placeholder="+998 90 123 45 67"
                          className="w-full px-4 py-3 rounded-xl dark:bg-surface-dark-200 bg-slate-50 border dark:border-white/10 border-slate-300 text-sm dark:text-white text-slate-900 focus:outline-none focus:border-brand-green transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono dark:text-zinc-400 text-slate-600 mb-1.5 uppercase font-bold">
                          {dict.calculator.companyLabel}
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, company: e.target.value }))
                          }
                          placeholder="SoftWeb Ventures"
                          className="w-full px-4 py-3 rounded-xl dark:bg-surface-dark-200 bg-slate-50 border dark:border-white/10 border-slate-300 text-sm dark:text-white text-slate-900 focus:outline-none focus:border-brand-green transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono dark:text-zinc-400 text-slate-600 mb-1.5 uppercase font-bold">
                        {dict.calculator.descLabel} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, description: e.target.value }))
                        }
                        placeholder="Tell us about your objectives..."
                        className={cn(
                          "w-full px-4 py-3 rounded-xl dark:bg-surface-dark-200 bg-slate-50 border text-sm dark:text-white text-slate-900 focus:outline-none focus:border-brand-green transition-colors resize-y",
                          formErrors.description ? "border-red-500" : "dark:border-white/10 border-slate-300"
                        )}
                      />
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                        <span>Telegram Bot Integration Active</span>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        variant="orange"
                        isLoading={isSubmitting}
                        className="w-full sm:w-auto"
                        rightIcon={<Send className="w-4 h-4" />}
                      >
                        {isSubmitting ? dict.calculator.sending : dict.calculator.submitBtn}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SUCCESS STATE */}
            {orderSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 px-6 text-center flex flex-col items-center max-w-xl mx-auto"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-brand-green flex items-center justify-center mb-6 shadow-glow-green">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="font-sans text-3xl font-bold dark:text-white text-slate-900 mb-3">
                  {dict.calculator.successTitle}
                </h3>

                <div className="font-mono text-xs text-brand-green bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 mb-4 font-bold">
                  ID: {submittedRequestNumber}
                </div>

                <p className="dark:text-zinc-300 text-slate-600 text-sm leading-relaxed mb-6">
                  {dict.calculator.successDesc}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={siteConfig.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-brand-green text-white font-bold text-xs font-mono uppercase tracking-wider hover:bg-brand-greenHover transition-colors"
                  >
                    {dict.calculator.openTgBtn}
                  </a>

                  <Button variant="secondary" size="md" onClick={handleReset}>
                    {dict.calculator.recalcBtn}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
