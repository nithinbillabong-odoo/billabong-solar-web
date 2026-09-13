'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface Appliance {
  id: string;
  name: string;
  watts: number;
  icon: string;
  defaultChecked: boolean;
}

const appliancesList: Appliance[] = [
  { id: 'fridge', name: 'Refrigerators & Freezers', watts: 180, icon: '🧊', defaultChecked: true },
  { id: 'wifi', name: 'Wi-Fi, Routers & Security', watts: 50, icon: '📶', defaultChecked: true },
  { id: 'lights', name: 'Essential Home Lighting', watts: 120, icon: '💡', defaultChecked: true },
  { id: 'tech', name: 'Smart TVs, Laptops & Phones', watts: 250, icon: '💻', defaultChecked: true },
  { id: 'aircon', name: 'Split System Aircon / Heat Pump', watts: 1400, icon: '❄️', defaultChecked: false },
  { id: 'ev', name: 'EV Emergency Top-Up', watts: 2200, icon: '🚗', defaultChecked: false },
];

export default function BatterySavingsCalculator() {
  const [batterySize, setBatterySize] = useState<number>(13.2);
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>([
    'fridge',
    'wifi',
    'lights',
    'tech',
  ]);

  const toggleAppliance = (id: string) => {
    setSelectedAppliances((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate total continuous watts being used
  const totalWatts = useMemo(() => {
    return appliancesList
      .filter((app) => selectedAppliances.includes(app.id))
      .reduce((sum, app) => sum + app.watts, 0);
  }, [selectedAppliances]);

  // Usable battery energy (assuming 90% depth of discharge)
  const usableKWh = batterySize * 0.9;

  // Blackout backup duration in hours
  const backupHours = useMemo(() => {
    if (totalWatts === 0) return 0;
    const hours = (usableKWh * 1000) / totalWatts;
    return Math.round(hours);
  }, [usableKWh, totalWatts]);

  // Annual bill savings estimation:
  // Buying peak grid power at 40c/kWh vs export FiT 3.3c/kWh = ~36.7c net saving per stored kWh
  // Daily cycling 300 days/year:
  const annualSavings = useMemo(() => {
    const dailyKWhSaved = Math.min(batterySize * 0.85, 14);
    const netSavingPerKWh = 0.38; // 38 cents spread between peak grid import & low export
    const yearly = dailyKWhSaved * netSavingPerKWh * 330;
    return Math.round(yearly);
  }, [batterySize]);

  // Monthly loan repayment for Victoria $8,800 interest-free loan (48 months)
  const loanMonthly = 183; // $8,800 / 48 = $183.33/mo
  const monthlySavings = Math.round(annualSavings / 12);
  const netMonthlyBenefit = monthlySavings - loanMonthly;

  return (
    <div className="bg-gradient-to-br from-[#10163A] via-[#171D4D] to-[#0D122E] rounded-3xl p-6 sm:p-8 lg:p-12 text-white border border-white/15 shadow-2xl">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
          <span>⚡</span> Victorian Battery Payback & Backup Simulator
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          How Much Can You Save & How Long Can You Run in a Blackout?
        </h2>
        <p className="text-sm sm:text-base text-gray-300">
          Stop selling your solar to retailers for <strong className="text-amber-300">3.3¢</strong> and buying it back tonight at <strong className="text-amber-300">40¢+</strong>. See your blackout runtime and $8,800 interest-free loan eligibility.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Selectors (Col 1-7) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* 1. Battery Size Selector */}
          <div>
            <label className="block text-sm font-bold text-gray-200 mb-3 uppercase tracking-wider">
              Step 1: Choose Your Battery Storage Size
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { size: 10, label: '10 kWh', tag: 'Most Popular', desc: 'Evening Home Power' },
                { size: 13.2, label: '13.2 kWh', tag: 'Best Value', desc: 'All-Night & Heat Pump' },
                { size: 20, label: '20 kWh', tag: 'Maximum Storage', desc: 'Whole-Home & EV' },
              ].map((opt) => (
                <button
                  key={opt.size}
                  type="button"
                  onClick={() => setBatterySize(opt.size)}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                    batterySize === opt.size
                      ? 'bg-gradient-to-r from-[#FF5E00] to-[#E04800] border-amber-300 text-white shadow-lg shadow-orange-500/30 scale-[1.02]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider opacity-90 block mb-1">
                    {opt.tag}
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-white mb-1">{opt.label}</div>
                  <div className="text-[11px] opacity-80 leading-tight">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Blackout Priority Appliances */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-gray-200 uppercase tracking-wider">
                Step 2: What Do You Want Powered in a Blackout?
              </label>
              <span className="text-xs text-amber-300 font-semibold">
                Active Draw: {totalWatts} Watts
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {appliancesList.map((app) => {
                const isSelected = selectedAppliances.includes(app.id);
                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => toggleAppliance(app.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-white/15 border-cyan-400/60 text-white shadow-sm'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{app.icon}</span>
                      <span className="text-xs sm:text-sm font-medium text-white">
                        {app.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-gray-300">{app.watts}W</span>
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                          isSelected ? 'bg-cyan-400 text-slate-900' : 'border border-white/30'
                        }`}
                      >
                        {isSelected && '✓'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Victoria Incentive Callout */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3">
            <span className="text-2xl">🏛️</span>
            <div className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              <strong className="text-white">Solar Victoria $8,800 Interest-Free Loan:</strong> Available for eligible Victorian households adding a battery. Repaid over 48 months at zero interest, allowing you to install with <strong>$0 upfront</strong>!
            </div>
          </div>

        </div>

        {/* Right Side: Calculation Results & Value Cards (Col 8-12) */}
        <div className="lg:col-span-5 bg-black/40 border border-white/15 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between space-y-6">
          
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
              Estimated Live Performance
            </div>
            <h3 className="text-xl font-black text-white">
              {batterySize} kWh Battery System
            </h3>
          </div>

          {/* Metric 1: Blackout Backup Hours */}
          <div className="bg-white/5 border border-cyan-500/30 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span>⏱️</span> Blackout Backup Duration
              </span>
              <span className="text-[11px] bg-cyan-400/20 text-cyan-200 px-2 py-0.5 rounded-full font-semibold">
                0ms UPS Switch
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">{backupHours}</span>
              <span className="text-lg text-cyan-200 font-bold">Hours of Continuous Power</span>
            </div>
            <p className="text-xs text-gray-300 mt-1.5">
              Keeps your selected {selectedAppliances.length} essential appliances running through severe Victorian storm outages.
            </p>
          </div>

          {/* Metric 2: Annual Bill Savings */}
          <div className="bg-white/5 border border-emerald-500/30 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span>💰</span> Estimated Annual Bill Savings
              </span>
              <span className="text-[11px] bg-emerald-400/20 text-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                Peak Rate Shield
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">${annualSavings.toLocaleString()}</span>
              <span className="text-sm text-emerald-200 font-bold">/ year</span>
            </div>
            <p className="text-xs text-gray-300 mt-1.5">
              By dodging 40¢/kWh peak grid rates using stored daytime solar instead of receiving 3.3¢ feed-in.
            </p>
          </div>

          {/* Metric 3: Solar Victoria Loan Cashflow Equation */}
          <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-2xl p-4">
            <div className="text-xs font-bold text-orange-300 uppercase tracking-wider mb-2">
              $0 Upfront Cashflow Equation
            </div>
            <div className="space-y-1.5 text-xs text-gray-200">
              <div className="flex justify-between">
                <span>Estimated Monthly Power Savings:</span>
                <strong className="text-emerald-400">+${monthlySavings}/mo</strong>
              </div>
              <div className="flex justify-between">
                <span>Solar Victoria $8,800 Loan Repayment:</span>
                <strong className="text-gray-300">-${loanMonthly}/mo</strong>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-black">
                <span>Net Out-of-Pocket Cost:</span>
                <span className={netMonthlyBenefit >= 0 ? 'text-emerald-400' : 'text-amber-300'}>
                  {netMonthlyBenefit >= 0
                    ? `+$${netMonthlyBenefit}/mo (System pays for itself!)`
                    : `~$${Math.abs(netMonthlyBenefit)}/mo`}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="space-y-2.5 pt-2">
            <Link
              href={`/get-a-free-quote?battery=${batterySize}kWh`}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-extrabold text-base text-white bg-gradient-to-r from-[#FF5E00] to-[#E04800] hover:from-[#E04800] hover:to-[#C73C00] shadow-lg shadow-orange-500/40 transition-all text-center"
            >
              <span>Claim {batterySize}kWh Battery Loan & Free Quote</span>
              <span>→</span>
            </Link>
            <div className="text-center">
              <a
                href="tel:1300897221"
                className="text-xs text-gray-400 hover:text-white transition-colors underline font-medium"
              >
                Or speak to a Master Electrician at 1300 897 221
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
