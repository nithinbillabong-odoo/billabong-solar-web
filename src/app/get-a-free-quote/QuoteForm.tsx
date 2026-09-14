'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const HOME_BILLS = [
  'Under $150',
  '$150-$300',
  '$300-$500',
  'Over $500'
];

const COMMERCIAL_BILLS = [
  'Under $3,000',
  '$3,000 - $6,000',
  '$6,000 - $9,000',
  'Over $9,000'
];

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const paramType = searchParams.get('type')?.toLowerCase();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    propertyType: '',
    billAmount: '',
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Direct routing based on incoming URL query param
  useEffect(() => {
    if (paramType === 'commercial' || paramType === 'business') {
      setFormData(prev => ({ ...prev, propertyType: 'Commercial / Business' }));
      setStep(2);
    } else if (paramType === 'home' || paramType === 'residential' || paramType === 'house') {
      setFormData(prev => ({ ...prev, propertyType: 'Home / Residential' }));
      setStep(2);
    }
  }, [paramType]);

  const isCommercial = formData.propertyType
    ? (formData.propertyType.includes('Commercial') || 
       formData.propertyType.includes('Business') || 
       formData.propertyType.includes('Farm'))
    : (paramType === 'commercial' || paramType === 'business');

  const billOptions = isCommercial ? COMMERCIAL_BILLS : HOME_BILLS;

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address || 'Victoria, Australia',
          message: `Quote Request Details:\n- Category: ${isCommercial ? 'Commercial Solar' : 'Residential Solar'}\n- Property Type: ${formData.propertyType}\n- Estimated Bill: ${formData.billAmount}`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStep(4); // Success step
      } else {
        setSubmitError(data.message || 'Failed to submit quote request. Please try again.');
      }
    } catch (error) {
      console.error('Quote form submission error:', error);
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (step === 4) {
    const firstName = formData.name ? formData.name.trim().split(' ')[0] : '';

    return (
      <div className="bg-white rounded-2xl shadow-xl p-10 md:p-14 text-center animate-fadeIn">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h2 className="text-3xl md:text-4xl font-black mb-3 text-gray-900 tracking-tight">
          {isCommercial ? 'Commercial Solar Request Received!' : 'Solar Quote Request Received!'}
        </h2>

        <p className="text-xl md:text-2xl font-bold text-[#FF5E00] mb-4">
          Thanks {firstName || formData.name}!
        </p>

        <p className="text-gray-600 text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
          {isCommercial
            ? 'One of our commercial solar engineering specialists will contact you shortly.'
            : 'One of our solar specialists will contact you shortly.'}
        </p>

        <button
          type="button"
          onClick={() => {
            setStep(1);
            setFormData({ propertyType: '', billAmount: '', name: '', email: '', phone: '', address: '' });
          }}
          className="inline-block text-[#FF5E00] font-bold hover:text-orange-600 hover:underline transition-colors text-sm"
        >
          Start another quote
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Progress Bar */}
      <div className="bg-gray-100 h-2 w-full">
        <div 
          className="bg-[#FF5E00] h-full transition-all duration-500 ease-out" 
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>

      <div className="p-8 md:p-12">
        <div className="mb-8 flex justify-between items-center text-sm font-medium text-gray-500">
          <span className="font-semibold text-gray-600">Step {step} of 3</span>
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="text-[#FF5E00] font-bold hover:underline transition-colors flex items-center gap-1"
            >
              ← Back
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {submitError}
            </div>
          )}

          {/* STEP 1: Property Type Selection */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-extrabold mb-2 text-gray-900">What type of property is this for?</h2>
              <p className="text-gray-500 text-sm mb-6">Select your property to tailor your solar system specifications.</p>
              
              <div className="space-y-4">
                {[
                  {
                    id: 'Home / Residential',
                    label: 'Home / Residential',
                    sub: 'Single family home, townhouse, or residential property'
                  },
                  {
                    id: 'Commercial / Business',
                    label: 'Commercial / Business',
                    sub: 'Commercial rooftop, warehouse, office, or industrial site'
                  },
                  {
                    id: 'Farm / Rural Enterprise',
                    label: 'Farm / Rural Enterprise',
                    sub: 'Agribusiness, winery, dairy, or rural acreage'
                  }
                ].map(item => (
                  <label
                    key={item.id}
                    className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.propertyType === item.id 
                        ? 'border-[#FF5E00] bg-orange-50/70 shadow-sm' 
                        : 'border-gray-200 hover:border-orange-300 bg-white'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="propertyType" 
                      value={item.id} 
                      checked={formData.propertyType === item.id} 
                      onChange={(e) => {
                        updateData('propertyType', e.target.value);
                        updateData('billAmount', '');
                      }} 
                      className="sr-only" 
                    />
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center flex-shrink-0 ${
                        formData.propertyType === item.id ? 'border-[#FF5E00]' : 'border-gray-300'
                      }`}>
                        {formData.propertyType === item.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5E00]"></div>
                        )}
                      </div>
                      <div>
                        <span className="text-lg font-bold text-gray-800 block">{item.label}</span>
                        <span className="text-xs text-gray-500 block mt-0.5">{item.sub}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <button 
                type="button" 
                disabled={!formData.propertyType} 
                onClick={handleNext} 
                className="w-full mt-8 bg-[#FF5E00] hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition duration-300 shadow-md"
              >
                Continue to Bill Options →
              </button>
            </div>
          )}

          {/* STEP 2: Bill Amount Selection */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-[#FF5E00] mb-2">
                  {isCommercial ? 'Commercial Solar Options' : 'Home Solar Options'}
                </span>
                <h2 className="text-2xl font-extrabold text-gray-900">
                  {isCommercial 
                    ? 'What is your estimated electricity bill?' 
                    : 'What is your estimated monthly electricity bill?'}
                </h2>
                <p className="text-gray-500 text-sm mt-1 mb-6">
                  {isCommercial
                    ? 'Select your commercial electricity spending to determine inverter and panel sizing (30 kW to 1MW):'
                    : 'Select your average monthly power spend:'}
                </p>
              </div>

              <div className="space-y-4">
                {billOptions.map(amount => (
                  <label 
                    key={amount} 
                    className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.billAmount === amount 
                        ? 'border-[#FF5E00] bg-orange-50/70 shadow-sm' 
                        : 'border-gray-200 hover:border-orange-300 bg-white'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="billAmount" 
                      value={amount} 
                      checked={formData.billAmount === amount} 
                      onChange={(e) => updateData('billAmount', e.target.value)} 
                      className="sr-only" 
                    />
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center flex-shrink-0 ${
                        formData.billAmount === amount ? 'border-[#FF5E00]' : 'border-gray-300'
                      }`}>
                        {formData.billAmount === amount && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5E00]"></div>
                        )}
                      </div>
                      <span className="text-lg font-bold text-gray-800">{amount}</span>
                    </div>
                  </label>
                ))}
              </div>

              <button 
                type="button" 
                disabled={!formData.billAmount} 
                onClick={handleNext} 
                className="w-full mt-8 bg-[#FF5E00] hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition duration-300 shadow-md"
              >
                Next →
              </button>
            </div>
          )}

          {/* STEP 3: Contact & Property Details */}
          {step === 3 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-extrabold mb-2 text-gray-900">Where should we send your quote?</h2>
              <p className="text-gray-500 text-sm mb-6">Enter your details and our team will prepare your tailored solar assessment.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {isCommercial ? 'Contact Name / Business Representative *' : 'Full Name *'}
                  </label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => updateData('name', e.target.value)} 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF5E00] focus:border-[#FF5E00] outline-none transition-shadow" 
                    placeholder={isCommercial ? 'e.g. John Smith (Operations Director)' : 'Your full name'} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email} 
                    onChange={(e) => updateData('email', e.target.value)} 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF5E00] focus:border-[#FF5E00] outline-none transition-shadow" 
                    placeholder="your@email.com" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number (Australian Mobile or Direct Line) *</label>
                  <input 
                    required 
                    type="tel" 
                    inputMode="tel"
                    value={formData.phone} 
                    onChange={(e) => updateData('phone', e.target.value)} 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF5E00] focus:border-[#FF5E00] outline-none transition-shadow" 
                    placeholder="0400 000 000" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {isCommercial ? 'Installation Site / Facility Address *' : 'Installation Address *'}
                  </label>
                  <input 
                    required 
                    type="text" 
                    value={formData.address} 
                    onChange={(e) => updateData('address', e.target.value)} 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF5E00] focus:border-[#FF5E00] outline-none transition-shadow" 
                    placeholder="e.g. 123 Commercial Rd, Melbourne VIC" 
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-8 bg-[#171D4D] hover:bg-[#12163d] text-white font-extrabold py-4 rounded-xl transition duration-300 disabled:opacity-70 flex justify-center items-center shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Quote Request...
                  </span>
                ) : (
                  isCommercial ? 'Get My Free Commercial Feasibility Quote' : 'Get My Free Home Solar Quote'
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
