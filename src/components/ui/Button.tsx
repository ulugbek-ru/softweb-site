"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "glow" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
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
      "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] group select-none";

    const sizes = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-7 py-3.5 gap-2.5",
      xl: "text-lg px-8 py-4 gap-3 font-semibold",
    };

    const variants = {
      primary:
        "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] hover:brightness-110 border border-white/20",
      secondary:
        "bg-surface-100/90 text-white border border-white/10 hover:bg-surface-50 hover:border-white/25 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]",
      outline:
        "bg-transparent text-zinc-200 border border-white/15 hover:border-white/40 hover:bg-white/[0.04]",
      glow:
        "bg-white text-black font-semibold shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.7)] hover:bg-zinc-100",
      ghost:
        "bg-transparent text-zinc-400 hover:text-white hover:bg-white/[0.06]",
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
