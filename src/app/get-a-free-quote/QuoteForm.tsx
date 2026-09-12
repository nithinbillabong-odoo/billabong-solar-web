'use client';

import { useState } from 'react';

export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: '',
    billAmount: '',
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission to /api/contact
    setStep(4); // Success step
  };

  const updateData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (step === 4) {
    const savingsMap: Record<string, string> = {
      'Under $150': '$500 - $800',
      '$150-$300': '$800 - $1,500',
      '$300-$500': '$1,500 - $2,500',
      'Over $500': '$2,500+'
    };
    const estimatedSavings = formData.billAmount ? savingsMap[formData.billAmount] : '$1,000+';

    return (
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center animate-fadeIn">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Quote Request Received!</h2>
        <p className="text-xl text-gray-600 mb-8">Thanks {formData.name || 'there'}! Based on your current bill, you could save approximately:</p>
        <div className="text-4xl font-bold text-orange-500 mb-8">{estimatedSavings} <span className="text-lg text-gray-500 font-normal">per year</span></div>
        <p className="text-gray-600 mb-8">One of our solar experts will be in touch shortly to discuss your custom solar design.</p>
        <button onClick={() => {
          setStep(1);
          setFormData({ propertyType: '', billAmount: '', name: '', email: '', phone: '', address: '' });
        }} className="text-orange-500 font-semibold hover:underline">Start another quote</button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Progress Bar */}
      <div className="bg-gray-100 h-2 w-full">
        <div 
          className="bg-orange-500 h-full transition-all duration-500 ease-out" 
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>

      <div className="p-8 md:p-12">
        <div className="mb-8 flex justify-between items-center text-sm font-medium text-gray-500">
          <span>Step {step} of 3</span>
          {step > 1 && <button type="button" onClick={handleBack} className="hover:text-orange-500 transition-colors">← Back</button>}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">What type of property is this for?</h2>
              <div className="space-y-4">
                {['House', 'Business', 'Farm'].map(type => (
                  <label key={type} className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.propertyType === type ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                    <input type="radio" name="propertyType" value={type} checked={formData.propertyType === type} onChange={(e) => updateData('propertyType', e.target.value)} className="sr-only" />
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${formData.propertyType === type ? 'border-orange-500' : 'border-gray-300'}`}>
                        {formData.propertyType === type && <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>}
                      </div>
                      <span className="text-lg font-medium text-gray-800">{type}</span>
                    </div>
                  </label>
                ))}
              </div>
              <button type="button" disabled={!formData.propertyType} onClick={handleNext} className="w-full mt-8 bg-orange-500 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition duration-300">
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">What is your estimated monthly electricity bill?</h2>
              <div className="space-y-4">
                {['Under $150', '$150-$300', '$300-$500', 'Over $500'].map(amount => (
                  <label key={amount} className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.billAmount === amount ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                    <input type="radio" name="billAmount" value={amount} checked={formData.billAmount === amount} onChange={(e) => updateData('billAmount', e.target.value)} className="sr-only" />
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${formData.billAmount === amount ? 'border-orange-500' : 'border-gray-300'}`}>
                        {formData.billAmount === amount && <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>}
                      </div>
                      <span className="text-lg font-medium text-gray-800">{amount}</span>
                    </div>
                  </label>
                ))}
              </div>
              <button type="button" disabled={!formData.billAmount} onClick={handleNext} className="w-full mt-8 bg-orange-500 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition duration-300">
                Next
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Where should we send your quote?</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input required type="text" value={formData.name} onChange={(e) => updateData('name', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none transition-shadow" placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input required type="email" value={formData.email} onChange={(e) => updateData('email', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none transition-shadow" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input required type="tel" value={formData.phone} onChange={(e) => updateData('phone', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none transition-shadow" placeholder="Your phone number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Installation Address *</label>
                  <input required type="text" value={formData.address} onChange={(e) => updateData('address', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none transition-shadow" placeholder="Your property address" />
                </div>
              </div>
              <button type="submit" className="w-full mt-8 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition duration-300">
                Get My Free Quote
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
