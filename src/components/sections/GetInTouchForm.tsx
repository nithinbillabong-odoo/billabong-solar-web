'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function GetInTouchForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', address: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="py-16" style={{ background: 'linear-gradient(to bottom, #ffffff, #FF5E00)' }}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px]">
            <Image 
              src="https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Best-Solar-Quotes-Victoria.jpg?fit=901%2C723&ssl=1" 
              alt="Get in Touch" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Get in Touch</h2>
            <p className="text-gray-600 mb-8">Get in touch with us today and get up to 3 Free Quotes.</p>
            
            {status === 'success' && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md font-medium">
                Thank you! We will contact you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md font-medium">
                Failed to send message. Please try again later.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5E00] transition-shadow" />
              </div>
              <div>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail Address" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5E00] transition-shadow" />
              </div>
              <div>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone No" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5E00] transition-shadow" />
              </div>
              <div>
                <input required type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5E00] transition-shadow" />
              </div>
              <div>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5E00] transition-shadow"></textarea>
              </div>
              <button disabled={status === 'loading'} type="submit" className="w-full mt-2 bg-[#FF5E00] text-white font-bold py-4 rounded-md uppercase tracking-wide hover:bg-orange-600 transition-colors disabled:opacity-70">
                {status === 'loading' ? 'Sending...' : 'Get a Free Quote'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
