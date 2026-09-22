'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    bgImage: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Slider-Residential-Solar-Save-Electricity-Bill.webp?w=1920&ssl=1',
    heading: 'Goodbye to Massive Electricity Bills',
    subtext: 'Save up to $100,000/year. Let us tell you how!',
    ctaText: 'Book Your Free Consultation',
    ctaLink: '/get-a-free-quote'
  },
  {
    bgImage: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Slider_Accrediated-Electrician-Victoria-Solar.webp?w=1920&ssl=1',
    heading: 'Installed by Accredited Electricians',
    subtext: 'Designed by Engineers with over 10 years of experience in Solar Solutions',
    ctaText: 'Book Your Free Consultation',
    ctaLink: '/get-a-free-quote'
  },
  {
    bgImage: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Slider_Tier-1-Solar-Panels-Victoria.webp?w=1920&ssl=1',
    heading: 'We use Tier-1 Panels Only',
    subtext: 'Get Generous Rebates and Incentives. Let us explain how!',
    ctaText: 'Book Your Free Consultation',
    ctaLink: '/get-a-free-quote'
  }
];

export default function HeroSlider() {
  return (
    <section className="relative w-full h-[68vh] md:h-[728px] overflow-hidden group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        className="w-full h-full hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.bgImage})` }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50" />
              
              {/* Content */}
              <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                  {slide.heading}
                </h1>
                <p className="text-lg md:text-2xl text-white mb-8 animate-fade-in-up animation-delay-200">
                  {slide.subtext}
                </p>
                <Link 
                  href={slide.ctaLink}
                  className="inline-block bg-[#FF660D] hover:bg-[#e55b0b] text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300 animate-fade-in-up animation-delay-400"
                >
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: white;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .hero-swiper:hover .swiper-button-next,
        .hero-swiper:hover .swiper-button-prev {
          opacity: 1;
        }
        .hero-swiper .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background: #FF660D;
          opacity: 1;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease forwards;
          opacity: 0;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </section>
  );
}
