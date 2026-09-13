'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function RealtimeTeslaChargingHero() {
  const [chargingMode, setChargingMode] = useState<'solar' | 'boost' | 'v2h'>('solar');
  const [batteryLevel, setBatteryLevel] = useState(78);
  const [isCharging, setIsCharging] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Simulated live charging increments
  useEffect(() => {
    if (!isCharging || chargingMode === 'v2h') return;
    const interval = setInterval(() => {
      setBatteryLevel((prev) => (prev >= 99 ? 50 : prev + 1));
    }, 2200);
    return () => clearInterval(interval);
  }, [isCharging, chargingMode]);

  const modeData = {
    solar: {
      name: 'Pure Solar DC Mode',
      speed: '12.5 kW',
      rate: '+85 km / hr',
      source: '100% Free Sunlight',
      cost: '$0.00 / km',
      primaryColor: '#10B981', // emerald
      glowColor: 'rgba(16, 185, 129, 0.8)',
      flowSpeedClass: 'duration-1000',
      badge: '100% Free Sunshine',
    },
    boost: {
      name: '25kW Fast Boost Mode',
      speed: '25.0 kW',
      rate: '+165 km / hr',
      source: 'Solar PV + Battery Combined',
      cost: '$0.02 / km',
      primaryColor: '#FF5E00', // vibrant orange
      glowColor: 'rgba(255, 94, 0, 0.9)',
      flowSpeedClass: 'duration-700',
      badge: 'Ultra-Fast DC Speed',
    },
    v2h: {
      name: 'V2H Home Backup Mode',
      speed: '8.0 kW to Home',
      rate: 'Up to 3 Days Power',
      source: 'Tesla Battery Powers House',
      cost: 'Zero Blackouts',
      primaryColor: '#3B82F6', // blue
      glowColor: 'rgba(59, 130, 246, 0.8)',
      flowSpeedClass: 'duration-1200',
      badge: 'Vehicle-to-Home',
    },
  };

  const current = modeData[chargingMode];

  return (
    <div className="w-full">
      {/* Title & Mode Switcher Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Interactive Live Simulation • Sigenergy SigenStor & Tesla</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#171D4D] tracking-tight">
            Charge Your <span className="text-[#FF5E00]">Tesla</span> Straight from SigenStor Solar
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            See how the Sigenergy SigenStor 5-in-1 battery system feeds pure DC solar energy directly into a Tesla Model 3 without inefficient AC inverter conversions.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex-shrink-0 shadow-inner">
          <button
            type="button"
            onClick={() => setChargingMode('solar')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
              chargingMode === 'solar'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ☀️ Solar Only
          </button>
          <button
            type="button"
            onClick={() => setChargingMode('boost')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
              chargingMode === 'boost'
                ? 'bg-[#FF5E00] text-white shadow-md shadow-orange-500/30'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ⚡ 25kW Fast DC
          </button>
          <button
            type="button"
            onClick={() => setChargingMode('v2h')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
              chargingMode === 'v2h'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🔄 V2H Backup
          </button>
        </div>
      </div>

      {/* Main Visual Stage: Photorealistic Garage with Real-time Energy Overlays */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[16/9] w-full bg-slate-950 group select-none">
        {/* Photorealistic SigenStor + Tesla Garage Image */}
        <Image
          src="/images/sigenstor-tesla-garage.jpg"
          alt="Sigenergy SigenStor 5-in-1 Battery and DC Fast EV Charger charging a Tesla Model 3 in a Victorian garage with rooftop solar"
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
        />

        {/* Ambient Darkened Gradient at Top & Bottom for HUD Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/40 pointer-events-none" />

        {/* SVG Live Charging Overlay (Aligned 1:1 with 1376x768 aspect) */}
        <svg
          viewBox="0 0 1376 768"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <defs>
            {/* Pulsing Glow Filters */}
            <filter id="chargerGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="cyanStripeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradient along the charging cable */}
            <linearGradient id="cableGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor={current.primaryColor} />
              <stop offset="100%" stopColor={current.primaryColor} />
            </linearGradient>
          </defs>

          {/* 1. SigenStor Vertical Cyan Light Bar Glow (x: 457, y: 310 to 575) */}
          {isCharging && (
            <line
              x1="457"
              y1="305"
              x2="457"
              y2="575"
              stroke="#22d3ee"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#cyanStripeGlow)"
              className="animate-pulse"
              opacity="0.9"
            />
          )}

          {/* 2. Electric Cable Energy Conduit Flow (From Holster 586,410 to Tesla Port 775,460) */}
          {isCharging && (
            <>
              {/* Outer Energy Aura along Cable */}
              <path
                d="M 586 410 C 586 520, 610 595, 680 590 C 730 585, 760 520, 775 460"
                fill="none"
                stroke={current.primaryColor}
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.4"
                filter="url(#chargerGlow)"
              />

              {/* High-voltage Animated Electric Pulses (Dash flow) */}
              <path
                d="M 586 410 C 586 520, 610 595, 680 590 C 730 585, 760 520, 775 460"
                fill="none"
                stroke={current.primaryColor}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="14 16"
                className="animate-[pulse_1.5s_infinite]"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from={chargingMode === 'v2h' ? '0' : '60'}
                  to={chargingMode === 'v2h' ? '60' : '0'}
                  dur={chargingMode === 'boost' ? '0.7s' : '1.2s'}
                  repeatCount="indefinite"
                />
              </path>

              {/* Bright Core Beam */}
              <path
                d="M 586 410 C 586 520, 610 595, 680 590 C 730 585, 760 520, 775 460"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeDasharray="6 24"
                opacity="0.9"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from={chargingMode === 'v2h' ? '0' : '60'}
                  to={chargingMode === 'v2h' ? '60' : '0'}
                  dur={chargingMode === 'boost' ? '0.7s' : '1.2s'}
                  repeatCount="indefinite"
                />
              </path>
            </>
          )}

          {/* 3. Tesla Vehicle Charging Port Dynamic Ring (775, 460) */}
          {isCharging && (
            <g transform="translate(775, 460)">
              {/* Outer Ripple Wave */}
              <circle
                r="18"
                fill="none"
                stroke={current.primaryColor}
                strokeWidth="3"
                opacity="0.8"
                className="animate-ping"
              />
              {/* Mid Glow */}
              <circle
                r="10"
                fill="none"
                stroke={current.primaryColor}
                strokeWidth="4"
                filter="url(#chargerGlow)"
              />
              {/* Solid Core Light */}
              <circle r="6" fill="#FFFFFF" className="animate-pulse" />
            </g>
          )}

          {/* 4. Rooftop Solar Photovoltaic Stream Particles down to SigenStor */}
          {isCharging && chargingMode !== 'v2h' && (
            <g opacity="0.75">
              <line
                x1="457"
                y1="170"
                x2="457"
                y2="295"
                stroke="#FBBF24"
                strokeWidth="2.5"
                strokeDasharray="4 8"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="24"
                  to="0"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </line>
            </g>
          )}
        </svg>

        {/* Interactive Hotspot Badges directly on the image */}
        {/* Rooftop Solar Hotspot */}
        <div
          style={{ top: '8%', left: '38%' }}
          className="absolute z-20 transform -translate-x-1/2"
        >
          <div
            onMouseEnter={() => setActiveHotspot('solar')}
            onMouseLeave={() => setActiveHotspot(null)}
            className="flex items-center gap-1.5 bg-slate-950/80 hover:bg-slate-900 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-bold shadow-lg cursor-pointer transition-transform hover:scale-105"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>☀️ Rooftop Solar PV (10.4 kW)</span>
          </div>
        </div>

        {/* SigenStor Battery Hotspot */}
        <div
          style={{ top: '34%', left: '33%' }}
          className="absolute z-20 transform -translate-x-1/2"
        >
          <div
            onMouseEnter={() => setActiveHotspot('battery')}
            onMouseLeave={() => setActiveHotspot(null)}
            className="flex items-center gap-1.5 bg-slate-950/80 hover:bg-slate-900 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-400/40 text-cyan-300 text-[10px] sm:text-xs font-bold shadow-lg cursor-pointer transition-transform hover:scale-105"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>🔋 Sigenergy SigenStor 5-in-1</span>
          </div>
        </div>

        {/* Tesla Car Hotspot */}
        <div
          style={{ top: '53%', left: '67%' }}
          className="absolute z-20 transform -translate-x-1/2"
        >
          <div
            onMouseEnter={() => setActiveHotspot('car')}
            onMouseLeave={() => setActiveHotspot(null)}
            className="flex items-center gap-1.5 bg-slate-950/80 hover:bg-slate-900 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-400/40 text-emerald-300 text-[10px] sm:text-xs font-bold shadow-lg cursor-pointer transition-transform hover:scale-105"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>🚗 Tesla Model 3 • CCS2 DC Port</span>
          </div>
        </div>

        {/* Floating Glassmorphism Telemetry HUD (Bottom Overlay) */}
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 z-20 flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-3 pointer-events-none">
          {/* Live Tesla Battery Monitor Widget */}
          <div className="bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/15 text-white max-w-sm w-full shadow-2xl pointer-events-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  style={{ backgroundColor: current.primaryColor }}
                  className="w-2.5 h-2.5 rounded-full animate-ping"
                />
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-white">
                  Tesla Charging Telemetry
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsCharging(!isCharging)}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-colors ${
                  isCharging
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {isCharging ? '● Live' : '○ Paused'}
              </button>
            </div>

            {/* Battery Level Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Battery Level</span>
                <span style={{ color: current.primaryColor }} className="font-black text-sm">
                  {batteryLevel}%
                </span>
              </div>
              <div className="w-full bg-slate-800/90 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div
                  style={{
                    width: `${batteryLevel}%`,
                    backgroundColor: current.primaryColor,
                    boxShadow: `0 0 10px ${current.primaryColor}`,
                  }}
                  className="h-full rounded-full transition-all duration-500"
                />
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-800 text-[10px] sm:text-[11px]">
              <div>
                <span className="text-slate-400 block">DC Power</span>
                <span className="font-extrabold text-white">
                  {isCharging ? current.speed : '0.0 kW'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Range / Hr</span>
                <span className="font-extrabold text-white">
                  {isCharging ? current.rate : 'Paused'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Cost / km</span>
                <span className="font-extrabold text-emerald-400">{current.cost}</span>
              </div>
            </div>
          </div>

          {/* Quick Pillar Pill & Quote CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pointer-events-auto">
            <div className="hidden md:flex flex-col text-right text-xs text-white/90 bg-slate-950/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
              <span className="font-bold text-amber-300">0ms Blackout UPS Switch</span>
              <span className="text-[10px] text-slate-300">Powers your home & car 24/7</span>
            </div>
            <Link
              href="/get-a-free-quote"
              className="bg-gradient-to-r from-[#FF5E00] to-[#FF7A00] hover:from-[#e55400] hover:to-[#ff6d00] text-white font-black px-5 py-3 rounded-2xl text-xs uppercase tracking-wider text-center transition-all shadow-xl hover:scale-105 whitespace-nowrap"
            >
              Get SigenStor Battery Quote →
            </Link>
          </div>
        </div>
      </div>

      {/* 3 Key Technological Advantages Beneath Visual Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-2xl bg-orange-100 text-[#FF5E00] flex items-center justify-center font-black text-lg mb-3">
            ⚡
          </div>
          <h4 className="font-black text-[#171D4D] text-base mb-1.5">
            Pure DC Fast Charging (Up to 25 kW)
          </h4>
          <p className="text-gray-600 text-xs leading-relaxed">
            Standard AC wallbox chargers lose 10–15% efficiency in AC-to-DC rectification and are limited to 7kW or 11kW. Sigenergy feeds DC solar directly into your Tesla battery at over double the speed.
          </p>
        </div>

        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-lg mb-3">
            ☀️
          </div>
          <h4 className="font-black text-[#171D4D] text-base mb-1.5">
            100% Free Solar Motoring
          </h4>
          <p className="text-gray-600 text-xs leading-relaxed">
            Charge your vehicle during the day using surplus Victorian sunshine that would otherwise be exported to the grid for pennies. Drive over 20,000 km every year with zero fuel cost.
          </p>
        </div>

        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-black text-lg mb-3">
            🔄
          </div>
          <h4 className="font-black text-[#171D4D] text-base mb-1.5">
            Bi-Directional V2H / V2G Ready
          </h4>
          <p className="text-gray-600 text-xs leading-relaxed">
            Turn your Tesla and SigenStor system into a whole-home emergency power station. Keep your lights, refrigeration, and appliances running continuously throughout Victorian storm outages.
          </p>
        </div>
      </div>
    </div>
  );
}
