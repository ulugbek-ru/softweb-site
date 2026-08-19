"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Sparkles, Terminal, Cpu, Globe2, Compass, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-indigo/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="01"
          badge="Manifesto & Philosophy"
          title={
            <>
              We Don&apos;t Just Build Websites. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-purple">
                We Engineer Digital Experiences.
              </span>
            </>
          }
          subtitle="SoftWeb exists to bridge the gap between creative visual artistry and robust, enterprise-grade engineering."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mt-12">
          {/* Left Column: Deep Manifesto Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-glass border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 blur-[90px] pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-brand-blue uppercase tracking-widest mb-6">
                <Terminal className="w-4 h-4" />
                <span>The SoftWeb Standard</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug mb-6">
                In a digital landscape filled with templated clutter, we engineer bespoke platforms that stand out.
              </h3>

              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light mb-6">
                Every project at SoftWeb is treated as a strategic digital asset. We reject cookie-cutter themes and generic WordPress site-builders in favor of hand-crafted Next.js architecture, custom design systems, and hyper-responsive user journeys.
              </p>

              <p className="text-zinc-400 text-sm leading-relaxed">
                Whether you need a high-converting landing page, an authoritative business platform, an e-commerce ecosystem, or a custom SaaS product — our mission is to make your brand impossible to ignore.
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-100 border border-white/10 flex items-center justify-center font-display font-bold text-white text-sm">
                  UR
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{siteConfig.founder}</div>
                  <div className="text-xs font-mono text-zinc-500">Founder & Lead Engineer</div>
                </div>
              </div>

              <a
                href={siteConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-blue hover:text-brand-purple transition-colors font-semibold"
              >
                <span>Direct Contact via Telegram</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Key Pillars & Live Stat Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-surface-100/60 border border-white/10 hover:border-brand-blue/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-white text-lg mb-2">Bespoke Code</h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Zero slow page-builders. Written line-by-line with TypeScript, Tailwind CSS and Next.js.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-surface-100/60 border border-white/10 hover:border-brand-indigo/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-brand-indigo/10 text-brand-indigo flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-white text-lg mb-2">Awwwards Aesthetics</h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Smooth motion physics, balanced whitespace, and high-contrast typography.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-surface-100/60 border border-white/10 hover:border-brand-purple/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-white text-lg mb-2">Conversion Focus</h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Every element and CTA is deliberately planned to convert casual visitors into clients.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-surface-100/60 border border-white/10 hover:border-emerald-400/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe2 className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-white text-lg mb-2">Full Integration</h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Direct Telegram bots, payment processors, custom APIs, and scalable databases.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
