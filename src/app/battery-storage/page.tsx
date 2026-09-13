import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import EvChargingAnimation from '@/components/sections/EvChargingAnimation';

export const metadata: Metadata = {
  title: 'Solar Battery Storage Victoria | Sig Energy, GoodWe, Alpha ESS & ESY Sunhome | Billabong Solar',
  description: 'Store excess solar power and protect your Victorian home from blackouts. Certified installer for Sig Energy, GoodWe, Alpha ESS, and ESY Sunhome battery storage systems.',
  alternates: {
    canonical: '/battery-storage',
  },
  openGraph: {
    title: 'Solar Battery Storage Victoria | Sig Energy, GoodWe, Alpha ESS & ESY Sunhome | Billabong Solar',
    description: 'Store your daytime solar energy and power your home at night with premium Sig Energy, GoodWe, Alpha ESS, and ESY Sunhome battery systems.',
    images: [
      {
        url: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-28-at-11.12.50-AM.jpeg?fit=1600%2C841&ssl=1',
        width: 1600,
        height: 841,
        alt: 'Solar Battery Storage Installation in Victoria',
      },
    ],
  },
};

export default function BatteryStoragePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Solar Battery Storage Systems Victoria",
    "description": "Premium home and commercial battery storage systems including Sig Energy, GoodWe, Alpha ESS, and ESY Sunhome.",
    "brand": {
      "@type": "Brand",
      "name": "Billabong Solar"
    },
    "category": "Solar Battery Storage Equipment"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-[#171D4D] via-[#242C7D] to-[#1C2366] text-white py-24 md:py-32 overflow-hidden shadow-inner">
        <div className="absolute top-0 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#FF5E00]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold text-orange-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF5E00] animate-pulse" />
            Energy Independence & Backup Power
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight leading-tight">
            Store Your Solar Power for When You Need It Most
          </h1>
          <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto text-gray-200 leading-relaxed font-light">
            Battery storage lets you save the extra energy your solar system produces during the day and use it at night, during peak tariff times, or when the grid goes down.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-a-free-quote"
              className="w-full sm:w-auto inline-block bg-[#FF5E00] hover:bg-orange-600 text-white font-extrabold py-4 px-10 rounded-full text-lg transition duration-300 shadow-xl transform hover:-translate-y-0.5"
            >
              Get a Free Battery Quote →
            </Link>
            <a
              href="tel:1300897221"
              className="w-full sm:w-auto inline-block bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold py-4 px-8 rounded-full text-lg border border-white/30 transition duration-300"
            >
              Call 1300 897 221
            </a>
          </div>
        </div>
      </section>

      {/* Featured Battery Showcase Image from authentic live site */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 aspect-[16/8] w-full">
            <Image
              src="https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-28-at-11.12.50-AM.jpeg?fit=1600%2C841&ssl=1"
              alt="Victorian Solar Battery Installation by Billabong Solar"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171D4D]/90 via-transparent to-transparent flex items-end p-6 md:p-10">
              <div className="text-white max-w-2xl">
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#FF5E00] bg-white/20 backdrop-blur-md px-3 py-1 rounded-full inline-block mb-2">
                  Whole-Home Blackout Backup
                </span>
                <h3 className="text-2xl md:text-3xl font-bold">Uninterrupted Clean Power, 24 Hours a Day</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits from Live Site */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#171D4D] tracking-tight">
              Benefits of Battery Storage
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              More savings, more independence, and complete peace of mind during grid fluctuations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Reduce Electricity Bills",
                desc: "Drastically reduce power bills by running your household on stored solar power rather than purchasing high-rate peak evening grid electricity.",
                icon: (
                  <svg className="w-8 h-8 text-[#FF5E00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Blackout Protection",
                desc: "Keep essential lights, refrigeration, internet routers, and medical appliances running seamlessly whenever the main grid goes down.",
                icon: (
                  <svg className="w-8 h-8 text-[#FF5E00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: "Lower Reliance on Grid",
                desc: "Become self-sufficient from utility rate hikes and surging feed-in tariff reductions by consuming 100% of your own generation.",
                icon: (
                  <svg className="w-8 h-8 text-[#FF5E00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: "Maximise Solar ROI",
                desc: "Capture every excess kilowatt produced during sunny midday hours instead of feeding it back to retail companies for minor feed-in credits.",
                icon: (
                  <svg className="w-8 h-8 text-[#FF5E00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )
              }
            ].map((b, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-6">
                  {b.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#171D4D]">{b.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leading Brands We Install */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-[#FF5E00] font-extrabold text-xs uppercase tracking-wider block mb-2">
              Authorised Equipment
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#171D4D] tracking-tight">
              Premium Battery Brands We Install
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We supply and install leading battery systems with dependable local Australian warranties and engineering support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Sig Energy (Sigenergy)",
                model: "SigenStor 5-in-1 Energy Storage",
                capacity: "Modular 5.0 kWh to 48.0 kWh",
                desc: "Groundbreaking 5-in-1 AI-powered system integrating solar inverter, battery storage, and EV DC charging into a sleek stackable tower with 0ms UPS backup.",
                warranty: "Up to 15 Years Warranty",
                badge: "AI-Powered 5-in-1",
                image: "/images/sigenergy-sigenstor-ev.png"
              },
              {
                name: "GoodWe",
                model: "Lynx Home U & F Series",
                capacity: "Modular 5.4 kWh to 32.4 kWh",
                desc: "Industry-proven Lithium Iron Phosphate (LFP) chemistry with IP65 outdoor durability, smart EPS blackout switching, and single/3-phase compatibility.",
                warranty: "10 Years Warranty",
                badge: "Most Popular",
                image: "https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/bg-13-copyright.jpg?fit=800%2C530&ssl=1"
              },
              {
                name: "Alpha ESS",
                model: "SMILE-G3 & SMILE5",
                capacity: "Modular 2.9 kWh to 60.5 kWh",
                desc: "German engineered with 10,000+ cycle life. Features ultra-safe chemistry, VPP virtual power plant readiness, and smart cloud app monitoring.",
                warranty: "10 Years Warranty",
                badge: "Best Value & Expandable",
                image: "https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/flexible-solar-panels-scaled-1.jpg?fit=800%2C530&ssl=1"
              },
              {
                name: "ESY Sunhome",
                model: "HM Series All-in-One",
                capacity: "Modular 5.1 kWh to 20.4 kWh",
                desc: "Ultra-compact aesthetic all-in-one residential storage system. Plug-and-play installation, IP65 weatherproofing, and smart smartphone app management.",
                warranty: "10 Years Warranty",
                badge: "Sleek & Compact",
                image: "https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Slider_Commercial-Victoria-Slide1-1-1.webp?w=800&ssl=1"
              }
            ].map((brand, i) => (
              <div key={i} className="bg-slate-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col group">
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 right-3 bg-[#FF5E00] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                    {brand.badge}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#171D4D] mb-0.5">{brand.name}</h3>
                    <p className="text-xs text-gray-500 font-semibold mb-2">{brand.model}</p>
                    <p className="text-[#FF5E00] font-bold text-xs mb-3">{brand.capacity}</p>
                    <p className="text-gray-600 text-xs leading-relaxed mb-4">{brand.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] font-bold text-gray-500">
                    <span>🛡️ {brand.warranty}</span>
                    <span className="text-emerald-600 font-semibold">CEC Approved</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Sigenergy & Tesla EV DC Fast Charging Section */}
      <section className="py-20 bg-slate-950 text-white relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <EvChargingAnimation />
        </div>
      </section>

      {/* How Battery Storage Works */}
      <section className="py-20 bg-slate-900 text-white relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">
              How It Works
            </h2>
            <p className="text-lg text-gray-300 max-w-xl mx-auto">
              Simple, automatic, and hassle-free operation that maximizes your daily solar usage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "01",
                title: "Solar Generates Power",
                desc: "During the day, your rooftop solar panels convert Australian sunshine into clean electricity to power your home appliances."
              },
              {
                step: "02",
                title: "Battery Stores Surplus",
                desc: "Instead of exporting extra energy to the grid for minimal feed-in credits, your battery automatically charges with surplus power."
              },
              {
                step: "03",
                title: "Powers You Day & Night",
                desc: "When the sun goes down or during an unforeseen power outage, the battery instantly powers your household with stored zero-cost energy."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 relative">
                <div className="text-4xl font-extrabold text-[#FF5E00] mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF5E00] to-orange-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Store Your Solar?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-white/95">
            Talk to our engineering team today about adding a battery to your existing system or installing a brand-new complete solar and storage package.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-a-free-quote"
              className="w-full sm:w-auto inline-block bg-[#171D4D] hover:bg-[#101438] text-white font-extrabold py-4 px-10 rounded-full text-lg shadow-2xl transition duration-300"
            >
              Request Free Battery Quote →
            </Link>
            <a
              href="tel:1300897221"
              className="w-full sm:w-auto inline-block bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full text-lg border border-white/40 transition duration-300"
            >
              Call 1300 897 221
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
