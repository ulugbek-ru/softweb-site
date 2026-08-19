"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Terminal, Cpu, Sparkles, Compass, Globe2, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Dictionary } from "@/lib/i18n";

interface AboutSectionProps {
  dict: Dictionary;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ dict }) => {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-green/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="01"
          badge={dict.about.badge}
          title={
            <>
              {dict.about.title} <br />
              <span className="text-brand-green">
                {dict.about.titleAccent}
              </span>
            </>
          }
          subtitle={dict.about.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mt-12">
          {/* Left Column: Manifesto Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-10 rounded-3xl dark:bg-surface-dark-100/90 bg-white border dark:border-white/10 border-slate-200 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 blur-[90px] pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-brand-green uppercase tracking-widest mb-6">
                <Terminal className="w-4 h-4" />
                <span>SoftWeb Manifesto</span>
              </div>

              <h3 className="font-sans text-2xl sm:text-3xl font-bold dark:text-white text-slate-900 leading-snug mb-6">
                {dict.about.manifestoTitle}
              </h3>

              <p className="dark:text-zinc-300 text-slate-600 text-base leading-relaxed font-normal mb-6">
                {dict.about.manifestoText1}
              </p>

              <p className="dark:text-zinc-400 text-slate-500 text-sm leading-relaxed font-normal">
                {dict.about.manifestoText2}
              </p>
            </div>

            <div className="pt-8 mt-8 border-t dark:border-white/10 border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 border border-brand-green/30 flex items-center justify-center font-sans font-bold text-brand-green text-sm">
                  UR
                </div>
                <div>
                  <div className="text-sm font-bold dark:text-white text-slate-900">{siteConfig.founder}</div>
                  <div className="text-xs font-mono dark:text-zinc-500 text-slate-500">{dict.about.founderRole}</div>
                </div>
              </div>

              <a
                href={siteConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-green hover:text-brand-greenHover transition-colors font-bold"
              >
                <span>{dict.about.contactTg}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Key Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl dark:bg-surface-dark-100/60 bg-white border dark:border-white/10 border-slate-200 shadow-sm hover:border-brand-green/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-brand-green flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-sans font-bold dark:text-white text-slate-900 text-lg mb-2">{dict.about.pillar1Title}</h4>
              <p className="dark:text-zinc-400 text-slate-600 text-xs leading-relaxed font-normal">
                {dict.about.pillar1Desc}
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl dark:bg-surface-dark-100/60 bg-white border dark:border-white/10 border-slate-200 shadow-sm hover:border-brand-orange/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-brand-orange flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-sans font-bold dark:text-white text-slate-900 text-lg mb-2">{dict.about.pillar2Title}</h4>
              <p className="dark:text-zinc-400 text-slate-600 text-xs leading-relaxed font-normal">
                {dict.about.pillar2Desc}
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl dark:bg-surface-dark-100/60 bg-white border dark:border-white/10 border-slate-200 shadow-sm hover:border-brand-orange/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-brand-orange flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-sans font-bold dark:text-white text-slate-900 text-lg mb-2">{dict.about.pillar3Title}</h4>
              <p className="dark:text-zinc-400 text-slate-600 text-xs leading-relaxed font-normal">
                {dict.about.pillar3Desc}
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl dark:bg-surface-dark-100/60 bg-white border dark:border-white/10 border-slate-200 shadow-sm hover:border-brand-green/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-brand-green flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe2 className="w-5 h-5" />
              </div>
              <h4 className="font-sans font-bold dark:text-white text-slate-900 text-lg mb-2">{dict.about.pillar4Title}</h4>
              <p className="dark:text-zinc-400 text-slate-600 text-xs leading-relaxed font-normal">
                {dict.about.pillar4Desc}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
