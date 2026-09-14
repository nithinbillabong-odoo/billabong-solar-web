import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Commercial Solar Solutions Victoria | Reduce Bills & Boost ROI | Billabong Solar',
  description: 'Expert commercial solar installations for Victorian businesses. Turn high energy expenses into savings with Tier-1 commercial systems, STC & LGC incentives, and tax write-offs.',
  alternates: {
    canonical: '/commercial',
  },
  openGraph: {
    title: 'Commercial Solar Solutions Victoria | Billabong Solar',
    description: 'Empower your business with Tier-1 commercial solar installations designed by accredited engineers across Victoria.',
    images: [
      {
        url: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Victoria-Commerical-Solar-Solutions-Get-A-Quote.jpg?fit=901%2C723&ssl=1',
        width: 901,
        height: 723,
        alt: 'Victoria Commercial Solar Solutions Billabong Solar',
      },
    ],
  },
};

export default function CommercialSolarPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Commercial Solar Panel Installation",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Billabong Solar",
      "telephone": "1300 897 221",
      "email": "info@billabongsolar.com.au",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Victoria",
        "addressCountry": "AU"
      }
    },
    "areaServed": "Victoria, Australia",
    "description": "Expert commercial solar panel installation across Victoria. Reduce energy costs, earn rebates, and accelerate payback."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#171D4D] via-[#242C7D] to-[#1C2366] text-white py-24 md:py-32 overflow-hidden shadow-inner">
        {/* Glow ambient */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#FF5E00]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold text-orange-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF5E00] animate-pulse" />
            Victoria Commercial Solar Experts
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight leading-tight">
            Commercial Solar Solutions
          </h1>
          <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto text-gray-200 leading-relaxed font-light">
            Custom engineered commercial solar systems from <strong>30 kW to 1,000 kW (1MW)</strong>. Slash operating overheads, hedge against rising Victorian peak tariffs, and boost your enterprise ROI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-a-free-quote?type=commercial"
              className="w-full sm:w-auto inline-block bg-[#FF5E00] hover:bg-orange-600 text-white font-extrabold py-4 px-10 rounded-full text-lg transition duration-300 shadow-xl transform hover:-translate-y-0.5"
            >
              Get a Free Commercial Quote →
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

      {/* Featured Banner Showcase */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 aspect-[16/7] w-full">
            <Image
              src="https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Slider_Commercial-Victoria-Slide1-1-1.webp?w=1200&ssl=1"
              alt="Commercial Solar Victoria Installation"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-6 md:p-10">
              <div className="text-white max-w-xl">
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#FF5E00] bg-white/20 backdrop-blur-md px-3 py-1 rounded-full inline-block mb-2">
                  High-Capacity Solar
                </span>
                <h3 className="text-xl md:text-3xl font-bold">Custom Engineered for Maximum Commercial Output</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#171D4D] tracking-tight">
              Benefits of Commercial Solar
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how converting rooftop space into an energy asset transforms your balance sheet.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Massive Cost Savings",
                desc: "Significantly reduce operating expenses by generating daytime power directly when your business requires it most.",
                icon: "💰"
              },
              {
                title: "Government Rebates",
                desc: "Benefit from Small-scale Technology Certificates (STCs), Large-scale Generation Certificates (LGCs), and tax write-offs.",
                icon: "🏛️"
              },
              {
                title: "NETCC Approved Seller",
                desc: "Tailored engineering plans created and commissioned exclusively to NETCC Approved Seller standards by licensed master electricians.",
                icon: "⚡"
              },
              {
                title: "ESG & Sustainability",
                desc: "Demonstrate environmental stewardship to clients and stakeholders by radically reducing corporate emissions.",
                icon: "🌱"
              }
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-[#171D4D]">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us with Real Image */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-orange-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-35 transition duration-500" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 aspect-[4/3] w-full">
                  <Image
                    src="https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Victoria-Commerical-Solar-Solutions-Get-A-Quote.jpg?fit=901%2C723&ssl=1"
                    alt="Victoria Commercial Solar Solutions by Billabong Solar"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="inline-block px-3.5 py-1 rounded-full bg-orange-100 text-[#FF5E00] text-xs font-bold uppercase tracking-wider mb-4">
                Enterprise Reliability
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-[#171D4D] leading-tight">
                Why Choose Billabong Solar for Your Business?
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Scalable Systems (30kW to 1,000kW / 1MW)",
                    desc: "Tailored to warehouses, manufacturing plants, retail centres, schools, and agribusinesses across Victoria."
                  },
                  {
                    title: "Dedicated Commercial Project Manager",
                    desc: "A single qualified point of contact from structural engineering assessment to network grid approvals."
                  },
                  {
                    title: "Maximum Rebates & Tax Incentives",
                    desc: "We calculate all available STCs, LGCs, and instant asset write-off depreciation benefits upfront."
                  },
                  {
                    title: "Tier-1 Hardware & Performance Guarantees",
                    desc: "Long-term warranties including 25-year panel performance and 5-year workmanship guarantees."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-[#FF5E00] flex items-center justify-center font-bold mt-1">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Write-Off / Incentives Banner */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-[#FF5E00] font-bold text-sm tracking-widest uppercase mb-2">
                Government Incentives
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
                Accelerate Return with Commercial Tax Write-Offs
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Eligible Australian businesses can claim substantial asset deductions and capital write-offs on commercial solar equipment, dramatically shortening your system payback period to as little as 2.5 to 4 years.
              </p>
              <Link
                href="/get-a-free-quote?type=commercial"
                className="inline-block bg-[#FF5E00] hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-full transition duration-300"
              >
                Request Financial Assessment
              </Link>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/9] border border-white/10">
              <Image
                src="https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Slider-Tax-WiriteOff-1024x448-1-1.webp?w=1200&ssl=1"
                alt="Commercial Solar Tax Write Off Incentives"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#FF5E00] to-orange-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Power Your Business?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-white/90">
            Contact our commercial engineering specialists today for a comprehensive feasibility study and custom financial ROI model.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-a-free-quote?type=commercial"
              className="w-full sm:w-auto inline-block bg-[#171D4D] hover:bg-[#101438] text-white font-extrabold py-4 px-10 rounded-full text-lg shadow-2xl transition duration-300"
            >
              Start Commercial Assessment →
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
