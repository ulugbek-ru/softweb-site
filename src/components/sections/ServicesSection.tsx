"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import {
  Code,
  Globe,
  Layers,
  ShoppingBag,
  Palette,
  Bot,
  Cpu,
  Layout,
  ArrowUpRight,
} from "lucide-react";
import { Dictionary } from "@/lib/i18n";

interface ServicesSectionProps {
  dict: Dictionary;
  onSelectServiceForCalculator?: (serviceId: string) => void;
}

interface ServiceCardItem {
  id: string;
  number: string;
  titleKey: string;
  descKey: string;
  icon: React.ReactNode;
  isOrangeAccent?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  dict,
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

  const servicesList: ServiceCardItem[] = [
    {
      id: "web-dev",
      number: "01",
      titleKey: dict.services.webDevTitle,
      descKey: dict.services.webDevDesc,
      icon: <Code className="w-5 h-5" />,
    },
    {
      id: "landing",
      number: "02",
      titleKey: dict.services.landingTitle,
      descKey: dict.services.landingDesc,
      icon: <Layout className="w-5 h-5" />,
      isOrangeAccent: true,
    },
    {
      id: "web-app",
      number: "03",
      titleKey: dict.services.webAppTitle,
      descKey: dict.services.webAppDesc,
      icon: <Layers className="w-5 h-5" />,
    },
    {
      id: "saas",
      number: "04",
      titleKey: dict.services.saasTitle,
      descKey: dict.services.saasDesc,
      icon: <Globe className="w-5 h-5" />,
      isOrangeAccent: true,
    },
    {
      id: "ecommerce",
      number: "05",
      titleKey: dict.services.ecommerceTitle,
      descKey: dict.services.ecommerceDesc,
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      id: "ui-ux",
      number: "06",
      titleKey: dict.services.uiuxTitle,
      descKey: dict.services.uiuxDesc,
      icon: <Palette className="w-5 h-5" />,
      isOrangeAccent: true,
    },
    {
      id: "tg-bot",
      number: "07",
      titleKey: dict.services.tgBotTitle,
      descKey: dict.services.tgBotDesc,
      icon: <Bot className="w-5 h-5" />,
    },
    {
      id: "custom",
      number: "08",
      titleKey: dict.services.customTitle,
      descKey: dict.services.customDesc,
      icon: <Cpu className="w-5 h-5" />,
      isOrangeAccent: true,
    },
  ];

  return (
    <section id="services" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-brand-green/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="02"
          badge={dict.services.badge}
          title={
            <>
              {dict.services.title} <br />
              <span className="text-brand-green">
                {dict.services.titleAccent}
              </span>
            </>
          }
          subtitle={dict.services.subtitle}
        />

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {servicesList.map((service, idx) => {
            const isHovered = hoveredId === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative rounded-3xl dark:bg-surface-dark-100/70 bg-white border dark:border-white/10 border-slate-200 p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 dark:hover:border-brand-green/50 hover:border-brand-green shadow-sm hover:shadow-xl"
              >
                {/* Number Watermark */}
                <div className="absolute -right-2 -top-4 font-sans font-extrabold text-7xl dark:text-white/[0.04] text-slate-900/[0.04] select-none pointer-events-none transition-all duration-300 group-hover:scale-105">
                  {service.number}
                </div>

                <div>
                  {/* Icon & Index */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                        service.isOrangeAccent
                          ? "bg-orange-500/10 text-brand-orange border border-orange-500/20"
                          : "bg-emerald-500/10 text-brand-green border border-emerald-500/20"
                      }`}
                    >
                      {service.icon}
                    </div>

                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full dark:bg-white/5 bg-slate-100 dark:text-zinc-400 text-slate-600 border dark:border-white/10 border-slate-200">
                      {service.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-sans font-bold text-xl dark:text-white text-slate-900 mb-2.5 group-hover:text-brand-green transition-colors">
                    {service.titleKey}
                  </h3>

                  <p className="dark:text-zinc-400 text-slate-600 text-xs leading-relaxed font-normal mb-6">
                    {service.descKey}
                  </p>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t dark:border-white/10 border-slate-200 flex items-center justify-between">
                  <button
                    onClick={() => handleSelectService(service.id)}
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold text-brand-green hover:text-brand-greenHover transition-colors group-hover:translate-x-0.5"
                  >
                    <span>{dict.services.estimateBtn}</span>
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
