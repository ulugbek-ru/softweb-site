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

interface AdvantageItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  badge: string;
  desc: string;
  metric: string;
  metricLabel: string;
}

const advantages: AdvantageItem[] = [
  {
    id: "tech",
    icon: <Code2 className="w-5 h-5" />,
    title: "Modern Technology",
    badge: "Next.js & TS",
    desc: "We write clean, typed Next.js App Router and TypeScript code with zero unnecessary dependencies or slow drag-and-drop engines.",
    metric: "100%",
    metricLabel: "Bespoke Codebase",
  },
  {
    id: "design",
    icon: <Sparkles className="w-5 h-5" />,
    title: "Premium Aesthetics",
    badge: "Awwwards Standard",
    desc: "Tailored visual hierarchies, balanced whitespace, dark obsidian textures, and fluid micro-animations that command respect.",
    metric: "60 FPS",
    metricLabel: "Fluid Micro-Interactions",
  },
  {
    id: "speed",
    icon: <Zap className="w-5 h-5" />,
    title: "Sub-Second Performance",
    badge: "Ultra Fast",
    desc: "Optimized asset pipelines, static site generation, server-rendered components, and edge caching for instant page delivery.",
    metric: "<0.6s",
    metricLabel: "Average Page Load",
  },
  {
    id: "responsive",
    icon: <Smartphone className="w-5 h-5" />,
    title: "Adaptive Responsive UX",
    badge: "Multi-Screen",
    desc: "Every component is meticulously tested and fine-tuned for high-end 4K monitors, laptops, iPads, iPhones, and Android devices.",
    metric: "100%",
    metricLabel: "Mobile Optimized",
  },
  {
    id: "scalable",
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Scalable Architecture",
    badge: "Enterprise Ready",
    desc: "Built to handle thousands of concurrent visits with resilient database connections, security headers, and clean API layers.",
    metric: "99.9%",
    metricLabel: "Uptime Reliability",
  },
  {
    id: "business",
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Business-Driven Focus",
    badge: "High ROI",
    desc: "We don't build art for art's sake. Every user flow, CTA placement, and form is engineered to convert visitors into paying clients.",
    metric: "3.5x",
    metricLabel: "Higher Conversion Intent",
  },
];

export const WhySoftWeb: React.FC = () => {
  return (
    <section id="why-us" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-surface-300/30">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-brand-purple/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          number="03"
          badge="The SoftWeb Advantage"
          title={
            <>
              Why Ambitious Brands <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-purple">
                Choose SoftWeb.
              </span>
            </>
          }
          subtitle="We combine engineering rigor with world-class digital design to deliver platforms that generate enduring commercial value."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {advantages.map((adv, idx) => (
            <motion.div
              key={adv.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className="p-8 rounded-3xl bg-surface-100/60 border border-white/10 hover:border-brand-blue/30 hover:bg-surface-100/90 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-surface-200 border border-white/10 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                    {adv.icon}
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-mono rounded-full bg-white/5 border border-white/10 text-zinc-400">
                    {adv.badge}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-brand-blue transition-colors">
                  {adv.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed font-light mb-8">
                  {adv.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-baseline justify-between">
                <div>
                  <div className="font-display text-2xl font-black text-white tracking-tight">
                    {adv.metric}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500">{adv.metricLabel}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-white group-hover:bg-brand-blue/20 transition-all">
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
