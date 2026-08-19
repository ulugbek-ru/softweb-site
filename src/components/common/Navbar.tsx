"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dictionary, Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";

interface NavbarProps {
  dict: Dictionary;
  lang: Locale;
  onOpenOrderModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  dict,
  lang,
  onOpenOrderModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = [
        "home",
        "about",
        "services",
        "why-us",
        "process",
        "portfolio",
        "calculator",
        "contact",
      ];

      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);

        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();

      const targetId = href.replace("#", "");
      const el = document.getElementById(targetId);

      if (el) {
        setMobileMenuOpen(false);

        const yOffset = -80;

        const y =
          el.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    }
  };

  const navItems = [
    {
      label: dict.nav.home,
      href: "#home",
      key: "home",
    },
    {
      label: dict.nav.about,
      href: "#about",
      key: "about",
    },
    {
      label: dict.nav.services,
      href: "#services",
      key: "services",
    },
    {
      label: dict.nav.whyUs,
      href: "#why-us",
      key: "why-us",
    },
    {
      label: dict.nav.process,
      href: "#process",
      key: "process",
    },
    {
      label: dict.nav.calculator,
      href: "#calculator",
      key: "calculator",
    },
    {
      label: dict.nav.contact,
      href: "#contact",
      key: "contact",
    },
  ];

  /*
   * Logo:
   *
   * Light mode -> /logo-light.png
   * Dark mode  -> /logo.png
   *
   * mounted tekshiruvi hydration muammosini oldini oladi.
   */
  const logoSrc =
    mounted && theme === "light"
      ? "/logo.png"
      : "/logo-light.png";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-4",
        isScrolled ? "py-3" : "py-5"
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={cn(
            "flex items-center justify-between px-5 sm:px-6 py-3 rounded-2xl transition-all duration-300 border",
            isScrolled
              ? "dark:bg-surface-dark-200/90 bg-white/90 backdrop-blur-xl dark:border-white/10 border-slate-200/80 shadow-lg"
              : "bg-transparent border-transparent"
          )}
        >
          {/* ==================== LOGO ==================== */}

          <Link
            href={`/${lang}#home`}
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center group"
            aria-label="SoftWeb"
          >
            <div className="relative w-[130px] sm:w-[150px] h-10">
              <Image
                src={logoSrc}
                alt="SoftWeb"
                fill
                priority
                sizes="(max-width: 640px) 130px, 150px"
                className="object-contain object-left transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
          </Link>

          {/* ==================== DESKTOP NAVIGATION ==================== */}

          <nav className="hidden lg:flex items-center gap-1 dark:bg-surface-dark-100/60 bg-slate-100/80 p-1.5 rounded-xl border dark:border-white/5 border-slate-200 backdrop-blur-md">
            {navItems.map((link) => {
              const isActive = activeSection === link.key;

              return (
                <Link
                  key={link.key}
                  href={`/${lang}${link.href}`}
                  onClick={(e) =>
                    handleNavClick(e, link.href)
                  }
                  className={cn(
                    "relative px-3.5 py-1.5 text-xs font-semibold tracking-wide font-sans rounded-lg transition-all duration-200",
                    isActive
                      ? "dark:text-white text-slate-900 dark:bg-white/10 bg-white shadow-sm font-bold"
                      : "dark:text-zinc-400 text-slate-600 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-200/50 dark:hover:bg-white/[0.04]"
                  )}
                >
                  {link.label}

                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-brand-green rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ==================== RIGHT ACTION BAR ==================== */}

          <div className="hidden sm:flex items-center gap-3">
            <LanguageSwitcher currentLang={lang} />

            <ThemeToggle />

            <Button
              size="sm"
              variant="orange"
              rightIcon={
                <ArrowUpRight className="w-4 h-4" />
              }
              onClick={() => {
                if (onOpenOrderModal) {
                  onOpenOrderModal();
                } else {
                  const el =
                    document.getElementById(
                      "calculator"
                    );

                  if (el) {
                    el.scrollIntoView({
                      behavior: "smooth",
                    });
                  }
                }
              }}
            >
              {dict.nav.startProject}
            </Button>
          </div>

          {/* ==================== MOBILE CONTROLS ==================== */}

          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen((prev) => !prev)
              }
              className="p-2 rounded-xl dark:bg-surface-dark-100 bg-slate-100 border dark:border-white/10 border-slate-200 dark:text-zinc-300 text-slate-700 hover:text-brand-green transition-colors"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ==================== MOBILE DRAWER ==================== */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.25,
            }}
            className="lg:hidden mt-3 max-w-7xl mx-auto dark:bg-surface-dark-200/95 bg-white/95 backdrop-blur-2xl rounded-2xl border dark:border-white/10 border-slate-200 p-6 shadow-2xl overflow-hidden"
          >
            {/* Language */}

            <div className="flex items-center justify-between pb-4 mb-4 border-b dark:border-white/10 border-slate-200">
              <span className="text-xs font-mono font-bold dark:text-zinc-400 text-slate-500 uppercase">
                Language
              </span>

              <LanguageSwitcher
                currentLang={lang}
                compact
              />
            </div>

            {/* Navigation */}

            <nav className="flex flex-col gap-1.5 mb-6">
              {navItems.map((link, idx) => (
                <motion.div
                  key={link.key}
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: idx * 0.04,
                  }}
                >
                  <Link
                    href={`/${lang}${link.href}`}
                    onClick={(e) =>
                      handleNavClick(
                        e,
                        link.href
                      )
                    }
                    className={cn(
                      "flex items-center justify-between py-2.5 px-4 rounded-xl font-medium text-sm transition-colors",
                      activeSection === link.key
                        ? "text-brand-green bg-brand-green/5"
                        : "dark:text-zinc-300 text-slate-700 hover:text-brand-green dark:hover:bg-white/[0.05] hover:bg-slate-100"
                    )}
                  >
                    <span>{link.label}</span>

                    <span className="text-brand-orange text-xs font-mono font-bold">
                      {String(idx + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile CTA */}

            <div className="flex flex-col gap-3 pt-4 border-t dark:border-white/10 border-slate-200">
              <Button
                variant="orange"
                size="md"
                className="w-full"
                rightIcon={
                  <Sparkles className="w-4 h-4" />
                }
                onClick={() => {
                  setMobileMenuOpen(false);

                  if (onOpenOrderModal) {
                    onOpenOrderModal();
                    return;
                  }

                  const el =
                    document.getElementById(
                      "calculator"
                    );

                  if (el) {
                    el.scrollIntoView({
                      behavior: "smooth",
                    });
                  }
                }}
              >
                {dict.nav.estimateProject}
              </Button>

              <a
                href={siteConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 text-xs font-mono dark:text-zinc-400 text-slate-600 hover:text-brand-green transition-colors"
              >
                <span>
                  Telegram:{" "}
                  {siteConfig.telegramUsername}
                </span>

                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};