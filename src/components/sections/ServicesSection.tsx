"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { servicesData, ServiceItem } from "@/config/services";
import { ArrowUpRight, CheckCircle2, Sparkles, Layers, Code, Palette, ShoppingBag, Globe, Cpu } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ServicesSectionProps {
  onSelectServiceForCalculator?: (serviceId: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  "web-dev": <Code className="w-5 h-5" />,
  "ui-ux": <Palette className="w-5 h-5" />,
  "full-stack": <Layers className="w-5 h-5" />,
  "ecommerce": <ShoppingBag className="w-5 h-5" />,
  "business-sites": <Globe className="w-5 h-5" />,
  "custom-products": <Cpu className="w-5 h-5" />,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForCalculator,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleSelectService = (id: string) => {
    if (onSelectServiceForCalculator) {
      onSelectServiceForCalculator(id);
    }
    const el = document.getElementById("calculator");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Lighting Orbs */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-brand-blue/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="02"
          badge="Core Capabilities"
          title={
            <>
              What We Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
                Engineered for Impact.
              </span>
            </>
          }
          subtitle="From high-converting web applications to custom enterprise architectures, discover our comprehensive digital service spectrum."
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {servicesData.map((service: ServiceItem, idx: number) => {
            const isHovered = hoveredId === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative rounded-3xl bg-surface-100/50 border border-white/10 p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-brand-blue/40 hover:bg-surface-100/80 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              >
                {/* Giant Ambient Index Watermark on Hover */}
                <div
                  className="absolute -right-3 -top-6 font-display font-black text-8xl md:text-9xl text-white/[0.03] select-none pointer-events-none transition-all duration-500 group-hover:text-white/[0.08] group-hover:scale-105"
                  style={{
                    color: isHovered ? "rgba(99, 102, 241, 0.12)" : undefined,
                  }}
                >
                  {service.number}
                </div>

                {/* Subtle Radial Glow Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative z-10">
                  {/* Service Top Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-surface-200 border border-white/10 flex items-center justify-center text-white group-hover:text-brand-blue group-hover:border-brand-blue/30 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300">
                      {iconMap[service.id] || <Sparkles className="w-5 h-5" />}
                    </div>

                    <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 group-hover:text-white transition-colors">
                      {service.number}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-blue transition-all duration-300">
                    {service.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
                    {service.shortDesc}
                  </p>

                  {/* Feature Highlights */}
                  <div className="space-y-2.5 mb-8">
                    {service.features.slice(0, 3).map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5 max-w-[65%]">
                    {service.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 text-zinc-400 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSelectService(service.id)}
                    className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-zinc-400 group-hover:text-brand-blue transition-colors group-hover:translate-x-0.5"
                    aria-label={`Calculate ${service.title}`}
                  >
                    <span>Estimate</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
