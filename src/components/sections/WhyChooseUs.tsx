'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const accordionData = [
  {
    id: 1,
    number: '01',
    title: 'High Quality Solar',
    content: "We offer only the highest quality Solar Panels listed as Tier-1 on Bloomberg's New Energy Finance. At Billabong Solar, we do not compromise on quality.",
    image: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/img-solar-panels-min.webp?fit=800%2C530&ssl=1'
  },
  {
    id: 2,
    number: '02',
    title: 'Experienced Electricians',
    content: 'Our A-Grade electricians are highly experienced to handle every installation scenario. Furthermore, every install is independently assessed...',
    image: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/installer-1.webp?fit=1200%2C800&ssl=1'
  },
  {
    id: 3,
    number: '03',
    title: 'Big Rebates and Incentives',
    content: 'Exciting Government Grants making Solar in Victoria cheaper than ever before! Let the Billabong Solar team tell you how...',
    image: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Tax-Incentive-For-Solar-Power-In-Arkansas.jpg?fit=1500%2C1001&ssl=1'
  },
  {
    id: 4,
    number: '04',
    title: 'Warrantied Services',
    content: 'In addition to our industry-leading warranties - we offer a 5-year Warranty on the system performance. This way you always know that Billabong Solar has your back - long term!',
    image: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/flexible-solar-panels-scaled-1.jpg?fit=2560%2C1707&ssl=1'
  }
];

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-[80px] bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#002244]">Why Choose Billabong Solar?</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Accordion List */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {accordionData.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <div 
                  key={item.id} 
                  className={`rounded-lg overflow-hidden transition-all duration-300 ${isActive ? 'bg-white shadow-lg' : 'bg-transparent border-b border-gray-300'}`}
                >
                  <button
                    onClick={() => setActiveIndex(index)}
                    className={`w-full flex items-center justify-between p-6 text-left transition-colors duration-300 ${isActive ? 'bg-[#FF660D] text-white' : 'text-[#002244] hover:text-[#FF660D]'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-bold text-xl ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                        {item.number}
                      </span>
                      <span className="font-semibold text-xl md:text-2xl">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-2xl font-light">
                      {isActive ? '×' : '+'}
                    </span>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-[500px] opacity-100 p-6' : 'max-h-0 opacity-0 px-6 py-0'}`}
                  >
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {item.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Image Display */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              {accordionData.map((item, index) => (
                <div 
                  key={item.id}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0 bg-gray-200'}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
