"use client";

import React, { useState } from "react";
import { Preloader } from "@/components/common/Preloader";
import { CustomCursor } from "@/components/common/CustomCursor";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhySoftWeb } from "@/components/sections/WhySoftWeb";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PortfolioEmptyState } from "@/components/sections/PortfolioEmptyState";
import { ProjectCalculator } from "@/components/sections/ProjectCalculator";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  const [preloaderFinished, setPreloaderFinished] = useState(false);

  const handleScrollToCalculator = () => {
    const el = document.getElementById("calculator");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#07080c] text-[#f3f4f6] relative selection:bg-brand-indigo/30 selection:text-white">
      {/* Branded Preloader */}
      <Preloader onComplete={() => setPreloaderFinished(true)} />

      {/* Desktop Spring Cursor */}
      <CustomCursor />

      {/* Floating Dynamic Navbar */}
      <Navbar onOpenOrderModal={handleScrollToCalculator} />

      {/* Agency Sections in Seamless Storytelling Flow */}
      <div className="relative z-10">
        <HeroSection onStartProject={handleScrollToCalculator} />
        <AboutSection />
        <ServicesSection />
        <WhySoftWeb />
        <TechStackSection />
        <ProcessSection />
        <PortfolioEmptyState onStartProject={handleScrollToCalculator} />
        <ProjectCalculator />
        <ContactSection />
      </div>

      {/* Architectural Giant Footer */}
      <Footer />
    </main>
  );
}
