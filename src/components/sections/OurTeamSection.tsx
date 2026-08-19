"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Send,
  ArrowUpRight,
  Code2,
  Server,
} from "lucide-react";
import Image from "next/image";
import { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  github: string;
  telegram: string;
  type: "frontend" | "backend";
}

interface OurTeamSectionProps {
  dict: Dictionary;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Ulug'bek Raxmatillayev",
    role: "Full-Stack Developer",
    description:
      "Modern web applications, scalable architectures and high-performance digital products.",
    image: "/team/ulugbek.jpg",
    github: "https://github.com/yourusername",
    telegram: "https://t.me/yourusername",
    type: "frontend",
  },
  {
    id: 2,
    name: "Team Member",
    role: "Frontend Developer",
    description:
      "Creative interfaces, smooth interactions and responsive user experiences.",
    image: "/team/member-2.jpg",
    github: "https://github.com/username",
    telegram: "https://t.me/username",
    type: "frontend",
  },
  {
    id: 3,
    name: "Team Member",
    role: "Backend Developer",
    description:
      "Reliable APIs, databases and backend systems built for real-world products.",
    image: "/team/member-3.jpg",
    github: "https://github.com/username",
    telegram: "https://t.me/username",
    type: "backend",
  },
  {
    id: 4,
    name: "Team Member",
    role: "Backend Developer",
    description:
      "Secure server-side architecture, integrations and scalable infrastructure.",
    image: "/team/member-4.jpg",
    github: "https://github.com/username",
    telegram: "https://t.me/username",
    type: "backend",
  },
];

export const OurTeamSection: React.FC<OurTeamSectionProps> = ({ dict }) => {
  return (
    <section
      id="team"
      className="relative py-24 sm:py-32 overflow-hidden bg-white dark:bg-surface-dark-300"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-brand-green/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-brand-orange/10 blur-[120px]" />

        <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-brand-green" />

            <span className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-brand-green">
              {dict.team?.label || "OUR TEAM"}
            </span>

            <span className="text-brand-orange text-xs font-mono">
              // 04
            </span>
          </div>

          <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.05]">
            {dict.team?.title || "People behind"}{" "}
            <span className="relative inline-block text-brand-green">
              {dict.team?.highlight || "SoftWeb"}
              <span className="absolute -bottom-1 left-0 w-full h-1 rounded-full bg-brand-orange/70" />
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-zinc-400 max-w-2xl">
            {dict.team?.description ||
              "A small team of developers building modern digital products with technology, creativity and attention to detail."}
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {teamMembers.map((member, index) => {
            const isFrontend = member.type === "frontend";

            return (
              <motion.article
                key={member.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* Card */}
                <div
                  className={cn(
                    "relative h-full overflow-hidden rounded-[28px]",
                    "border bg-white dark:bg-surface-dark-200",
                    "border-slate-200 dark:border-white/10",
                    "shadow-sm hover:shadow-2xl",
                    "transition-all duration-500"
                  )}
                >
                  {/* Image area */}
                  <div className="relative aspect-[4/4.5] overflow-hidden">
                    {/* Colored background */}
                    <div
                      className={cn(
                        "absolute inset-0 transition-transform duration-700 group-hover:scale-105",
                        isFrontend
                          ? "bg-gradient-to-br from-brand-green via-emerald-500 to-green-700"
                          : "bg-gradient-to-br from-brand-orange via-orange-500 to-red-600"
                      )}
                    />

                    {/* Decorative circles */}
                    <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full border border-white/20" />
                    <div className="absolute -bottom-20 -left-20 w-52 h-52 rounded-full border border-white/10" />

                    <div className="absolute top-5 left-5 z-10">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/15 text-white text-[10px] font-mono uppercase tracking-wider">
                        {isFrontend ? (
                          <Code2 className="w-3.5 h-3.5" />
                        ) : (
                          <Server className="w-3.5 h-3.5" />
                        )}

                        {isFrontend ? "Frontend" : "Backend"}
                      </div>
                    </div>

                    {/* Number */}
                    <span className="absolute top-5 right-5 text-white/30 text-xs font-mono font-bold">
                      0{index + 1}
                    </span>

                    {/* Person image */}
                    <div className="absolute inset-x-5 bottom-0 top-14 flex items-end justify-center">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={500}
                        height={600}
                        className="w-full h-full object-contain object-bottom drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>

                    {/* Bottom gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  </div>

                  {/* Info */}
                  <div className="relative p-5">
                    <div className="mb-4">
                      <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-white">
                        {member.name}
                      </h3>

                      <div
                        className={cn(
                          "mt-1 text-xs font-mono font-bold uppercase tracking-wider",
                          isFrontend
                            ? "text-brand-green"
                            : "text-brand-orange"
                        )}
                      >
                        {member.role}
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400 min-h-[66px]">
                      {member.description}
                    </p>

                    {/* Social links */}
                    <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} GitHub`}
                          className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center",
                            "border border-slate-200 dark:border-white/10",
                            "bg-slate-50 dark:bg-white/[0.04]",
                            "text-slate-600 dark:text-zinc-400",
                            "hover:text-white transition-all duration-300",
                            isFrontend
                              ? "hover:bg-brand-green hover:border-brand-green"
                              : "hover:bg-brand-orange hover:border-brand-orange"
                          )}
                        >
                          <Github className="w-4 h-4" />
                        </a>

                        <a
                          href={member.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} Telegram`}
                          className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center",
                            "border border-slate-200 dark:border-white/10",
                            "bg-slate-50 dark:bg-white/[0.04]",
                            "text-slate-600 dark:text-zinc-400",
                            "hover:text-white transition-all duration-300",
                            isFrontend
                              ? "hover:bg-brand-green hover:border-brand-green"
                              : "hover:bg-brand-orange hover:border-brand-orange"
                          )}
                        >
                          <Send className="w-4 h-4" />
                        </a>
                      </div>

                      <span
                        className={cn(
                          "text-[10px] font-mono font-bold uppercase tracking-wider",
                          isFrontend
                            ? "text-brand-green"
                            : "text-brand-orange"
                        )}
                      >
                        {isFrontend ? "Frontend" : "Backend"}
                      </span>
                    </div>
                  </div>

                  {/* Hover border glow */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-[28px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                      isFrontend
                        ? "shadow-[inset_0_0_0_1px_rgba(34,197,94,0.35)]"
                        : "shadow-[inset_0_0_0_1px_rgba(249,115,22,0.35)]"
                    )}
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};