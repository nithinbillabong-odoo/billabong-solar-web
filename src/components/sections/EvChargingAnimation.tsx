'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function EvChargingAnimation() {
  const [chargingMode, setChargingMode] = useState<'solar' | 'boost' | 'v2h'>('solar');
  const [batteryLevel, setBatteryLevel] = useState(68);
  const [isCharging, setIsCharging] = useState(true);

  // Simulated live charging increments
  useEffect(() => {
    if (!isCharging) return;
    const interval = setInterval(() => {
      setBatteryLevel((prev) => (prev >= 99 ? 42 : prev + 1));
    }, 1800);
    return () => clearInterval(interval);
  }, [isCharging]);

  const modeData = {
    solar: {
      title: 'Pure Solar DC Mode',
      kw: '12.5 kW',
      solarInput: '100% Solar PV',
      rate: '+85 km / hr',
      cost: '$0.00 / km',
      color: '#10B981',
      badge: '100% Free Sunshine',
    },
    boost: {
      title: 'Fast Boost Mode',
      kw: '25.0 kW',
      solarInput: 'Solar + Battery Combined',
      rate: '+165 km / hr',
      cost: '$0.02 / km',
      color: '#FF5E00',
      badge: 'Ultra-Fast DC Speed',
    },
    v2h: {
      title: 'V2H Emergency Backup',
      kw: '8.0 kW to Home',
      solarInput: 'Car Powers Your House',
      rate: 'Up to 3 Days Backup',
      cost: 'Zero Blackouts',
      color: '#3B82F6',
      badge: 'Vehicle-to-Home',
    },
  };

  const current = modeData[chargingMode];

  return (
    <div className="bg-gradient-to-b from-slate-950 via-[#0D1236] to-slate-950 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden relative text-white">
      {/* Glow Ambient Lights */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-slate-800 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>AI 5-in-1 Integration • Direct DC Fast Charging</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Charge Your <span className="text-[#FF5E00]">Tesla & EV</span> Straight from Solar
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Experience the Sigenergy SigenStor breakthrough: a 5-in-1 solar energy storage system with built-in DC Fast EV Charging. Eliminate AC conversion losses and drive on 100% free Australian sunlight.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex-shrink-0">
          <button
            type="button"
            onClick={() => setChargingMode('solar')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
              chargingMode === 'solar'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ☀️ Solar Only
          </button>
          <button
            type="button"
            onClick={() => setChargingMode('boost')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
              chargingMode === 'boost'
                ? 'bg-[#FF5E00] text-white shadow-lg shadow-orange-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚡ 25kW Fast DC
          </button>
          <button
            type="button"
            onClick={() => setChargingMode('v2h')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
              chargingMode === 'v2h'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🔄 V2H Backup
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 mb-10">
        {/* Left: HD Sigenergy SigenStor with Integrated EV Charger (Uploaded Image) */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/60 shadow-2xl p-4 sm:p-6 group">
            {/* Live Indicator Badges */}
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
              <span className="bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Sigenergy SigenStor Active
              </span>
              <span className="bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-300 text-[10px] font-semibold px-2.5 py-0.5 rounded-full w-fit">
                Modular 5kWh – 48kWh Stack
              </span>
            </div>

            <div className="absolute top-6 right-6 z-20">
              <span className="bg-[#FF5E00] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                DC Fast Charger Gun
              </span>
            </div>

            {/* SigenStor Hardware Image */}
            <div className="relative w-full h-[320px] sm:h-[400px]">
              <Image
                src="/images/sigenergy-sigenstor-ev.png"
                alt="Sigenergy SigenStor 5-in-1 Solar Battery and EV DC Fast Charger"
                fill
                priority
                className="object-contain drop-shadow-[0_20px_35px_rgba(0,255,255,0.15)] group-hover:scale-105 transition-transform duration-700"
              />

              {/* Glowing Pulse at Cable Socket */}
              <div className="absolute bottom-[38%] left-[24%] w-6 h-6 rounded-full bg-cyan-400/80 blur-sm animate-ping pointer-events-none" />
              <div className="absolute bottom-[38%] left-[24%] w-4 h-4 rounded-full bg-cyan-300 shadow-[0_0_15px_#22d3ee] pointer-events-none" />
            </div>

            {/* Caption beneath SigenStor */}
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">SigenStor 5-in-1 Energy Storage</span>
              <span className="text-cyan-400 font-bold">0ms Blackout UPS Switch</span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Tesla / EV Charging Simulation Stage */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          
          {/* Virtual Tesla Vehicle Rendering & Port Animation */}
          <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 relative overflow-hidden shadow-inner">
            {/* Ambient car headlight / underglow */}
            <div className="absolute top-1/2 right-10 w-48 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center font-black text-sm">
                  ⚡
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-sm sm:text-base">
                    Tesla Model Y / 3
                  </h4>
                  <p className="text-[11px] text-slate-400">CCS2 Direct DC Coupling Port</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCharging(!isCharging)}
                  className={`text-xs px-3 py-1.5 rounded-full font-bold transition-colors ${
                    isCharging
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isCharging ? '● Charging Active' : '○ Paused'}
                </button>
              </div>
            </div>

            {/* Futuristic Tesla Vector Side Silhouette with Live Battery Indicator */}
            <div className="relative py-4">
              <svg viewBox="0 0 460 160" className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                {/* Ground Shadow */}
                <ellipse cx="230" cy="148" rx="200" ry="8" fill="rgba(0,0,0,0.6)" filter="blur(4px)" />

                {/* Streamer Energy Beam from Left into Charging Port */}
                {isCharging && (
                  <path
                    d="M 10,75 C 60,65 90,85 140,82"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                    className="animate-[dash_1s_linear_infinite]"
                  />
                )}

                {/* Car Silhouette (Sleek aerodynamic fastback sedan / SUV) */}
                <path
                  d="M 95,98 L 130,85 L 175,55 L 285,55 L 345,82 L 405,88 C 418,91 425,102 422,114 L 415,124 L 385,124 C 385,106 360,106 360,124 L 180,124 C 180,106 155,106 155,124 L 98,124 C 90,124 85,115 88,105 Z"
                  fill="#1E293B"
                  stroke="#475569"
                  strokeWidth="2"
                />

                {/* Roof & Glass Canopy */}
                <path
                  d="M 178,58 C 220,53 270,54 282,58 L 335,82 L 138,82 Z"
                  fill="rgba(56, 189, 248, 0.25)"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                />

                {/* Wheels */}
                <circle cx="168" cy="124" r="22" fill="#0F172A" stroke="#64748B" strokeWidth="4" />
                <circle cx="168" cy="124" r="10" fill="#334155" />
                <circle cx="372" cy="124" r="22" fill="#0F172A" stroke="#64748B" strokeWidth="4" />
                <circle cx="372" cy="124" r="10" fill="#334155" />

                {/* Headlights (Cyan Beam) */}
                <polygon points="415,96 445,99 440,106 410,102" fill="#38BDF8" opacity="0.9" />
                <path d="M 440,100 L 460,95 L 460,110 Z" fill="rgba(56, 189, 248, 0.2)" filter="blur(2px)" />

                {/* Taillights (Red LED Strip) */}
                <path d="M 96,96 L 105,94 L 103,101 L 94,101 Z" fill="#EF4444" />

                {/* Charging Port Door (Left Rear Flap) */}
                <circle cx="138" cy="83" r="7" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
                {isCharging && (
                  <circle cx="138" cy="83" r="5" fill="#22D3EE" className="animate-pulse" />
                )}

                {/* Battery Pack Floorboard View (Glows Inside Chassis) */}
                <rect x="195" y="108" width="150" height="12" rx="3" fill="#090D1A" stroke="#334155" strokeWidth="1" />
                <rect
                  x="197"
                  y="110"
                  width={(146 * batteryLevel) / 100}
                  height="8"
                  rx="2"
                  fill={batteryLevel > 80 ? '#10B981' : '#22D3EE'}
                  className="transition-all duration-500"
                />
              </svg>
            </div>

            {/* Battery Status Meter */}
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between text-xs font-extrabold">
                <span className="text-slate-400">Battery Level (Tesla 75 kWh Pack)</span>
                <span className="text-emerald-400 text-sm font-black">{batteryLevel}%</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div
                  style={{ width: `${batteryLevel}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-[#10B981] transition-all duration-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                />
              </div>
            </div>
          </div>

          {/* Real-time Telemetry Dashboard Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">DC Charge Speed</span>
              <span className="text-base sm:text-lg font-black text-cyan-300 mt-0.5 block">
                {isCharging ? current.kw : '0.0 kW'}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">Direct Solar DC</span>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Added Range</span>
              <span className="text-base sm:text-lg font-black text-white mt-0.5 block">
                {isCharging ? current.rate : 'Paused'}
              </span>
              <span className="text-[10px] text-slate-400">Per Hour</span>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Driving Fuel Cost</span>
              <span className="text-base sm:text-lg font-black text-emerald-400 mt-0.5 block">
                {current.cost}
              </span>
              <span className="text-[10px] text-slate-400">100% Free Sun</span>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Annual Savings</span>
              <span className="text-base sm:text-lg font-black text-orange-400 mt-0.5 block">
                $2,400+
              </span>
              <span className="text-[10px] text-slate-400">Vs Petrol / Grid</span>
            </div>
          </div>

          {/* Key Advantages Checklist */}
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-900/50 flex items-center justify-between text-xs text-cyan-200">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center flex-shrink-0">✓</span>
              <span><strong>Universal EV Compatibility:</strong> Charges all Tesla Model 3/Y/S/X, BYD, Kia, Hyundai & Type-2 European EVs.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-800 relative z-10">
        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#FF5E00] flex items-center justify-center font-black text-lg mb-3">
            ⚡
          </div>
          <h4 className="font-extrabold text-white text-base mb-1">
            Pure DC Fast Charging (Up to 25 kW)
          </h4>
          <p className="text-slate-400 text-xs leading-relaxed">
            Standard AC home chargers are limited to 7kW or 11kW and waste up to 15% in power conversion. Sigenergy feeds high-voltage DC power directly into your EV battery at double the speed.
          </p>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-lg mb-3">
            ☀️
          </div>
          <h4 className="font-extrabold text-white text-base mb-1">
            Free Rooftop Solar Motoring
          </h4>
          <p className="text-slate-400 text-xs leading-relaxed">
            Drive over 25,000 km per year without paying a cent for petrol or utility grid tariffs. Set SigenStor to charge solely from surplus solar that would otherwise be exported for minor feed-in credits.
          </p>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-black text-lg mb-3">
            🔄
          </div>
          <h4 className="font-extrabold text-white text-base mb-1">
            Bi-Directional V2H / V2G Ready
          </h4>
          <p className="text-slate-400 text-xs leading-relaxed">
            Turn your electric vehicle into a massive emergency generator. During extended storm blackouts in Victoria, tap into your car’s 60kWh to 100kWh battery to keep your home running for days.
          </p>
        </div>
      </div>

      {/* Quote CTA Strip */}
      <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400 text-center sm:text-left">
          Ready to supercharge your home with <strong className="text-white">Sigenergy SigenStor</strong>? Our CEC certified electricians handle site assessments and grid approvals across Victoria.
        </div>
        <Link
          href="/get-a-free-quote"
          className="bg-gradient-to-r from-[#FF5E00] to-[#FF7A00] hover:from-[#e55400] hover:to-[#ff6d00] text-white font-extrabold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-500/20 whitespace-nowrap hover:scale-105"
        >
          Get SigenStor EV Battery Quote →
        </Link>
      </div>
    </div>
  );
}
