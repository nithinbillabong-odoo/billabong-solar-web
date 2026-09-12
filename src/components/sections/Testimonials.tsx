import Link from 'next/link';

export default function Testimonials() {
  return (
    <section className="bg-[#272E7D] py-[80px] px-4 text-white">
      <div className="container mx-auto max-w-[800px] flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Thank You for all the 5 Stars!</h2>
        
        <svg className="w-12 h-12 text-white mb-6 opacity-90" fill="currentColor" viewBox="0 0 512 512" aria-hidden="true">
          <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"/>
        </svg>

        <p className="text-lg md:text-xl leading-relaxed mb-8 italic">
          "Would like to thank Naj and team for the exceptional work done with the installation of our solar panels. The installers were professional and friendly. Highly recommend Billabong Solar to anyone who is planning to get it installed. It was such a hassle-free process and the installation got done on time with no delays and within the suggested time."
        </p>

        <div className="flex flex-col items-center">
          <div className="text-[#FFD700] text-2xl tracking-widest mb-2" aria-label="5 out of 5 stars">★★★★★</div>
          <span className="font-bold text-lg">Joel Koshy</span>
        </div>

        <div className="mt-12">
          <Link href="#" className="underline hover:text-gray-300 transition-colors">
            Read more reviews on Google
          </Link>
        </div>
      </div>
    </section>
  );
}
