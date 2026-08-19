"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop/non-touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if interactive
      const isInteractive = Boolean(
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select") ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer")
      );

      const customText = target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");

      setIsPointer(isInteractive);
      setCursorText(customText || null);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsHovered(true);
    const handleMouseUp = () => setIsHovered(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] hidden md:block">
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-blue/50 flex items-center justify-center pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          width: cursorText ? 80 : isPointer ? 46 : 28,
          height: cursorText ? 80 : isPointer ? 46 : 28,
          backgroundColor: isPointer
            ? "rgba(56, 189, 248, 0.12)"
            : "rgba(99, 102, 241, 0.05)",
          backdropFilter: isPointer ? "blur(2px)" : "none",
          transition: "width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s ease-out",
        }}
        animate={{
          scale: isHovered ? 0.8 : 1,
        }}
      >
        {cursorText && (
          <span className="font-mono text-[10px] font-bold text-white uppercase tracking-wider text-center px-1">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Tiny Sharp Center Dot */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-blue pointer-events-none shadow-[0_0_8px_#38bdf8]"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isPointer ? 0 : 1,
          opacity: isPointer ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};
