'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

const posts = [
  {
    title: 'How to find the best solar panel installers in Victoria',
    image: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/1920-x-1280-1-670x268-1-417x268.jpg',
    category: 'Commercial, Solar News',
    url: '/blog/best-solar-panel-installers-victoria/'
  },
  {
    title: 'Are Solar Panels covered by Insurance?',
    image: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/1920-x-1280-3-670x268-1-417x268.jpg',
    category: 'Commercial, Solar News',
    url: '/blog/solar-panels-covered-insurance/'
  },
  {
    title: 'How to find accredited Solar Installers in Melbourne',
    image: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Accredited-Solar-Blog-Image-2-670x268-1-417x268.png',
    category: 'Commercial, Solar News',
    url: '/blog/accredited-solar-installers-melbourne/'
  },
  {
    title: 'What is the Solar Panel Installation Process?',
    image: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/solar-panel-installation-melbourne-billabong-solar-670x268-1-417x268.png',
    category: 'Solar News',
    url: '/blog/solar-panel-installation-process/'
  },
  {
    title: 'Harnessing the Power of Renewables: Exploring Sustainable Energy Sources',
    image: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Exploring-Sustainable-Energy-Sources-670x268-1-417x268.jpg',
    category: 'Solar News',
    url: '/blog/harnessing-power-renewables/'
  },
  {
    title: 'Understanding the Different Types of Solar PV Systems',
    image: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Blog_Different-types-of-Solar-PV-Systems-Banner-image-670x268-1-417x268.jpg',
    category: 'Solar News',
    url: '/blog/types-solar-pv-systems/'
  }
];

export default function BlogCarousel() {
  const swiperRef = useRef<SwiperType>();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Solar News</h2>
          <div className="flex gap-3">
            <button 
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 rounded-full bg-[#272E7D] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors shadow-sm"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 rounded-full bg-[#272E7D] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors shadow-sm"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-6"
        >
          {posts.map((post, idx) => (
            <SwiperSlide key={idx} className="h-auto">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col border border-gray-100">
                <div className="relative h-60 w-full">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-[#FF660D] text-sm font-bold mb-3 uppercase tracking-wider">
                    {post.category}
                  </div>
                  <Link href={post.url} className="group">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:underline line-clamp-3 leading-tight">
                      {post.title}
                    </h3>
                  </Link>
                  <div className="mt-auto pt-4">
                    <Link href={post.url} className="text-[#272E7D] font-bold hover:text-opacity-80 flex items-center gap-2 transition-colors">
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
