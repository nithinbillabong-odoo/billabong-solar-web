'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { getAllPosts } from '@/data/blogPosts';

import 'swiper/css';
import 'swiper/css/navigation';

export default function BlogCarousel() {
  const swiperRef = useRef<SwiperType>();
  const posts = getAllPosts();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-[#FF660D] text-xs font-bold uppercase tracking-wider block mb-1">
              Latest Updates
            </span>
            <h2 className="text-3xl font-bold text-gray-900">Solar News & Insights</h2>
          </div>
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
          {posts.map((post) => (
            <SwiperSlide key={post.id} className="h-auto">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100 group">
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs text-gray-400 mb-2">
                    {post.date} • {post.readTime}
                  </div>
                  <Link href={`/blog/${post.slug}`} className="group">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF660D] line-clamp-2 leading-snug transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <Link href={`/blog/${post.slug}`} className="text-[#272E7D] font-bold text-sm hover:text-[#FF660D] flex items-center gap-2 transition-colors">
                      Read Full Article
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
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
