import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us | Qualified Engineers & Accredited Solar Installers Victoria | Billabong Solar',
  description: 'Learn about Billabong Solar. With almost a decade of combined engineering experience, our team of qualified engineers sets the gold standard for residential and commercial solar installations across Australia.',
  alternates: {
    canonical: '/about-us',
  },
  openGraph: {
    title: 'About Billabong Solar | Engineers, Not Just Installers',
    description: 'A team of qualified engineers setting the gold standard for solar installations across Australia.',
    images: [
      {
        url: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/bg-13-copyright.jpg?fit=901%2C723&ssl=1',
        width: 901,
        height: 723,
        alt: 'Billabong Solar Engineers and Installation Team',
      },
    ],
  },
};

export default function AboutUsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Billabong Solar",
    "description": "With almost a decade of combined engineering experience, Billabong Solar sets the gold standard for solar installations in Australia.",
    "publisher": {
      "@type": "Organization",
      "name": "Billabong Solar",
      "url": "https://billabongsolar.com.au",
      "logo": "https://billabongsolar.com.au/wp-content/uploads/2024/06/log-new.webp",
      "telephone": "1300 897 221",
      "email": "info@billabongsolar.com.au",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Victoria",
        "addressCountry": "AU"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Banner with Royal Navy Glass Effect */}
      <section className="relative bg-gradient-to-r from-[#171D4D] via-[#242C7D] to-[#1C2366] text-white py-20 md:py-28 overflow-hidden shadow-inner">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FF5E00]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sm font-semibold tracking-wide text-orange-300 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
            Engineers, Not Just Installers
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-sm">
            About Us
          </h1>
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex justify-center items-center gap-2 text-sm text-gray-300 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Residential</Link>
            <span className="text-gray-400">›</span>
            <span className="text-orange-400 font-semibold">About Us</span>
          </nav>
        </div>
      </section>

      {/* Intro: Engineers, Not Just Installers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#171D4D] mb-4 tracking-tight">
            Engineers, Not Just Installers
          </h2>
          <p className="text-xl md:text-2xl font-semibold text-[#FF5E00] mb-8">
            That’s who we are.
          </p>
          <div className="bg-slate-50/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-8 md:p-10 shadow-sm">
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-normal">
              With almost a decade worth of combined experience in designing and installing solar systems across Australia, we are a team of qualified engineers who have come together with a mission to set in place the most professional and efficient solar installation process in Australia.
            </p>
          </div>
        </div>
      </section>

      {/* Gold Standard Section: Image + Guarantee List */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Real Authentic Image */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-[#FF5E00] rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/60 bg-white aspect-[4/3] w-full">
                <Image
                  src="https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/bg-13-copyright.jpg?fit=901%2C723&ssl=1"
                  alt="Billabong Solar Gold Standard Solar Installation Team"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Checklist Content */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-slate-100 shadow-xl">
              <div className="inline-block px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold tracking-wide uppercase mb-4">
                ★ Setting The Industry Benchmark
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#171D4D] mb-8 tracking-tight leading-tight">
                To set a Gold Standard, we ensure
              </h3>

              <div className="space-y-5">
                {[
                  {
                    title: "We use only Tier-1 products",
                    desc: "Bloomberg New Energy Finance (BNEF) verified Tier-1 panels for peak performance and durability."
                  },
                  {
                    title: "Installations Managed to NETCC Approved Seller Standards",
                    desc: "Strict adherence to the New Energy Tech Consumer Code (NETCC) by licensed A-Grade electricians."
                  },
                  {
                    title: "We only use top of the range products and solutions",
                    desc: "Premium inverters, smart optimizers, and resilient mounting components built for Australian conditions."
                  },
                  {
                    title: "Quality Control visits post Installation to guarantee system performance",
                    desc: "Comprehensive on-site verification and 5-year performance monitoring guarantee."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50/70 hover:bg-orange-50/50 border border-slate-100 hover:border-orange-200 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-lg mt-0.5 border border-emerald-500/20">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 leading-snug">{item.title}</h4>
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* NETCC Approved Seller Certificate Card */}
              <div className="mt-8 p-6 rounded-2xl bg-orange-50/70 border border-orange-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF5E00] text-white flex items-center justify-center font-black text-xl flex-shrink-0 shadow-sm">
                    ★
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="font-extrabold text-[#171D4D] text-base sm:text-lg">
                        NETCC Approved Solar Seller (New Energy Tech Consumer Code)
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-200 text-orange-800 uppercase tracking-wider">
                        Official Signatory
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-2xl">
                      A NETCC approved solar seller is a business that follows the New Energy Tech Consumer Code, which sets high standards for honest sales, clear contracts, and consumer protection in Australia.
                    </p>
                  </div>
                </div>
                <a
                  href="/docs/new-energy-tech-consumer-code.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-[#171D4D] hover:bg-[#1E2560] text-white font-bold text-xs transition-colors inline-flex items-center gap-2 shadow-sm self-stretch sm:self-auto justify-center"
                >
                  <span>View Code of Conduct (PDF)</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Partnering with Us */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#242C7D_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Benefits of Partnering with Us
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Our engineering-first approach ensures every dollar invested delivers maximum returns and long-term protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                highlight: "Complete Financial Evaluation",
                text: "You can get the best and complete financial evaluation of your current situation and transparent details of the exact payback period.",
                icon: (
                  <svg className="w-7 h-7 text-[#FF5E00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                highlight: "Maximum Government Rebates",
                text: "You get the maximum rebates from the government along with access to the best interest-free loan offers and hassle-free paperwork handled by us.",
                icon: (
                  <svg className="w-7 h-7 text-[#FF5E00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                highlight: "Appreciate Property Value",
                text: "You can appreciate the value of your home with long-lasting, aesthetically pleasing, and most efficiently designed solar panels.",
                icon: (
                  <svg className="w-7 h-7 text-[#FF5E00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                )
              },
              {
                highlight: "Protect The Environment",
                text: "You can play your part to protect the environment, eliminate emissions, and significantly reduce your family or business carbon footprint.",
                icon: (
                  <svg className="w-7 h-7 text-[#FF5E00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              }
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-orange-500/40 transition-all duration-300 shadow-xl group"
              >
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <div className="text-orange-400 font-bold text-sm tracking-wider uppercase mb-2">
                  With Us
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {benefit.highlight}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#171D4D] tracking-tight mb-4">
              What We Stand For
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built upon 3 unshakeable pillars that define our daily work and relationship with every customer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Professionalism */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 md:p-10 text-center hover:shadow-xl transition-all duration-300 group">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#171D4D] text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Professionalism</h3>
              <p className="text-[#FF5E00] font-semibold text-sm mb-4 uppercase tracking-wider">In Design and Installation</p>
              <p className="text-gray-600 leading-relaxed text-sm">
                Engineering precision in every solar layout, electrical design, and physical mount to guarantee optimal generation.
              </p>
            </div>

            {/* Pillar 2: Quality */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 md:p-10 text-center hover:shadow-xl transition-all duration-300 group">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#171D4D] text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Quality</h3>
              <p className="text-[#FF5E00] font-semibold text-sm mb-4 uppercase tracking-wider">In Products and Services</p>
              <p className="text-gray-600 leading-relaxed text-sm">
                No compromise on hardware. We supply Tier-1 panels, industry-leading smart inverters, and backed warranties.
              </p>
            </div>

            {/* Pillar 3: Transparency */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 md:p-10 text-center hover:shadow-xl transition-all duration-300 group">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#171D4D] text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Transparency</h3>
              <p className="text-[#FF5E00] font-semibold text-sm mb-4 uppercase tracking-wider">In Consultations and Assessments</p>
              <p className="text-gray-600 leading-relaxed text-sm">
                Clear savings estimates, upfront rebate deductions, and genuine advice without high-pressure sales gimmicks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA: Join the Solar Homes Program Today */}
      <section className="py-20 bg-[#FF5E00] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
            Join the Solar Homes Program Today!
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-white/95 max-w-3xl mx-auto font-medium">
            Contact our accredited engineering team for a personalized solar assessment and maximize your Victorian government rebate.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-a-free-quote"
              className="w-full sm:w-auto px-10 py-4 bg-[#171D4D] hover:bg-[#12163d] text-white font-extrabold text-lg rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Book Your Free Consultation
            </Link>
            <a
              href="tel:1300897221"
              className="w-full sm:w-auto px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-lg rounded-full border border-white/40 transition-all duration-300"
            >
              Call 1300 897 221
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
