'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Residential', href: '/residential' },
  { label: 'Commercial', href: '/commercial' },
  { label: 'Battery Storage', href: '/battery-storage' },
  { label: 'About', href: '/about-us' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Contact', href: '/contact-us' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-md py-2'
            : 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-2.5 xl:py-3'
        }`}
      >
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between gap-2 xl:gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex-shrink-0 relative w-36 sm:w-44 xl:w-48 h-9 sm:h-10 xl:h-11 group transition-transform duration-200 hover:scale-[1.02]"
          >
            <Image
              src="https://billabongsolar.com.au/wp-content/uploads/2024/06/log-new.webp"
              alt="Billabong Solar Victoria"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 flex-shrink-0">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap px-2.5 xl:px-3.5 py-1.5 rounded-full text-[13px] xl:text-[14px] font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-[#FF5E00] bg-orange-50 font-bold shadow-xs'
                      : 'text-[#1E2560] hover:text-[#FF5E00] hover:bg-orange-50/50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Phone + Quote Button */}
          <div className="hidden lg:flex items-center space-x-2.5 xl:space-x-4 flex-shrink-0">
            {/* Phone Call Support Badge */}
            <a
              href="tel:1300897221"
              className="whitespace-nowrap flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200/80 bg-gray-50/70 hover:bg-orange-50 hover:border-orange-200 text-[#1E2560] hover:text-[#FF5E00] transition-colors group"
              aria-label="Call Support at 1300 897 221"
            >
              <div className="w-6 h-6 rounded-full bg-[#FF5E00] text-white flex items-center justify-center flex-shrink-0 shadow-xs group-hover:rotate-12 transition-transform duration-300">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <span className="text-xs xl:text-sm font-extrabold">
                1300 897 221
              </span>
            </a>

            {/* Quote CTA Button */}
            <Link
              href="/get-a-free-quote"
              className="whitespace-nowrap px-4 xl:px-5 py-2 xl:py-2.5 rounded-full font-extrabold text-xs xl:text-sm text-white bg-gradient-to-r from-[#FF5E00] to-[#FF7A00] hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-200 shadow-sm"
            >
              <span>Get a Free Quote</span>
            </Link>
          </div>

          {/* Mobile Right Bar: Quick Call & Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:1300897221"
              className="p-2 rounded-xl bg-orange-50 text-[#FF5E00] border border-orange-200/60 flex items-center justify-center"
              aria-label="Call 1300 897 221"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </a>

            <button
              className="p-2.5 rounded-xl bg-gray-100 text-[#1E2560] hover:bg-orange-50 hover:text-[#FF5E00] transition-colors focus:outline-none"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer Portal */}
      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[99999] lg:hidden transition-opacity duration-300 ${
              isMobileMenuOpen
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Dark Backdrop Overlay */}
            <div
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Drawer Panel */}
            <div
              className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-[340px] bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              {/* Drawer Top Header */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-gray-100 bg-gray-50/70">
                <div className="relative w-36 h-9">
                  <Image
                    src="https://billabongsolar.com.au/wp-content/uploads/2024/06/log-new.webp"
                    alt="Billabong Solar Victoria"
                    fill
                    className="object-contain"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-gray-200/80 hover:bg-orange-100 hover:text-[#FF5E00] flex items-center justify-center text-gray-700 transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links Scrollable Area */}
              <div className="p-4 flex-grow overflow-y-auto space-y-1.5">
                {navItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== '/' && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold text-base transition-colors ${
                        isActive
                          ? 'text-[#FF5E00] bg-orange-50/90 shadow-xs'
                          : 'text-[#1E2560] hover:bg-gray-50 hover:text-[#FF5E00]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  );
                })}
              </div>

              {/* Drawer Bottom CTA Section */}
              <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 space-y-3">
                <a
                  href="tel:1300897221"
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl border border-gray-200 bg-white font-extrabold text-[#1E2560] shadow-sm active:scale-95 transition-transform"
                >
                  <div className="w-6 h-6 rounded-full bg-[#FF5E00] text-white flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <span>1300 897 221</span>
                </a>

                <Link
                  href="/get-a-free-quote"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center w-full py-3.5 rounded-xl font-extrabold text-white bg-gradient-to-r from-[#FF5E00] to-[#FF7A00] shadow-lg shadow-orange-500/30 active:scale-95 transition-transform text-base"
                >
                  Get a Free Quote
                </Link>

                <div className="pt-2 text-center text-[11px] text-gray-400 font-semibold flex items-center justify-center gap-2">
                  <span>✓ NETCC Approved Seller</span>
                  <span>•</span>
                  <span>Licensed A-Grade Electricians</span>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
