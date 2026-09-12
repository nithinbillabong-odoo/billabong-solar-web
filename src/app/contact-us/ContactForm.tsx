'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Residential Solar',
    address: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

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
          message: `Service Interested In: ${formData.service}\n\n${formData.message}`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-8 text-center animate-fadeIn">
        <svg
          className="w-16 h-16 mx-auto text-green-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h3 className="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
        <p className="text-green-700">
          Thank you for getting in touch. One of our solar experts will contact you shortly.
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setFormData({
              name: '',
              email: '',
              phone: '',
              service: 'Residential Solar',
              address: '',
              message: '',
            });
          }}
          className="mt-6 text-green-600 font-semibold hover:text-green-800 underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {errorMessage || 'Failed to submit form. Please check your details and try again.'}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            required
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow"
            placeholder="0400 000 000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Interested In</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow bg-white"
          >
            <option>Residential Solar</option>
            <option>Commercial Solar</option>
            <option>Battery Storage</option>
            <option>General Enquiry</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Property Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow"
          placeholder="123 Solar Street, Melbourne VIC"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
        <textarea
          required
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow resize-none"
          placeholder="How can we help you?"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-lg transition duration-300 disabled:opacity-70 flex justify-center items-center"
      >
        {status === 'submitting' ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
