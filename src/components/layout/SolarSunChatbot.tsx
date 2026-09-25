'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  options?: Array<{ label: string; value: string; icon?: string }>;
  showContactCard?: boolean;
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

  // Contact Card state
  const [cardName, setCardName] = useState('');
  const [cardPhone, setCardPhone] = useState('');
  const [cardEmail, setCardEmail] = useState('');
  const [cardAddress, setCardAddress] = useState('');
  const [cardError, setCardError] = useState('');
  const [cardSubmitting, setCardSubmitting] = useState(false);
  const [cardSubmitted, setCardSubmitted] = useState(false);

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

  // Dynamic AI conversation history for Maz AI backend
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([]);
  const [sessionToken, setSessionToken] = useState<string>('');

  useEffect(() => {
    try {
      let token = sessionStorage.getItem('maz_session_token_blb');
      if (!token) {
        token = `sess_${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;
        sessionStorage.setItem('maz_session_token_blb', token);
      }
      setSessionToken(token);
    } catch {
      setSessionToken(`sess_${Date.now()}`);
    }
  }, []);

  // Initial welcome messages
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Initialize welcome sequence when component mounts
  useEffect(() => {
    // Show speech bubble after 1.2s
    const bubbleTimer = setTimeout(() => {
      setShowSpeechBubble(true);
    }, 1200);

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
  }, [messages, isTyping, isOpen, cardSubmitted]);

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
    options?: Array<{ label: string; value: string; icon?: string }>,
    showContactCard = false
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
          showContactCard,
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
    setInputValue('');
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
    setInputValue('');
    if (choice === 'callback') {
      addUserMessage('📞 Call Me Instead');
      setErrorMessage('');

      // Step 3: Arrange callback & show Contact Card directly
      addBotMessageWithDelay(
        "Perfect, I'm arranging a callback for you 😊 Please fill out your details below and our specialist will reach out to you promptly:",
        500,
        undefined,
        true // Trigger Contact Card
      );
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

  // Handle Contact Card Submission
  const handleCardSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCardError('');

    const cleanPhone = cardPhone.trim();
    const digitsOnly = cleanPhone.replace(/\D/g, '');
    if (!cleanPhone || digitsOnly.length < 8) {
      setCardError('Please enter a valid phone number (at least 8 digits).');
      return;
    }

    setCardSubmitting(true);

    try {
      // 1. Create Lead in Odoo
      const res = await fetch('/api/chat-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          category: selectedCategory || 'Callback Request',
          phone: cleanPhone,
          name: cardName.trim() || 'Valued Customer',
        }),
      });

      const data = await res.json();
      const newLeadId = data.leadId;
      const newOdooLeadId = data.odooLeadId;

      // 2. Update Step 2 with email & address if provided
      if (cardEmail.trim() || cardAddress.trim()) {
        await fetch('/api/chat-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'update_step2',
            leadId: newLeadId,
            odooLeadId: newOdooLeadId,
            name: cardName.trim(),
            phone: cleanPhone,
            category: selectedCategory || 'Callback Request',
            email: cardEmail.trim(),
            address: cardAddress.trim(),
          }),
        });
      }

      setCardSubmitted(true);
      setLeadId(newLeadId);
      if (newOdooLeadId) setOdooLeadId(newOdooLeadId);

      // Add confirmed message from bot
      setTimeout(() => {
        addBotMessageWithDelay(
          `From here, one of our experts will get back in touch with you shortly on ${cleanPhone} to help with your enquiry 😎`,
          400,
          [
            { label: '📞 Call Office', value: 'call_office' },
            { label: '💬 WhatsApp Us', value: 'open_whatsapp' },
            { label: 'Ask Another Question', value: 'chat' },
          ]
        );
      }, 500);
    } catch (err) {
      console.error('Contact card submission error:', err);
      setCardError('Network issue. Please call us directly on (03) 9000 9788.');
    } finally {
      setCardSubmitting(false);
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

  // 7. Dynamic Maz AI Knowledge Engine with Smart Contact Card Triggering
  const handleFreeChatQuery = async (query: string) => {
    const q = query.trim();
    if (!q) return;

    addUserMessage(q);
    setInputValue('');

    const lowerQ = q.toLowerCase();

    setIsTyping(true);

    try {
      const res = await fetch('/api/chat-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: q,
          history: conversationHistory.slice(-6),
          sessionToken,
        }),
      });

      const data = await res.json();
      const aiReply =
        data.reply ||
        "Thank you for reaching out! Billabong Solar provides premium CEC-accredited solar installations, Tier-1 panels, and Sigenergy/Tesla batteries with 10-year workmanship warranties.";

      // Check if user or AI intent suggests showing the Contact Card
      const userWantsCallback = [
        'call', 'callback', 'book', 'schedule', 'speak', 'phone', 'contact card', 'reach me', 'quote', 'contact'
      ].some((w) => lowerQ.includes(w));

      const aiSuggestedCard = [
        'contact card', 'fill out our', 'schedule a call', 'specialist will reach out',
        'share your preferred phone', 'enter your email or phone', 'our team directly',
        'quick quote form', 'below'
      ].some((w) => aiReply.toLowerCase().includes(w));

      const shouldShowCard = userWantsCallback || aiSuggestedCard;

      // Keep ongoing conversation history for multi-turn context
      setConversationHistory((prev) => [
        ...prev,
        { role: 'user', content: q },
        { role: 'assistant', content: aiReply },
      ]);

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-ai-${Date.now()}`,
          sender: 'bot',
          text: aiReply,
          time: getCurrentTime(),
          showContactCard: shouldShowCard && !cardSubmitted,
          options: [
            { label: 'Request a Fast Callback', value: 'callback', icon: '📞' },
            { label: 'Ask About Batteries', value: 'Tell me about solar batteries', icon: '🔋' },
            { label: 'Ask About Rebates', value: 'How do Victorian solar rebates work?', icon: '🏛️' },
          ],
        },
      ]);
    } catch (err) {
      console.error('Error fetching dynamic Maz AI reply:', err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-fallback-${Date.now()}`,
          sender: 'bot',
          text:
            "Thank you for your question! Billabong Solar installs premium Tier-1 solar systems, Sigenergy SigenStor, and Tesla Powerwall 3 batteries across Victoria with 10-year workmanship warranties.",
          time: getCurrentTime(),
          showContactCard: true,
          options: [
            { label: 'Request a Fast Callback', value: 'callback', icon: '📞' },
            { label: 'Ask About Batteries', value: 'Tell me about solar batteries', icon: '🔋' },
            { label: 'Ask About Rebates', value: 'How do Victorian solar rebates work?', icon: '🏛️' },
          ],
        },
      ]);
    }
  };

  // Main text submit router
  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = inputValue.trim();
    if (!val) return;
    setInputValue(''); // Clear immediately so text doesn't stay in the input box!

    if (step === 'ASK_NAME') {
      handleNameSubmit(val);
    } else if (step === 'ASK_PHONE') {
      handlePhoneSubmit(val);
    } else if (step === 'ASK_EMAIL') {
      handleEmailSubmit(val);
    } else if (step === 'ASK_ADDRESS') {
      handleAddressSubmit(val);
    } else if (step === 'FREE_CHAT' || step === 'CONFIRMED') {
      handleFreeChatQuery(val);
    } else {
      // If user typed during options
      handleCategoryChoice(val);
    }
  };

  // Option pill click router
  const handleOptionClick = (optionValue: string) => {
    setInputValue('');
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
      window.open(
        'https://wa.me/61450941413?text=Hi%20Billabong%20Solar,%20I%20have%20an%20enquiry!',
        '_blank'
      );
    } else if (optionValue === 'reset_chat') {
      setStep('CATEGORY');
      setName('');
      setPhone('');
      setEmail('');
      setAddress('');
      setCardSubmitted(false);
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
        return 'Ask Sarah anything about solar...';
      case 'CONFIRMED':
        return 'Ask another question...';
      default:
        return 'Type your message here...';
    }
  };

  return (
    <>
      {/* Custom micro-styles for sleek custom scrollbar & animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            #maz-launcher-btn, #maz-teaser, #maz-chat-panel {
              display: none !important;
              visibility: hidden !important;
            }
            .chat-scroll-area::-webkit-scrollbar {
              width: 5px;
            }
            .chat-scroll-area::-webkit-scrollbar-track {
              background: transparent;
            }
            .chat-scroll-area::-webkit-scrollbar-thumb {
              background: rgba(255, 94, 0, 0.2);
              border-radius: 9999px;
            }
            .chat-scroll-area::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 94, 0, 0.4);
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
            className="pointer-events-auto mb-3 max-w-[260px] sm:max-w-[280px] bg-white/95 backdrop-blur-md text-slate-800 rounded-3xl p-3.5 shadow-[0_12px_36px_rgba(255,94,0,0.18)] border border-orange-200/80 relative animate-in fade-in slide-in-from-bottom-3 duration-300"
          >
            <button
              type="button"
              onClick={() => setIsBubbleDismissed(true)}
              className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-[10px] font-bold shadow-xs transition-colors cursor-pointer"
              aria-label="Dismiss greeting"
            >
              ✕
            </button>
            <div className="flex items-start gap-2.5">
              <span className="text-xl leading-none">👋</span>
              <div>
                <p className="text-xs font-black text-[#171D4D] flex items-center gap-1">
                  Hi, I&apos;m Sarah!
                  <span className="text-[10px] text-[#FF5E00]">☀️</span>
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                  Solar Advisor. How can I help you today? 🙂
                </p>
              </div>
            </div>
            {/* Arrow triangle pointing down to avatar */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white/95 border-b border-r border-orange-200/80 transform rotate-45" />
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
            className="pointer-events-auto relative group focus:outline-hidden touch-manipulation transition-all duration-300 cursor-pointer transform hover:scale-108 active:scale-95"
            aria-label="Chat with Billabong Solar Advisor"
            title="Chat with Sarah - Billabong Solar Advisor"
          >
            {/* Soft Ambient Glow */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#FF5E00] via-amber-400 to-orange-400 opacity-60 blur-md group-hover:opacity-90 group-hover:blur-lg transition-all" />

            {/* Avatar Circle Container */}
            <div className="relative w-15 h-15 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2.5 border-white shadow-[0_8px_24px_rgba(23,29,77,0.3)] ring-3 ring-orange-500/80 bg-[#171D4D]">
              <Image
                src="/images/support-agent.jpg"
                alt="Sarah - Billabong Solar Advisor"
                fill
                sizes="(max-width: 640px) 60px, 64px"
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Active Online Status Badge */}
            <span className="absolute top-0 right-0 z-20 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-emerald-500 border-2 border-white shadow-xs" />
            </span>
          </button>
        )}
      </aside>

      {/* Main Chatbot Window - Sleek, Compact Desktop Dimension & 100% Mobile Edge-to-Edge */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-advisor-title"
          className="fixed z-50 inset-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:w-[365px] h-full sm:h-[530px] sm:max-h-[82vh] bg-gradient-to-b from-[#FDFCFB] via-[#F8F9FD] to-[#F1F3FA] sm:rounded-[28px] shadow-[0_20px_60px_rgba(23,29,77,0.22)] border-0 sm:border border-white/80 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#171D4D] via-[#202868] to-[#2B3580] text-white p-3.5 sm:px-4 flex items-center justify-between border-b border-orange-500/20 relative overflow-hidden shadow-sm shrink-0">
            {/* Decorative background sunburst glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-orange-500/25 to-amber-400/10 blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2.5 relative z-10">
              {/* Consultant Avatar in Header */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-400/80 shadow-[0_0_10px_rgba(255,94,0,0.3)] shrink-0 bg-[#171D4D]">
                <Image
                  src="/images/support-agent.jpg"
                  alt="Sarah - Billabong Solar Advisor"
                  fill
                  sizes="40px"
                  className="object-cover object-top"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-1.5 border-white shadow-xs" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h2
                    id="chat-advisor-title"
                    className="text-xs sm:text-sm font-black tracking-wide text-white flex items-center gap-1"
                  >
                    Sarah
                  </h2>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-orange-500/30 border border-orange-400/40 text-orange-200 font-extrabold flex items-center gap-0.5">
                    ✨ Solar Advisor
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 font-medium flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Billabong Solar • Typically replies in seconds
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 relative z-10">
              {/* Direct Phone Call Button */}
              <a
                href="tel:0390009788"
                aria-label="Call Billabong Solar"
                title="Call (03) 9000 9788"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer border border-white/10 text-xs sm:text-sm shadow-xs"
              >
                📞
              </a>
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white font-bold transition-all cursor-pointer border border-white/10 text-xs shadow-xs"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Chat Stream Body */}
          <div className="chat-scroll-area flex-1 overflow-y-auto p-3.5 space-y-3">
            {/* Cute Trust Badge Ribbon */}
            <div className="text-center my-0.5">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200/70 text-orange-900 text-[9px] sm:text-[10px] font-bold shadow-xs">
                <span>✨</span>
                <span>Clean Energy Council Accredited Master Installers</span>
                <span>☀️</span>
              </span>
            </div>

            {/* Message Stream */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in duration-200`}
              >
                {/* Bot Message with Sarah's Mini Avatar */}
                {msg.sender === 'bot' ? (
                  <div className="flex items-end gap-2 max-w-[90%]">
                    <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border-1.5 border-orange-300 shadow-xs shrink-0 mb-1 bg-[#171D4D]">
                      <Image
                        src="/images/support-agent.jpg"
                        alt="Sarah"
                        fill
                        sizes="28px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <div className="bg-white/95 text-slate-800 rounded-[18px] rounded-tl-sm px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed border border-orange-100/70 shadow-[0_2px_10px_rgba(23,29,77,0.04)] font-normal">
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1 ml-1.5 font-medium">
                        {msg.time}
                      </span>

                      {/* INLINE CONTACT CARD - Rendered right inside the chat! */}
                      {msg.showContactCard && !cardSubmitted && (
                        <div className="w-full mt-2 bg-gradient-to-br from-white via-orange-50/40 to-amber-50/50 rounded-2xl border-2 border-orange-300/80 p-3.5 shadow-md space-y-2.5 animate-in fade-in zoom-in-95">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold shrink-0">
                              📋
                            </span>
                            <div>
                              <h4 className="text-xs font-black text-[#171D4D]">
                                Quick Contact Card
                              </h4>
                              <p className="text-[10px] text-slate-500">
                                Leave details below for our specialist callback
                              </p>
                            </div>
                          </div>

                          <form onSubmit={handleCardSubmit} className="space-y-2">
                            <input
                              type="text"
                              placeholder="Your Name *"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:border-[#FF5E00] focus:ring-2 focus:ring-orange-200 outline-none transition-all placeholder-slate-400"
                              required
                            />
                            <input
                              type="tel"
                              placeholder="Mobile / Phone Number *"
                              value={cardPhone}
                              onChange={(e) => setCardPhone(e.target.value)}
                              className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:border-[#FF5E00] focus:ring-2 focus:ring-orange-200 outline-none transition-all placeholder-slate-400"
                              required
                            />
                            <div className="grid grid-cols-2 gap-1.5">
                              <input
                                type="email"
                                placeholder="Email (optional)"
                                value={cardEmail}
                                onChange={(e) => setCardEmail(e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs bg-white rounded-xl border border-slate-200 focus:border-[#FF5E00] focus:ring-2 focus:ring-orange-200 outline-none transition-all placeholder-slate-400"
                              />
                              <input
                                type="text"
                                placeholder="Postcode / Suburb"
                                value={cardAddress}
                                onChange={(e) => setCardAddress(e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs bg-white rounded-xl border border-slate-200 focus:border-[#FF5E00] focus:ring-2 focus:ring-orange-200 outline-none transition-all placeholder-slate-400"
                              />
                            </div>

                            {cardError && (
                              <p className="text-[10px] text-red-600 font-bold">
                                ⚠️ {cardError}
                              </p>
                            )}

                            <button
                              type="submit"
                              disabled={cardSubmitting}
                              className="w-full py-2 bg-gradient-to-r from-[#FF5E00] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-orange-500/25 active:scale-98 transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              {cardSubmitting ? (
                                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <>
                                  <span>Schedule Callback Now</span>
                                  <span>→</span>
                                </>
                              )}
                            </button>
                          </form>
                        </div>
                      )}

                      {/* Confirmed Success Banner */}
                      {msg.showContactCard && cardSubmitted && (
                        <div className="w-full mt-2 bg-emerald-50 border-1.5 border-emerald-300 rounded-xl p-3 text-center animate-in fade-in">
                          <p className="text-xs font-black text-emerald-800 flex items-center justify-center gap-1">
                            <span>✅</span> Callback Scheduled!
                          </p>
                          <p className="text-[10px] text-emerald-700 mt-0.5">
                            Our team will call you shortly on <strong>{cardPhone}</strong>.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* User Message */
                  <div className="flex flex-col items-end max-w-[85%] self-end">
                    <div className="bg-gradient-to-r from-[#FF5E00] via-[#FF6E00] to-[#FFA000] text-white rounded-[18px] rounded-tr-sm px-3.5 py-2 text-xs sm:text-sm leading-relaxed shadow-[0_3px_12px_rgba(255,94,0,0.22)] font-medium">
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 mr-1.5 font-medium">
                      {msg.time}
                    </span>
                  </div>
                )}

                {/* Interactive Options Pills attached to this message */}
                {msg.options && msg.options.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 ml-8 max-w-[95%]">
                    {msg.options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleOptionClick(opt.value)}
                        className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 active:scale-95 text-slate-700 hover:text-[#FF5E00] text-[11px] font-bold rounded-full border border-orange-200/80 hover:border-[#FF5E00] shadow-[0_1px_6px_rgba(0,0,0,0.03)] hover:shadow-[0_3px_10px_rgba(255,94,0,0.12)] transition-all duration-200 cursor-pointer touch-manipulation"
                      >
                        {opt.icon && (
                          <span className="w-4 h-4 rounded-full bg-orange-100/70 group-hover:bg-orange-200 flex items-center justify-center text-[10px] transition-colors shrink-0">
                            {opt.icon}
                          </span>
                        )}
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Cute Typing Indicator */}
            {isTyping && (
              <div className="flex items-end gap-2 w-fit animate-in fade-in duration-200">
                <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border-1.5 border-orange-300 shadow-xs shrink-0 mb-1 bg-[#171D4D]">
                  <Image
                    src="/images/support-agent.jpg"
                    alt="Sarah typing"
                    fill
                    sizes="28px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-orange-100/80 rounded-[16px] rounded-tl-sm px-3.5 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#FF5E00] animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#FFA000] animate-bounce"
                    style={{ animationDelay: '160ms' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"
                    style={{ animationDelay: '320ms' }}
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Validation Error Banner */}
          {errorMessage && (
            <div className="bg-red-50 text-red-700 px-3.5 py-1.5 text-xs font-bold border-t border-red-200 flex items-center justify-between animate-in fade-in">
              <span>⚠️ {errorMessage}</span>
              <button
                type="button"
                onClick={() => setErrorMessage('')}
                className="text-red-500 hover:text-red-800 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* Cute Chat Input & Action Bar */}
          <div className="p-3 bg-white border-t border-orange-100/70 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-3px_12px_rgba(0,0,0,0.03)] shrink-0">
            <form onSubmit={handleTextSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type={step === 'ASK_PHONE' ? 'tel' : step === 'ASK_EMAIL' ? 'email' : 'text'}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder={getInputPlaceholder()}
                  className="w-full px-3.5 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-xs sm:text-sm text-slate-900 rounded-full border border-orange-100/80 focus:border-[#FF5E00] focus:ring-3 focus:ring-orange-500/15 outline-none transition-all shadow-inner placeholder-slate-400"
                />
              </div>
              <button
                type="submit"
                disabled={!inputValue.trim() || isSubmitting}
                className="w-9 h-9 bg-gradient-to-r from-[#FF5E00] to-[#FF8A00] hover:from-orange-600 hover:to-orange-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-full shadow-md shadow-orange-500/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer touch-manipulation shrink-0 flex items-center justify-center"
                aria-label="Send message"
              >
                {isSubmitting ? (
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg
                    className="w-3.5 h-3.5 translate-x-0.5 -rotate-45"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                )}
              </button>
            </form>

            {/* Quick Skip helper */}
            {(step === 'ASK_EMAIL' || step === 'ASK_ADDRESS') && (
              <div className="flex justify-end mt-1.5 pr-1">
                <button
                  type="button"
                  onClick={() => handleOptionClick('skip')}
                  className="text-[11px] text-slate-400 hover:text-[#FF5E00] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Skip for now <span className="text-xs leading-none">⏩</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
