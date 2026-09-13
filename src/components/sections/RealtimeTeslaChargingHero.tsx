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
      badge: 'Ultra-Fast DC Speed',
    },
    v2h: {
      name: 'V2H Home Backup Mode',
      speed: '8.0 kW to Home',
      rate: 'Up to 3 Days Power',
      source: 'EV Battery Powers House',
      cost: 'Zero Blackouts',
      primaryColor: '#3B82F6', // blue
      glowColor: 'rgba(59, 130, 246, 0.8)',
      badge: 'Vehicle-to-Home',
    },
  };

  const current = modeData[chargingMode];

  // Reusable Telemetry Card component
  const TelemetryCard = ({ className = '' }: { className?: string }) => (
    <div className={`bg-slate-950/95 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-white shadow-2xl ${className}`}>
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div
            style={{ backgroundColor: current.primaryColor }}
            className="w-2.5 h-2.5 rounded-full animate-ping"
          />
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-white">
            Smart EV DC Charging Telemetry
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsCharging(!isCharging)}
          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-colors ${
            isCharging
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
        >
          {isCharging ? '● Live Active' : '○ Paused'}
        </button>
      </div>

      {/* Battery Level Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-slate-300">EV Battery Level (Tesla • BYD • All EVs)</span>
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
      <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-800/80 text-[11px]">
        <div>
          <span className="text-slate-400 block text-[10px]">DC Fast Power</span>
          <span className="font-extrabold text-white">
            {isCharging ? current.speed : '0.0 kW'}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">Range / Hr</span>
          <span className="font-extrabold text-white">
            {isCharging ? current.rate : 'Paused'}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">Fuel Cost</span>
          <span className="font-extrabold text-emerald-400">{current.cost}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Title & Mode Switcher Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-5 sm:mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Direct DC Fast Charging • Universal EV & Tesla Compatible</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#171D4D] tracking-tight">
            Charge Your <span className="text-[#FF5E00]">EV & Tesla</span> Straight from SigenStor Solar
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base mt-1.5 sm:mt-2 max-w-2xl leading-relaxed">
            Experience the Sigenergy SigenStor 5-in-1 breakthrough: direct DC EV fast charging connected straight to the battery. Eliminate AC conversion losses and power your Tesla, BYD, Kia, Hyundai, MG, or European EV on 100% free Australian sunshine.
          </p>
        </div>

        {/* Mode Selector Tabs (Responsive Grid on Mobile) */}
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex-shrink-0 shadow-inner w-full lg:w-auto">
          <button
            type="button"
            onClick={() => setChargingMode('solar')}
            className={`px-2 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all text-center ${
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
            className={`px-2 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all text-center ${
              chargingMode === 'boost'
                ? 'bg-[#FF5E00] text-white shadow-md shadow-orange-500/30'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ⚡ 25kW Boost
          </button>
          <button
            type="button"
            onClick={() => setChargingMode('v2h')}
            className={`px-2 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all text-center ${
              chargingMode === 'v2h'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🔄 V2H Backup
          </button>
        </div>
      </div>

      {/* Main Visual Stage: Garage with Direct Battery Cable Connection & Energy Overlays */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950 group select-none">
        {/* Photorealistic SigenStor + EV Garage Image */}
        <Image
          src="/images/sigenstor-tesla-garage.jpg"
          alt="Sigenergy SigenStor 5-in-1 Battery with direct DC EV Fast Charger powering an electric car in a Victorian garage with rooftop solar"
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
        />

        {/* Ambient Darkened Gradient at Top & Bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30 pointer-events-none" />

        {/* SVG Live Charging Overlay (Aligned 1:1 with 1376x768 aspect) */}
        <svg
          viewBox="0 0 1376 768"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <defs>
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
          </defs>

          {/* 1. SigenStor Vertical Cyan Light Bar Glow */}
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

          {/* 2. Direct Battery Output Port Glow (At SigenStor right side holster: 570, 400) */}
          {isCharging && (
            <g transform="translate(570, 400)">
              <circle
                r="12"
                fill="none"
                stroke={current.primaryColor}
                strokeWidth="2.5"
                opacity="0.8"
                className="animate-ping"
              />
              <circle
                r="6"
                fill={current.primaryColor}
                filter="url(#chargerGlow)"
                className="animate-pulse"
              />
            </g>
          )}

          {/* 3. Electric Cable Energy Conduit Flow (DIRECT from SigenStor 570,400 to Car Port 770,455) */}
          {isCharging && (
            <>
              {/* Outer Energy Aura along Cable */}
              <path
                d="M 570 400 C 570 500, 610 570, 660 570 C 720 570, 755 510, 770 455"
                fill="none"
                stroke={current.primaryColor}
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.45"
                filter="url(#chargerGlow)"
              />

              {/* High-voltage Animated Electric Pulses (Dash flow) */}
              <path
                d="M 570 400 C 570 500, 610 570, 660 570 C 720 570, 755 510, 770 455"
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
                d="M 570 400 C 570 500, 610 570, 660 570 C 720 570, 755 510, 770 455"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeDasharray="6 24"
                opacity="0.95"
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

          {/* 4. Electric Vehicle Charging Port Dynamic Ring (770, 455) */}
          {isCharging && (
            <g transform="translate(770, 455)">
              <circle
                r="18"
                fill="none"
                stroke={current.primaryColor}
                strokeWidth="3"
                opacity="0.8"
                className="animate-ping"
              />
              <circle
                r="10"
                fill="none"
                stroke={current.primaryColor}
                strokeWidth="4"
                filter="url(#chargerGlow)"
              />
              <circle r="6" fill="#FFFFFF" className="animate-pulse" />
            </g>
          )}

          {/* 5. Rooftop Solar Photovoltaic Stream Particles down to SigenStor */}
          {isCharging && chargingMode !== 'v2h' && (
            <g opacity="0.75">
              <line
                x1="457"
                y1="170"
                x2="457"
                y2="295"
                stroke="#FBBF24"
                strokeWidth="3"
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

        {/* Hotspot Badges on Image (Hidden on very small screens to avoid clutter, visible on sm+) */}
        {/* Rooftop Solar Hotspot */}
        <div
          style={{ top: '8%', left: '38%' }}
          className="hidden sm:block absolute z-20 transform -translate-x-1/2"
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
          className="hidden sm:block absolute z-20 transform -translate-x-1/2"
        >
          <div
            onMouseEnter={() => setActiveHotspot('battery')}
            onMouseLeave={() => setActiveHotspot(null)}
            className="flex items-center gap-1.5 bg-slate-950/80 hover:bg-slate-900 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-400/40 text-cyan-300 text-[10px] sm:text-xs font-bold shadow-lg cursor-pointer transition-transform hover:scale-105"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>🔋 Sigenergy SigenStor 5-in-1 • Direct DC Port</span>
          </div>
        </div>

        {/* EV Car Hotspot */}
        <div
          style={{ top: '53%', left: '67%' }}
          className="hidden sm:block absolute z-20 transform -translate-x-1/2"
        >
          <div
            onMouseEnter={() => setActiveHotspot('car')}
            onMouseLeave={() => setActiveHotspot(null)}
            className="flex items-center gap-1.5 bg-slate-950/80 hover:bg-slate-900 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-400/40 text-emerald-300 text-[10px] sm:text-xs font-bold shadow-lg cursor-pointer transition-transform hover:scale-105"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>🚗 Direct CCS2 Port • All EVs & Tesla</span>
          </div>
        </div>

        {/* Mobile floating status chip in corner (minimal, does NOT cover car) */}
        <div className="sm:hidden absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white text-[10px] font-black">
          <span
            style={{ backgroundColor: current.primaryColor }}
            className="w-2 h-2 rounded-full animate-ping"
          />
          <span>{current.speed} Direct DC Active</span>
        </div>

        {/* Desktop-only Inside HUD Overlay */}
        <div className="hidden sm:flex absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 z-20 items-end justify-between gap-4 pointer-events-none">
          <div className="max-w-sm w-full pointer-events-auto">
            <TelemetryCard />
          </div>

          {/* Desktop Quote CTA Button & Badge */}
          <div className="flex flex-col items-end gap-2 pointer-events-auto">
            <div className="flex flex-col text-right text-xs text-white/90 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15">
              <span className="font-bold text-amber-300">0ms Blackout UPS Switch</span>
              <span className="text-[10px] text-slate-300">Direct DC power for your home & EV 24/7</span>
            </div>
            <Link
              href="/get-a-free-quote"
              className="bg-gradient-to-r from-[#FF5E00] to-[#FF7A00] hover:from-[#e55400] hover:to-[#ff6d00] text-white font-black px-6 py-3 rounded-2xl text-xs uppercase tracking-wider text-center transition-all shadow-xl hover:scale-105 whitespace-nowrap"
            >
              Get SigenStor EV Battery Quote →
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE-ONLY Dedicated Telemetry HUD & CTA */}
      <div className="sm:hidden mt-4 space-y-3">
        <TelemetryCard />

        <Link
          href="/get-a-free-quote"
          className="block w-full bg-gradient-to-r from-[#FF5E00] to-[#FF7A00] hover:from-[#e55400] hover:to-[#ff6d00] text-white font-black py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider text-center transition-all shadow-lg shadow-orange-500/20 active:scale-98"
        >
          Get SigenStor EV Battery Quote →
        </Link>
      </div>

      {/* 3 Key Technological Advantages Beneath Visual Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
        <div className="bg-slate-50 p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-2xl bg-orange-100 text-[#FF5E00] flex items-center justify-center font-black text-lg mb-3">
            ⚡
          </div>
          <h4 className="font-black text-[#171D4D] text-sm sm:text-base mb-1.5">
            Pure DC Fast Charging (Up to 25 kW)
          </h4>
          <p className="text-gray-600 text-xs leading-relaxed">
            Standard AC wallboxes lose 10–15% efficiency in conversion and are capped at 7kW or 11kW. Sigenergy feeds DC solar directly from the battery into your EV at over double the speed.
          </p>
        </div>

        <div className="bg-slate-50 p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-lg mb-3">
            ☀️
          </div>
          <h4 className="font-black text-[#171D4D] text-sm sm:text-base mb-1.5">
            100% Free Solar Motoring for All EVs
          </h4>
          <p className="text-gray-600 text-xs leading-relaxed">
            Universal compatibility with Tesla, BYD, Kia, Hyundai, MG, and European electric cars. Drive on free surplus sunshine that would otherwise be exported for minimal credits.
          </p>
        </div>

        <div className="bg-slate-50 p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-black text-lg mb-3">
            🔄
          </div>
          <h4 className="font-black text-[#171D4D] text-sm sm:text-base mb-1.5">
            Bi-Directional V2H / V2G Ready
          </h4>
          <p className="text-gray-600 text-xs leading-relaxed">
            Turn your electric vehicle and SigenStor battery into a whole-home emergency power backup. Keep refrigeration, lighting, and appliances running during Victorian storm blackouts.
          </p>
        </div>
      </div>
    </div>
  );
}
