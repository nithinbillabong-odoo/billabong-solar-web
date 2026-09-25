import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllCommercialIndustries,
  getCommercialIndustryBySlug,
} from '@/data/commercialIndustries';

interface Props {
  params: {
    industry: string;
  };
}

export async function generateStaticParams() {
  const industries = getAllCommercialIndustries();
  return industries.map((ind) => ({
    industry: ind.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = getCommercialIndustryBySlug(params.industry);
  if (!industry) {
    return {
      title: 'Commercial Industry Not Found | Billabong Solar',
    };
  }

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    alternates: {
      canonical: `/commercial/${industry.slug}`,
    },
    openGraph: {
      title: industry.metaTitle,
      description: industry.metaDescription,
      type: 'website',
    },
  };
}

export default function CommercialIndustryPage({ params }: Props) {
  const industry = getCommercialIndustryBySlug(params.industry);

  if (!industry) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: industry.h1,
    description: industry.metaDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Billabong Solar',
      telephone: '1300 897 221',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Victoria',
        addressCountry: 'AU',
      },
    },
    areaServed: 'Victoria, Australia',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: industry.commonQuestions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-orange-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF5E00] animate-pulse" />
            {industry.heroBadge}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-white tracking-tight leading-tight">
            {industry.h1}
          </h1>
          <p className="text-base sm:text-xl mb-10 max-w-2xl mx-auto text-gray-200 leading-relaxed font-light">
            {industry.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/get-a-free-quote?type=commercial&industry=${encodeURIComponent(industry.title)}`}
              className="w-full sm:w-auto inline-block bg-[#FF5E00] hover:bg-orange-600 text-white font-extrabold py-4 px-10 rounded-full text-base sm:text-lg transition duration-300 shadow-xl"
            >
              Get Free Site Assessment →
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

      {/* Key Highlights Grid */}
      <section className="py-16 bg-slate-50 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industry.keyHighlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg text-[#171D4D] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Industry Sections */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {industry.contentSections.map((sec, idx) => (
            <div key={idx} className="mb-14">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#171D4D] mb-6 tracking-tight">
                {sec.heading}
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-base">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </div>
          ))}

          {/* Case Studies Updating Soon Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-[#171D4D] text-white p-8 rounded-2xl my-12 border border-slate-800 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5E00] animate-pulse" />
              Verified Case Studies • Updating Soon
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Real Project Case Studies Coming Soon
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              We are currently finalizing verified job data, customer permissions, and site photography for recent <strong>{industry.title}</strong> installations across Victoria.
            </p>
            <div className="p-4 bg-white/10 rounded-xl border border-white/10 text-sm leading-relaxed text-gray-200 space-y-2">
              <div>
                <strong className="text-white">Typical System Sizes: </strong>
                {industry.caseStudyPlaceholder.typicalSize}
              </div>
              <div>
                <strong className="text-white">Typical Measured Impact: </strong>
                {industry.caseStudyPlaceholder.outcome}
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4 italic">
              *Under Australian Consumer Law and our NETCC Approved Seller charter, we only publish verified job data with explicit client consent. In the meantime, our engineering team can provide direct local business references upon request.
            </p>
          </div>

          {/* Target Locations */}
          <div className="bg-orange-50 border border-orange-200/80 rounded-2xl p-6 sm:p-8 mb-12">
            <h3 className="text-lg font-bold text-[#171D4D] mb-2">
              Primary Victorian Delivery Locations
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              We engineer and deliver installations for this sector across key commercial centres serviced by our Scoresby and Cobblebank hubs:
            </p>
            <div className="flex flex-wrap gap-2">
              {industry.targetLocations.map((loc, lIdx) => (
                <span
                  key={lIdx}
                  className="bg-white text-[#171D4D] font-semibold text-xs px-3 py-1.5 rounded-full border border-orange-200 shadow-xs"
                >
                  📍 {loc}
                </span>
              ))}
            </div>
          </div>

          {/* Common Questions */}
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#171D4D] mb-8 text-center">
              Common Questions for {industry.title}
            </h2>
            <div className="space-y-6">
              {industry.commonQuestions.map((q, qIdx) => (
                <div
                  key={qIdx}
                  className="p-6 bg-slate-50 rounded-2xl border border-gray-200"
                >
                  <h3 className="font-bold text-base md:text-lg text-[#171D4D] mb-2">
                    {q.question}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {q.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conversion CTA */}
      <section className="py-20 bg-gradient-to-r from-[#FF5E00] to-orange-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Request an Obligation-Free Site Assessment
          </h2>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-white/95">
            Our engineers will inspect your interval data, switchboard, and roof structure to provide an unvarnished commercial proposal.
          </p>
          <p className="text-xs text-orange-200 max-w-xl mx-auto mb-10">
            *Typical payback is around 3 to 4 years for most businesses, strictly tied to sizing the system to your verified daytime load, and always framed as typical, not guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/get-a-free-quote?type=commercial&industry=${encodeURIComponent(industry.title)}`}
              className="w-full sm:w-auto inline-block bg-[#171D4D] hover:bg-[#101438] text-white font-extrabold py-4 px-10 rounded-full text-lg shadow-2xl transition duration-300"
            >
              Get Free Proposal →
            </Link>
            <Link
              href="/commercial"
              className="w-full sm:w-auto inline-block bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full text-lg border border-white/40 transition duration-300"
            >
              ← Back to All Commercial Sectors
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
