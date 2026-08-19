import React from "react";
import { Metadata } from "next";
import { getDictionary, isValidLocale, Locale, DEFAULT_LOCALE } from "@/lib/i18n";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/common/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhySoftWeb } from "@/components/sections/WhySoftWeb";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PortfolioEmptyState } from "@/components/sections/PortfolioEmptyState";
import { ProjectCalculator } from "@/components/sections/ProjectCalculator";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/common/Footer";
import { CustomCursor } from "@/components/common/CustomCursor";

interface LocalizedPageProps {
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const lang = isValidLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const dict = getDictionary(lang);

  const titles: Record<Locale, string> = {
    uz: "SoftWeb — Professional IT & Raqamli Agentlik",
    ru: "SoftWeb — Профессиональное Веб-Агентство & Разработка",
    en: "SoftWeb — Premium Digital Agency & Full-Stack Engineering",
  };

  const descriptions: Record<Locale, string> = {
    uz: dict.hero.subtitle,
    ru: dict.hero.subtitle,
    en: dict.hero.subtitle,
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      url: `${siteConfig.url}/${lang}`,
      siteName: siteConfig.name,
      locale: lang === "uz" ? "uz_UZ" : lang === "ru" ? "ru_RU" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: `${siteConfig.url}/${lang}`,
      languages: {
        uz: `${siteConfig.url}/uz`,
        ru: `${siteConfig.url}/ru`,
        en: `${siteConfig.url}/en`,
      },
    },
  };
}

export default function LocalizedPage({ params }: LocalizedPageProps) {
  const lang: Locale = isValidLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const dict = getDictionary(lang);

  return (
    <main className="min-h-screen relative overflow-hidden dark:bg-background-dark bg-background-light dark:text-white text-slate-900 transition-colors duration-300">
      <CustomCursor />
      <Navbar dict={dict} lang={lang} />
      <HeroSection dict={dict} />
      <AboutSection dict={dict} />
      <ServicesSection dict={dict} />
      <WhySoftWeb dict={dict} />
      <TechStackSection dict={dict} />
      <ProcessSection dict={dict} />
      <PortfolioEmptyState dict={dict} />
      <ProjectCalculator dict={dict} />
      <ContactSection dict={dict} />
      <Footer dict={dict} lang={lang} />
    </main>
  );
}
