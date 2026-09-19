'use client';

import React, { useState, useEffect } from 'react';

export default function SolarSunChatbot() {
  const [hasLanded, setHasLanded] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [isBubbleDismissed, setIsBubbleDismissed] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Default preview mode to TRUE unless explicitly set to 'false' (protects live production)
  const isPreviewMode = process.env.NEXT_PUBLIC_MAZ_PREVIEW_MODE !== 'false';
  const expectedPassword = process.env.NEXT_PUBLIC_MAZ_PREVIEW_PASSWORD || '112';

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Check if previously unlocked in this session
  useEffect(() => {
    if (!isPreviewMode) {
      setIsUnlocked(true);
      return;
    }
    try {
      if (sessionStorage.getItem('maz_preview_unlocked') === 'true') {
        setIsUnlocked(true);
      }
    } catch {
      // sessionStorage unavailable
    }
  }, [isPreviewMode]);

  // Trigger drop animation and speech bubble sequence
  useEffect(() => {
    // Drop animation takes ~1.1s
    const landTimer = setTimeout(() => {
      setHasLanded(true);
    }, 1100);

    // Speech bubble pops up 0.7s after landing
    const bubbleTimer = setTimeout(() => {
      setShowSpeechBubble(true);
    }, 1800);

    // Watch for chat panel open state from maz.js
    const interval = setInterval(() => {
      const panel = document.getElementById('maz-chat-panel');
      if (panel) {
        if (!isUnlocked && isPreviewMode) {
          // If locked, immediately prevent chat from popping up
          if (panel.classList.contains('maz-open')) {
            panel.classList.remove('maz-open');
          }
          setIsChatOpen(false);
        } else {
          setIsChatOpen(panel.classList.contains('maz-open'));
        }
      }
    }, 200);

    return () => {
      clearTimeout(landTimer);
      clearTimeout(bubbleTimer);
      clearInterval(interval);
    };
  }, [isUnlocked, isPreviewMode]);

  const handleToggleChat = () => {
    // If preview mode is enabled and not yet unlocked, require passcode
    if (isPreviewMode && !isUnlocked) {
      setShowPasswordModal(true);
      setPasswordError('');
      setIsBubbleDismissed(true);
      return;
    }

    const launcher = document.getElementById('maz-launcher-btn');
    if (launcher) {
      launcher.click();
    }
    // Also dismiss bubble once user has engaged
    setIsBubbleDismissed(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === expectedPassword.trim()) {
      setIsUnlocked(true);
      try {
        sessionStorage.setItem('maz_preview_unlocked', 'true');
      } catch {
        // Ignore storage error
      }
      setShowPasswordModal(false);
      setPasswordError('');
      // Open the chat right away
      setTimeout(() => {
        const launcher = document.getElementById('maz-launcher-btn');
        if (launcher) launcher.click();
      }, 150);
    } else {
      setPasswordError('Incorrect passcode. Please try again.');
    }
  };

  return (
    <>
      {/* Hide the default plain Maz button & teaser so our Smiling Sun Mascot is the primary launcher */}
      <style dangerouslySetInnerHTML={{ __html: `
        #maz-launcher-btn {
          display: none !important;
        }
        #maz-teaser {
          display: none !important;
        }
        ${!isUnlocked && isPreviewMode ? `
        #maz-chat-panel {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
        ` : ''}
        /* Custom brand accent for Maz chat panel to match Billabong Solar */
        #maz-chat-panel {
          border-radius: 24px !important;
          box-shadow: 0 24px 60px -12px rgba(23, 29, 77, 0.28), 0 0 0 1px rgba(255, 94, 0, 0.15) !important;
        }
        #maz-header {
          background: linear-gradient(135deg, #171D4D 0%, #252E6D 60%, #FF5E00 130%) !important;
        }
        .maz-bubble-user {
          background: #FF5E00 !important;
        }
        .maz-send-btn {
          background: linear-gradient(135deg, #FF5E00 0%, #E05200 100%) !important;
        }
        .maz-input:focus {
          border-color: #FF5E00 !important;
          box-shadow: 0 0 0 3px rgba(255, 94, 0, 0.15) !important;
        }

        /* Physics drop-bounce keyframes from top of website */
        @keyframes sunDropFromSky {
          0% {
            opacity: 0;
            transform: translateY(-110vh) scale(0.6) rotate(-20deg);
          }
          60% {
            opacity: 1;
            transform: translateY(18px) scale(1.15) rotate(10deg);
          }
          75% {
            transform: translateY(-12px) scale(0.92) rotate(-5deg);
          }
          90% {
            transform: translateY(4px) scale(1.04) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
          }
        }

        /* Floating solar ambient bounce */
        @keyframes sunFloatGlow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            filter: drop-shadow(0 8px 24px rgba(255, 122, 0, 0.45));
          }
          50% {
            transform: translateY(-6px) rotate(2deg);
            filter: drop-shadow(0 14px 30px rgba(255, 94, 0, 0.6));
          }
        }

        /* Slow gentle ray rotation */
        @keyframes sunRaysSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Speech bubble bounce pop */
        @keyframes bubblePopIn {
          0% {
            opacity: 0;
            transform: scale(0.4) translateY(20px);
          }
          70% {
            opacity: 1;
            transform: scale(1.06) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .sun-falling-animation {
          animation: sunDropFromSky 1.15s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
        }

        .sun-floating-animation {
          animation: sunFloatGlow 3.5s ease-in-out infinite;
        }

        .sun-rays-rotating {
          animation: sunRaysSpin 24s linear infinite;
        }

        .bubble-popping-animation {
          animation: bubblePopIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      <aside
        aria-label="Solar AI Chatbot"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none"
      >
        {/* Speech Bubble: "I'm cool, ask me!" */}
        {showSpeechBubble && !isBubbleDismissed && !isChatOpen && (
          <div
            onClick={handleToggleChat}
            className="pointer-events-auto cursor-pointer mb-3 mr-1 bg-white/95 backdrop-blur-md text-slate-800 rounded-2xl p-3 sm:p-3.5 shadow-2xl border-2 border-orange-400 max-w-[240px] sm:max-w-[270px] relative bubble-popping-animation transition-transform duration-200 hover:scale-105 group"
            style={{ filter: 'drop-shadow(0 10px 25px rgba(255, 94, 0, 0.25))' }}
          >
            {/* Close / Dismiss */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsBubbleDismissed(true);
              }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-slate-100 hover:bg-red-500 hover:text-white rounded-full text-slate-500 text-xs flex items-center justify-center transition-colors shadow-sm"
              aria-label="Dismiss message"
            >
              ✕
            </button>

            <div className="flex items-start gap-2.5">
              <span className="text-xl shrink-0 group-hover:scale-125 transition-transform duration-200">
                🕶️
              </span>
              <div>
                <p className="text-xs sm:text-sm font-extrabold text-[#171D4D] leading-tight">
                  I&apos;m cool, ask me! <span className="text-orange-500">☀️</span>
                </p>
                <p className="text-[11px] text-slate-600 font-medium mt-1 leading-snug">
                  Ask me anything about solar, batteries, rebates or pricing!
                </p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
                    Solar AI Assistant (Online)
                  </span>
                </div>
              </div>
            </div>

            {/* Speech bubble pointer triangle pointing down to Sun */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white/95 border-b-2 border-r-2 border-orange-400 transform rotate-45" />
          </div>
        )}

        {/* The Smiling Sun Character Button */}
        <button
          type="button"
          onClick={handleToggleChat}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`pointer-events-auto relative focus:outline-none transition-all duration-300 ${
            hasLanded ? 'sun-floating-animation hover:scale-110 active:scale-95' : 'sun-falling-animation'
          }`}
          aria-label="Open Solar AI Assistant"
          title="Solar AI Assistant - I'm cool, ask me!"
        >
          {/* Active Status Badge */}
          <span className="absolute -top-1 -right-1 z-20 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white shadow-xs"></span>
          </span>

          {/* SVG Smiling Sun with Sunglasses and Rotating Rays */}
          <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] flex items-center justify-center">
            {/* Outer Rotating Rays */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full sun-rays-rotating pointer-events-none"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(255, 140, 0, 0.5))' }}
            >
              <g fill="#FFA700">
                {/* 12 Radiant Sun Rays */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <path
                    key={deg}
                    d="M 46 2 C 48 0 52 0 54 2 L 57 15 C 57 17 53 17 50 17 C 47 17 43 17 43 15 Z"
                    transform={`rotate(${deg} 50 50)`}
                    fill={deg % 60 === 0 ? '#FF5E00' : '#FFA700'}
                  />
                ))}
              </g>
            </svg>

            {/* Main Sun Body with Radiant Warm Gradient */}
            <svg
              viewBox="0 0 100 100"
              className="w-12 h-12 sm:w-14 sm:h-14 relative z-10"
            >
              <defs>
                <radialGradient id="sunFaceGradient" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#FFF275" />
                  <stop offset="60%" stopColor="#FF9900" />
                  <stop offset="100%" stopColor="#FF5E00" />
                </radialGradient>
                <linearGradient id="glassesGloss" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2D3748" />
                  <stop offset="45%" stopColor="#1A202C" />
                  <stop offset="100%" stopColor="#171D4D" />
                </linearGradient>
              </defs>

              {/* Sun Face Circle */}
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="url(#sunFaceGradient)"
                stroke="#FF4500"
                strokeWidth="1.5"
              />

              {/* Rosy Cheeks */}
              <circle cx="28" cy="62" r="5" fill="#FF4444" opacity="0.35" />
              <circle cx="72" cy="62" r="5" fill="#FF4444" opacity="0.35" />

              {/* Big Joyful Smile */}
              <path
                d="M 33 61 Q 50 78 67 61"
                fill="#801000"
                stroke="#6B0A00"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Cute white teeth in smile */}
              <path
                d="M 39 63 Q 50 71 61 63 Z"
                fill="#FFFFFF"
              />

              {/* Cool Sunglasses */}
              <g className={`transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`} style={{ transformOrigin: '50px 44px' }}>
                {/* Sunglasses Frame / Bridge */}
                <path
                  d="M 20 40 Q 50 36 80 40 Q 50 42 20 40 Z"
                  fill="#0F172A"
                />
                <rect x="46" y="40" width="8" height="3" rx="1.5" fill="#0F172A" />

                {/* Left Lens */}
                <path
                  d="M 22 41 C 21 41 20 46 22 52 C 24 57 32 58 44 54 C 47 50 47 43 45 41 Z"
                  fill="url(#glassesGloss)"
                  stroke="#0F172A"
                  strokeWidth="2"
                />
                {/* Left Lens Gloss Highlight */}
                <path
                  d="M 26 44 L 32 44 L 27 52 L 24 52 Z"
                  fill="#60A5FA"
                  opacity="0.65"
                />

                {/* Right Lens */}
                <path
                  d="M 78 41 C 79 41 80 46 78 52 C 76 57 68 58 56 54 C 53 50 53 43 55 41 Z"
                  fill="url(#glassesGloss)"
                  stroke="#0F172A"
                  strokeWidth="2"
                />
                {/* Right Lens Gloss Highlight */}
                <path
                  d="M 60 44 L 66 44 L 61 52 L 58 52 Z"
                  fill="#60A5FA"
                  opacity="0.65"
                />
              </g>
            </svg>

            {/* Chat Open / Close indicator toggle */}
            {isChatOpen && (
              <div className="absolute inset-0 bg-[#171D4D]/90 rounded-full flex items-center justify-center text-white font-bold text-lg z-20 border-2 border-orange-400">
                ✕
              </div>
            )}
          </div>
        </button>
      </aside>

      {/* Preview Passcode Lock Modal */}
      {showPasswordModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowPasswordModal(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-orange-200 text-center relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-sm font-bold transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 mx-auto flex items-center justify-center text-3xl shadow-lg shadow-orange-500/30 mb-3">
              ☀️
            </div>

            <h3 className="text-lg font-black text-[#171D4D]">
              Solar AI Assistant
            </h3>
            <span className="inline-block mt-1 px-3 py-0.5 bg-orange-100 text-[#FF5E00] text-xs font-extrabold rounded-full">
              Testing &amp; Training Mode
            </span>

            <p className="text-xs text-slate-600 mt-2.5 mb-4 leading-relaxed">
              This chatbot is locked for testing while we teach and train the AI. Please enter the passcode to access.
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-3.5 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preview Passcode
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  autoFocus
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError('');
                  }}
                  placeholder="Enter passcode"
                  className="w-full px-4 py-3 text-sm text-center tracking-widest font-mono font-bold border-2 border-slate-200 rounded-xl focus:border-[#FF5E00] focus:ring-2 focus:ring-orange-200 outline-hidden transition-all text-slate-900"
                />
              </div>

              {passwordError && (
                <p className="text-xs text-red-600 font-bold text-center">
                  {passwordError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#FF5E00] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-orange-500/30 transition-all transform active:scale-98 cursor-pointer"
              >
                Unlock Chatbot →
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
