"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowUp, ArrowUpRight, Github, Send, Heart } from "lucide-react";
import { Dictionary, Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface FooterProps {
  dict: Dictionary;
  lang: Locale;
}

export const Footer: React.FC<FooterProps> = ({ dict, lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: dict.nav.home, href: "#home" },
    { label: dict.nav.about, href: "#about" },
    { label: dict.nav.services, href: "#services" },
    { label: dict.nav.whyUs, href: "#why-us" },
    { label: dict.nav.process, href: "#process" },
    { label: dict.nav.calculator, href: "#calculator" },
    { label: dict.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="relative border-t dark:border-white/10 border-slate-200 dark:bg-surface-dark-300 bg-white pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b dark:border-white/10 border-slate-200">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href={`/${lang}#home`} className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-green to-emerald-400 flex items-center justify-center font-bold text-white shadow-glow-green">
                S
              </div>
              <span className="font-sans text-xl font-bold tracking-tight dark:text-white text-slate-900">
                SOFT<span className="text-brand-green">WEB</span>
              </span>
            </Link>

            <p className="dark:text-zinc-400 text-slate-600 text-xs font-normal leading-relaxed max-w-sm mb-6">
              {dict.footer.desc}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-brand-green">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
              <span>{dict.footer.available}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-sans font-bold text-sm uppercase font-mono tracking-wider dark:text-white text-slate-900 mb-4">
              {dict.footer.navTitle}
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={`/${lang}${link.href}`}
                    className="dark:text-zinc-400 text-slate-600 hover:text-brand-green transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="font-sans font-bold text-sm uppercase font-mono tracking-wider dark:text-white text-slate-900 mb-4">
              {dict.footer.capTitle}
            </h4>
            <ul className="space-y-2 text-xs font-mono dark:text-zinc-400 text-slate-600">
              <li>Web Development</li>
              <li>Landing Pages</li>
              <li>Web Applications</li>
              <li>SaaS Platforms</li>
              <li>E-Commerce</li>
              <li>UI/UX Design</li>
              <li>Telegram Bots</li>
            </ul>
          </div>

          {/* Contact & Language */}
          <div>
            <h4 className="font-sans font-bold text-sm uppercase font-mono tracking-wider dark:text-white text-slate-900 mb-4">
              {dict.footer.contactTitle}
            </h4>
            <ul className="space-y-2 text-xs font-mono dark:text-zinc-400 text-slate-600 mb-6">
              <li>Telegram: {siteConfig.telegramUsername}</li>
              <li>Email: {siteConfig.contact.email}</li>
              <li>{siteConfig.contact.location}</li>
            </ul>

            <div className="flex items-center gap-2">
              <LanguageSwitcher currentLang={lang} compact />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono dark:text-zinc-500 text-slate-500">
            © {new Date().getFullYear()} {siteConfig.name}. {dict.footer.rights}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl dark:bg-white/5 bg-slate-100 dark:text-zinc-300 text-slate-700 hover:text-brand-green border dark:border-white/10 border-slate-200 text-xs font-mono font-bold transition-all"
          >
            <span>{dict.footer.backTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
