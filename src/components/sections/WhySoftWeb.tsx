"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import {
  Code2,
  Sparkles,
  Zap,
  Smartphone,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Dictionary } from "@/lib/i18n";

interface WhySoftWebProps {
  dict: Dictionary;
}

export const WhySoftWeb: React.FC<WhySoftWebProps> = ({ dict }) => {
  const advantages = [
    {
      id: "tech",
      icon: <Code2 className="w-5 h-5" />,
      title: dict.whyUs.techTitle,
      badge: "Next.js 14/15",
      desc: dict.whyUs.techDesc,
      metric: "100%",
      metricLabel: "Clean Codebase",
    },
    {
      id: "design",
      icon: <Sparkles className="w-5 h-5" />,
      title: dict.whyUs.designTitle,
      badge: "Awwwards",
      desc: dict.whyUs.designDesc,
      metric: "60 FPS",
      metricLabel: "Smooth Physics",
      isOrange: true,
    },
    {
      id: "speed",
      icon: <Zap className="w-5 h-5" />,
      title: dict.whyUs.speedTitle,
      badge: "Google 95+",
      desc: dict.whyUs.speedDesc,
      metric: "<0.6s",
      metricLabel: "Sub-Second Load",
    },
    {
      id: "responsive",
      icon: <Smartphone className="w-5 h-5" />,
      title: dict.whyUs.responsiveTitle,
      badge: "Multi-Device",
      desc: dict.whyUs.responsiveDesc,
      metric: "100%",
      metricLabel: "Responsive UX",
      isOrange: true,
    },
    {
      id: "scalable",
      icon: <ShieldCheck className="w-5 h-5" />,
      title: dict.whyUs.scaleTitle,
      badge: "Enterprise",
      desc: dict.whyUs.scaleDesc,
      metric: "99.9%",
      metricLabel: "Uptime Scale",
    },
    {
      id: "business",
      icon: <TrendingUp className="w-5 h-5" />,
      title: dict.whyUs.businessTitle,
      badge: "High ROI",
      desc: dict.whyUs.businessDesc,
      metric: "3.5x",
      metricLabel: "Higher Conversion",
      isOrange: true,
    },
  ];

  return (
    <section id="why-us" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden dark:bg-surface-dark-300/40 bg-slate-100/50">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-brand-orange/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          number="03"
          badge={dict.whyUs.badge}
          title={
            <>
              {dict.whyUs.title} <br />
              <span className="text-brand-orange">
                {dict.whyUs.titleAccent}
              </span>
            </>
          }
          subtitle={dict.whyUs.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {advantages.map((adv, idx) => (
            <motion.div
              key={adv.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="p-8 rounded-3xl dark:bg-surface-dark-100/70 bg-white border dark:border-white/10 border-slate-200 shadow-sm hover:border-brand-green transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                      adv.isOrange
                        ? "bg-orange-500/10 text-brand-orange border border-orange-500/20"
                        : "bg-emerald-500/10 text-brand-green border border-emerald-500/20"
                    }`}
                  >
                    {adv.icon}
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-mono rounded-full dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-200 dark:text-zinc-400 text-slate-600 font-bold">
                    {adv.badge}
                  </span>
                </div>

                <h3 className="font-sans font-bold dark:text-white text-slate-900 text-xl mb-3 group-hover:text-brand-green transition-colors">
                  {adv.title}
                </h3>

                <p className="dark:text-zinc-400 text-slate-600 text-sm leading-relaxed font-normal mb-8">
                  {adv.desc}
                </p>
              </div>

              <div className="pt-6 border-t dark:border-white/10 border-slate-200 flex items-baseline justify-between">
                <div>
                  <div className={`font-sans text-3xl font-extrabold tracking-tight ${adv.isOrange ? "text-brand-orange" : "text-brand-green"}`}>
                    {adv.metric}
                  </div>
                  <div className="text-[11px] font-mono dark:text-zinc-500 text-slate-500 font-semibold">{adv.metricLabel}</div>
                </div>
                <div className="w-8 h-8 rounded-full dark:bg-white/5 bg-slate-100 flex items-center justify-center dark:text-zinc-400 text-slate-600 group-hover:text-white group-hover:bg-brand-green transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
