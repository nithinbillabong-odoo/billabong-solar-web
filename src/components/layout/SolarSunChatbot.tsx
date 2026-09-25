'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  options?: Array<{ label: string; value: string; icon?: string }>;
}

type FlowStep =
  | 'CATEGORY'
  | 'CALLBACK_CHOICE'
  | 'ASK_NAME'
  | 'ASK_PHONE'
  | 'ASK_EMAIL'
  | 'ASK_ADDRESS'
  | 'CONFIRMED'
  | 'FREE_CHAT';

export default function SolarAdvisorChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [isBubbleDismissed, setIsBubbleDismissed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Conversational flow state
  const [step, setStep] = useState<FlowStep>('CATEGORY');
  const [selectedCategory, setSelectedCategory] = useState('Prices & Quotes');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [leadId, setLeadId] = useState('');
  const [odooLeadId, setOdooLeadId] = useState<number | null>(null);

  // Input state
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Initial welcome messages
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Initialize welcome sequence when component mounts
  useEffect(() => {
    // Show speech bubble after 1.4s
    const bubbleTimer = setTimeout(() => {
      setShowSpeechBubble(true);
    }, 1400);

    // Initial messages
    setMessages([
      {
        id: 'msg-welcome-1',
        sender: 'bot',
        text: "Hello, I'm Billabong Solar 👋🙂",
        time: getCurrentTime(),
      },
      {
        id: 'msg-welcome-2',
        sender: 'bot',
        text: 'What are you interested in today?',
        time: getCurrentTime(),
        options: [
          { label: 'Prices & Quotes', value: 'Prices & Quotes', icon: '💰' },
          { label: 'Service Support', value: 'Service Support', icon: '🔧' },
          { label: 'General Enquiry', value: 'General Enquiry', icon: '❓' },
        ],
      },
    ]);

    return () => clearTimeout(bubbleTimer);
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when step changes to a text entry step
  useEffect(() => {
    if (
      isOpen &&
      (step === 'ASK_NAME' ||
        step === 'ASK_PHONE' ||
        step === 'ASK_EMAIL' ||
        step === 'ASK_ADDRESS' ||
        step === 'FREE_CHAT')
    ) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [step, isOpen]);

  // Helper to add bot message with realistic typing delay
  const addBotMessageWithDelay = (
    text: string,
    delayMs = 450,
    options?: Array<{ label: string; value: string; icon?: string }>
  ) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}-${Math.random()}`,
          sender: 'bot',
          text,
          time: getCurrentTime(),
          options,
        },
      ]);
    }, delayMs);
  };

  // Helper to add user message
  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}-${Math.random()}`,
        sender: 'user',
        text,
        time: getCurrentTime(),
      },
    ]);
  };

  // 1. STEP 1: User picks category
  const handleCategoryChoice = (category: string) => {
    setSelectedCategory(category);
    addUserMessage(category);
    setErrorMessage('');

    // Transition to callback preference prompt
    setStep('CALLBACK_CHOICE');
    addBotMessageWithDelay(
      'Would you like to stay and provide more details about your enquiry, or would you prefer a callback instead?',
      500,
      [
        { label: 'Call Me Instead', value: 'callback', icon: '📞' },
        { label: 'Stay & Chat Now', value: 'chat', icon: '💬' },
      ]
    );
  };

  // 2. STEP 2: User picks Callback vs Chat
  const handleCallbackChoice = (choice: string) => {
    if (choice === 'callback') {
      addUserMessage('📞 Call Me Instead');
      setErrorMessage('');

      // Step 3: Arrange callback & ask name
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}-1`,
            sender: 'bot',
            text: "Perfect, I'm arranging a callback for you 😊",
            time: getCurrentTime(),
          },
        ]);

        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-${Date.now()}-2`,
              sender: 'bot',
              text: 'Could you kindly share your name?',
              time: getCurrentTime(),
            },
          ]);
          setStep('ASK_NAME');
        }, 550);
      }, 500);
    } else {
      addUserMessage('💬 Stay & Chat Now');
      setStep('FREE_CHAT');
      addBotMessageWithDelay(
        "Wonderful! I'm here to help. Feel free to ask me about system sizes, Tesla/Sigenergy batteries, Victorian rebates ($1,400 solar rebate + $1,400 loan), or pricing!",
        500,
        [
          { label: '6.6kW System Pricing', value: 'How much is a 6.6kW solar system?', icon: '💰' },
          { label: 'Battery Options', value: 'Tell me about solar batteries', icon: '🔋' },
          { label: 'Victorian Rebates', value: 'How do Victorian solar rebates work?', icon: '🏛️' },
          { label: 'Request a Callback', value: 'callback', icon: '📞' },
        ]
      );
    }
  };

  // 3. STEP 3: Handle Name Submission
  const handleNameSubmit = (enteredName: string) => {
    const cleanName = enteredName.trim();
    if (!cleanName) {
      setErrorMessage('Please enter your name so we know who to ask for.');
      return;
    }
    setName(cleanName);
    addUserMessage(cleanName);
    setInputValue('');
    setErrorMessage('');

    setStep('ASK_PHONE');
    addBotMessageWithDelay(
      'What is the best phone or mobile number to reach you on? 📲',
      500
    );
  };

  // 4. STEP 4: Handle Phone Submission -> IMMEDIATELY creates lead in Odoo & sends Email!
  const handlePhoneSubmit = async (enteredPhone: string) => {
    const cleanPhone = enteredPhone.trim();
    const digitsOnly = cleanPhone.replace(/\D/g, '');

    if (!cleanPhone || digitsOnly.length < 8) {
      setErrorMessage('Please enter a valid phone or mobile number (at least 8 digits).');
      return;
    }

    setPhone(cleanPhone);
    addUserMessage(cleanPhone);
    setInputValue('');
    setErrorMessage('');
    setIsSubmitting(true);

    // Save lead IMMEDIATELY so it is never lost even if user drops off here
    try {
      const res = await fetch('/api/chat-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          category: selectedCategory || 'Prices & Quotes',
          phone: cleanPhone,
          name: name || 'Valued Customer',
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
      console.error('Lead auto-save background error:', err);
    } finally {
      setIsSubmitting(false);
    }

    // Advance to Step 5: Ask Email
    setStep('ASK_EMAIL');
    addBotMessageWithDelay('And what is your email address too? 📩', 500, [
      { label: 'Skip for now', value: 'skip', icon: '⏩' },
    ]);
  };

  // 5. STEP 5: Handle Email Submission (or skip)
  const handleEmailSubmit = (enteredEmail: string, isSkip = false) => {
    setErrorMessage('');
    if (isSkip || enteredEmail.toLowerCase() === 'skip') {
      addUserMessage('Skip');
      setEmail('');
    } else {
      const cleanEmail = enteredEmail.trim();
      if (cleanEmail && !cleanEmail.includes('@')) {
        setErrorMessage('Please enter a valid email address or tap Skip.');
        return;
      }
      addUserMessage(cleanEmail);
      setEmail(cleanEmail);
    }

    setInputValue('');

    // Advance to Step 6: Postcode/Address
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}-1`,
          sender: 'bot',
          text: "Great! We're almost there 😁",
          time: getCurrentTime(),
        },
      ]);

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}-2`,
            sender: 'bot',
            text: 'And what is the postcode, suburb or address of your property? 🏡',
            time: getCurrentTime(),
            options: [{ label: 'Skip for now', value: 'skip', icon: '⏩' }],
          },
        ]);
        setStep('ASK_ADDRESS');
      }, 500);
    }, 450);
  };

  // 6. STEP 6: Handle Postcode / Suburb / Address Submission -> Updates lead in Odoo
  const handleAddressSubmit = async (enteredAddress: string, isSkip = false) => {
    setErrorMessage('');
    let finalAddress = '';
    if (isSkip || enteredAddress.toLowerCase() === 'skip') {
      addUserMessage('Skip');
    } else {
      finalAddress = enteredAddress.trim();
      addUserMessage(finalAddress);
      setAddress(finalAddress);
    }
    setInputValue('');

    // Update CRM Lead with Email & Address
    try {
      await fetch('/api/chat-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_step2',
          leadId,
          odooLeadId,
          name,
          phone,
          category: selectedCategory,
          email,
          address: finalAddress,
        }),
      });
    } catch (err) {
      console.error('Lead update error:', err);
    }

    // Final confirmation message
    setStep('CONFIRMED');
    addBotMessageWithDelay(
      'From here, one of our experts will get back in touch with you to help with your enquiry 😎',
      600,
      [
        { label: '📞 Call (03) 9000 9788', value: 'call_office' },
        { label: '💬 Chat on WhatsApp', value: 'open_whatsapp' },
        { label: '🔄 Start New Enquiry', value: 'reset_chat' },
      ]
    );
  };

  // 7. Free Chat Solar Knowledge Engine
  const handleFreeChatQuery = (query: string) => {
    const q = query.trim().toLowerCase();
    addUserMessage(query.trim());
    setInputValue('');

    if (q.includes('call') || q.includes('quote') || q.includes('price') || q.includes('contact')) {
      addBotMessageWithDelay(
        "I'd love to organize an exact quote and rebate calculation for you! Would you like me to arrange a quick callback from one of our solar specialists?",
        500,
        [
          { label: 'Yes, Call Me', value: 'callback', icon: '📞' },
          { label: 'Keep Chatting', value: 'chat', icon: '💬' },
        ]
      );
      return;
    }

    let response = "That's a great question! Billabong Solar provides premium CEC-accredited solar installations, Tier-1 panels, and Sigenergy/Tesla batteries with 10-year workmanship warranties.";

    if (q.includes('6.6') || q.includes('system size') || q.includes('how much') || q.includes('cost')) {
      response =
        'A standard Tier-1 6.6kW solar system typically ranges between $3,500 – $5,500 after the Victorian Solar Homes Rebate ($1,400) and STCs. Payback is usually 2.5 to 4 years!';
    } else if (q.includes('battery') || q.includes('tesla') || q.includes('sigen') || q.includes('storage')) {
      response =
        'We install both the modular Sigenergy SigenStor (5kWh–48kWh with built-in EV charger & blackout backup) and Tesla Powerwall 3 (13.5kWh). Batteries maximize self-consumption and protect during power outages!';
    } else if (q.includes('rebate') || q.includes('solar homes') || q.includes('grant') || q.includes('government')) {
      response =
        'Victorian eligible homeowners can get up to a $1,400 Solar Homes Rebate plus an interest-free loan of up to $1,400. That reduces your out-of-pocket costs immediately!';
    } else if (q.includes('warranty') || q.includes('guarantee')) {
      response =
        'We offer a 25-30 year performance warranty on solar panels, 10-year manufacturer warranty on inverters, and our industry-leading 10-year comprehensive Billabong workmanship warranty.';
    } else if (q.includes('area') || q.includes('location') || q.includes('service') || q.includes('melbourne')) {
      response =
        'We service all of Greater Melbourne, Geelong, Ballarat, Bendigo, Latrobe Valley, and regional Victoria with our in-house CEC accredited installation teams.';
    }

    addBotMessageWithDelay(response, 550, [
      { label: '📞 Request a Fast Callback', value: 'callback', icon: '📞' },
      { label: 'Ask About Batteries', value: 'Tell me about solar batteries', icon: '🔋' },
      { label: 'Ask About Rebates', value: 'How do Victorian solar rebates work?', icon: '🏛️' },
    ]);
  };

  // Main text submit router
  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (step === 'ASK_NAME') {
      handleNameSubmit(inputValue);
    } else if (step === 'ASK_PHONE') {
      handlePhoneSubmit(inputValue);
    } else if (step === 'ASK_EMAIL') {
      handleEmailSubmit(inputValue);
    } else if (step === 'ASK_ADDRESS') {
      handleAddressSubmit(inputValue);
    } else if (step === 'FREE_CHAT' || step === 'CONFIRMED') {
      handleFreeChatQuery(inputValue);
    } else {
      // If user typed during options
      handleCategoryChoice(inputValue);
    }
  };

  // Option pill click router
  const handleOptionClick = (optionValue: string) => {
    if (optionValue === 'callback') {
      handleCallbackChoice('callback');
    } else if (optionValue === 'chat') {
      handleCallbackChoice('chat');
    } else if (optionValue === 'skip') {
      if (step === 'ASK_EMAIL') handleEmailSubmit('', true);
      else if (step === 'ASK_ADDRESS') handleAddressSubmit('', true);
    } else if (optionValue === 'call_office') {
      window.location.href = 'tel:0390009788';
    } else if (optionValue === 'open_whatsapp') {
      window.open('https://wa.me/61450941413?text=Hi%20Billabong%20Solar,%20I%20have%20an%20enquiry!', '_blank');
    } else if (optionValue === 'reset_chat') {
      setStep('CATEGORY');
      setName('');
      setPhone('');
      setEmail('');
      setAddress('');
      setMessages([
        {
          id: `reset-1-${Date.now()}`,
          sender: 'bot',
          text: "Hello, I'm Billabong Solar 👋🙂",
          time: getCurrentTime(),
        },
        {
          id: `reset-2-${Date.now()}`,
          sender: 'bot',
          text: 'What are you interested in today?',
          time: getCurrentTime(),
          options: [
            { label: 'Prices & Quotes', value: 'Prices & Quotes', icon: '💰' },
            { label: 'Service Support', value: 'Service Support', icon: '🔧' },
            { label: 'General Enquiry', value: 'General Enquiry', icon: '❓' },
          ],
        },
      ]);
    } else if (step === 'CATEGORY') {
      handleCategoryChoice(optionValue);
    } else if (step === 'CALLBACK_CHOICE') {
      handleCallbackChoice(optionValue);
    } else {
      handleFreeChatQuery(optionValue);
    }
  };

  // Dynamic input placeholder
  const getInputPlaceholder = () => {
    switch (step) {
      case 'ASK_NAME':
        return 'Type your name here...';
      case 'ASK_PHONE':
        return 'Mobile number (e.g. 0412 567 889)...';
      case 'ASK_EMAIL':
        return 'Email address (or tap Skip)...';
      case 'ASK_ADDRESS':
        return 'Postcode or suburb (e.g. 3020)...';
      case 'FREE_CHAT':
        return 'Ask any solar or battery question...';
      case 'CONFIRMED':
        return 'Type a message or ask another question...';
      default:
        return 'Type your message here...';
    }
  };

  return (
    <>
      {/* Hide third-party maz.js launcher and panel so our native advisor component controls the UI */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            #maz-launcher-btn, #maz-teaser, #maz-chat-panel {
              display: none !important;
              visibility: hidden !important;
            }
          `,
        }}
      />

      {/* Floating Trigger Launcher at Bottom-Right */}
      <aside
        aria-label="Solar Advisor Chat Launcher"
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none"
      >
        {/* Floating Greeting Speech Bubble */}
        {!isOpen && showSpeechBubble && !isBubbleDismissed && (
          <div
            role="status"
            className="pointer-events-auto mb-3 max-w-[280px] sm:max-w-[320px] bg-white text-slate-800 rounded-2xl p-3.5 shadow-2xl border-2 border-orange-400 relative animate-in fade-in slide-in-from-bottom-3 duration-300"
          >
            <button
              type="button"
              onClick={() => setIsBubbleDismissed(true)}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-600 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
              aria-label="Dismiss greeting"
            >
              ✕
            </button>
            <div className="flex items-start gap-2.5">
              <span className="text-xl leading-none">👋</span>
              <div>
                <p className="text-xs font-extrabold text-[#171D4D]">
                  Hi, I&apos;m Sarah!
                </p>
                <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                  Billabong Solar Advisor. How can I help you today? 🙂
                </p>
              </div>
            </div>
            {/* Arrow triangle pointing down to avatar */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-b-2 border-r-2 border-orange-400 transform rotate-45" />
          </div>
        )}

        {/* Human Consultant Avatar Trigger Button */}
        {!isOpen && (
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setIsBubbleDismissed(true);
            }}
            className="pointer-events-auto relative group focus:outline-hidden touch-manipulation transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95"
            aria-label="Chat with Billabong Solar Advisor"
            title="Chat with Sarah - Billabong Solar Advisor"
          >
            {/* Soft Ambient Glow */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#FF5E00] to-amber-400 opacity-70 blur-md group-hover:opacity-100 transition-opacity" />

            {/* Avatar Circle Container */}
            <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full overflow-hidden border-3 border-white shadow-2xl ring-3 ring-orange-500 bg-[#171D4D]">
              <Image
                src="/images/support-agent.jpg"
                alt="Sarah - Billabong Solar Advisor"
                fill
                sizes="(max-width: 640px) 64px, 72px"
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Active Online Status Badge */}
            <span className="absolute top-0 right-0 z-20 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white shadow-xs" />
            </span>
          </button>
        )}
      </aside>

      {/* Main Chatbot Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-advisor-title"
          className="fixed z-50 inset-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:w-[410px] h-full sm:h-[630px] sm:max-h-[88vh] bg-white sm:rounded-3xl shadow-2xl border-0 sm:border-2 border-orange-400/40 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#171D4D] via-[#1F2766] to-[#252E6D] text-white p-4 flex items-center justify-between border-b-2 border-orange-500/50 shadow-md">
            <div className="flex items-center gap-3">
              {/* Consultant Avatar in Header */}
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-orange-400 shadow-sm shrink-0">
                <Image
                  src="/images/support-agent.jpg"
                  alt="Sarah - Billabong Solar Advisor"
                  fill
                  sizes="44px"
                  className="object-cover object-top"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <h2 id="chat-advisor-title" className="text-sm font-black tracking-wide text-white flex items-center gap-1.5">
                  Sarah • Solar Advisor
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                </h2>
                <p className="text-[11px] text-slate-300 font-medium">
                  Billabong Solar • Typically replies in 1 min
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Direct Phone Call Button */}
              <a
                href="tel:0390009788"
                aria-label="Call Billabong Solar"
                title="Call (03) 9000 9788"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                📞
              </a>
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-bold transition-colors cursor-pointer text-sm"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Chat Stream Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70">
            {/* Trust badge banner */}
            <div className="text-center my-1">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-100/80 text-[#FF5E00] text-[10px] font-extrabold uppercase tracking-wider">
                ☀️ Clean Energy Council Accredited Master Installers
              </span>
            </div>

            {/* Message Stream */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in duration-200`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#FF5E00] to-orange-600 text-white rounded-2xl rounded-tr-xs shadow-md shadow-orange-500/20 font-medium'
                      : 'bg-white text-slate-800 rounded-2xl rounded-tl-xs border border-slate-200/80 shadow-sm font-normal'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Timestamp */}
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.time}
                </span>

                {/* Interactive Options Pills attached to this message */}
                {msg.options && msg.options.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 max-w-[95%]">
                    {msg.options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleOptionClick(opt.value)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-orange-50 hover:border-[#FF5E00] active:scale-95 text-slate-800 hover:text-[#FF5E00] text-xs font-bold rounded-full border-2 border-slate-200 shadow-xs transition-all cursor-pointer touch-manipulation"
                      >
                        {opt.icon && <span>{opt.icon}</span>}
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 rounded-2xl rounded-tl-xs px-4 py-3 w-fit shadow-xs animate-in fade-in duration-150">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Validation Error Banner */}
          {errorMessage && (
            <div className="bg-red-50 text-red-700 px-4 py-2 text-xs font-bold border-t border-red-200 flex items-center justify-between">
              <span>⚠️ {errorMessage}</span>
              <button
                type="button"
                onClick={() => setErrorMessage('')}
                className="text-red-500 hover:text-red-800 text-sm font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {/* Chat Input & Action Bar */}
          <div className="p-3 bg-white border-t border-slate-200 safe-bottom">
            <form onSubmit={handleTextSubmit} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type={step === 'ASK_PHONE' ? 'tel' : step === 'ASK_EMAIL' ? 'email' : 'text'}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder={getInputPlaceholder()}
                className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-50 focus:bg-white text-sm text-slate-900 rounded-full border-2 border-transparent focus:border-[#FF5E00] focus:ring-2 focus:ring-orange-100 outline-hidden transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isSubmitting}
                className="px-4 py-2.5 bg-gradient-to-r from-[#FF5E00] to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-sm rounded-full shadow-md shadow-orange-500/25 transition-all transform active:scale-95 cursor-pointer touch-manipulation shrink-0 flex items-center justify-center gap-1"
                aria-label="Send message"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Send</span>
                )}
              </button>
            </form>

            {/* Quick Skip or Direct WhatsApp Helper */}
            {(step === 'ASK_EMAIL' || step === 'ASK_ADDRESS') && (
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => handleOptionClick('skip')}
                  className="text-xs text-slate-500 hover:text-[#FF5E00] font-semibold underline cursor-pointer"
                >
                  Skip this step →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
