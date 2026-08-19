"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "orange" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] group select-none cursor-pointer";

    const sizes = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-7 py-3.5 gap-2.5 font-semibold",
      xl: "text-lg px-8 py-4 gap-3 font-bold",
    };

    const variants = {
      primary:
        "bg-brand-green hover:bg-brand-greenHover text-white shadow-glow-green hover:shadow-lg border border-green-500/20",
      orange:
        "bg-brand-orange hover:bg-brand-orangeHover text-white shadow-glow-orange hover:shadow-lg border border-orange-500/20",
      secondary:
        "dark:bg-surface-dark-100 dark:text-white dark:border-white/10 dark:hover:bg-surface-dark-50 bg-white text-slate-800 border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm",
      outline:
        "bg-transparent dark:text-zinc-200 text-slate-700 dark:border-white/15 border-slate-300 dark:hover:border-white/40 hover:border-brand-green dark:hover:bg-white/[0.04] hover:bg-slate-100/50",
      ghost:
        "bg-transparent dark:text-zinc-400 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/[0.06] hover:bg-slate-200/50",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(base, sizes[size], variants[variant], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current mr-1" />}
        {!isLoading && leftIcon && <span className="transition-transform group-hover:-translate-x-0.5">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="transition-transform group-hover:translate-x-0.5">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
