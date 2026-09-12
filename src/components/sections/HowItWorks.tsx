import React from 'react';
import Image from 'next/image';

const steps = [
  {
    id: 1,
    title: 'Get in Touch',
    description: 'Not sure where to start? Just call us or send us an email and our team of Solar experts will brief you about the whole process...',
    image: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2024/10/wf1.jpg'
  },
  {
    id: 2,
    title: 'We Take Care of Everything',
    description: 'You can count on our consultants to assist you through the whole process, from claiming rebates and best financing options...',
    image: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2024/10/wf2.jpg'
  },
  {
    id: 3,
    title: 'Get Installed',
    description: 'At Billabong Solar, our fully accredited and licenced electricians take extra care to ensure every part of the system is installed expertly...',
    image: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2024/09/image26.jpg'
  },
  {
    id: 4,
    title: 'Enjoy Your Free Power',
    description: "Now it's time to enjoy the perks of having low cost and clean energy. And remember, team Billabong Solar has your back with dedicated after-sales support.",
    image: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2024/09/image27.jpg'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-[80px] bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h4 className="text-[#FF660D] font-semibold text-lg mb-2">Don't Know Where to Start?</h4>
          <h2 className="text-3xl md:text-5xl font-bold text-[#002244]">Get Solar in 4 Super Easy Steps</h2>
        </div>

        <div className="relative">
          {/* Dashed line connecting steps (hidden on mobile) */}
          <div className="hidden lg:block absolute top-[120px] left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-gray-300 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-4 relative z-10">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center text-center group">
                <div className="relative w-[240px] h-[240px] mb-8 rounded-full overflow-hidden border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105 bg-gray-100">
                  <Image 
                    src={step.image} 
                    alt={step.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {/* Step Badge */}
                  <div className="absolute top-4 right-4 bg-[#FF660D] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-4 border-white shadow-md">
                    {step.id}
                  </div>
                </div>
                
                <h3 className="text-[#FF660D] text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed px-4">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
