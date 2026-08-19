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

export const ProjectCalculator: React.FC = () => {
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

  // Dynamic Price calculation with shared pricing engine
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
        colors: ["#38bdf8", "#6366f1", "#a855f7", "#ffffff"],
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

    // Client-side validation
    const validationResult = projectOrderSchema.safeParse(payload);
    if (!validationResult.success) {
      const errors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setFormErrors(errors);
      toast.error("Iltimos, barcha majburiy maydonlarni to'g'ri to'ldiring.");
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
        toast.success("Loyiha arizasi @ulugbekraxmatillayev botiga muvaffaqiyatli yuborildi!");
      } else {
        setIsSubmitting(false);
        toast.error(data.message || "Arizani yuborishda xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
      }
    } catch (err: unknown) {
      setIsSubmitting(false);
      const msg = err instanceof Error ? err.message : "Network error";
      toast.error(`Arizani yuborishda xatolik: ${msg}`);
    }
  };

  return (
    <section id="calculator" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-brand-blue/10 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          number="06"
          badge="Interaktiv Narx Kalkulyatori"
          title={
            <>
              Loyiha Narxini Hisoblash // <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-purple">
                UZS & USD Aniq Hisob-Kitob.
              </span>
            </>
          }
          subtitle="Loyihangiz parametrlarini bosqichma-bosqich tanlang va real vaqt rejimida shaffof byudjet va muddat hisob-kitobini oling."
        />

        <div className="max-w-5xl mx-auto">
          {/* Main Estimator Container */}
          <div className="rounded-3xl bg-surface-100/80 border border-white/10 backdrop-blur-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Top Progress & Step Bar */}
            {!isOrderMode && !orderSuccess && (
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-brand-blue font-bold">BOSQICH 0{step} / 05</span>
                    <span>•</span>
                    <span className="text-white font-medium">
                      {step === 1 && "Loyiha arxitekturasi va turini tanlang"}
                      {step === 2 && "Sahifalar va ekranlar hajmini belgilang"}
                      {step === 3 && "UI/UX Dizayn talabi darajasi"}
                      {step === 4 && "Kerakli funksiyalar va modullar"}
                      {step === 5 && "Ishga tushirish tezligi va muddati"}
                    </span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Qayta boshlash</span>
                  </button>
                </div>

                {/* Progress Track */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-purple rounded-full"
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
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                        Qanday turdagi raqamli mahsulot yaratmoqchisiz?
                      </h3>
                      <p className="text-zinc-400 text-sm font-light mb-6">
                        Biznes maqsadlaringizga mos asosiy yo'nalishni tanlang.
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
                                "p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between relative",
                                isSelected
                                  ? "bg-surface-200 border-brand-blue shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                                  : "bg-surface-200/40 border-white/5 hover:border-white/20 hover:bg-surface-200/70"
                              )}
                            >
                              {opt.badge && (
                                <span className="absolute top-4 right-4 text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400">
                                  {opt.badge}
                                </span>
                              )}
                              <div>
                                <h4 className="font-display font-bold text-white text-base mb-1">
                                  {opt.uzbekTitle || opt.title}
                                </h4>
                                <p className="text-zinc-400 text-xs leading-relaxed font-light">
                                  {opt.uzbekDesc || opt.desc}
                                </p>
                              </div>

                              <div className="mt-4 flex items-center justify-end">
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                                    isSelected
                                      ? "bg-brand-blue border-brand-blue text-black"
                                      : "border-white/20 text-transparent"
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
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                        Sayt nechta sahifa / ekrandan iborat bo‘ladi?
                      </h3>
                      <p className="text-zinc-400 text-sm font-light mb-6">
                        Menyu bo'limlari, sahifalar va xizmatlar ko'lami.
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
                                "p-6 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between",
                                isSelected
                                  ? "bg-surface-200 border-brand-blue shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                                  : "bg-surface-200/40 border-white/5 hover:border-white/20 hover:bg-surface-200/70"
                              )}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-display font-bold text-white text-lg">
                                  {opt.uzbekTitle || opt.title}
                                </h4>
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                                    isSelected
                                      ? "bg-brand-blue border-brand-blue text-black"
                                      : "border-white/20 text-transparent"
                                  )}
                                >
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              </div>
                              <p className="text-zinc-400 text-xs font-light">
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
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                        UI/UX Dizayn bo'yicha talabingiz qanday?
                      </h3>
                      <p className="text-zinc-400 text-sm font-light mb-6">
                        Tayyor Figma fayllardan tortib Awwwards darajasidagi individual art-directiongacha.
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
                                "p-6 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between",
                                isSelected
                                  ? "bg-surface-200 border-brand-blue shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                                  : "bg-surface-200/40 border-white/5 hover:border-white/20 hover:bg-surface-200/70"
                              )}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-display font-bold text-white text-base">
                                  {opt.uzbekTitle || opt.title}
                                </h4>
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded-full border flex items-center justify-center transition-all shrink-0",
                                    isSelected
                                      ? "bg-brand-blue border-brand-blue text-black"
                                      : "border-white/20 text-transparent"
                                  )}
                                >
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              </div>
                              <p className="text-zinc-400 text-xs font-light leading-relaxed">
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
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                        Kerakli funksiyalar va modullarni tanlang
                      </h3>
                      <p className="text-zinc-400 text-sm font-light mb-6">
                        Bir nechta modullarni belgilashingiz mumkin.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {featureOptions.map((opt: FeatureOption) => {
                          const isSelected = calcState.features.includes(opt.id);
                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleFeatureToggle(opt.id)}
                              className={cn(
                                "p-4 rounded-xl text-left transition-all duration-200 border flex items-start justify-between gap-3",
                                isSelected
                                  ? "bg-surface-200 border-brand-indigo/60 text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                                  : "bg-surface-200/40 border-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                              )}
                            >
                              <div>
                                <div className="font-display font-semibold text-sm text-white flex items-center gap-2">
                                  <span>{opt.uzbekTitle || opt.title}</span>
                                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
                                    {opt.tag}
                                  </span>
                                </div>
                                <p className="text-zinc-400 text-[11px] mt-1 font-light leading-tight">
                                  {opt.uzbekDesc || opt.desc}
                                </p>
                              </div>

                              <div
                                className={cn(
                                  "w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0 mt-0.5",
                                  isSelected
                                    ? "bg-brand-indigo border-brand-indigo text-white"
                                    : "border-white/20 text-transparent"
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
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                        Qaysi muddatda tayyor bo'lishi kerak?
                      </h3>
                      <p className="text-zinc-400 text-sm font-light mb-6">
                        Ishga tushirish tezligi va yetkazib berish sprinti.
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
                                "p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between",
                                isSelected
                                  ? "bg-surface-200 border-brand-blue shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                                  : "bg-surface-200/40 border-white/5 hover:border-white/20 hover:bg-surface-200/70"
                              )}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-display font-bold text-white text-base">
                                    {opt.uzbekTitle || opt.title}
                                  </h4>
                                  <div
                                    className={cn(
                                      "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                                      isSelected
                                        ? "bg-brand-blue border-brand-blue text-black"
                                        : "border-white/20 text-transparent"
                                    )}
                                  >
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  </div>
                                </div>
                                <p className="text-zinc-400 text-xs font-light">
                                  {opt.uzbekDesc || opt.desc}
                                </p>
                              </div>

                              {opt.badge && (
                                <span className="mt-4 inline-block text-[10px] font-mono text-zinc-500 uppercase">
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

                {/* Step Navigation Controls */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                  <button
                    disabled={step === 1}
                    onClick={() => setStep((s) => Math.max(1, s - 1))}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-mono text-xs text-zinc-400 hover:text-white border border-white/5 hover:border-white/20 disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Orqaga</span>
                  </button>

                  {step < 5 ? (
                    <Button
                      size="md"
                      variant="secondary"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      onClick={() => setStep((s) => Math.min(5, s + 1))}
                    >
                      Keyingi bosqich
                    </Button>
                  ) : (
                    <Button
                      size="md"
                      variant="primary"
                      rightIcon={<Sparkles className="w-4 h-4" />}
                      onClick={() => setIsOrderMode(true)}
                    >
                      Ko'rib chiqish & Buyurtma
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* LIVE DUAL CURRENCY PRICING ESTIMATION CARD */}
            <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#090b10] border border-brand-indigo/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-32 bg-brand-purple/10 blur-[80px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-blue uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Taxminiy Loyiha Qiymati (UZS & USD)</span>
                  </div>

                  {/* Primary UZS Display */}
                  <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight tabular-nums">
                    {formatUZS(estimate.minPriceUZS)} – {formatUZS(estimate.maxPriceUZS)}
                  </div>

                  {/* Secondary USD Display */}
                  <div className="font-mono text-sm sm:text-base text-zinc-400 mt-1 flex items-center gap-2">
                    <Coins className="w-4 h-4 text-emerald-400 inline" />
                    <span>
                      USD ekvivalenti: <strong className="text-zinc-200">{formatUSD(estimate.minPriceUSD, true)} – {formatUSD(estimate.maxPriceUSD)}</strong>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-4 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-brand-blue" />
                      Loyiha: <strong className="text-zinc-200">{estimate.summaryTitle}</strong>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-purple" />
                      Muddat: <strong className="text-zinc-200">{estimate.summaryDurationText}</strong>
                    </span>
                    <span>•</span>
                    <span>Modullar: <strong className="text-zinc-200">{estimate.summaryFeatures.length} ta faol</strong></span>
                  </div>

                  <p className="text-[11px] text-zinc-500 font-light mt-3 leading-relaxed">
                    * Bu taxminiy oraliq narx hisoblanadi. Yakuniy aniq narx loyiha texnik topshirig'i (TZ) to'liq muhokama qilingandan so'ng tasdiqlanadi.
                  </p>
                </div>

                <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end items-stretch lg:items-end">
                  {!isOrderMode && !orderSuccess && (
                    <Button
                      size="lg"
                      variant="primary"
                      className="w-full sm:w-auto shadow-glow-sm"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      onClick={() => setIsOrderMode(true)}
                    >
                      Buyurtmaga o'tish
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* ORDER MODE FORM */}
            <AnimatePresence>
              {isOrderMode && !orderSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-10 pt-8 border-t border-white/10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-white mb-1">
                        Loyihangiz haqida ma'lumot qoldiring
                      </h3>
                      <p className="text-zinc-400 text-xs font-mono">
                        Arizangiz to'g'ridan-to'g'ri Telegram: {siteConfig.telegramUsername} ga yuboriladi
                      </p>
                    </div>

                    <button
                      onClick={() => setIsOrderMode(false)}
                      className="text-xs font-mono text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-white/5"
                    >
                      Kalkulyatorga qaytish
                    </button>
                  </div>

                  <form onSubmit={handleSubmitOrder} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                          Ism-familiyangiz <span className="text-red-400">*</span>
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
                            "w-full px-4 py-3 rounded-xl bg-surface-200 border text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-blue transition-colors",
                            formErrors.fullName ? "border-red-500/60" : "border-white/10"
                          )}
                        />
                        {formErrors.fullName && (
                          <p className="text-red-400 text-xs font-mono mt-1">
                            {formErrors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Telegram Username */}
                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                          Telegram Username <span className="text-red-400">*</span>
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
                            "w-full px-4 py-3 rounded-xl bg-surface-200 border text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-blue transition-colors",
                            formErrors.telegram ? "border-red-500/60" : "border-white/10"
                          )}
                        />
                        {formErrors.telegram && (
                          <p className="text-red-400 text-xs font-mono mt-1">
                            {formErrors.telegram}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                          Elektron pochta (Email) <span className="text-red-400">*</span>
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
                            "w-full px-4 py-3 rounded-xl bg-surface-200 border text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-blue transition-colors",
                            formErrors.email ? "border-red-500/60" : "border-white/10"
                          )}
                        />
                        {formErrors.email && (
                          <p className="text-red-400 text-xs font-mono mt-1">
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                          Telefon raqam (Ixtiyoriy)
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          placeholder="+998 90 123 45 67"
                          className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-blue transition-colors"
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                          Kompaniya / Brend (Ixtiyoriy)
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, company: e.target.value }))
                          }
                          placeholder="SoftWeb Ventures"
                          className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-blue transition-colors"
                        />
                      </div>
                    </div>

                    {/* Project Description */}
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                        Loyiha tavsifi va talablari <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, description: e.target.value }))
                        }
                        placeholder="Biznesingiz maqsadi, saytda bo'lishi kerak bo'lgan xususiyatlar yoki namunaviy havolalar haqida yozing..."
                        className={cn(
                          "w-full px-4 py-3 rounded-xl bg-surface-200 border text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-blue transition-colors resize-y",
                          formErrors.description ? "border-red-500/60" : "border-white/10"
                        )}
                      />
                      {formErrors.description && (
                        <p className="text-red-400 text-xs font-mono mt-1">
                          {formErrors.description}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Arizangiz to'g'ridan-to'g'ri SoftWeb Telegram Bot tizimiga yetkaziladi</span>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        variant="primary"
                        isLoading={isSubmitting}
                        className="w-full sm:w-auto"
                        rightIcon={<Send className="w-4 h-4" />}
                      >
                        Loyihani buyurtma qilish
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SUCCESS CONFIRMATION STATE */}
            {orderSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 px-6 text-center flex flex-col items-center max-w-xl mx-auto"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="font-display text-3xl font-bold text-white mb-3">
                  Loyiha arizasi muvaffaqiyatli yuborildi!
                </h3>

                <div className="font-mono text-xs text-brand-blue bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 mb-4">
                  Ariza raqami: <strong>{submittedRequestNumber}</strong>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  Rahmat, <strong className="text-white">{formData.fullName}</strong>. Loyihangiz hisob-kitobi va talablari <strong className="text-brand-blue">{siteConfig.telegramUsername}</strong> tizimiga yuborildi. Muhandisimiz qisqa vaqt ichida Telegram yoki Email orqali siz bilan bog'lanadi.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={siteConfig.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-brand-blue text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    Telegramda suhbatni boshlash
                  </a>

                  <Button variant="secondary" size="md" onClick={handleReset}>
                    Yangi hisob-kitob qilish
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
