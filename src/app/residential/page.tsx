import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Residential Solar Panels Melbourne & Victoria | Tier-1 Solar Installation | Billabong Solar',
  description:
    'Power your Melbourne home with premium Tier-1 residential solar panels and inverters. 10kW to 20kW custom systems, NETCC approved solar seller, licensed A-Grade electricians, 25-year warranties, and $1,400 Solar Victoria rebates.',
  keywords: [
    'residential solar panels melbourne',
    'residential solar victoria',
    'home solar system packages victoria',
    '10kw solar system victoria',
    '13.2kw solar system victoria',
    '20kw solar system melbourne',
    'best home solar installer melbourne',
    'netcc approved residential solar',
  ],
  alternates: {
    canonical: '/residential',
  },
  openGraph: {
    title: 'Residential Solar Installation Melbourne & Victoria | Billabong Solar',
    description: 'Slash your electricity bills with Tier-1 residential solar packages. Claim up to $2,800 in Victorian rebates & loans.',
    url: 'https://billabongsolar.com.au/residential',
    type: 'website',
  },
};

const packages = [
  {
    size: '10.0 kW System',
    idealFor: 'Medium to Large Family Homes with High Day & Night Usage',
    panels: '22-24 x Tier-1 Monocrystalline Panels (440W-450W)',
    inverter: '8.0 kW – 8.5 kW Smart Hybrid Inverter (GoodWe / Sigenergy)',
    generation: 'Approx. 38 - 45 kWh / day average',
    savings: 'Save $2,000 – $2,800 / year on power bills',
    badge: 'Most Popular',
  },
  {
    size: '13.2 kW System',
    idealFor: 'Large 3-Phase Victorian Homes, Ducted AC, EVs & Pools',
    panels: '30 x Tier-1 High-Output Panels (440W-450W)',
    inverter: '10.0 kW 3-Phase Smart Hybrid Inverter',
    generation: 'Approx. 50 - 60 kWh / day average',
    savings: 'Save $2,800 – $4,000 / year on power bills',
    badge: 'Best Value',
  },
  {
    size: '20.0 kW System',
    idealFor: 'Executive Residences, High-Demand Estates & Acreage Properties',
    panels: '44-46 x Tier-1 Commercial-Grade Monocrystalline Panels',
    inverter: '15.0 kW – 20.0 kW 3-Phase Smart Inverter',
    generation: 'Approx. 76 - 90 kWh / day average',
    savings: 'Save $4,500 – $6,500+ / year on power bills',
    badge: 'Maximum',
  },
];

export default function ResidentialSolarPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Residential Solar Panel Systems Victoria',
    description: 'Tailored 10kW, 13.2kW, and 20kW residential solar panel systems with Tier-1 panels and 25-year performance warranty.',
    brand: {
      '@type': 'Brand',
      name: 'Billabong Solar',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'AUD',
      lowPrice: '3800',
      highPrice: '14500',
      offerCount: '3',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#171D4D] via-[#1E2560] to-[#0E1338] text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-orange-500/15 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold text-blue-200/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-[#FF5E00]">›</span>
            <span className="text-orange-300">Residential Solar</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-[#FF8A3D] text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-5">
              <span>★ Premium Residential Solar Victoria</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6">
              Clean, Reliable Solar Energy for <span className="text-[#FF5E00]">Melbourne Homes</span>
            </h1>

            <p className="text-blue-100/90 text-base sm:text-lg leading-relaxed mb-8">
              Protect your family against escalating Victorian electricity tariffs. Billabong Solar engineers customized rooftop solar systems using Tier-1 photovoltaic panels and NETCC approved seller installation standards.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/get-a-free-quote?type=home"
                className="bg-gradient-to-r from-[#FF5E00] to-[#FF7A00] hover:from-[#e55400] hover:to-[#ff6d00] text-white font-extrabold px-8 py-4 rounded-full text-base transition-all shadow-lg shadow-orange-500/30 hover:scale-105"
              >
                Get a Free Home Solar Quote
              </Link>
              <Link
                href="/solar-rebates-victoria"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-4 rounded-full text-base transition-colors flex items-center gap-2"
              >
                <span>Check $2,800 Rebate</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Residential Packages */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#FF5E00] font-extrabold text-xs uppercase tracking-wider block mb-2">
              Engineered for Victoria
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#171D4D] mb-4">
              Tailored Residential Solar System Packages
            </h2>
            <p className="text-gray-600 text-base">
              Every roof is unique. Here are the three most popular systems installed across Melbourne and Victoria:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-md hover:shadow-xl transition-shadow flex flex-col relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-[#FF5E00] text-white text-[11px] font-black uppercase tracking-wider px-4 py-1.5 rounded-bl-2xl">
                  {pkg.badge}
                </div>

                <h3 className="text-2xl font-black text-[#171D4D] mb-2 mt-2">
                  {pkg.size}
                </h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
                  {pkg.idealFor}
                </p>

                <div className="space-y-4 mb-8 text-sm text-gray-700 flex-grow">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-xs font-bold text-gray-500 block">Panels</span>
                    <span className="font-semibold text-slate-800">{pkg.panels}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-xs font-bold text-gray-500 block">Inverter</span>
                    <span className="font-semibold text-slate-800">{pkg.inverter}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-xs font-bold text-gray-500 block">Estimated Output</span>
                    <span className="font-semibold text-slate-800">{pkg.generation}</span>
                  </div>
                  <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl">
                    <span className="text-xs font-bold text-emerald-700 block">Annual Savings</span>
                    <span className="font-extrabold text-emerald-800">{pkg.savings}</span>
                  </div>
                </div>

                <Link
                  href="/get-a-free-quote?type=home"
                  className="block text-center w-full py-3.5 rounded-xl font-extrabold text-white bg-gradient-to-r from-[#FF5E00] to-[#FF7A00] shadow-md hover:shadow-lg transition-all"
                >
                  Quote This System
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Billabong Solar for Your Home */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#FF5E00] font-extrabold text-xs uppercase tracking-wider block mb-2">
                The Billabong Difference
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#171D4D] mb-6 leading-snug">
                Why Victorian Families Choose Billabong Solar
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We believe in transparent engineering without high-pressure sales tactics. All installations are managed under strict NETCC Approved Seller standards by licensed A-Grade electricians.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-[#FF5E00] flex items-center justify-center font-bold flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Tier-1 Monocrystalline Panels Only</h4>
                    <p className="text-sm text-gray-600">High-efficiency anti-reflective panels with 25-year performance warranties.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-[#FF5E00] flex items-center justify-center font-bold flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">NETCC Approved Solar Seller</h4>
                    <p className="text-sm text-gray-600">A NETCC approved solar seller is a business that follows the New Energy Tech Consumer Code, which sets high standards for honest sales, clear contracts, and consumer protection in Australia.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-[#FF5E00] flex items-center justify-center font-bold flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Battery-Ready Architecture</h4>
                    <p className="text-sm text-gray-600">Seamlessly connect leading Sigenergy, GoodWe, Alpha ESS, or ESY Sunhome battery storage whenever you are ready.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[420px] bg-slate-100 border border-gray-100">
              <Image
                src="/images/blog/post-1-best-installers.jpg"
                alt="Accredited Solar Electrician Installing Solar Panels in Victoria"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-[#171D4D] via-[#1E2560] to-[#171D4D] text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Ready to Cut Your Victorian Power Bills?
          </h2>
          <p className="text-blue-100 text-base mb-8 max-w-2xl mx-auto">
            Get a tailored roof layout design and accurate payback estimate for your home within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/get-a-free-quote?type=home"
              className="bg-[#FF5E00] hover:bg-orange-600 text-white font-extrabold px-8 py-4 rounded-full text-base transition-all shadow-lg hover:scale-105"
            >
              Get a Free Solar Quote
            </Link>
            <a
              href="tel:1300897221"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-full text-base transition-colors"
            >
              Call 1300 897 221
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
