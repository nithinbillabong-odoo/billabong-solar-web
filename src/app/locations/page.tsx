import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllSuburbs, SuburbData } from '@/data/locations';

export const metadata: Metadata = {
  title: 'Service Areas & Victorian Target Suburbs | Billabong Solar',
  description: 'Explore Billabong Solar installation areas across Melbourne East, Mornington Peninsula, Geelong, Bellarine, Ballarat, Bendigo, and Central Victoria.',
  alternates: {
    canonical: '/locations',
  },
};

export default function LocationsDirectoryPage() {
  const allSuburbs = getAllSuburbs();

  // Group by region
  const regions: { [key: string]: SuburbData[] } = {
    'Melbourne East (Scoresby Hub)': allSuburbs.filter((s) => s.region === 'Melbourne East'),
    'Mornington Peninsula': allSuburbs.filter((s) => s.region === 'Mornington Peninsula'),
    'Geelong & the Bellarine': allSuburbs.filter((s) => s.region === 'Geelong & Bellarine'),
    'Ballarat & Central Victoria': allSuburbs.filter((s) => s.region === 'Ballarat & Central'),
    'Bendigo': allSuburbs.filter((s) => s.region === 'Bendigo'),
    'Macedon Ranges': allSuburbs.filter((s) => s.region === 'Macedon Ranges'),
    'Ararat & Rural West': allSuburbs.filter((s) => s.region === 'Ararat'),
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#171D4D] via-[#242C7D] to-[#1C2366] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-orange-300 text-xs sm:text-sm font-semibold mb-4 border border-white/20">
            Localised Solar Engineering
          </div>
          <h1 className="text-3xl sm:text-5xl font-black mb-6 tracking-tight">
            Victorian Service Areas & Target Suburbs
          </h1>
          <p className="text-base sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
            Billabong Solar operates from our primary engineering headquarters in <strong>Scoresby</strong> and our regional support centre in <strong>Cobblebank</strong>. Explore our dedicated suburb pages for local solar yields, grid characteristics, and tailored engineering solutions.
          </p>
        </div>
      </section>

      {/* Directory Content */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="space-y-16">
            {Object.entries(regions).map(([regionName, suburbs]) => (
              <div key={regionName} className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5 mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#171D4D]">
                      {regionName}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Serviced by: <strong className="text-gray-800">{suburbs[0]?.servicingOffice} Office</strong> • Solar Yield: ~{suburbs[0]?.solarYieldDailyAvg} kWh/kW/day
                    </p>
                  </div>
                  <span className="self-start sm:self-auto text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-orange-100 text-[#FF5E00]">
                    {suburbs.length} Focus {suburbs.length === 1 ? 'Area' : 'Areas'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suburbs.map((suburb) => (
                    <Link
                      key={suburb.slug}
                      href={`/locations/${suburb.slug}`}
                      className="group p-5 rounded-2xl border border-gray-100 bg-slate-50 hover:bg-orange-50/40 hover:border-orange-200 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg text-[#171D4D] group-hover:text-[#FF5E00] transition">
                            {suburb.name} <span className="text-xs font-normal text-gray-500">({suburb.postcode})</span>
                          </h3>
                          <span className="text-[11px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
                            {suburb.servicingOffice} Hub
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                          {suburb.heroSubheadline}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs font-semibold text-[#171D4D] group-hover:text-[#FF5E00] pt-2 border-t border-gray-200/50">
                        <span>View local solar guide</span>
                        <span className="transform group-hover:translate-x-1 transition">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Quote Banner */}
      <section className="py-16 bg-gradient-to-r from-[#FF5E00] to-orange-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl sm:text-4xl font-black mb-4">Don’t See Your Specific Suburb?</h2>
          <p className="text-base sm:text-lg text-white/95 mb-8">
            We service established properties and commercial operations across Greater Melbourne and regional Victoria from our Scoresby and Cobblebank offices. Contact us for a free site assessment.
          </p>
          <Link
            href="/get-a-free-quote"
            className="inline-block bg-[#171D4D] hover:bg-[#101438] text-white font-extrabold py-4 px-10 rounded-full text-base sm:text-lg shadow-xl transition"
          >
            Request Free Assessment →
          </Link>
        </div>
      </section>
    </>
  );
}
