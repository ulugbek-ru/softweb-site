"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "brand" | "glow" | "outline";
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = "default",
  icon,
  ...props
}) => {
  const base =
    "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono tracking-wider uppercase rounded-full transition-all duration-300";

  const variants = {
    default: "bg-surface-100/80 text-zinc-300 border border-white/10 shadow-sm",
    brand:
      "bg-brand-indigo/10 text-brand-blue border border-brand-indigo/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]",
    glow: "bg-brand-purple/10 text-brand-purple border border-brand-purple/40 shadow-glow-sm",
    outline: "border border-white/20 text-zinc-400 hover:border-white/40",
  };

  return (
    <div className={cn(base, variants[variant], className)} {...props}>
      {icon && <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />}
      {children}
    </div>
  );
};
