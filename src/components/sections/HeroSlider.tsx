'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideData {
  id: string;
  pillLabel: string;
  pillIcon: string;
  badge: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  description: string;
  metricValue: string;
  metricLabel: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

const slides: SlideData[] = [
  {
    id: 'savings',
    pillLabel: 'Massive Savings',
    pillIcon: '☀️',
    badge: '✓ NETCC Approved Seller • Licensed A-Grade Electricians',
    headingPrefix: 'Say Goodbye to',
    headingHighlight: 'Massive Electricity Bills',
    headingSuffix: 'with Solar Power',
    description:
      'Harness Victoria’s abundant sunshine to generate 100% clean electricity. Slash your power bills by up to 80% and save up to $20,000/year with government-approved solar systems.',
    metricValue: 'Up to $20k/yr',
    metricLabel: 'Typical Lifetime Household Savings',
    ctaText: 'Calculate Your Solar Savings',
    ctaLink: '/get-a-free-quote/',
    secondaryCtaText: 'Call 1300 897 221',
    secondaryCtaLink: 'tel:1300897221',
  },
  {
    id: 'electricians',
    pillLabel: 'Accredited Electricians',
    pillIcon: '⚡',
    badge: '✓ 100% In-House A-Grade Clean Energy Electricians',
    headingPrefix: 'Engineered & Installed by',
    headingHighlight: 'Accredited Electricians',
    headingSuffix: 'in Victoria',
    description:
      'Zero subcontractors. Our master solar electricians and clean energy engineers have over 10+ years of Australian grid-connect experience, ensuring flawless safety and maximum power yield.',
    metricValue: '10+ Years',
    metricLabel: 'Victorian Engineering Experience',
    ctaText: 'Book Free On-Site Inspection',
    ctaLink: '/get-a-free-quote/',
    secondaryCtaText: 'View Our Credentials',
    secondaryCtaLink: '/about-us/',
  },
  {
    id: 'tier1',
    pillLabel: 'Tier-1 Technology',
    pillIcon: '🛡️',
    badge: '✓ Bloomberg Tier-1 N-Type Solar & Smart Batteries',
    headingPrefix: 'Powered Exclusively by',
    headingHighlight: 'Tier-1 Solar & Batteries',
    headingSuffix: 'for Long-Term Reliability',
    description:
      'We install industry-leading Bloomberg Tier-1 N-Type monocrystalline panels, Sigenergy, GoodWe, and Alpha ESS smart batteries with up to 25-year performance warranties.',
    metricValue: '25-Year',
    metricLabel: 'Manufacturer Performance Warranty',
    ctaText: 'Explore Solar Packages',
    ctaLink: '/residential/',
    secondaryCtaText: 'Call 1300 897 221',
    secondaryCtaLink: 'tel:1300897221',
  },
];

export default function HeroSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto rotate slides every 6 seconds unless user hovers
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeSlide = slides[activeIdx];

  return (
    <section
      className="relative w-full min-h-[700px] lg:min-h-[780px] xl:min-h-[820px] bg-[#0c1026] overflow-hidden flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Billabong Solar Hero Section"
    >
      {/* 1. Photorealistic Australian Home with Sunburst & Solar Array */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/images/solar-electric-hero.jpg"
          alt="Modern Victorian home powered by rooftop solar panels under bright sun and clean electric power"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center] lg:object-center transform scale-105 transition-transform duration-1000 ease-out"
        />

        {/* 2. Radiant Sun Flare Glow Overlay in Upper Sky */}
        <div
          className="absolute top-[8%] left-[58%] md:left-[55%] -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[540px] md:h-[540px] bg-gradient-to-br from-amber-200/40 via-orange-400/25 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"
          style={{ animationDuration: '4s' }}
        />

        {/* 3. Flowing Electricity Streams (SVG Conduit Energy Pulse) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="electric-beam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.9" />
            </linearGradient>
            <filter id="electric-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Roof solar energy circuit line */}
          <path
            d="M 520 280 L 720 270 L 780 340 L 740 450 L 710 520"
            fill="none"
            stroke="url(#electric-beam)"
            strokeWidth="2.5"
            strokeDasharray="10 14"
            className="animate-electric-dash opacity-60"
            filter="url(#electric-glow)"
          />
        </svg>

        {/* 4. High-Contrast Vignette & Content Gradient */}
        {/* Darkened gradient on the left ensures 100% legible white text, while transparent on the right to reveal the sun and panels */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F24]/95 via-[#0B0F24]/85 md:via-[#0B0F24]/75 lg:via-[#0B0F24]/65 to-[#0B0F24]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F24] via-transparent to-[#0B0F24]/30" />
      </div>

      {/* 5. Main Hero Container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, Tabs & Actions (Col 1-7) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-start">
            
            {/* Interactive Narrative Tabs (Pills) - Zero Ghosting Switching */}
            <div className="flex flex-wrap items-center gap-2 mb-6 p-1 bg-white/10 backdrop-blur-md rounded-full border border-white/15">
              {slides.map((slide, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-white shadow-md bg-gradient-to-r from-[#FF5E00] to-[#E04800]'
                        : 'text-gray-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{slide.pillIcon}</span>
                    <span>{slide.pillLabel}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping ml-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content Block with Smooth AnimatePresence (Guaranteed No Overlap) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full"
              >
                {/* Trust Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide mb-4 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {activeSlide.badge}
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight mb-5">
                  {activeSlide.headingPrefix}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A1A] via-[#FFA84A] to-amber-300">
                    {activeSlide.headingHighlight}
                  </span>{' '}
                  {activeSlide.headingSuffix}
                </h1>

                {/* Subtitle Description */}
                <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mb-8">
                  {activeSlide.description}
                </p>

                {/* Call-to-Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8">
                  <Link
                    href={activeSlide.ctaLink}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-extrabold text-base text-white bg-gradient-to-r from-[#FF5E00] to-[#E04800] hover:from-[#E04800] hover:to-[#C73C00] transition-all duration-300 shadow-[0_0_25px_rgba(255,94,0,0.45)] hover:shadow-[0_0_35px_rgba(255,94,0,0.7)] hover:-translate-y-0.5 active:translate-y-0 text-center"
                  >
                    <span>{activeSlide.ctaText}</span>
                    <svg
                      className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>

                  <a
                    href={activeSlide.secondaryCtaLink}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold text-sm sm:text-base text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all duration-300 backdrop-blur-md text-center"
                  >
                    <svg
                      className="w-5 h-5 text-amber-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
                    </svg>
                    <span>{activeSlide.secondaryCtaText}</span>
                  </a>
                </div>

                {/* Victorian Government Rebate Guarantee Notice */}
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 max-w-xl backdrop-blur-sm">
                  <span className="text-amber-400 font-bold text-base">🏛️</span>
                  <span>
                    <strong className="text-white font-semibold">Solar Victoria Rebate:</strong> Up to{' '}
                    <span className="text-amber-300 font-bold">$1,400 subsidy</span> +{' '}
                    <span className="text-amber-300 font-bold">$1,400 interest-free loan</span> applied directly on your quote.
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Progress / Dots Navigation */}
            <div className="flex items-center gap-2 mt-8">
              {slides.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveIdx(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    dotIdx === activeIdx
                      ? 'w-10 bg-[#FF5E00]'
                      : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
              <span className="text-[11px] text-gray-400 uppercase tracking-widest ml-3 font-semibold">
                0{activeIdx + 1} / 0{slides.length}
              </span>
            </div>
          </div>

          {/* Right Column: Live Solar & Electric Power Telemetry Card (Col 8-12) */}
          <div className="lg:col-span-5 xl:col-span-4 hidden lg:flex flex-col gap-4">
            
            {/* Glassmorphic Real-Time Solar & Power HUD */}
            <div className="relative rounded-3xl bg-gradient-to-b from-[#141B3D]/80 to-[#0C1126]/90 border border-white/15 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              
              {/* Telemetry Header with Pulsing Solar Sun Indicator */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-xs font-bold text-amber-300 tracking-wider uppercase">
                    Live Victorian Solar Power
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-gray-400 bg-white/10 px-2.5 py-1 rounded-full">
                  Tier-1 System
                </span>
              </div>

              {/* Real-Time Metrics Grid */}
              <div className="grid grid-cols-2 gap-3.5 mb-5">
                {/* Metric 1: Sun Generation */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-amber-500/20 flex flex-col">
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold mb-1">
                    <span>☀️</span>
                    <span>Sun Generation</span>
                  </div>
                  <div className="text-2xl font-black text-white">9.6 kW</div>
                  <div className="text-[11px] text-amber-200/80 font-medium">Peak Solar Output</div>
                </div>

                {/* Metric 2: Clean Electricity */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-cyan-500/20 flex flex-col">
                  <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-bold mb-1">
                    <span>⚡</span>
                    <span>Clean Power</span>
                  </div>
                  <div className="text-2xl font-black text-white">100%</div>
                  <div className="text-[11px] text-cyan-200/80 font-medium">Home Self-Sufficiency</div>
                </div>

                {/* Metric 3: Battery Storage */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-emerald-500/20 flex flex-col">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold mb-1">
                    <span>🔋</span>
                    <span>Smart Battery</span>
                  </div>
                  <div className="text-2xl font-black text-white">98%</div>
                  <div className="text-[11px] text-emerald-200/80 font-medium">Charged & Ready</div>
                </div>

                {/* Metric 4: Annual Savings */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-orange-500/20 flex flex-col">
                  <div className="flex items-center gap-1.5 text-xs text-orange-300 font-bold mb-1">
                    <span>💰</span>
                    <span>Est. Savings</span>
                  </div>
                  <div className="text-2xl font-black text-white">-$2,450</div>
                  <div className="text-[11px] text-orange-200/80 font-medium">Per Year Power Bill</div>
                </div>
              </div>

              {/* Dynamic Energy Flow Indicator Bar */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Grid Export:</span>
                </div>
                <span className="text-emerald-400 font-bold font-mono">+7.8 kW Feed-In</span>
              </div>

              {/* Certified Guarantee Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                <span>Victoria Grid DNSP Pre-Approved</span>
                <span className="text-amber-400 font-semibold">10-25 Yr Warranty</span>
              </div>
            </div>

            {/* Quick Consultation Ribbon */}
            <div className="rounded-2xl bg-gradient-to-r from-[#FF5E00]/20 to-amber-500/20 border border-[#FF5E00]/30 p-4 backdrop-blur-md flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Want tailored savings for your roof?</div>
                <div className="text-[11px] text-gray-300">Free engineering design & quote in 24 hrs</div>
              </div>
              <Link
                href="/get-a-free-quote/"
                className="px-3.5 py-1.5 rounded-full bg-[#FF5E00] hover:bg-orange-600 text-white text-xs font-extrabold transition-all"
              >
                Quote →
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* Tailwind keyframes for electric conduit pulse */}
      <style jsx global>{`
        @keyframes electricDash {
          to {
            stroke-dashoffset: -48;
          }
        }
        .animate-electric-dash {
          animation: electricDash 1.8s linear infinite;
        }
      `}</style>
    </section>
  );
}
