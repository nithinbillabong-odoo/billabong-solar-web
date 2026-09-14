'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ChatState {
  service: string;
  quarterlyBill: string;
  suburb: string;
  name: string;
  phone: string;
  email: string;
}

export default function ChatAssistPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPoppedAutomatically, setHasPoppedAutomatically] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState<ChatState>({
    service: '',
    quarterlyBill: '',
    suburb: '',
    name: '',
    phone: '',
    email: '',
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-open after 3.5 seconds on initial site visit (once per session)
  useEffect(() => {
    try {
      const alreadyShown = sessionStorage.getItem('billabong_chat_assist_shown');
      if (!alreadyShown) {
        const timer = setTimeout(() => {
          setIsOpen(true);
          setHasPoppedAutomatically(true);
          sessionStorage.setItem('billabong_chat_assist_shown', 'true');
        }, 3500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback if sessionStorage is disabled
    }
  }, []);

  // Auto scroll to bottom of chat when step changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentStep, isSuccess]);

  const handleServiceSelect = (service: string) => {
    setFormData((prev) => ({ ...prev, service }));
    setCurrentStep(2);
  };

  const handleBillSelect = (quarterlyBill: string) => {
    setFormData((prev) => ({ ...prev, quarterlyBill }));
    setCurrentStep(3);
  };

  const handleSuburbSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.suburb.trim()) {
      setErrorMessage('Please enter your suburb or postcode');
      return;
    }
    setErrorMessage('');
    setCurrentStep(4);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please provide your name');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMessage('Please enter a valid phone number');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: `${formData.suburb.trim()}, Victoria`,
        message: `[Chat Assistant Lead]\n- Service Requested: ${formData.service}\n- Average Quarterly Bill: ${formData.quarterlyBill}\n- Property Location: ${formData.suburb}, Victoria`,
        source: 'Website Chat Assistant',
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(data.message || 'Unable to submit. Please try again.');
      }
    } catch (err) {
      console.error('Chat lead submission error:', err);
      setErrorMessage('Network error. Please call 1300 897 221 directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* 1. Chat Window Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Solar Quote Assistant"
          className="mb-3 w-[92vw] sm:w-[380px] max-h-[580px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-fade-in transition-all duration-300"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#171D4D] to-[#252E6D] p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white/15 p-0.5 flex items-center justify-center border border-white/20">
                <span className="text-xl">☀️</span>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#171D4D] rounded-full" />
              </div>
              <div>
                <div className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  <span>Billabong Solar Assistant</span>
                </div>
                <div className="text-[11px] text-emerald-300 font-medium flex items-center gap-1">
                  <span>● Online</span>
                  <span className="text-gray-300">• NETCC Approved</span>
                </div>
              </div>
            </div>

            {/* Header controls: WhatsApp quick link & Close */}
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/61450941413?text=Hi%20Billabong%20Solar%2C%20I%20would%20like%20a%20solar%20quote"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp"
                className="p-1.5 rounded-full bg-white/10 hover:bg-emerald-500 text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-lg transition-colors"
                aria-label="Close Assistant"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="p-4 overflow-y-auto flex-1 bg-slate-50/70 space-y-4 text-sm max-h-[440px]">
            
            {/* Bot Message 1 */}
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#FF5E00] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                ⚡
              </div>
              <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-slate-800 leading-relaxed max-w-[85%]">
                Hi there! 👋 Welcome to <strong>Billabong Solar</strong>. Looking to slash your electricity bills or claim Victorian rebates?
                <div className="text-[11px] text-gray-500 mt-1 font-semibold">
                  What would you like to explore?
                </div>
              </div>
            </div>

            {/* Step 1 Options */}
            {currentStep === 1 && (
              <div className="space-y-2 pl-9">
                {[
                  { label: '☀️ Residential Solar (Save on Power Bills)', val: 'Residential Solar' },
                  { label: '🔋 Battery Storage (Blackout Backup & VPP)', val: 'Battery Storage' },
                  { label: '🏢 Commercial Solar (30kW – 1MW)', val: 'Commercial Solar' },
                  { label: '❓ General Inquiry & Rebates', val: 'General Inquiry' },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => handleServiceSelect(item.val)}
                    className="w-full text-left p-2.5 px-3.5 rounded-xl bg-white hover:bg-orange-50 border border-gray-200 hover:border-[#FF5E00] text-slate-800 font-semibold text-xs transition-all shadow-xs"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Bill Selection */}
            {currentStep >= 2 && (
              <>
                {/* User Answer 1 */}
                <div className="flex justify-end">
                  <div className="bg-[#171D4D] text-white p-2.5 px-4 rounded-2xl rounded-tr-none text-xs font-medium max-w-[80%]">
                    {formData.service}
                  </div>
                </div>

                {/* Bot Message 2 */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#FF5E00] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ⚡
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-slate-800 leading-relaxed max-w-[85%]">
                    Great! What is your average <strong>quarterly electricity bill</strong>? This helps us calculate your optimal system size and payback.
                  </div>
                </div>

                {currentStep === 2 && (
                  <div className="grid grid-cols-2 gap-2 pl-9">
                    {[
                      { label: 'Under $500', val: 'Under $500 / quarter' },
                      { label: '$500 – $1,000', val: '$500 – $1,000 / quarter' },
                      { label: '$1,000 – $2,000', val: '$1,000 – $2,000 / quarter' },
                      { label: '$2,000+', val: '$2,000+ / quarter' },
                    ].map((bill) => (
                      <button
                        key={bill.val}
                        type="button"
                        onClick={() => handleBillSelect(bill.val)}
                        className="text-center p-2.5 rounded-xl bg-white hover:bg-orange-50 border border-gray-200 hover:border-[#FF5E00] text-slate-800 font-bold text-xs transition-all shadow-xs"
                      >
                        {bill.label}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Step 3: Suburb / Postcode */}
            {currentStep >= 3 && (
              <>
                {/* User Answer 2 */}
                <div className="flex justify-end">
                  <div className="bg-[#171D4D] text-white p-2.5 px-4 rounded-2xl rounded-tr-none text-xs font-medium max-w-[80%]">
                    {formData.quarterlyBill}
                  </div>
                </div>

                {/* Bot Message 3 */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#FF5E00] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ⚡
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-slate-800 leading-relaxed max-w-[85%]">
                    Got it! Which Victorian <strong>suburb or postcode</strong> is the property in?
                  </div>
                </div>

                {currentStep === 3 && (
                  <form onSubmit={handleSuburbSubmit} className="pl-9 space-y-2">
                    <input
                      type="text"
                      value={formData.suburb}
                      onChange={(e) => setFormData((prev) => ({ ...prev, suburb: e.target.value }))}
                      placeholder="e.g. Scoresby 3179, Berwick, Heyfield..."
                      className="w-full p-2.5 px-3 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#FF5E00] focus:outline-none"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-[#FF5E00] hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-sm"
                    >
                      Continue →
                    </button>
                  </form>
                )}
              </>
            )}

            {/* Step 4: Contact Details Form */}
            {currentStep >= 4 && !isSuccess && (
              <>
                {/* User Answer 3 */}
                <div className="flex justify-end">
                  <div className="bg-[#171D4D] text-white p-2.5 px-4 rounded-2xl rounded-tr-none text-xs font-medium max-w-[80%]">
                    {formData.suburb}
                  </div>
                </div>

                {/* Bot Message 4 */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#FF5E00] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ⚡
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-slate-800 leading-relaxed max-w-[85%]">
                    Almost done! Where should our clean energy engineers send your <strong>custom solar quote & rebate assessment</strong>?
                  </div>
                </div>

                <form onSubmit={handleFinalSubmit} className="pl-9 space-y-2.5">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Full Name"
                    className="w-full p-2.5 px-3 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#FF5E00] focus:outline-none bg-white"
                  />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="Mobile Number (e.g. 0412 345 678)"
                    className="w-full p-2.5 px-3 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#FF5E00] focus:outline-none bg-white"
                  />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Email Address"
                    className="w-full p-2.5 px-3 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#FF5E00] focus:outline-none bg-white"
                  />

                  {errorMessage && (
                    <div className="text-[11px] text-rose-600 font-semibold">{errorMessage}</div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF5E00] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting to CRM...</span>
                      </>
                    ) : (
                      <>
                        <span>Get My Free Solar Quote →</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-gray-400 text-center">
                    🔒 Zero spam guarantee. Licensed A-Grade Electricians.
                  </p>
                </form>
              </>
            )}

            {/* Success Screen */}
            {isSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  Quote Request Received!
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your details have been sent to our Victorian engineering team. We will review your suburb (<strong>{formData.suburb}</strong>) and contact you shortly.
                </p>
                <div className="pt-2 border-t border-emerald-200/60 flex flex-col gap-2">
                  <a
                    href="tel:1300897221"
                    className="w-full py-2 rounded-xl bg-[#171D4D] text-white text-xs font-bold hover:bg-[#101438] transition-colors"
                  >
                    Need Quick Answers? Call 1300 897 221
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Close Assistant
                  </button>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Footer badge */}
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
            <span>Billabong Solar Victoria</span>
            <span className="text-amber-600 font-semibold">10-Yr Australian Warranty</span>
          </div>

        </div>
      )}

      {/* 2. Floating Launcher Button & Prompt Bubble */}
      <div className="flex items-center gap-2.5">
        
        {/* Floating Greeting Bubble (when closed) */}
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md text-slate-800 px-4 py-2.5 rounded-2xl shadow-xl border border-gray-200 text-xs font-semibold hover:bg-orange-50 transition-all hover:scale-105 group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Need a quick solar quote? <strong>Chat with us</strong></span>
            <span className="text-[#FF5E00] group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        )}

        {/* Circular Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-[#FF5E00] to-[#E04800] hover:from-[#E04800] hover:to-[#C73C00] text-white shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-300"
          aria-label={isOpen ? 'Close Solar Assistant' : 'Open Solar Assistant'}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <>
              {/* Pulsing notification ring */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white" />
              </span>

              {/* Chat Speech Bubble Icon with Lightning Bolt */}
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
