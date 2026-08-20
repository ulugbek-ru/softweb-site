"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Send,
  Code2,
  Server,
  Figma,
} from "lucide-react";
import Image from "next/image";
import { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type TeamMemberId =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10";

type TeamMemberType = "frontend" | "backend" | "designer";

interface TeamMember {
  id: TeamMemberId;
  name: string;
  image: string;
  github: string;
  telegram: string;
  type: TeamMemberType;
}

interface OurTeamSectionProps {
  dict: Dictionary;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Ulug'bek Raxmatillayev",
    image: "/ulugbek-image.png",
    github: "https://github.com/ulugbek-ru",
    telegram: "https://t.me/ulugbekraxmatillayev",
    type: "frontend",
  },

  {
    id: "2",
    name: "Ismoil Sayfiddinov",
    image: "/avatar.png",
    github: "https://github.com/IsmoilSayfitdinov",
    telegram: "https://t.me/IsmoilSayfitdinov_dev",
    type: "frontend",
  },

  {
    id: "3",
    name: "Sodiqjon Sodiqov",
    image: "/avatar.png",
    github: "https://github.com/Sodiq578",
    telegram: "https://t.me/Sadikov001",
    type: "frontend",
  },

  {
    id: "4",
    name: "Jasur Rasulov",
    image: "/avatar.png",
    github: "https://github.com/username",
    telegram: "https://t.me/programmer_3758",
    type: "frontend",
  },

  {
    id: "5",
    name: "Og'abek",
    image: "/avatar.png",
    github: "https://github.com/OgabekAI",
    telegram: "https://t.me/z1effyy",
    type: "backend",
  },

  {
    id: "6",
    name: "Muhammadali Baxtiyorov",
    image: "/avatar.png",
    github: "https://github.com/muhammadalibaxtiyorov625-creator",
    telegram: "https://t.me/Muhammadali_Dasturchi_001",
    type: "backend",
  },

  {
    id: "7",
    name: "Ibrohim Ahmadjonov",
    image: "/avatar.png",
    github: "https://github.com/ibrohimmath",
    telegram: "https://t.me/devnmath",
    type: "backend",
  },

  {
    id: "8",
    name: "Salohiddin Nurbayev",
    image: "/avatar.png",
    github: "https://github.com/username",
    telegram: "https://t.me/username",
    type: "backend",
  },

  {
    id: "9",
    name: "Iroda Inoyatullayev",
    image: "/avatar.png",
    github: "https://github.com/username",
    telegram: "https://t.me/inoyatullayeva_1",
    type: "designer",
  },

  {
    id: "10",
    name: "Shoxrux Xamidullayev",
    image: "/avatar.png",
    github: "https://github.com/username",
    telegram: "https://t.me/shohruhxamidullayev",
    type: "designer",
  },
];

export const OurTeamSection: React.FC<OurTeamSectionProps> = ({
  dict,
}) => {
  return (
    <section
      id="team"
      className="relative overflow-hidden bg-white py-24 dark:bg-surface-dark-300 sm:py-32"
    >
      {/* ==================== BACKGROUND ==================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Green glow */}
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-green/10 blur-[120px]" />

        {/* Orange glow */}
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-brand-orange/10 blur-[120px]" />

        {/* Purple designer glow */}
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[150px]" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ==================== HEADER ==================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-brand-green" />

            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              {dict.team?.label || "OUR TEAM"}
            </span>

            <span className="font-mono text-xs text-brand-orange">
              // 04
            </span>
          </div>

          <h2 className="font-sans text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            {dict.team?.title || "People behind"}{" "}
            <span className="relative inline-block text-brand-green">
              {dict.team?.highlight || "SoftWeb"}

              <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-brand-orange/70" />
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-zinc-400 sm:text-lg">
            {dict.team?.description ||
              "A small team building modern digital products with technology, creativity and attention to detail."}
          </p>
        </motion.div>

        {/* ==================== TEAM GRID ==================== */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => {
            const isFrontend = member.type === "frontend";
            const isBackend = member.type === "backend";
            const isDesigner = member.type === "designer";

            /*
             * IMPORTANT:
             * member.id -> "1" | "2" | ... | "10"
             *
             * Shuning uchun:
             * dict.team.members[member.id]
             *
             * TypeScript string indexing error bermaydi.
             */

            const memberTranslation = dict.team?.members?.[member.id];

            const role =
              memberTranslation?.role || "Team Member";

            const description =
              memberTranslation?.description ||
              "Professional digital product development.";

            /* ==================== DEPARTMENT ==================== */

            const department = isFrontend
              ? dict.team?.frontend || "Frontend"
              : isBackend
                ? dict.team?.backend || "Backend"
                : dict.team?.designer || "Figma Designer";

            /* ==================== COLORS ==================== */

            const cardGradient = isFrontend
              ? "bg-gradient-to-br from-brand-green via-emerald-500 to-green-700"
              : isBackend
                ? "bg-gradient-to-br from-brand-orange via-orange-500 to-red-600"
                : "bg-gradient-to-br from-violet-500 via-purple-600 to-fuchsia-600";

            const departmentColor = isFrontend
              ? "text-brand-green"
              : isBackend
                ? "text-brand-orange"
                : "text-purple-500 dark:text-purple-400";

            const hoverBorder = isFrontend
              ? "hover:border-brand-green"
              : isBackend
                ? "hover:border-brand-orange"
                : "hover:border-purple-500";

            const hoverBackground = isFrontend
              ? "hover:bg-brand-green"
              : isBackend
                ? "hover:bg-brand-orange"
                : "hover:bg-purple-600";

            return (
              <motion.article
                key={member.id}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group relative"
              >
                {/* ==================== CARD ==================== */}

                <div
                  className={cn(
                    "relative h-full overflow-hidden rounded-[28px]",
                    "border bg-white dark:bg-surface-dark-200",
                    "border-slate-200 dark:border-white/10",
                    "shadow-sm hover:shadow-2xl",
                    "transition-all duration-500",
                    hoverBorder
                  )}
                >
                  {/* ==================== IMAGE AREA ==================== */}

                  <div className="relative aspect-[4/4.5] overflow-hidden">
                    {/* Colored background */}

                    <div
                      className={cn(
                        "absolute inset-0 transition-transform duration-700 group-hover:scale-105",
                        cardGradient
                      )}
                    />

                    {/* Decorative circle 1 */}

                    <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-white/20" />

                    {/* Decorative circle 2 */}

                    <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full border border-white/10" />

                    {/* Decorative circle 3 for designer */}

                    {isDesigner && (
                      <>
                        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

                        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
                      </>
                    )}

                    {/* ==================== DEPARTMENT BADGE ==================== */}

                    <div className="absolute left-5 top-5 z-10">
                      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                        {isFrontend ? (
                          <Code2 className="h-3.5 w-3.5" />
                        ) : isBackend ? (
                          <Server className="h-3.5 w-3.5" />
                        ) : (
                          <Figma className="h-3.5 w-3.5" />
                        )}

                        {department}
                      </div>
                    </div>

                    {/* ==================== NUMBER ==================== */}

                    <span className="absolute right-5 top-5 font-mono text-xs font-bold text-white/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* ==================== PERSON IMAGE ==================== */}

                    <div className="absolute inset-x-5 bottom-0 top-14 flex items-end justify-center">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={500}
                        height={600}
                        priority={index === 0}
                        className={cn(
                          "h-full w-full object-contain object-bottom",
                          "drop-shadow-2xl",
                          "transition-transform duration-700",
                          "group-hover:scale-[1.04]",
                          member.id !== "1" &&
                            "opacity-95"
                        )}
                      />
                    </div>

                    {/* Bottom gradient */}

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Designer subtle Figma mark */}

                    {isDesigner && (
                      <div className="absolute bottom-5 right-5 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-black/20 text-white backdrop-blur-md">
                        <Figma className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  {/* ==================== INFO ==================== */}

                  <div className="relative p-5">
                    {/* Name & role */}

                    <div className="mb-4">
                      <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-white">
                        {member.name}
                      </h3>

                      <div
                        className={cn(
                          "mt-1 font-mono text-xs font-bold uppercase tracking-wider",
                          departmentColor
                        )}
                      >
                        {role}
                      </div>
                    </div>

                    {/* Description */}

                    <p className="min-h-[66px] text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                      {description}
                    </p>

                    {/* ==================== SOCIAL ==================== */}

                    <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/10">
                      <div className="flex items-center gap-2">
                        {/* GitHub */}

                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} GitHub`}
                          className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-xl",
                            "border border-slate-200 dark:border-white/10",
                            "bg-slate-50 dark:bg-white/[0.04]",
                            "text-slate-600 dark:text-zinc-400",
                            "transition-all duration-300",
                            "hover:text-white",
                            hoverBorder,
                            hoverBackground
                          )}
                        >
                          <Github className="h-4 w-4" />
                        </a>

                        {/* Telegram */}

                        <a
                          href={member.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} Telegram`}
                          className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-xl",
                            "border border-slate-200 dark:border-white/10",
                            "bg-slate-50 dark:bg-white/[0.04]",
                            "text-slate-600 dark:text-zinc-400",
                            "transition-all duration-300",
                            "hover:text-white",
                            hoverBorder,
                            hoverBackground
                          )}
                        >
                          <Send className="h-4 w-4" />
                        </a>
                      </div>

                      {/* Department */}

                      <span
                        className={cn(
                          "font-mono text-[10px] font-bold uppercase tracking-wider",
                          departmentColor
                        )}
                      >
                        {department}
                      </span>
                    </div>
                  </div>

                  {/* ==================== HOVER GLOW ==================== */}

                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 rounded-[28px]",
                      "opacity-0 transition-opacity duration-500",
                      "group-hover:opacity-100",
                      isFrontend &&
                        "shadow-[inset_0_0_0_1px_rgba(34,197,94,0.35)]",
                      isBackend &&
                        "shadow-[inset_0_0_0_1px_rgba(249,115,22,0.35)]",
                      isDesigner &&
                        "shadow-[inset_0_0_0_1px_rgba(168,85,247,0.45)]"
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