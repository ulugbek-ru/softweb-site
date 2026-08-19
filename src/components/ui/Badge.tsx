"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "brand" | "orange" | "outline";
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
    default:
      "dark:bg-surface-dark-100/80 dark:text-zinc-300 dark:border-white/10 bg-slate-100 text-slate-700 border-slate-200 border shadow-sm",
    brand:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-sm",
    orange:
      "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30 shadow-sm",
    outline:
      "border dark:border-white/20 border-slate-300 dark:text-zinc-400 text-slate-600 hover:border-slate-400",
  };

  return (
    <div className={cn(base, variants[variant], className)} {...props}>
      {icon && <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />}
      {children}
    </div>
  );
};
