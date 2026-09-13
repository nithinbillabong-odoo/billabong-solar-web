import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Complaints Procedure | Billabong Solar Victoria',
  description:
    'Billabong Solar Complaints Handling Procedure. Learn how we record, investigate, and resolve customer feedback within 24 to 48 hours, in strict compliance with the New Energy Tech Consumer Code (NETCC) guidelines.',
  alternates: {
    canonical: '/complaints-procedure',
  },
  openGraph: {
    title: 'Complaints Procedure | Billabong Solar Victoria',
    description:
      'Our transparent, ethical complaints handling procedure and escalation pathways including EWOV and ACCC.',
    url: 'https://billabongsolar.com.au/complaints-procedure',
    type: 'website',
  },
};

export default function ComplaintsProcedurePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Complaints Handling Procedure | Billabong Solar',
    description: 'Complaints procedure and dispute resolution policy for Billabong Solar customers across Victoria.',
    publisher: {
      '@type': 'Organization',
      name: 'Billabong Solar',
      url: 'https://billabongsolar.com.au',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#171D4D] via-[#1E2560] to-[#0E1338] text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-orange-500/15 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold text-blue-200/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-[#FF5E00]">›</span>
            <span className="text-orange-300">Complaints Procedure</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-[#FF8A3D] text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
            <span>★ Consumer Protection & Dispute Resolution</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
            Complaints Handling Procedure
          </h1>

          <p className="text-blue-100/90 text-base sm:text-lg leading-relaxed max-w-3xl">
            At Billabong Solar, we are dedicated to providing the highest quality renewable energy products and customer service. If you have an inquiry or complaint, we handle every issue with transparency, fairness, and prompt responsiveness.
          </p>
        </div>
      </section>

      {/* Main Procedure Content */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 space-y-10">
            
            {/* NETCC Code Commitment Callout */}
            <div className="p-6 rounded-2xl bg-orange-50/80 border border-orange-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FF5E00] text-white flex items-center justify-center font-black flex-shrink-0 text-xl shadow">
                ✓
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-[#171D4D] text-base sm:text-lg mb-1">
                  NETCC Approved Solar Seller Commitment
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  A NETCC approved solar seller is a business that follows the New Energy Tech Consumer Code, which sets high standards for honest sales, clear contracts, and consumer protection in Australia.
                </p>
              </div>
            </div>

            {/* Step-by-Step Procedure */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#171D4D] mb-6">
                Our Complaints Handling Process
              </h2>

              <div className="space-y-6">
                {[
                  {
                    step: '1',
                    title: 'Consumer Notification & Guidance',
                    desc: 'All staff and consumers of Billabong Solar will be advised with each step and actions involved in the handling of each complaint.',
                  },
                  {
                    step: '2',
                    title: 'CRM Logging & Administrative Review',
                    desc: 'All complaints received via email, call, or website from consumers are recorded in our CRM on a regular basis and reviewed immediately by our administration team.',
                  },
                  {
                    step: '3',
                    title: 'Contact Within 24 Hours',
                    desc: 'All complainants are contacted by a member of the administration department within 24 hours of receipt of the complaint, and shall be advised with the tentative time frame required for resolution of the issue depending on the degree of the issue.',
                  },
                  {
                    step: '4',
                    title: 'Investigation Initiated Within 48 Hours',
                    desc: 'All new complaints are actioned, and technical or administrative investigations will begin within 48 hours of receipt of the complaint by all possible means.',
                  },
                  {
                    step: '5',
                    title: 'Resolution Within 21 to 45 Days',
                    desc: 'The feedback of outcome of complaints are provided to the consumer within 21 days of receipt. In circumstances where additional time is required:\n(i) Consumers are informed of the need for more time to complete the investigation.\n(ii) The investigation will be completed within 45 days of receipt of the complaint.',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-[#171D4D] text-white flex items-center justify-center font-black flex-shrink-0 text-base">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#171D4D] text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Independent Arbitrating Bodies */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-black text-[#171D4D] mb-4">
                Independent Arbitrating Bodies
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                If a consumer is dissatisfied with the outcome of a complaint, the consumer can contact the following independent arbitrating bodies:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#FF5E00] uppercase tracking-wider block mb-1">
                      Energy Ombudsman Victoria
                    </span>
                    <h3 className="font-bold text-[#171D4D] text-lg mb-2">The Energy Ombudsman (EWOV)</h3>
                    <p className="text-gray-600 text-xs mb-4">
                      Independent dispute resolution service for Victorian energy consumers.
                    </p>
                  </div>
                  <div className="space-y-1 text-sm pt-4 border-t border-gray-100">
                    <p>
                      <strong>Phone:</strong>{' '}
                      <a href="tel:1800500509" className="text-[#FF5E00] font-bold hover:underline">
                        1800 500 509
                      </a>
                    </p>
                    <p>
                      <strong>Website:</strong>{' '}
                      <a
                        href="https://www.ewov.com.au/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        www.ewov.com.au/contact
                      </a>
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#FF5E00] uppercase tracking-wider block mb-1">
                      Consumer Protection
                    </span>
                    <h3 className="font-bold text-[#171D4D] text-lg mb-2">Australian Consumer Affairs (ACCC)</h3>
                    <p className="text-gray-600 text-xs mb-4">
                      National consumer protection and fair trading commission under Australian Consumer Law.
                    </p>
                  </div>
                  <div className="space-y-1 text-sm pt-4 border-t border-gray-100">
                    <p>
                      <strong>Phone:</strong>{' '}
                      <a href="tel:1300302502" className="text-[#FF5E00] font-bold hover:underline">
                        1300 302 502
                      </a>
                    </p>
                    <p>
                      <strong>Website:</strong>{' '}
                      <a
                        href="https://www.accc.gov.au/contact-us"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        www.accc.gov.au/contact-us
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact & Locations */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-xl sm:text-2xl font-black text-[#171D4D] mb-4">
                How to Lodge a Complaint with Billabong Solar
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm">
                <div>
                  <h4 className="font-bold text-[#171D4D] mb-1">Head Office</h4>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Suite 029 Waterman Caribbean Park<br />
                    44 Lakeview Drive, Scoresby VIC 3179
                  </p>
                  <h4 className="font-bold text-[#171D4D] mb-1">Gippsland Office</h4>
                  <p className="text-gray-600 leading-relaxed">
                    34-38 MacFarlane Street<br />
                    Heyfield, Victoria 3858
                  </p>
                </div>

                <div className="space-y-3 sm:border-l sm:border-slate-200 sm:pl-6">
                  <div>
                    <span className="text-xs font-bold text-gray-500 block">Phone</span>
                    <a href="tel:1300897221" className="text-[#FF5E00] font-bold text-base hover:underline">
                      1300 897 221
                    </a>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-500 block">Email for Complaints</span>
                    <a href="mailto:admin@billabongsolar.com.au" className="text-[#171D4D] font-semibold hover:underline block">
                      admin@billabongsolar.com.au
                    </a>
                    <a href="mailto:info@billabongsolar.com.au" className="text-[#171D4D] font-semibold hover:underline block">
                      info@billabongsolar.com.au
                    </a>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-500 block">Operating Hours</span>
                    <p className="text-gray-600">Mon - Fri: 8:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Disclaimer */}
            <div className="pt-6 border-t border-gray-100 text-xs text-gray-500 leading-relaxed space-y-2">
              <h3 className="font-bold text-gray-700 uppercase tracking-wider">Disclaimer</h3>
              <p>
                Please note that the views expressed on this website are that of Billabong Solar only. This may not reflect the views of others in the market, and these views may not be applicable to all residents of Australia or in other countries. None of the material utilised here may be reproduced, quoted or discussed by any third party without the written consent from Billabong Solar. Doing so is a violation of Copyright permissions and will be treated as such. While every effort has been taken to ensure the accuracy of the content is maintained, errors may have crept into it. Billabong Solar is happy to receive all criticism and corrective comments by email at{' '}
                <a href="mailto:info@billabongsolar.com.au" className="text-[#FF5E00] underline font-semibold">
                  info@billabongsolar.com.au
                </a>.
              </p>
            </div>

            {/* Back link */}
            <div className="pt-4 flex items-center justify-between">
              <Link
                href="/contact-us"
                className="text-[#FF5E00] hover:text-[#e55400] font-bold text-sm inline-flex items-center gap-1"
              >
                <span>← Back to Contact Us</span>
              </Link>
              <a
                href="/docs/new-energy-tech-consumer-code.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#171D4D] hover:text-[#FF5E00] font-semibold text-xs inline-flex items-center gap-1"
              >
                <span>View Code of Conduct (PDF) ↗</span>
              </a>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
