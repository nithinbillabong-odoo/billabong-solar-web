import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCommercialIndustries } from '@/data/commercialIndustries';

export const metadata: Metadata = {
  title: 'Commercial Solar and Battery Systems for Victorian Businesses | Billabong Solar',
  description: 'Commercial solar and batteries sized to what your business actually uses. Most systems pay for themselves in around 3 to 4 years. Free site assessment from accredited engineers.',
  alternates: {
    canonical: '/commercial',
  },
  openGraph: {
    title: 'Commercial Solar and Battery Systems for Victorian Businesses | Billabong Solar',
    description: 'Commercial solar and batteries sized to what your business actually uses. Most systems pay for themselves in around 3 to 4 years. Free site assessment.',
    images: [
      {
        url: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Victoria-Commerical-Solar-Solutions-Get-A-Quote.jpg?fit=901%2C723&ssl=1',
        width: 901,
        height: 723,
        alt: 'Commercial solar system installed by Billabong Solar on a Melbourne factory roof',
      },
    ],
  },
};

export default function CommercialSolarHubPage() {
  const industries = getAllCommercialIndustries();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Commercial Solar and Battery Installation",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Billabong Solar",
      "telephone": "1300 897 221",
      "email": "info@billabongsolar.com.au",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Scoresby / Cobblebank Hubs",
        "addressRegion": "Victoria",
        "addressCountry": "AU"
      }
    },
    "areaServed": "Victoria, Australia",
    "description": "Commercial solar and battery storage systems sized to what your business actually uses with typical 3 to 4 year payback."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#171D4D] via-[#242C7D] to-[#1C2366] text-white py-20 md:py-28 overflow-hidden shadow-inner">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#FF5E00]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold text-orange-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF5E00] animate-pulse" />
            Engineered Commercial Energy Solutions
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 text-white tracking-tight leading-tight">
            Commercial Solar & Battery Systems for Victorian Businesses
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-gray-200 leading-relaxed font-light">
            Electricity is one of the few business costs that keeps rising no matter how well you run things. Most businesses use the bulk of their power during daylight hours, which is exactly when solar produces it. Sized to your actual daytime load with typical payback in <strong>3 to 4 years</strong>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-a-free-quote?type=commercial"
              className="w-full sm:w-auto inline-block bg-[#FF5E00] hover:bg-orange-600 text-white font-extrabold py-4 px-10 rounded-full text-lg transition duration-300 shadow-xl transform hover:-translate-y-0.5"
            >
              Book Free Site Assessment →
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

      {/* Featured Installation Hero Shot */}
      <section className="py-12 bg-slate-50 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 aspect-[16/7] w-full">
            <Image
              src="https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Slider_Commercial-Victoria-Slide1-1-1.webp?w=1200&ssl=1"
              alt="Commercial solar system installed by Billabong Solar on a Melbourne factory roof"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent flex items-end p-6 md:p-10">
              <div className="text-white max-w-2xl">
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#FF5E00] bg-white/15 backdrop-blur-md px-3 py-1 rounded-full inline-block mb-2">
                  Scoresby & Regional Hubs
                </span>
                <h2 className="text-xl md:text-3xl font-extrabold leading-snug">
                  Commercial Roof Arrays Engineered Around Real Daytime Loads
                </h2>
                <p className="text-sm md:text-base text-gray-300 mt-2 hidden sm:block">
                  Sized to replace peak-rate grid electricity rather than chasing inflated sales targets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Positioning: How We Work */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3.5 py-1 rounded-full bg-orange-100 text-[#FF5E00] text-xs font-bold uppercase tracking-wider mb-4">
                Engineering First
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#171D4D] leading-tight mb-6">
                Why Commercial Solar Pays for Itself in 3 to 4 Years
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-base">
                <p>
                  The first question most business owners ask is how long it takes to pay for itself. For most of the businesses we work with across Victoria, it is <strong>around 3 to 4 years</strong>.
                </p>
                <p>
                  The reason is simple: <strong>we size every system to what your business actually uses during the day</strong>, not to fill the roof or hit an installer quota. A system sized to your load means almost every kilowatt-hour it produces replaces power you would otherwise purchase at peak commercial grid rates.
                </p>
                <p>
                  Where it makes sense, we add battery storage to cover evening operations, reduce high demand charges, or keep critical equipment running during outages. Eligible businesses may also benefit from the federal battery rebate on qualifying systems.
                </p>
                <p className="font-semibold text-[#171D4D]">
                  We are engineers first. We inspect your interval data, your switchboard, your roof, and your operating hours before we recommend anything, and we look after the system properly once it is running.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/get-a-free-quote?type=commercial"
                  className="bg-[#171D4D] hover:bg-[#101438] text-white font-bold px-7 py-3 rounded-full transition shadow-md"
                >
                  Request Feasibility Analysis
                </Link>
                <a
                  href="#industry-solutions"
                  className="bg-orange-50 hover:bg-orange-100 text-[#FF5E00] font-bold px-7 py-3 rounded-full transition border border-orange-200"
                >
                  Explore Industry Solutions ↓
                </a>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 aspect-[4/3] w-full">
              <Image
                src="https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Victoria-Commerical-Solar-Solutions-Get-A-Quote.jpg?fit=901%2C723&ssl=1"
                alt="Billabong Solar engineer reviewing a commercial solar design with a business owner"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 backdrop-blur-sm p-4 text-white text-xs">
                <span className="font-bold text-orange-400">On-Site Engineering:</span> Detailed switchboard and interval data audits before any proposal is issued.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions Navigation */}
      <section id="industry-solutions" className="py-20 bg-slate-50 border-t border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-[#FF5E00] font-bold text-xs uppercase tracking-widest bg-orange-100 px-3.5 py-1 rounded-full">
              Tailored by Sector
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-[#171D4D] tracking-tight">
              Commercial Solar by Industry
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mt-3">
              Because business owners search by what they operate, our commercial systems are purpose-engineered for your sector’s unique electrical loads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((ind) => (
              <div
                key={ind.slug}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-200/80 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FF5E00] bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                      {ind.heroBadge}
                    </span>
                    <span className="text-sm font-semibold text-gray-400">3-4 Year Payback</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#171D4D] group-hover:text-[#FF5E00] transition mb-3">
                    {ind.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {ind.heroDescription}
                  </p>

                  <div className="space-y-2 mb-6 border-t border-gray-100 pt-4">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Key Engineering Focus:</div>
                    {ind.keyHighlights.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                        <span className="text-[#FF5E00] font-bold mt-0.5">•</span>
                        <span><strong>{item.title}:</strong> {item.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <Link
                    href={`/commercial/${ind.slug}`}
                    className="inline-flex items-center justify-between w-full font-bold text-sm text-[#171D4D] group-hover:text-[#FF5E00] transition"
                  >
                    <span>View Industry Solution & Case Study</span>
                    <span className="transform group-hover:translate-x-1 transition">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Regions for Commercial Work */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#171D4D]">
              Where We Deliver Commercial Installations
            </h2>
            <p className="text-gray-600 text-sm max-w-xl mx-auto mt-2">
              Serviced directly from our <strong>Scoresby head office</strong> and <strong>Cobblebank regional centre</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div className="bg-slate-50 p-5 rounded-xl border border-gray-200">
              <h4 className="font-bold text-[#171D4D] mb-1">Melbourne East & South-East</h4>
              <p className="text-xs text-gray-500 mb-2">Scoresby, Knoxfield, Bayswater, Mulgrave, Dandenong South</p>
              <p className="text-xs text-gray-600">Tilt-up factories, low-pitch metal roofs, logistics hubs.</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-gray-200">
              <h4 className="font-bold text-[#171D4D] mb-1">Western Logistics Corridors</h4>
              <p className="text-xs text-gray-500 mb-2">Derrimut, Laverton North, Cobblebank surrounding</p>
              <p className="text-xs text-gray-600">High-volume distribution centres, wide flat roofs, heavy daytime loads.</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-gray-200">
              <h4 className="font-bold text-[#171D4D] mb-1">Regional Central & West</h4>
              <p className="text-xs text-gray-500 mb-2">Ararat, Ballarat, Bendigo, Kyneton, Macedon Ranges</p>
              <p className="text-xs text-gray-600">Agribusiness, cool rooms, shearing sheds, ground arrays, diesel replacement.</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-gray-200">
              <h4 className="font-bold text-[#171D4D] mb-1">Bellarine & Coast</h4>
              <p className="text-xs text-gray-500 mb-2">Drysdale, Portarlington, Bellarine Hinterland</p>
              <p className="text-xs text-gray-600">Vineyards, cellar doors, aquaculture, rural trade facilities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Site Assessment CTA */}
      <section className="py-20 bg-gradient-to-r from-[#FF5E00] to-orange-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Get Straight Answers on Your Business Energy
          </h2>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-white/95">
            Ask us for references from businesses like yours. A site assessment is free and there is zero obligation. Enquire here and we will tell you straight whether solar makes financial sense for your business.
          </p>
          <p className="text-xs text-orange-200 max-w-xl mx-auto mb-10">
            *Typical payback is around 3 to 4 years for most businesses, strictly tied to sizing the system to your verified daytime load, and always framed as typical, not guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-a-free-quote?type=commercial"
              className="w-full sm:w-auto inline-block bg-[#171D4D] hover:bg-[#101438] text-white font-extrabold py-4 px-10 rounded-full text-lg shadow-2xl transition duration-300"
            >
              Request Free Commercial Assessment →
            </Link>
            <a
              href="tel:1300897221"
              className="w-full sm:w-auto inline-block bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full text-lg border border-white/40 transition duration-300"
            >
              Speak to an Engineer: 1300 897 221
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
