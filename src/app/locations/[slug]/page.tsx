import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllSuburbs, getSuburbBySlug } from '@/data/locations';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const suburbs = getAllSuburbs();
  return suburbs.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const suburb = getSuburbBySlug(params.slug);
  if (!suburb) {
    return {
      title: 'Location Not Found | Billabong Solar',
    };
  }

  return {
    title: suburb.metaTitle,
    description: suburb.metaDescription,
    alternates: {
      canonical: `/locations/${suburb.slug}`,
    },
    openGraph: {
      title: suburb.metaTitle,
      description: suburb.metaDescription,
      type: 'website',
    },
  };
}

export default function SuburbLocationPage({ params }: Props) {
  const suburb = getSuburbBySlug(params.slug);

  if (!suburb) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Residential Solar and Battery Installation',
    name: `Solar and Battery Systems in ${suburb.name}`,
    description: suburb.metaDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Billabong Solar',
      telephone: '1300 897 221',
      address: {
        '@type': 'PostalAddress',
        addressLocality: suburb.servicingOffice === 'Scoresby' ? 'Scoresby' : 'Cobblebank',
        addressRegion: 'Victoria',
        addressCountry: 'AU',
      },
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${suburb.name} VIC ${suburb.postcode}`,
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: suburb.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#171D4D] via-[#242C7D] to-[#1C2366] text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#FF5E00]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          {/* Breadcrumb & Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-xs sm:text-sm font-semibold">
            <Link href="/locations" className="text-gray-300 hover:text-white transition">
              Service Areas
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-orange-300">{suburb.region}</span>
            <span className="text-gray-400">/</span>
            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-orange-200 border border-white/20">
              {suburb.name} {suburb.postcode}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black mb-6 text-white tracking-tight leading-tight">
            {suburb.heroHeadline}
          </h1>

          <p className="text-base sm:text-xl mb-10 max-w-2xl mx-auto text-gray-200 leading-relaxed font-light">
            {suburb.heroSubheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/get-a-free-quote?suburb=${encodeURIComponent(suburb.name)}&postcode=${suburb.postcode}`}
              className="w-full sm:w-auto inline-block bg-[#FF5E00] hover:bg-orange-600 text-white font-extrabold py-4 px-10 rounded-full text-base sm:text-lg transition duration-300 shadow-xl"
            >
              Get a Free {suburb.name} Quote →
            </Link>
            <a
              href="tel:1300897221"
              className="w-full sm:w-auto inline-block bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold py-4 px-8 rounded-full text-base sm:text-lg border border-white/30 transition duration-300"
            >
              Call 1300 897 221
            </a>
          </div>
        </div>
      </section>

      {/* Local Solar Radiation & Performance Fact Box */}
      <section className="bg-slate-100 border-b border-gray-200 py-6">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-sm">
            <div className="p-4 bg-white rounded-xl shadow-xs border border-gray-200">
              <span className="text-xs text-gray-500 uppercase tracking-wider block font-bold mb-1">
                Annual Solar Yield
              </span>
              <strong className="text-xl text-[#171D4D]">~{suburb.solarYieldDailyAvg} kWh / kW</strong>
              <p className="text-[11px] text-gray-500 mt-1">Daily average (EU PVGIS model, 1 kW north at 30°)</p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-xs border border-gray-200">
              <span className="text-xs text-gray-500 uppercase tracking-wider block font-bold mb-1">
                Summer Generation Peak
              </span>
              <strong className="text-xl text-[#FF5E00]">&gt;{suburb.summerYieldDailyAvg} kWh / kW</strong>
              <p className="text-[11px] text-gray-500 mt-1">Daily average during sunny summer months</p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-xs border border-gray-200">
              <span className="text-xs text-gray-500 uppercase tracking-wider block font-bold mb-1">
                Servicing Hub
              </span>
              <strong className="text-xl text-[#171D4D]">{suburb.servicingOffice} Office</strong>
              <p className="text-[11px] text-gray-500 mt-1">Prompt local site surveys & after-sales care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Lead Angle Heading */}
          <div className="mb-8">
            <div className="inline-block px-3.5 py-1 rounded-full bg-orange-50 text-[#FF5E00] text-xs font-bold uppercase tracking-wider mb-3 border border-orange-200">
              Local Perspective: {suburb.leadAngle}
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#171D4D] tracking-tight">
              Engineering Solar for {suburb.name} Homes
            </h2>
          </div>

          {/* Narrative Paragraphs (400+ words) */}
          <div className="space-y-6 text-gray-700 leading-relaxed text-base md:text-lg">
            {suburb.mainContentParagraphs.map((para, pIdx) => (
              <p key={pIdx}>{para}</p>
            ))}
          </div>

          {/* Localized Focus Highlights */}
          <div className="my-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {suburb.localFocusHighlights.map((hl, hIdx) => (
              <div key={hIdx} className="bg-slate-50 p-6 rounded-2xl border border-gray-200">
                <h3 className="font-bold text-base text-[#171D4D] mb-2">{hl.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{hl.description}</p>
              </div>
            ))}
          </div>

          {/* Australian Consumer Law & Local Reference Commitment */}
          <div className="p-8 rounded-2xl bg-orange-50/70 border border-orange-200 text-gray-800 my-12">
            <h3 className="text-lg font-bold text-[#171D4D] mb-2 flex items-center gap-2">
              <span>🛡️</span> Our Commitment Under Australian Consumer Law
            </h3>
            <p className="text-sm leading-relaxed text-gray-700 mb-4">
              We sell trust first. Under Australian Consumer Law and our NETCC Approved Seller charter, we only state what is genuine and verifiable. Where we have installed systems in {suburb.name}, we will happily connect you with local customer references upon request. Where your project requires a custom engineering solution, our dedicated technical staff from our <strong>{suburb.servicingOffice} office</strong> will survey your property in person with zero sales pressure.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-600">
              <span className="flex items-center gap-1.5 text-green-700">✓ In-House Accredited Engineers</span>
              <span className="flex items-center gap-1.5 text-green-700">✓ No Aggressive Door-to-Door Sales</span>
              <span className="flex items-center gap-1.5 text-green-700">✓ Local References Available</span>
            </div>
          </div>

          {/* FAQs */}
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#171D4D] mb-8 text-center">
              Frequently Asked Questions for {suburb.name}
            </h2>
            <div className="space-y-6">
              {suburb.faqs.map((faq, fIdx) => (
                <div key={fIdx} className="p-6 bg-slate-50 rounded-2xl border border-gray-200">
                  <h3 className="font-bold text-base md:text-lg text-[#171D4D] mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Free Quote Banner */}
      <section className="py-20 bg-gradient-to-r from-[#FF5E00] to-orange-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Request an Obligation-Free Quote for Your {suburb.name} Home
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/95">
            Getting a quote costs nothing and commits you to nothing. Enquire here and one of our engineers will look at your roof and electricity bills and tell you honestly what makes sense.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/get-a-free-quote?suburb=${encodeURIComponent(suburb.name)}&postcode=${suburb.postcode}`}
              className="w-full sm:w-auto inline-block bg-[#171D4D] hover:bg-[#101438] text-white font-extrabold py-4 px-10 rounded-full text-lg shadow-2xl transition duration-300"
            >
              Start Free Assessment →
            </Link>
            <Link
              href="/locations"
              className="w-full sm:w-auto inline-block bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full text-lg border border-white/40 transition duration-300"
            >
              ← Back to Service Areas
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
