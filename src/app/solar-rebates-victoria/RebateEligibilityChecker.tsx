'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RebateEligibilityChecker() {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState({
    isOwnerOccupier: true,
    incomeUnder150k: true,
    propertyUnder3M: true,
    receivedBefore: false,
  });

  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    suburb: '',
    monthlyBill: '$400 - $600',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const isEligible =
    answers.isOwnerOccupier &&
    answers.incomeUnder150k &&
    answers.propertyUnder3M &&
    !answers.receivedBefore;

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadForm.name,
          phone: leadForm.phone,
          email: leadForm.email,
          service: 'Victorian Solar Rebate Application ($2,800 Package)',
          propertyType: 'residential',
          suburb: leadForm.suburb,
          message: `[SOLAR REBATE CHECKER LEAD]
Eligible: ${isEligible ? 'YES' : 'NO'}
Owner Occupier / Construction: ${answers.isOwnerOccupier ? 'Yes' : 'No'}
Income <$150k: ${answers.incomeUnder150k ? 'Yes' : 'No'}
Property <$3M: ${answers.propertyUnder3M ? 'Yes' : 'No'}
Previous Rebate / System <10 yrs: ${answers.receivedBefore ? 'Yes' : 'No'}
Est. Monthly Bill: ${leadForm.monthlyBill}`,
        }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#171D4D] to-[#242C7D] p-6 sm:p-8 text-white">
        <div className="inline-block bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
          Interactive Tool
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">
          Check Your Victorian Solar Rebate Eligibility
        </h3>
        <p className="text-blue-100 text-sm sm:text-base">
          Answer 4 simple criteria in 30 seconds to confirm if you qualify for the $1,400 rebate and $1,400 interest-free loan.
        </p>
      </div>

      <div className="p-6 sm:p-10">
        {status === 'success' ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <h4 className="text-2xl font-extrabold text-[#171D4D]">
              Eligibility Application Received!
            </h4>
            <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
              Thank you, <strong>{leadForm.name}</strong>! One of our Clean Energy Council accredited rebate specialists will review your property and contact you at <strong>{leadForm.phone}</strong> to confirm your pre-approval token.
            </p>
            <div className="pt-4">
              <Link
                href="/"
                className="inline-block bg-[#171D4D] hover:bg-[#1E2560] text-white font-bold px-6 py-3 rounded-full text-sm transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* 4 Eligibility Criteria Questions */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
                <div className="pr-4">
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                    1. Are you the owner-occupier of an existing property or a home under construction?
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Applies to existing homes or homes under construction where the system is to be installed.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAnswers({ ...answers, isOwnerOccupier: true })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      answers.isOwnerOccupier
                        ? 'bg-[#FF5E00] text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnswers({ ...answers, isOwnerOccupier: false })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      !answers.isOwnerOccupier
                        ? 'bg-[#FF5E00] text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
                <div className="pr-4">
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                    2. Combined household taxable income of all owners is less than $150,000/yr?
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Based on your latest ATO Notice of Assessment for all owners.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAnswers({ ...answers, incomeUnder150k: true })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      answers.incomeUnder150k
                        ? 'bg-[#FF5E00] text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnswers({ ...answers, incomeUnder150k: false })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      !answers.incomeUnder150k
                        ? 'bg-[#FF5E00] text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
                <div className="pr-4">
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                    3. Is the property value under $3,000,000?
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    For an existing home or when construction is complete (Council CIV).
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAnswers({ ...answers, propertyUnder3M: true })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      answers.propertyUnder3M
                        ? 'bg-[#FF5E00] text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnswers({ ...answers, propertyUnder3M: false })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      !answers.propertyUnder3M
                        ? 'bg-[#FF5E00] text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
                <div className="pr-4">
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                    4. Property has NOT had solar installed in the last 10 years or received this rebate?
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    No PV system in last 10 yrs, and no previous solar/battery rebate under this program. (Moved house? You can re-apply!)
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAnswers({ ...answers, receivedBefore: false })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      !answers.receivedBefore
                        ? 'bg-[#FF5E00] text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    Yes (Eligible)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnswers({ ...answers, receivedBefore: true })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      answers.receivedBefore
                        ? 'bg-[#FF5E00] text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            {/* Live Result Alert Box */}
            {isEligible ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-400 mb-8 text-emerald-950">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🎉</span>
                  <h4 className="text-lg font-black text-emerald-900">
                    Congratulations! You Appear 100% Eligible!
                  </h4>
                </div>
                <p className="text-sm text-emerald-800 leading-relaxed">
                  You qualify for the <strong>$1,400 Solar Panel Rebate</strong> + <strong>$1,400 Interest-Free Loan</strong> (Total up to <strong>$2,800 upfront reduction</strong>). Enter your details below and Billabong Solar will prepare your Solar Victoria portal application for free!
                </p>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-amber-50 border-2 border-amber-300 mb-8 text-amber-950">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">ℹ️</span>
                  <h4 className="text-lg font-black text-amber-900">
                    Alternative Victorian Solar Incentives Available
                  </h4>
                </div>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Even if you do not meet all Solar Homes Program criteria, you are still 100% eligible for federal <strong>STC discounts (saving up to $2,500+)</strong> and Victorian battery loan schemes. Submit your details below for our team to calculate your maximum savings!
                </p>
              </div>
            )}

            {/* Instant Fast Application Form */}
            <form onSubmit={handleSubmitLead} className="space-y-4">
              <h4 className="font-extrabold text-[#171D4D] text-lg">
                Reserve Your Victorian Rebate Quote
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Smith"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5E00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Phone Number (Mobile) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0412 345 678"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5E00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. david@example.com"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5E00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Suburb or Victorian Postcode *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tarneit, 3029"
                    value={leadForm.suburb}
                    onChange={(e) => setLeadForm({ ...leadForm, suburb: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5E00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Average Quarterly Electricity Bill
                </label>
                <select
                  value={leadForm.monthlyBill}
                  onChange={(e) => setLeadForm({ ...leadForm, monthlyBill: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5E00] bg-white"
                >
                  <option value="Under $400">Under $400 / quarter</option>
                  <option value="$400 - $700">$400 - $700 / quarter</option>
                  <option value="$700 - $1,200">$700 - $1,200 / quarter</option>
                  <option value="$1,200+">$1,200+ / quarter (High Usage)</option>
                </select>
              </div>

              {status === 'error' && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold">
                  There was an error sending your request. Please call us directly at 1300 897 221.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 rounded-xl font-extrabold text-white bg-gradient-to-r from-[#FF5E00] via-[#FF6A00] to-[#FF7A00] hover:shadow-lg shadow-md transition-all text-base disabled:opacity-50"
              >
                {status === 'submitting' ? 'Processing Eligibility...' : 'Claim My Victorian Solar Rebate Quote →'}
              </button>
              <p className="text-center text-[11px] text-gray-400">
                🔒 Your details are 100% secure. Billabong Solar is a certified NETCC Approved Solar Seller adhering to the New Energy Tech Consumer Code.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
