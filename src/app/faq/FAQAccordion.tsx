'use client';

import { useState } from 'react';

type FAQItem = { q: string; a: string };
type FAQCategory = { category: string; questions: FAQItem[] };

export default function FAQAccordion({ faqs }: { faqs: FAQCategory[] }) {
  const [openIndex, setOpenIndex] = useState<string | null>("cat-0-q-0");

  const toggle = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="space-y-12">
      {faqs.map((cat, catIndex) => (
        <div key={catIndex}>
          <h2 className="text-2xl font-bold mb-6 text-slate-800">{cat.category}</h2>
          <div className="space-y-4">
            {cat.questions.map((item, qIndex) => {
              const id = `cat-${catIndex}-q-${qIndex}`;
              const isOpen = openIndex === id;
              return (
                <div key={qIndex} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                    onClick={() => toggle(id)}
                  >
                    <span className="font-semibold text-lg text-gray-900">{item.q}</span>
                    <span className="text-orange-500 text-2xl transform transition-transform duration-200" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}>
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 bg-gray-50">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
