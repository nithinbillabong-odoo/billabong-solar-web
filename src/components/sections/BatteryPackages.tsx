'use client';

import React from 'react';
import Link from 'next/link';

interface BatteryPackage {
  id: string;
  badge: string;
  isPopular?: boolean;
  title: string;
  subtitle: string;
  capacity: string;
  targetCustomer: string;
  hardware: string;
  features: string[];
  loanGuide: string;
  ctaText: string;
}

const batteryPackages: BatteryPackage[] = [
  {
    id: 'retrofit',
    badge: 'Solar Retrofit',
    title: 'The "Add-a-Battery" Retrofit',
    subtitle: 'Designed for homes that already have solar panels installed',
    capacity: '10.0 kWh Storage',
    targetCustomer: 'Homes with existing 5kW – 10kW solar panels',
    hardware: 'Alpha ESS SMILE-G3 or GoodWe Lynx Home',
    features: [
      'AC-Coupled: Works with ANY existing inverter (Fronius, Sungrow, SMA, Enphase)',
      'Zero changes needed to your existing roof solar array',
      'Store wasted 3.3¢ daytime solar to dodge 40¢+ peak evening electricity',
      'Smart smartphone monitoring app with live energy telemetry',
      'Solar Victoria $8,800 Interest-Free Loan Eligible',
      '10-Year Local Australian Manufacturer Warranty',
    ],
    loanGuide: 'Eligible for $8,800 Loan (Pay $0 Upfront, ~$165–$183/mo)',
    ctaText: 'Get Retrofit Battery Quote',
  },
  {
    id: 'blackout-armor',
    badge: 'Most Popular in Victoria',
    isPopular: true,
    title: 'The "Blackout Armor" Whole-Home',
    subtitle: 'Zero-millisecond blackout protection for Gippsland & Melbourne',
    capacity: '13.2 kWh to 15.0 kWh Storage',
    targetCustomer: 'Storm-prone areas, rural Victoria & family homes',
    hardware: 'GoodWe Lynx Home F Series or Sigenergy SigenStor',
    features: [
      '0-millisecond UPS automatic blackout transfer switch',
      'Keeps fridges, freezer food, lighting, internet & medical appliances on 24/7',
      'Can run split-system air conditioning & heat pumps during extended grid failures',
      'High surge capacity for motor starts and automated gates',
      'Tier-1 Lithium Iron Phosphate (LFP) safest chemistry',
      '10-Year Full Manufacturer Warranty + 10-Year Workmanship',
    ],
    loanGuide: '$0 Upfront Available • Covered by Monthly Power Bill Savings',
    ctaText: 'Get Whole-Home Backup Quote',
  },
  {
    id: 'ev-supercharger',
    badge: 'Flagship Technology',
    title: 'The "Solar-to-EV Supercharger"',
    subtitle: 'All-in-one AI power hub for Tesla, BYD & Electric Vehicle owners',
    capacity: '16.0 kWh to 20.0 kWh (Expandable to 48kWh)',
    targetCustomer: 'EV drivers seeking 100% free sunshine driving',
    hardware: 'Sigenergy SigenStor 5-in-1 AI Energy System',
    features: [
      'Direct DC Bi-Directional Fast EV Charger integrated in the battery chassis',
      'Charge your EV up to 25kW DC directly from rooftop solar & stored power',
      'Vehicle-to-Home (V2H) ready: use your car battery as a home generator',
      'AI-driven cloud optimization: automatically charges on cheap off-peak rates',
      'Sleek all-black architectural tower with IP66 all-weather rating',
      '10-Year Comprehensive Australian Warranty',
    ],
    loanGuide: 'Premium Clean Energy Investment with Instant Fast EV Charging',
    ctaText: 'Get SigenStor EV Battery Quote',
  },
];

export default function BatteryPackages() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="battery-packages">
      {/* Background accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#FF5E00] font-extrabold text-xs uppercase tracking-widest block mb-2">
            Tailored Victorian Packages
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white tracking-tight">
            Tailored Battery Storage Packages
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            Whether you want to add a battery to an existing solar system, blackout-proof your home, or fast-charge your EV, we have an engineered solution.
          </p>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {batteryPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative border ${
                pkg.isPopular
                  ? 'bg-gradient-to-b from-[#1C255E] to-[#12183A] border-[#FF5E00] shadow-[0_10px_40px_rgba(255,94,0,0.25)] lg:-translate-y-2'
                  : 'bg-white/5 hover:bg-white/10 border-white/10'
              }`}
            >
              {/* Popular Ribbon */}
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF5E00] to-orange-600 text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                  ★ {pkg.badge}
                </div>
              )}

              <div>
                {/* Badge for non-popular */}
                {!pkg.isPopular && (
                  <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-orange-400 mb-3 bg-orange-500/10 border border-orange-400/20 px-3 py-1 rounded-full">
                    {pkg.badge}
                  </span>
                )}

                <h3 className="text-2xl font-black text-white mt-1 mb-1">{pkg.title}</h3>
                <p className="text-xs text-gray-300 mb-4">{pkg.subtitle}</p>

                {/* Capacity Pill */}
                <div className="p-3 rounded-2xl bg-white/10 border border-white/10 mb-6 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                      Battery Capacity
                    </div>
                    <div className="text-xl font-black text-amber-300">{pkg.capacity}</div>
                  </div>
                  <div className="text-right text-[11px] text-gray-300">
                    <span className="block font-semibold">Hardware:</span>
                    <span className="text-white font-medium">{pkg.hardware}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <div className="text-xs font-bold text-gray-200 uppercase tracking-wider">
                    Key Specifications & Inclusions:
                  </div>
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-200 leading-relaxed">
                      <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Loan Callout & CTA */}
              <div className="pt-6 border-t border-white/10 mt-auto">
                <div className="text-[11px] text-amber-300 font-semibold mb-4 text-center">
                  🏛️ {pkg.loanGuide}
                </div>
                <Link
                  href={`/get-a-free-quote?package=${pkg.id}`}
                  className={`w-full block py-4 px-6 rounded-full font-extrabold text-sm text-center transition-all duration-300 shadow-lg ${
                    pkg.isPopular
                      ? 'bg-gradient-to-r from-[#FF5E00] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-orange-500/40 hover:scale-[1.02]'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  {pkg.ctaText} →
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-16 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <div className="text-white font-bold text-base">Not sure which battery size fits your home?</div>
            <div className="text-gray-400 text-xs mt-0.5">
              Our A-Grade solar engineers analyze your smart meter interval data to size the exact kilowatt-hour capacity for your needs.
            </div>
          </div>
          <a
            href="tel:1300897221"
            className="whitespace-nowrap px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs uppercase tracking-wider transition-all"
          >
            Call Engineers: 1300 897 221
          </a>
        </div>

      </div>
    </section>
  );
}
