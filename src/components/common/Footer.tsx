"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowUp, ArrowUpRight, Heart, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050608] border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-indigo/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link href="#home" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue via-brand-indigo to-brand-purple flex items-center justify-center shadow-glow-sm">
                <span className="font-display font-black text-white text-base">S</span>
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                SOFT
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
                  WEB
                </span>
              </span>
            </Link>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-6">
              Engineering digital experiences, bespoke web platforms, and conversion-focused systems for ambitious businesses worldwide.
            </p>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-100/80 border border-white/10 text-xs font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Q1–Q4 2026 Projects</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-5 font-semibold">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3 font-mono text-xs">
              {siteConfig.navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-zinc-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Quick links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-5 font-semibold">
              Capabilities
            </h4>
            <ul className="flex flex-col gap-3 font-mono text-xs text-zinc-400">
              <li className="hover:text-white transition-colors">Web Development</li>
              <li className="hover:text-white transition-colors">UI/UX Interface Design</li>
              <li className="hover:text-white transition-colors">Full-Stack Systems</li>
              <li className="hover:text-white transition-colors">E-Commerce & Payments</li>
              <li className="hover:text-white transition-colors">Custom SaaS Platforms</li>
              <li className="hover:text-white transition-colors">Telegram Bot Integrations</li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-5 font-semibold">
              Direct Contact
            </h4>
            <ul className="flex flex-col gap-3 font-mono text-xs">
              <li>
                <a
                  href={siteConfig.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>{siteConfig.telegramUsername}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="text-zinc-500">{siteConfig.contact.location}</li>
            </ul>

            <div className="mt-6 flex items-center gap-3">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-surface-100/90 border border-white/10 flex items-center justify-center text-xs font-mono text-zinc-400 hover:text-white hover:border-brand-blue/50 hover:bg-surface-50 transition-all"
                  aria-label={social.name}
                >
                  {social.name.substring(0, 2)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Massive Aesthetic Brand Watermark */}
        <div className="relative py-8 my-8 border-y border-white/5 select-none overflow-hidden text-center">
          <span className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[140px] text-white/[0.03] tracking-tighter block whitespace-nowrap">
            SOFTWEB STUDIO
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span>© 2026 SoftWeb. All rights reserved.</span>
            <span>•</span>
            <span className="text-zinc-400 flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by SoftWeb
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-100/60 hover:bg-surface-50 border border-white/10 text-zinc-400 hover:text-white transition-all group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
