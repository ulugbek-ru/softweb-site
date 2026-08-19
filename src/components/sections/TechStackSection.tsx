"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import {
  Code2,
  Database,
  Globe,
  Layers,
  Server,
  Sparkles,
  Zap,
  Terminal,
} from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  icon: React.ReactNode;
}

const technologies: TechItem[] = [
  { name: "Next.js 14/15", category: "Framework", icon: <Globe className="w-4 h-4" /> },
  { name: "TypeScript", category: "Language", icon: <Code2 className="w-4 h-4" /> },
  { name: "React 18/19", category: "UI Library", icon: <Sparkles className="w-4 h-4" /> },
  { name: "Tailwind CSS", category: "Styling", icon: <Layers className="w-4 h-4" /> },
  { name: "Framer Motion", category: "Animation", icon: <Zap className="w-4 h-4" /> },
  { name: "Node.js", category: "Backend", icon: <Server className="w-4 h-4" /> },
  { name: "PostgreSQL", category: "Database", icon: <Database className="w-4 h-4" /> },
  { name: "Supabase", category: "BaaS & Auth", icon: <Terminal className="w-4 h-4" /> },
  { name: "Figma", category: "Design", icon: <Sparkles className="w-4 h-4" /> },
  { name: "Telegram Bot API", category: "Automation", icon: <Globe className="w-4 h-4" /> },
  { name: "Zod & Hook Form", category: "Validation", icon: <Layers className="w-4 h-4" /> },
  { name: "REST & GraphQL", category: "API Layer", icon: <Server className="w-4 h-4" /> },
  { name: "Docker & Cloud", category: "DevOps", icon: <Terminal className="w-4 h-4" /> },
  { name: "Vercel Edge", category: "Infrastructure", icon: <Zap className="w-4 h-4" /> },
];

export const TechStackSection: React.FC = () => {
  // Double list for seamless infinite loop
  const marqueeItems = [...technologies, ...technologies];

  return (
    <section className="relative py-20 overflow-hidden border-y border-white/5 bg-[#08090d]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <Badge variant="brand" className="mb-3">
            Engineered With Precision
          </Badge>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Industry-Leading Technology Stack
          </h3>
          <p className="text-zinc-400 text-sm font-light mt-2 max-w-lg">
            We build exclusively with modern, battle-tested tools optimized for high velocity, stability, and speed.
          </p>
        </motion.div>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-4 py-2 hover:[animation-play-state:paused]">
          {marqueeItems.map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-surface-100/70 border border-white/10 text-zinc-300 hover:border-brand-blue/40 hover:text-white transition-all shadow-sm shrink-0"
            >
              <div className="text-brand-blue p-1.5 rounded-lg bg-surface-200 border border-white/5">
                {tech.icon}
              </div>
              <div className="text-left">
                <div className="font-mono text-xs font-bold text-white tracking-wide">
                  {tech.name}
                </div>
                <div className="text-[10px] font-mono text-zinc-500">{tech.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
