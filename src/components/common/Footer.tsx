"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Dictionary, Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTheme } from "@/components/theme/ThemeProvider";

interface FooterProps {
  dict: Dictionary;
  lang: Locale;
}

export const Footer: React.FC<FooterProps> = ({ dict, lang }) => {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleHomeClick = () => {
    setTimeout(() => {
      const home = document.getElementById("home");

      if (home) {
        home.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 50);
  };

  const navLinks = [
    {
      label: dict.nav.home,
      href: "#home",
    },
    {
      label: dict.nav.about,
      href: "#about",
    },
    {
      label: dict.nav.services,
      href: "#services",
    },
    {
      label: dict.nav.whyUs,
      href: "#why-us",
    },
    {
      label: dict.nav.process,
      href: "#process",
    },
    {
      label: dict.nav.calculator,
      href: "#calculator",
    },
    {
      label: dict.nav.contact,
      href: "#contact",
    },
  ];

  /*
   * Logo:
   *
   * Light mode -> /logo.png
   * Dark mode  -> /logo-light.png
   *
   * mounted tekshiruvi hydration muammosining oldini oladi.
   */
  const logoSrc =
    mounted && theme === "dark"
      ? "/logo-light.png"
      : "/logo.png";

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white pt-16 pb-12 dark:border-white/10 dark:bg-surface-dark-300">
      {/* Decorative background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-brand-green/5 blur-3xl dark:bg-brand-green/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-brand-orange/5 blur-3xl dark:bg-brand-orange/10"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 border-b border-slate-200 pb-12 dark:border-white/10 md:grid-cols-2 lg:grid-cols-5">
          {/* ==================== BRAND INFO ==================== */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link
              href={`/${lang}#home`}
              onClick={handleHomeClick}
              className="group mb-5 inline-flex items-center"
              aria-label="SoftWeb — Home"
            >
              <div className="relative h-10 w-[135px] sm:h-11 sm:w-[155px]">
                <Image
                  src={logoSrc}
                  alt="SoftWeb"
                  fill
                  priority
                  sizes="155px"
                  className="object-contain object-left transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
            </Link>

            {/* Description */}
            <p className="mb-6 max-w-sm text-xs font-normal leading-relaxed text-slate-600 dark:text-zinc-400">
              {dict.footer.desc}
            </p>

            {/* Availability */}
            <div className="flex items-center gap-2 text-xs font-mono text-brand-green">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
              </span>

              <span>{dict.footer.available}</span>
            </div>
          </div>

          {/* ==================== QUICK NAVIGATION ==================== */}
          <div>
            <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {dict.footer.navTitle}
            </h4>

            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={`/${lang}${link.href}`}
                    onClick={handleHomeClick}
                    className="text-xs font-mono text-slate-600 transition-colors hover:text-brand-green dark:text-zinc-400 dark:hover:text-brand-green"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ==================== CAPABILITIES ==================== */}
          <div>
            <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {dict.footer.capTitle}
            </h4>

            <ul className="space-y-2 text-xs font-mono text-slate-600 dark:text-zinc-400">
              <li className="transition-colors hover:text-brand-green">
                Web Development
              </li>

              <li className="transition-colors hover:text-brand-green">
                Landing Pages
              </li>

              <li className="transition-colors hover:text-brand-green">
                Web Applications
              </li>

              <li className="transition-colors hover:text-brand-green">
                SaaS Platforms
              </li>

              <li className="transition-colors hover:text-brand-green">
                E-Commerce
              </li>

              <li className="transition-colors hover:text-brand-green">
                UI/UX Design
              </li>

              <li className="transition-colors hover:text-brand-green">
                Telegram Bots
              </li>
            </ul>
          </div>

          {/* ==================== CONTACT ==================== */}
          <div>
            <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {dict.footer.contactTitle}
            </h4>

            <ul className="mb-6 space-y-3 text-xs font-mono text-slate-600 dark:text-zinc-400">
              {/* Telegram */}
              <li>
                <a
                  href={siteConfig.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-brand-green"
                >
                  <span>
                    Telegram: {siteConfig.telegramUsername}
                  </span>

                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-brand-green"
                >
                  Email: {siteConfig.contact.email}
                </a>
              </li>

              {/* Location */}
              <li>{siteConfig.contact.location}</li>
            </ul>

            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher
                currentLang={lang}
                compact
              />
            </div>
          </div>
        </div>

        {/* ==================== BOTTOM BAR ==================== */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          {/* Copyright */}
          <div className="text-center text-xs font-mono text-slate-500 dark:text-zinc-500 sm:text-left">
            © {new Date().getFullYear()} {siteConfig.name}.{" "}
            {dict.footer.rights}
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label={dict.footer.backTop}
            className="group flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-mono font-bold text-slate-700 transition-all hover:border-brand-green/30 hover:text-brand-green dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-brand-green/30 dark:hover:text-brand-green"
          >
            <span>{dict.footer.backTop}</span>

            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};