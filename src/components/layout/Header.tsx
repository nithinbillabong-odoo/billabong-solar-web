'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Residential', href: '/' },
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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/70 shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-2.5'
          : 'bg-white/80 backdrop-blur-xl border-b border-gray-100/80 shadow-[0_4px_20px_rgb(0,0,0,0.04)] py-3.5'
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex-shrink-0 relative w-44 md:w-52 h-11 md:h-12 group transition-transform duration-200 hover:scale-[1.02]">
          <Image
            src="https://billabongsolar.com.au/wp-content/uploads/2024/06/log-new.webp"
            alt="Billabong Solar Victoria"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-1.5 rounded-full text-[14px] xl:text-[15px] font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-[#FF5E00] bg-orange-50/90 shadow-sm'
                    : 'text-[#1E2560] hover:text-[#FF5E00] hover:bg-orange-50/50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Phone + Quote Button */}
        <div className="hidden lg:flex items-center space-x-5">
          {/* Phone Call Support Badge */}
          <a
            href="tel:1300897221"
            className="flex items-center gap-2.5 group transition-transform duration-200 hover:scale-[1.02]"
            aria-label="Call Support at 1300 897 221"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF5E00] to-[#FF7A00] flex items-center justify-center text-white shadow-sm group-hover:rotate-12 transition-transform duration-300">
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </div>
            <div className="text-left leading-tight">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Call Support
              </span>
              <span className="block text-sm font-extrabold text-[#1E2560] group-hover:text-[#FF5E00] transition-colors">
                1300 897 221
              </span>
            </div>
          </a>

          {/* Premium Glowing Quote CTA Button */}
          <Link
            href="/get-a-free-quote"
            className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-full font-bold text-sm text-white overflow-hidden shadow-[0_4px_14px_0_rgba(255,94,0,0.35)] bg-gradient-to-r from-[#FF5E00] via-[#FF6A00] to-[#FF7A00] hover:shadow-[0_6px_22px_rgba(255,94,0,0.48)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <span>Get a Free Quote</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden p-2 rounded-xl bg-gray-50 border border-gray-200 text-[#1E2560] hover:bg-orange-50 hover:text-[#FF5E00] transition-colors focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white/95 backdrop-blur-2xl z-50 shadow-2xl border-l border-white/50 flex flex-col transform transition-transform duration-300 ease-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5 flex items-center justify-between border-b border-gray-100">
          <span className="font-extrabold text-[#1E2560] text-lg">Menu</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 flex-grow overflow-y-auto space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 rounded-xl font-semibold text-base transition-colors ${
                  isActive
                    ? 'text-[#FF5E00] bg-orange-50/90 font-bold'
                    : 'text-[#1E2560] hover:bg-gray-50 hover:text-[#FF5E00]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50/80 space-y-3">
          <a
            href="tel:1300897221"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-200 bg-white font-bold text-[#1E2560] shadow-sm hover:text-[#FF5E00]"
          >
            <svg className="w-4 h-4 text-[#FF5E00] fill-current" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span>1300 897 221</span>
          </a>
          <Link
            href="/get-a-free-quote"
            className="block text-center w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#FF5E00] to-[#FF7A00] shadow-md"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
