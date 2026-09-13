'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  id: number;
  bgImage: string;
  badgeIcon: string;
  badgeText: string;
  heading: string;
  highlightWord?: string;
  subtext: string;
  ctaText: string;
  ctaLink: string;
  secondaryText: string;
  secondaryLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    bgImage: '/images/slider-sun-electricity.jpg',
    badgeIcon: '☀️',
    badgeText: 'Harness Victoria’s Sun • Slash Energy Bills',
    heading: 'Goodbye to Massive Electricity Bills',
    highlightWord: 'Electricity Bills',
    subtext: 'Save up to $20,000/year with government-approved solar systems. Let our engineers show you how!',
    ctaText: 'Book Your Free Consultation',
    ctaLink: '/get-a-free-quote/',
    secondaryText: 'Call 1300 897 221',
    secondaryLink: 'tel:1300897221',
  },
  {
    id: 2,
    bgImage: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Slider_Accrediated-Electrician-Victoria-Solar.webp?w=1920&ssl=1',
    badgeIcon: '⚡',
    badgeText: 'NETCC Approved Seller • Licensed A-Grade Electricians',
    heading: 'Installed by Accredited Electricians',
    highlightWord: 'Accredited Electricians',
    subtext: 'Designed by Clean Energy engineers with over 10 years of experience in Victorian Solar Solutions.',
    ctaText: 'Book Your Free Consultation',
    ctaLink: '/get-a-free-quote/',
    secondaryText: 'View Our Accreditations',
    secondaryLink: '/about-us/',
  },
  {
    id: 3,
    bgImage: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Slider_Tier-1-Solar-Panels-Victoria.webp?w=1920&ssl=1',
    badgeIcon: '🛡️',
    badgeText: 'Bloomberg Tier-1 N-Type Monocrystalline Panels',
    heading: 'We Use Tier-1 Panels Only',
    highlightWord: 'Tier-1 Panels',
    subtext: 'Get generous Victorian rebates & $1,400 interest-free loans. Maximum efficiency, backed by 25-year warranties.',
    ctaText: 'Book Your Free Consultation',
    ctaLink: '/get-a-free-quote/',
    secondaryText: 'Explore Solar Packages',
    secondaryLink: '/residential/',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-advance every 6 seconds unless paused by mouse hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const activeSlide = slides[current];

  return (
    <section
      className="relative w-full h-[620px] sm:h-[680px] md:h-[728px] bg-[#0c1026] overflow-hidden group select-none flex items-center justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Billabong Solar Hero Slider"
    >
      {/* 1. Background Images with Smooth Cross-Fade (Zero Stacking Artifacts) */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
          }`}
        >
          <Image
            src={slide.bgImage}
            alt={slide.heading}
            fill
            priority={idx === 0}
            sizes="100vw"
            className="object-cover object-center transform scale-100 transition-transform duration-7000 ease-out"
          />

          {/* Sun & Electricity Ambient Lighting Overlay */}
          {idx === 0 && (
            <div
              className="absolute top-[10%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[500px] md:h-[500px] bg-gradient-to-br from-amber-300/35 via-orange-400/20 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"
              style={{ animationDuration: '4s' }}
            />
          )}

          {/* High-Contrast Gradient Scrim: Darkened evenly so text is 100% crisp without ghosting */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/40" />
        </div>
      ))}

      {/* 2. Slide Content - Guaranteed Zero Ghosting with AnimatePresence mode="wait" */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl text-center flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {/* Trust Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-semibold text-white mb-6 shadow-md">
              <span>{activeSlide.badgeIcon}</span>
              <span>{activeSlide.badgeText}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.15] drop-shadow-md">
              {activeSlide.heading}
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl font-light leading-relaxed drop-shadow">
              {activeSlide.subtext}
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href={activeSlide.ctaLink}
                className="w-full sm:w-auto inline-block bg-[#FF5E00] hover:bg-[#e04f00] text-white font-extrabold py-4 px-9 rounded-full text-base sm:text-lg transition-all duration-300 shadow-[0_0_20px_rgba(255,94,0,0.4)] hover:shadow-[0_0_30px_rgba(255,94,0,0.6)] transform hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                {activeSlide.ctaText} →
              </Link>
              <a
                href={activeSlide.secondaryLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold py-4 px-7 rounded-full text-base border border-white/30 backdrop-blur-md transition-all duration-300 text-center"
              >
                <svg className="w-5 h-5 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
                </svg>
                <span>{activeSlide.secondaryText}</span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Navigation Controls: Left & Right Glassmorphic Buttons */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 opacity-70 group-hover:opacity-100 hover:scale-110 active:scale-95"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 opacity-70 group-hover:opacity-100 hover:scale-110 active:scale-95"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* 4. Numbered Pagination Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((slide, dotIdx) => {
          const isActive = dotIdx === current;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrent(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                isActive ? 'w-10 bg-[#FF5E00] shadow-sm' : 'w-2.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}
