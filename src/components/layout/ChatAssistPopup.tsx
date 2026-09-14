'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type ScreenType =
  | 'SCREEN_1'
  | 'SCREEN_2'
  | 'ROUTE_B_STEP_1'
  | 'ROUTE_B_STEP_2'
  | 'ROUTE_B_STEP_3'
  | 'ROUTE_B_STEP_4';

export default function ChatAssistPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('SCREEN_1');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // Route B Form State
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [billFile, setBillFile] = useState<File | null>(null);
  const [switchboardFile, setSwitchboardFile] = useState<File | null>(null);

  // Tracking
  const [leadId, setLeadId] = useState<string>('');
  const [odooLeadId, setOdooLeadId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [waOpened, setWaOpened] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const billInputRef = useRef<HTMLInputElement>(null);
  const switchboardInputRef = useRef<HTMLInputElement>(null);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || '61450941413';

  // Auto-open after 3.5 seconds on initial site visit (once per session)
  useEffect(() => {
    try {
      const alreadyShown = sessionStorage.getItem('billabong_chat_assist_shown');
      if (!alreadyShown) {
        const timer = setTimeout(() => {
          setIsOpen(true);
          sessionStorage.setItem('billabong_chat_assist_shown', 'true');
        }, 3500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore if sessionStorage is unavailable
    }
  }, []);

  // Auto scroll to bottom whenever screen changes or message appears
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentScreen, errorMessage, waOpened]);

  // SCREEN 1: Category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setErrorMessage('');
    setCurrentScreen('SCREEN_2');
  };

  // ROUTE A: WhatsApp launch
  const handleRouteAWhatsApp = () => {
    let prefilledText = "Hi Billabong Solar, I'd like a quote for residential solar.";
    if (selectedCategory === 'Battery Storage') {
      prefilledText = "Hi Billabong Solar, I'd like a quote for battery storage.";
    } else if (selectedCategory === 'Commercial Solar') {
      prefilledText = "Hi Billabong Solar, I'd like a quote for commercial solar.";
    } else if (selectedCategory === 'General Question or Rebates') {
      prefilledText = "Hi Billabong Solar, I have a question about solar and rebates.";
    }

    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefilledText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setWaOpened(true);
  };

  // ROUTE B - STEP 1: Phone (Required) + Name (Optional) -> Save lead IMMEDIATELY
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanPhone = phone.trim();
    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 8) {
      setErrorMessage('Please enter a valid phone number so we can reach you.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/chat-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          category: selectedCategory || 'Residential Solar',
          phone: cleanPhone,
          name: name.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setLeadId(data.leadId);
        if (data.odooLeadId) {
          setOdooLeadId(data.odooLeadId);
        }
        setCurrentScreen('ROUTE_B_STEP_2');
      } else {
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error saving Step 1 lead:', err);
      // Even if network glitches, advance to step 2 so user is not blocked
      setCurrentScreen('ROUTE_B_STEP_2');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ROUTE B - STEP 2: Email & Property Address (Optional Nudge)
  const handleStep2Submit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      if (email.trim() || address.trim()) {
        await fetch('/api/chat-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'update_step2',
            leadId,
            odooLeadId,
            name: name.trim(),
            phone: phone.trim(),
            category: selectedCategory,
            email: email.trim(),
            address: address.trim(),
          }),
        });
      }
    } catch (err) {
      console.error('Error updating Step 2 lead:', err);
    } finally {
      setIsSubmitting(false);
      setCurrentScreen('ROUTE_B_STEP_3');
    }
  };

  const handleStep2Skip = () => {
    setErrorMessage('');
    setCurrentScreen('ROUTE_B_STEP_3');
  };

  // ROUTE B - STEP 3: Upload recent bill & switchboard photo (Optional)
  const handleStep3Submit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('leadId', leadId);
      if (odooLeadId) formData.append('odooLeadId', odooLeadId.toString());
      formData.append('name', name.trim());
      formData.append('phone', phone.trim());
      formData.append('email', email.trim());
      formData.append('address', address.trim());
      formData.append('category', selectedCategory);

      if (billFile) formData.append('billFile', billFile);
      if (switchboardFile) formData.append('switchboardFile', switchboardFile);

      await fetch('/api/chat-lead', {
        method: 'POST',
        body: formData,
      });
    } catch (err) {
      console.error('Error uploading Step 3 files:', err);
    } finally {
      setIsSubmitting(false);
      setCurrentScreen('ROUTE_B_STEP_4');
    }
  };

  const handleStep3Skip = () => {
    setErrorMessage('');
    setCurrentScreen('ROUTE_B_STEP_4');
  };

  const handleReset = () => {
    setCurrentScreen('SCREEN_1');
    setSelectedCategory('');
    setPhone('');
    setName('');
    setEmail('');
    setAddress('');
    setBillFile(null);
    setSwitchboardFile(null);
    setLeadId('');
    setOdooLeadId(null);
    setErrorMessage('');
    setWaOpened(false);
  };

  return (
    <aside aria-label="Billabong Solar Chat Assistant" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Floating Trigger Pill / Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 bg-gradient-to-r from-[#171D4D] to-[#252E6D] hover:to-[#FF5E00] text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/20"
          aria-label="Open Billabong Solar Chat Assistant"
        >
          <div className="relative">
            <span className="flex h-3.5 w-3.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
          </div>
          <div className="text-left">
            <p className="text-xs font-black uppercase tracking-wider text-orange-400">Solar Assistant</p>
            <p className="text-xs sm:text-sm font-bold text-white">Ask a Question or Quote</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg">
            💬
          </div>
        </button>
      )}

      {/* Main Chat Assistant Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-assist-title"
          className="w-[calc(100vw-2rem)] sm:w-[420px] max-h-[85vh] sm:max-h-[620px] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#171D4D] via-[#1F265D] to-[#252E6D] p-4 text-white flex items-center justify-between shadow-md relative">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center shadow-inner overflow-hidden">
                <Image
                  src="/images/authors/billabong-admin.svg"
                  alt="Billabong Solar Consultant"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h3 id="chat-assist-title" className="font-extrabold text-sm sm:text-base leading-tight text-white flex items-center gap-1.5">
                  Billabong Solar Assistant
                </h3>
                <p className="text-[11px] text-gray-300 font-medium">
                  CEC Accredited • NETCC Approved
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {currentScreen !== 'SCREEN_1' && currentScreen !== 'ROUTE_B_STEP_4' && (
                <button
                  type="button"
                  onClick={() => {
                    if (currentScreen === 'SCREEN_2') setCurrentScreen('SCREEN_1');
                    else if (currentScreen === 'ROUTE_B_STEP_1') setCurrentScreen('SCREEN_2');
                    else if (currentScreen === 'ROUTE_B_STEP_2') setCurrentScreen('ROUTE_B_STEP_1');
                    else if (currentScreen === 'ROUTE_B_STEP_3') setCurrentScreen('ROUTE_B_STEP_2');
                  }}
                  className="p-1.5 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/10 text-xs"
                  title="Go Back"
                >
                  ← Back
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close chat assistant"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Chat Body (Scrollable) */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 text-slate-800 text-sm">
            
            {/* SCREEN 1: What can we help you with? */}
            <div className="space-y-3">
              {/* Bot greeting */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#FF5E00] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                  ☀️
                </div>
                <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-gray-200 shadow-xs max-w-[85%] text-slate-800">
                  <p className="font-semibold text-xs sm:text-sm">
                    Hi there, welcome to Billabong Solar. What can we help you with?
                  </p>
                </div>
              </div>

              {/* Screen 1 Options */}
              {currentScreen === 'SCREEN_1' && (
                <div className="pl-9 space-y-2">
                  {[
                    { label: 'Residential Solar', desc: 'Slash electricity bills with high-efficiency panels' },
                    { label: 'Battery Storage', desc: 'Store solar, backup blackouts & VPP earnings' },
                    { label: 'Commercial Solar', desc: 'Commercial scale 30kW – 1MW systems' },
                    { label: 'General Question or Rebates', desc: 'Solar Victoria rebates, loans & advice' },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleCategorySelect(opt.label)}
                      className="w-full text-left p-3 rounded-2xl bg-white hover:bg-orange-50 border border-gray-200 hover:border-[#FF5E00] text-slate-900 transition-all shadow-xs group"
                    >
                      <div className="font-bold text-xs sm:text-sm text-[#171D4D] group-hover:text-[#FF5E00]">
                        {opt.label}
                      </div>
                      <div className="text-[11px] text-gray-500 font-medium mt-0.5">
                        {opt.desc}
                      </div>
                    </button>
                  ))}
                  <p className="text-[11px] text-gray-400 italic pl-1">
                    No technical knowledge needed — we're here to guide you.
                  </p>
                </div>
              )}
            </div>

            {/* SCREEN 2: Equal Weight WhatsApp vs Enquiry */}
            {currentScreen !== 'SCREEN_1' && (
              <>
                {/* User selection echo */}
                <div className="flex justify-end">
                  <div className="bg-[#171D4D] text-white p-2.5 px-4 rounded-2xl rounded-tr-none text-xs sm:text-sm font-semibold shadow-xs">
                    {selectedCategory}
                  </div>
                </div>

                {/* Assistant response offering both routes */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#FF5E00] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                    ☀️
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-gray-200 shadow-xs max-w-[88%] text-slate-800 space-y-1">
                    <p className="font-semibold text-xs sm:text-sm leading-relaxed">
                      Happy to help. Message us now, or leave your details and we'll come back to you.
                    </p>
                  </div>
                </div>

                {/* Both routes rendered with EQUAL weight */}
                {currentScreen === 'SCREEN_2' && (
                  <div className="pl-9 space-y-3 pt-1">
                    <div className="grid grid-cols-1 gap-2.5">
                      {/* Route A: WhatsApp */}
                      <button
                        type="button"
                        onClick={handleRouteAWhatsApp}
                        className="w-full text-left p-3.5 rounded-2xl bg-white hover:bg-emerald-50 border-2 border-emerald-500 hover:border-emerald-600 text-slate-900 transition-all shadow-sm group flex items-start justify-between gap-3"
                      >
                        <div>
                          <div className="font-extrabold text-xs sm:text-sm text-emerald-800 flex items-center gap-1.5">
                            <span>💬</span> Message us on WhatsApp
                          </div>
                          <p className="text-[11px] text-gray-500 mt-1">
                            One tap, pre-filled message — no typing required
                          </p>
                        </div>
                        <span className="text-emerald-600 font-black text-sm shrink-0">→</span>
                      </button>

                      {/* Route B: Send Enquiry */}
                      <button
                        type="button"
                        onClick={() => {
                          setErrorMessage('');
                          setCurrentScreen('ROUTE_B_STEP_1');
                        }}
                        className="w-full text-left p-3.5 rounded-2xl bg-white hover:bg-orange-50 border-2 border-[#FF5E00] hover:border-orange-600 text-slate-900 transition-all shadow-sm group flex items-start justify-between gap-3"
                      >
                        <div>
                          <div className="font-extrabold text-xs sm:text-sm text-[#FF5E00] flex items-center gap-1.5">
                            <span>✉️</span> Send an enquiry instead
                          </div>
                          <p className="text-[11px] text-gray-500 mt-1">
                            Leave your number and we'll get straight back to you
                          </p>
                        </div>
                        <span className="text-[#FF5E00] font-black text-sm shrink-0">→</span>
                      </button>
                    </div>

                    {waOpened && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs">
                        <p className="font-bold">Opening WhatsApp in a new tab...</p>
                        <p className="text-[11px] mt-0.5 text-emerald-700">
                          If it didn't open automatically,{' '}
                          <button
                            type="button"
                            onClick={handleRouteAWhatsApp}
                            className="underline font-bold hover:text-emerald-950"
                          >
                            click here to launch WhatsApp
                          </button>.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* ROUTE B - STEP 1: Phone & Name */}
            {currentScreen === 'ROUTE_B_STEP_1' && (
              <div className="space-y-3 pl-9">
                <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs">
                  <p className="font-bold text-xs sm:text-sm text-slate-900 mb-3">
                    No problem. What's the best number to reach you on?
                  </p>

                  <form onSubmit={handleStep1Submit} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0412 345 678"
                        required
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF5E00] focus:border-[#FF5E00] outline-hidden font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Your Name <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sarah"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF5E00] focus:border-[#FF5E00] outline-hidden font-medium"
                      />
                    </div>

                    {errorMessage && (
                      <p className="text-xs text-red-600 font-semibold">{errorMessage}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-[#FF5E00] hover:bg-orange-600 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Saving Lead...' : 'Continue →'}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ROUTE B - STEP 2: Email & Property Address (The Nudge) */}
            {currentScreen === 'ROUTE_B_STEP_2' && (
              <div className="space-y-3 pl-9">
                <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs">
                  <p className="font-bold text-xs sm:text-sm text-slate-900 mb-3 leading-relaxed">
                    Almost done. These two aren't essential, but they let us do the homework before we call you.
                  </p>

                  <form onSubmit={handleStep2Submit} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-0.5">
                        Email address <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. name@example.com"
                        className="w-full px-3.5 py-2 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF5E00] focus:border-[#FF5E00] outline-hidden font-medium"
                      />
                      <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1 italic">
                        So we can send your written quote through.
                      </p>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-0.5">
                        Property address <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        autoComplete="street-address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. 12 Smith St, Scoresby VIC"
                        className="w-full px-3.5 py-2 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF5E00] focus:border-[#FF5E00] outline-hidden font-medium"
                      />
                      <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1 italic">
                        Lets us check your roof and confirm which rebates apply to your place.
                      </p>
                    </div>

                    <div className="pt-1 space-y-2 text-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 bg-[#FF5E00] hover:bg-orange-600 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all shadow-md"
                      >
                        {isSubmitting ? 'Saving...' : 'Continue →'}
                      </button>

                      {/* Plain text skip link, genuinely visible */}
                      <button
                        type="button"
                        onClick={handleStep2Skip}
                        className="text-xs text-gray-500 hover:text-slate-800 font-semibold underline py-1 inline-block"
                      >
                        Skip this step
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ROUTE B - STEP 3: Upload bill & switchboard photo */}
            {currentScreen === 'ROUTE_B_STEP_3' && (
              <div className="space-y-3 pl-9">
                <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs">
                  <p className="font-bold text-xs sm:text-sm text-slate-900 mb-3 leading-relaxed">
                    Last one, and it's the big time-saver. If you have these handy, it means we can often quote without needing to visit first.
                  </p>

                  <form onSubmit={handleStep3Submit} className="space-y-3.5">
                    {/* Bill Upload */}
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Recent electricity bill <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        ref={billInputRef}
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setBillFile(e.target.files[0]);
                          }
                        }}
                        className="hidden"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => billInputRef.current?.click()}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-gray-300 rounded-xl text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5"
                        >
                          <span>📄</span> {billFile ? 'Change Bill' : 'Upload electricity bill'}
                        </button>
                        {billFile && (
                          <span className="text-[11px] text-emerald-700 font-medium truncate max-w-[170px]">
                            ✓ {billFile.name}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Switchboard Photo Upload */}
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Photo of your switchboard <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        ref={switchboardInputRef}
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setSwitchboardFile(e.target.files[0]);
                          }
                        }}
                        className="hidden"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => switchboardInputRef.current?.click()}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-gray-300 rounded-xl text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5"
                        >
                          <span>📸</span> {switchboardFile ? 'Change Photo' : 'Upload switchboard photo'}
                        </button>
                        {switchboardFile && (
                          <span className="text-[11px] text-emerald-700 font-medium truncate max-w-[170px]">
                            ✓ {switchboardFile.name}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1 italic leading-tight">
                        The box with all the circuit breakers - usually in the hallway, garage, or on an outside wall.
                      </p>
                    </div>

                    <div className="pt-2 space-y-2 text-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 bg-[#FF5E00] hover:bg-orange-600 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all shadow-md"
                      >
                        {isSubmitting ? 'Uploading...' : 'Continue →'}
                      </button>

                      {/* Plain text skip link */}
                      <button
                        type="button"
                        onClick={handleStep3Skip}
                        className="text-xs text-gray-500 hover:text-slate-800 font-semibold underline py-1 inline-block"
                      >
                        Skip this step
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ROUTE B - STEP 4: Plain confirmation */}
            {currentScreen === 'ROUTE_B_STEP_4' && (
              <div className="space-y-3 pl-9">
                <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl mb-2 font-bold">
                    ✓
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-[#171D4D] mb-1.5">
                    Enquiry Received
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    Thanks {name.trim() ? name.trim() : 'for reaching out'}. One of our team will be in touch within one business day to talk through what would suit your place.
                  </p>

                  <div className="my-3 py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-[11px] text-slate-600 space-y-1">
                    <p><strong>Contact number:</strong> {phone}</p>
                    {email && <p><strong>Email:</strong> {email}</p>}
                    {address && <p><strong>Property:</strong> {address}</p>}
                    <p><strong>Service requested:</strong> {selectedCategory}</p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-2.5 bg-[#171D4D] hover:bg-[#252E6D] text-white font-bold rounded-xl text-xs transition-all shadow-xs"
                    >
                      Done
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs text-gray-500 hover:text-gray-800 underline py-0.5"
                    >
                      Start another enquiry
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Footer reassurance banner */}
          <div className="px-4 py-2 bg-slate-100 border-t border-gray-200 text-center text-[10px] text-gray-500 font-medium">
            🔒 NetCC Approved Seller • Your information is strictly protected.
          </div>
        </div>
      )}
    </aside>
  );
}
