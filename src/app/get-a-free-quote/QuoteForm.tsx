'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type QuoteType = 'home' | 'commercial';

const HOME_PROPERTY_TYPES = [
  { id: 'Single Storey House', label: 'Single Storey House', desc: 'Standard single-level residential home' },
  { id: 'Double Storey House', label: 'Double Storey House', desc: 'Multi-level home, townhome or villa' },
  { id: 'Townhouse / Unit', label: 'Townhouse / Unit', desc: 'Strata or shared roofline property' },
  { id: 'Rural Property / Acreage', label: 'Rural Property / Acreage', desc: 'Acreage, farmstead or semi-rural lot' },
];

const COMMERCIAL_PROPERTY_TYPES = [
  { id: 'Warehouse / Factory', label: 'Warehouse / Factory', desc: 'Large industrial roof, high day consumption' },
  { id: 'Office / Commercial Building', label: 'Office / Commercial', desc: 'Offices, medical centres, professional suites' },
  { id: 'Retail / Showroom / Hospitality', label: 'Retail / Hospitality', desc: 'Supermarkets, pubs, restaurants, retail shops' },
  { id: 'Agribusiness / Winery / Farm', label: 'Agribusiness / Winery', desc: 'Dairy, cold storage, wineries, packing sheds' },
];

const HOME_BILLS = ['Under $150', '$150 - $300', '$300 - $500', 'Over $500'];
const COMMERCIAL_BILLS = ['Under $3,000 / qtr', '$3,000 - $6,000 / qtr', '$6,000 - $9,000 / qtr', 'Over $9,000 / qtr'];

const HOME_SYSTEM_INTERESTS = [
  'Solar Panels Only',
  'Solar + Battery Storage (Most Popular)',
  'Battery Storage Only (Already have solar)',
  'Not Sure - Recommend Best Option',
];

const COMMERCIAL_POWER_SUPPLIES = [
  'Three Phase Power',
  'Single Phase Power',
  'Not Sure (We will assess via your bill)',
];

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const paramType = searchParams.get('type')?.toLowerCase();

  // Wizard Step: 1 = Contact Details (Lead Captured Immediately), 2 = Property Specifics, 3 = Confirmation
  const [step, setStep] = useState(1);
  const [quoteType, setQuoteType] = useState<QuoteType>('home');

  // Contact details (Step 1)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Tailored details (Step 2)
  const [propertyType, setPropertyType] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [systemInterest, setSystemInterest] = useState('');
  const [powerSupply, setPowerSupply] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Tracking & async state
  const [leadId, setLeadId] = useState('');
  const [odooLeadId, setOdooLeadId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize quote type from URL parameter if present
  useEffect(() => {
    if (paramType === 'commercial' || paramType === 'business') {
      setQuoteType('commercial');
    } else if (paramType === 'home' || paramType === 'residential') {
      setQuoteType('home');
    }
  }, [paramType]);

  // Set intelligent defaults when switching quote type
  useEffect(() => {
    if (quoteType === 'home') {
      if (!propertyType || COMMERCIAL_PROPERTY_TYPES.some(c => c.id === propertyType)) {
        setPropertyType('Single Storey House');
      }
      if (!billAmount || COMMERCIAL_BILLS.includes(billAmount)) {
        setBillAmount('$150 - $300');
      }
      if (!systemInterest) {
        setSystemInterest('Solar + Battery Storage (Most Popular)');
      }
    } else {
      if (!propertyType || HOME_PROPERTY_TYPES.some(h => h.id === propertyType)) {
        setPropertyType('Warehouse / Factory');
      }
      if (!billAmount || HOME_BILLS.includes(billAmount)) {
        setBillAmount('$3,000 - $6,000 / qtr');
      }
      if (!powerSupply) {
        setPowerSupply('Three Phase Power');
      }
    }
  }, [quoteType]);

  // =========================================================================
  // STEP 1 HANDLER: Collect Name, Phone & Email -> DISPATCH LEAD IMMEDIATELY
  // Even if customer leaves without completing Step 2, contact info is captured!
  // =========================================================================
  const handleStep1Continue = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim();

    if (!cleanName) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 8) {
      setErrorMessage('Please enter a valid Australian contact number.');
      return;
    }
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          name: cleanName,
          phone: cleanPhone,
          email: cleanEmail,
          quoteType,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setLeadId(data.leadId);
        if (data.odooLeadId) {
          setOdooLeadId(data.odooLeadId);
        }
      }
    } catch (err) {
      console.error('[QuoteForm] Early lead capture dispatch error:', err);
    } finally {
      setIsSubmitting(false);
      // Advance to Step 2 so user proceeds smoothly
      setStep(2);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // =========================================================================
  // STEP 2 HANDLER: Final Submission of Property & Energy Details
  // =========================================================================
  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!address.trim()) {
      setErrorMessage('Please enter your installation address or suburb in Victoria.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'complete',
          leadId,
          odooLeadId,
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          quoteType,
          propertyType,
          billAmount,
          systemInterest: quoteType === 'home' ? systemInterest : undefined,
          powerSupply: quoteType === 'commercial' ? powerSupply : undefined,
          address: address.trim(),
          notes: notes.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStep(3); // Success Screen
        window.scrollTo({ top: 100, behavior: 'smooth' });
      } else {
        setErrorMessage(data.message || 'Failed to complete submission. Please try again.');
      }
    } catch (err) {
      console.error('[QuoteForm] Final quote submission error:', err);
      // Even if network glitches on the update call, show thank you because Step 1 lead was already captured
      setStep(3);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================================================
  // STEP 3: Thank You / Confirmation Screen
  // =========================================================================
  if (step === 3) {
    const firstName = name.trim().split(' ')[0] || 'there';
    const isCommercial = quoteType === 'commercial';

    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-14 text-center border border-gray-100 animate-fadeIn">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-[#FF5E00] mb-3">
          {isCommercial ? 'Commercial Feasibility Request' : 'Home Solar Quote'}
        </span>

        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">
          Quote Request Received!
        </h2>

        <p className="text-xl md:text-2xl font-bold text-[#FF5E00] mb-4">
          Thanks {firstName}!
        </p>

        <p className="text-gray-600 text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
          {isCommercial
            ? 'Our commercial solar engineering team has received your details and will prepare a tailored rooftop assessment and feasibility report.'
            : 'One of our Clean Energy Council accredited solar specialists will analyze your property’s satellite imagery and prepare your customized solar proposal.'}
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 max-w-md mx-auto mb-8 text-left text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Contact:</span>
            <span className="font-semibold text-gray-900">{name} ({phone})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Email:</span>
            <span className="font-semibold text-gray-900">{email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Address:</span>
            <span className="font-semibold text-gray-900 truncate max-w-[220px]">{address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Estimated Bill:</span>
            <span className="font-semibold text-[#FF5E00]">{billAmount}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="w-full sm:w-auto bg-[#171D4D] hover:bg-[#12163d] text-white font-bold px-8 py-3.5 rounded-xl transition duration-300 shadow-md text-sm"
          >
            Return to Homepage
          </Link>
          <button
            type="button"
            onClick={() => {
              setStep(1);
              setName('');
              setPhone('');
              setEmail('');
              setAddress('');
              setNotes('');
            }}
            className="w-full sm:w-auto text-[#FF5E00] font-bold hover:underline transition-colors text-sm px-4 py-3"
          >
            Start Another Quote
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      {/* Progress Bar */}
      <div className="bg-gray-100 h-2 w-full">
        <div
          className="bg-[#FF5E00] h-full transition-all duration-500 ease-out"
          style={{ width: `${(step / 2) * 100}%` }}
        />
      </div>

      <div className="p-6 md:p-12">
        {/* Header Navigation between steps */}
        <div className="mb-6 flex justify-between items-center text-sm">
          <span className="font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-xs uppercase tracking-wider">
            Step {step} of 2: {step === 1 ? 'Contact Details' : (quoteType === 'commercial' ? 'Commercial Details' : 'Home Details')}
          </span>
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-[#FF5E00] font-bold hover:underline transition-colors flex items-center gap-1 text-sm"
            >
              ← Edit Contact Info
            </button>
          )}
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* =================================================================== */}
        {/* STEP 1: Contact Details & Quote Category (Early Lead Capture)       */}
        {/* =================================================================== */}
        {step === 1 && (
          <form onSubmit={handleStep1Continue} className="space-y-6 animate-fadeIn">
            {/* Quote Type Switcher */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Select Quote Type:
              </label>
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-gray-100 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setQuoteType('home')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-extrabold text-sm transition-all ${
                    quoteType === 'home'
                      ? 'bg-white text-[#FF5E00] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="text-lg">🏡</span>
                  <span>Home Solar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setQuoteType('commercial')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-extrabold text-sm transition-all ${
                    quoteType === 'commercial'
                      ? 'bg-white text-[#FF5E00] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="text-lg">🏢</span>
                  <span>Commercial Solar</span>
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                {quoteType === 'commercial' ? 'Commercial Solar Feasibility Quote' : 'Free Home Solar Quote'}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Enter your contact details first so our Clean Energy Council specialists can prepare your assessment.
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1">
                  {quoteType === 'commercial' ? 'Contact Name / Business Representative *' : 'Full Name *'}
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={quoteType === 'commercial' ? 'e.g. John Smith' : 'e.g. Sarah Jenkins'}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#FF5E00] focus:border-[#FF5E00] outline-none transition text-gray-900 font-medium placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1">
                  Contact Number (Australian Mobile or Direct Line) *
                </label>
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0400 000 000"
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#FF5E00] focus:border-[#FF5E00] outline-none transition text-gray-900 font-medium placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com.au"
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#FF5E00] focus:border-[#FF5E00] outline-none transition text-gray-900 font-medium placeholder-gray-400"
                />
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="text-green-500 text-sm">✓</span> 100% Free & No Obligation
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-green-500 text-sm">✓</span> Fast 2-Minute Response
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-green-500 text-sm">✓</span> CEC Accredited Installers
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FF5E00] hover:bg-orange-600 disabled:opacity-70 text-white font-extrabold py-4 px-6 rounded-xl transition duration-300 shadow-lg flex justify-center items-center gap-2 text-base tracking-wide"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving & Continuing...
                </span>
              ) : (
                <span>
                  {quoteType === 'commercial' ? 'Continue to Commercial Details →' : 'Continue to Home Details →'}
                </span>
              )}
            </button>
          </form>
        )}

        {/* =================================================================== */}
        {/* STEP 2: Tailored Details (Home vs Commercial)                       */}
        {/* =================================================================== */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-6 animate-fadeIn">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-[#FF5E00] mb-2">
                {quoteType === 'commercial' ? 'Step 2: Commercial Site Specifications' : 'Step 2: Home Solar Specifications'}
              </span>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                {quoteType === 'commercial' ? 'Tell Us About Your Facility' : 'Tell Us About Your Home'}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {quoteType === 'commercial'
                  ? 'These details help us size your commercial inverter and solar panel system (30kW – 1MW).'
                  : 'These details allow our designers to calculate your potential solar savings and rebates.'}
              </p>
            </div>

            {/* 1. Property / Building Type */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                {quoteType === 'commercial' ? 'Facility / Building Type *' : 'Property Type *'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(quoteType === 'commercial' ? COMMERCIAL_PROPERTY_TYPES : HOME_PROPERTY_TYPES).map((item) => (
                  <label
                    key={item.id}
                    className={`block p-3.5 border-2 rounded-xl cursor-pointer transition-all ${
                      propertyType === item.id
                        ? 'border-[#FF5E00] bg-orange-50/70 shadow-sm'
                        : 'border-gray-200 hover:border-orange-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="propertyType"
                      value={item.id}
                      checked={propertyType === item.id}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center flex-shrink-0 ${
                          propertyType === item.id ? 'border-[#FF5E00]' : 'border-gray-300'
                        }`}
                      >
                        {propertyType === item.id && (
                          <div className="w-2 h-2 rounded-full bg-[#FF5E00]" />
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-bold text-gray-900 block leading-tight">{item.label}</span>
                        <span className="text-xs text-gray-500 block mt-0.5">{item.desc}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Electricity Bill Spend */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                {quoteType === 'commercial'
                  ? 'Estimated Quarterly Electricity Bill *'
                  : 'Estimated Monthly Electricity Bill *'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(quoteType === 'commercial' ? COMMERCIAL_BILLS : HOME_BILLS).map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setBillAmount(amount)}
                    className={`py-3 px-2 rounded-xl border-2 text-center text-xs sm:text-sm font-bold transition-all ${
                      billAmount === amount
                        ? 'border-[#FF5E00] bg-[#FF5E00] text-white shadow-sm'
                        : 'border-gray-200 hover:border-orange-300 bg-white text-gray-800'
                    }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. System Interest (Home) OR Power Supply (Commercial) */}
            {quoteType === 'home' ? (
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  What are you looking to install? *
                </label>
                <div className="space-y-2">
                  {HOME_SYSTEM_INTERESTS.map((interest) => (
                    <label
                      key={interest}
                      className={`block p-3 border-2 rounded-xl cursor-pointer transition-all ${
                        systemInterest === interest
                          ? 'border-[#FF5E00] bg-orange-50/70 shadow-sm'
                          : 'border-gray-200 hover:border-orange-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="systemInterest"
                        value={interest}
                        checked={systemInterest === interest}
                        onChange={(e) => setSystemInterest(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            systemInterest === interest ? 'border-[#FF5E00]' : 'border-gray-300'
                          }`}
                        >
                          {systemInterest === interest && (
                            <div className="w-2 h-2 rounded-full bg-[#FF5E00]" />
                          )}
                        </div>
                        <span className="text-sm font-bold text-gray-800">{interest}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Building Power Supply Phase *
                </label>
                <div className="space-y-2">
                  {COMMERCIAL_POWER_SUPPLIES.map((supply) => (
                    <label
                      key={supply}
                      className={`block p-3 border-2 rounded-xl cursor-pointer transition-all ${
                        powerSupply === supply
                          ? 'border-[#FF5E00] bg-orange-50/70 shadow-sm'
                          : 'border-gray-200 hover:border-orange-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="powerSupply"
                        value={supply}
                        checked={powerSupply === supply}
                        onChange={(e) => setPowerSupply(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            powerSupply === supply ? 'border-[#FF5E00]' : 'border-gray-300'
                          }`}
                        >
                          {powerSupply === supply && (
                            <div className="w-2 h-2 rounded-full bg-[#FF5E00]" />
                          )}
                        </div>
                        <span className="text-sm font-bold text-gray-800">{supply}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Installation Address */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">
                {quoteType === 'commercial' ? 'Facility / Installation Address in Victoria *' : 'Installation Address or Suburb in Victoria *'}
              </label>
              <input
                required
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={quoteType === 'commercial' ? 'e.g. 100 Commercial Rd, Dandenong VIC 3175' : 'e.g. 24 Sunlit Way, Point Cook VIC 3030'}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#FF5E00] focus:border-[#FF5E00] outline-none transition text-gray-900 font-medium placeholder-gray-400"
              />
            </div>

            {/* 5. Additional Notes (Optional) */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">
                Special Requests or Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={quoteType === 'commercial' ? 'Any details regarding roof space, operating hours, or timeline...' : 'e.g. Tin roof, EV charger planning, battery interest...'}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#FF5E00] focus:border-[#FF5E00] outline-none transition text-gray-900 font-medium placeholder-gray-400 text-sm"
              />
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-xl transition duration-200 text-sm"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-2/3 bg-[#171D4D] hover:bg-[#12163d] disabled:opacity-70 text-white font-extrabold py-4 rounded-xl transition duration-300 shadow-xl flex justify-center items-center gap-2 text-sm sm:text-base tracking-wide"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span>
                    {quoteType === 'commercial' ? 'Submit Commercial Quote' : 'Submit Home Solar Quote'}
                  </span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
