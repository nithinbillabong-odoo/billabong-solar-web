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
  { label: 'Commercial', href: '/commercial/' },
  { label: 'Battery Storage', href: '/battery-storage/' },
  { label: 'About', href: '/about-us/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'FAQs', href: '/faq/' },
  { label: 'Contact', href: '/contact-us/' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 block relative w-48 h-12">
          <Image
            src="https://billabongsolar.com.au/wp-content/uploads/2024/06/log-new.webp"
            alt="Billabong Solar"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium text-sm transition-colors ${
                  isActive
                    ? 'text-[#FF660D]'
                    : isScrolled
                    ? 'text-[#272E7D] hover:text-[#FF660D]'
                    : 'text-white hover:text-[#FF660D]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA & Phone */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href="tel:0390000000"
            className={`font-semibold ${isScrolled ? 'text-[#272E7D]' : 'text-white'} hover:text-[#FF660D]`}
          >
            (03) 9000 0000
          </a>
          <Link
            href="/get-a-free-quote/"
            className="bg-[#FF660D] hover:bg-[#e55c0c] text-white px-6 py-2 rounded-md font-semibold transition-colors shadow-lg"
          >
            Get a Free Quote
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col items-center justify-center space-y-1.5 w-8 h-8 focus:outline-none z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              isScrolled || isMobileMenuOpen ? 'bg-[#272E7D]' : 'bg-white'
            } ${isMobileMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              isScrolled || isMobileMenuOpen ? 'bg-[#272E7D]' : 'bg-white'
            } ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              isScrolled || isMobileMenuOpen ? 'bg-[#272E7D]' : 'bg-white'
            } ${isMobileMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-xl flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 flex-grow flex flex-col mt-16 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 font-medium rounded-md ${
                pathname === item.href ? 'text-[#FF660D] bg-orange-50' : 'text-[#272E7D] hover:bg-gray-100'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-gray-200 flex flex-col space-y-4 px-4">
            <a href="tel:0390000000" className="text-[#272E7D] font-semibold text-center py-2">
              (03) 9000 0000
            </a>
            <Link
              href="/get-a-free-quote/"
              className="bg-[#FF660D] text-white text-center px-4 py-2 rounded-md font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
