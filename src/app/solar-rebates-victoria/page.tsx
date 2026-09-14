import type { Metadata } from 'next';
import Link from 'next/link';
import RebateEligibilityChecker from './RebateEligibilityChecker';

export const metadata: Metadata = {
  title: 'Victorian Solar Rebates 2026: Claim $1,400 Rebate + $1,400 Interest-Free Loan | Billabong Solar',
  description:
    'Claim up to $2,800 under the Solar Victoria Homes Program. Check eligibility criteria for $1,400 solar panel rebate, interest-free loans, and STCs. Billabong Solar handles 100% of your government paperwork.',
  keywords: [
    'solar rebate victoria',
    'solar victoria rebate 2026',
    'solar homes rebate melbourne',
    'interest free solar loan victoria',
    'solar panel rebate victoria eligibility',
    'solar battery rebate vic',
    'victorian energy upgrades solar',
    'solar installer rebate paperwork victoria',
  ],
  alternates: {
    canonical: '/solar-rebates-victoria',
  },
  openGraph: {
    title: 'Victorian Solar Rebates: Claim $1,400 Rebate + $1,400 Loan | Billabong Solar',
    description: 'Slash your solar installation cost by up to $2,800. We handle all Solar Victoria paperwork for Melbourne & VIC homes.',
    url: 'https://billabongsolar.com.au/solar-rebates-victoria',
    type: 'website',
  },
};

const rebateFaqs = [
  {
    q: 'How much is the Victorian Solar Homes rebate in 2026?',
    a: 'Eligible Victorian homeowners can receive up to a $1,400 rebate off the purchase of a residential solar PV system, plus an optional matching $1,400 interest-free loan repaid over 4 years ($29.16/month). Combined, this reduces upfront outlay by $2,800.',
  },
  {
    q: 'Who is eligible for the Solar Victoria rebate?',
    a: 'To qualify, you must be the owner-occupier of an existing property or a home under construction in Victoria with a combined household taxable income of all owners less than $150,000 per year, and a property value under $3,000,000.',
  },
  {
    q: 'Do I have to do the Solar Victoria portal paperwork myself?',
    a: 'No! When you choose Billabong Solar, we handle the technical paperwork and upload your quote directly into the Solar Victoria portal. You simply log in to verify your identity and confirm the application token.',
  },
  {
    q: 'Can I get a rebate for both Solar Panels and Battery Storage?',
    a: "Yes. For solar panels, Solar Victoria offers a $1,400 rebate and $1,400 interest-free loan. While Solar Victoria's standalone $8,800 battery loan is closed to new applicants, homeowners can access the Commonwealth Cheaper Home Batteries scheme, Virtual Power Plant (VPP) export bonuses, and low-rate clean energy financing alongside their solar panel rebate.",
  },
  {
    q: 'Are STC federal discounts included as well?',
    a: 'Yes! Small-scale Technology Certificates (STCs) are a federal incentive that applies to all systems under 100kW regardless of household income. This is stacked directly on top of the Victorian Solar Homes rebate, lowering your net invoice even further.',
  },
];

export default function SolarRebatesVictoriaPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: rebateFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Solar Victoria Rebate Application & Installation',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Billabong Solar',
      telephone: '1300 897 221',
      url: 'https://billabongsolar.com.au',
      areaServed: 'Victoria, Australia',
    },
    description:
      'Full assistance with Solar Victoria $1,400 panel rebate and $1,400 interest-free loan application, combined with NETCC-approved solar installation.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#171D4D] via-[#1E2560] to-[#0D1236] text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-blue-200/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-[#FF5E00]">›</span>
            <span className="text-orange-300">Victorian Solar Rebates</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-[#FF8A3D] text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-5">
              <span>★ Solar Victoria Authorized Partner</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6">
              Claim Up to <span className="text-[#FF5E00]">$2,800</span> in Victorian Solar Rebates & Loans
            </h1>

            <p className="text-blue-100/90 text-base sm:text-lg leading-relaxed mb-8">
              Under the Victorian Government’s <strong>Solar Homes Program</strong>, eligible Melbourne and Victoria homeowners can claim an immediate <strong>$1,400 Solar Panel Rebate</strong> plus a <strong>$1,400 Interest-Free Loan</strong>. We manage the entire portal application so you get the maximum discount with zero hassle.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#checker"
                className="bg-gradient-to-r from-[#FF5E00] to-[#FF7A00] hover:from-[#e55400] hover:to-[#ff6d00] text-white font-extrabold px-8 py-4 rounded-full text-base transition-all shadow-lg shadow-orange-500/30 hover:scale-105"
              >
                Check Eligibility in 30s ↓
              </a>
              <a
                href="tel:1300897221"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-4 rounded-full text-base transition-colors flex items-center gap-2"
              >
                <span>Call 1300 897 221</span>
              </a>
            </div>
          </div>

          {/* 4 Stat Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 pt-8 border-t border-white/10">
            <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-[#FF5E00] block">$1,400</span>
              <span className="text-xs sm:text-sm font-semibold text-gray-200">Solar Panel Rebate</span>
              <p className="text-[11px] text-blue-200/60 mt-1">Direct point-of-sale deduction</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-[#FF5E00] block">$1,400</span>
              <span className="text-xs sm:text-sm font-semibold text-gray-200">Interest-Free Loan</span>
              <p className="text-[11px] text-blue-200/60 mt-1">$29/mo over 4 years ($0 interest)</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-[#FF5E00] block">$1,000</span>
              <span className="text-xs sm:text-sm font-semibold text-gray-200">Hot Water Rebate</span>
              <p className="text-[11px] text-blue-200/60 mt-1">For energy-efficient heat pumps</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-[#FF5E00] block">100%</span>
              <span className="text-xs sm:text-sm font-semibold text-gray-200">Paperwork Managed</span>
              <p className="text-[11px] text-blue-200/60 mt-1">By Billabong Solar specialists</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rebate Eligibility Criteria & Interactive Checker */}
      <section id="checker" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Official 6 Criteria Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-200/80 mb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
              <div>
                <span className="text-[#FF5E00] font-extrabold text-xs uppercase tracking-wider block mb-1">
                  Official Victorian Government Guidelines
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Check If You Are Eligible
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  As a Victorian householder, you could receive a <strong>solar panel (PV) rebate</strong> if:
                </p>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-orange-50 border border-orange-200 text-[#FF5E00] font-black text-xs uppercase tracking-wider whitespace-nowrap">
                Solar Homes Program
              </div>
            </div>

            <ul className="space-y-3.5 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF5E00] flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">✓</span>
                <span>You are the owner-occupier of an existing property or the owner of a home under construction where the system is to be installed.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF5E00] flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">✓</span>
                <span>Combined household taxable income of all owners is <strong>less than $150,000 per year</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF5E00] flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">✓</span>
                <span>Value of the property is under $3 million (for an existing home or when construction is complete).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF5E00] flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">✓</span>
                <span>Property address has not previously received a solar panel (PV) or solar battery rebate under this program.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF5E00] flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">✓</span>
                <span>The property address has not had a solar panel (PV) system installed in the last 10 years.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FF5E00] flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">✓</span>
                <span>You received a Solar Homes rebate and/or loan but have moved house. You can apply for another incentive at your new address as an owner-occupier if the property has not received these rebates before.</span>
              </li>
            </ul>

            <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-500">
              <p>
                You must use an authorised solar retailer and use only eligible products.
              </p>
              <span className="font-bold text-[#171D4D]">Billabong Solar is an Authorised NETCC Approved Seller</span>
            </div>

            {/* NETCC Definition Banner */}
            <div className="mt-5 p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-xs text-[#171D4D] leading-relaxed flex items-center gap-3">
              <span className="text-xl flex-shrink-0">🛡️</span>
              <p>
                <strong>What is a NETCC Approved Solar Seller?</strong> A NETCC approved solar seller is a business that follows the New Energy Tech Consumer Code, which sets high standards for honest sales, clear contracts, and consumer protection in Australia.
              </p>
            </div>
          </div>

          <RebateEligibilityChecker />
        </div>
      </section>

      {/* How the Process Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#FF5E00] font-extrabold text-xs uppercase tracking-wider block mb-2">
              Simple 4-Step Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#171D4D] mb-4">
              How Billabong Solar Handles Your Rebate
            </h2>
            <p className="text-gray-600 text-base">
              You do not have to struggle with complicated government portals. We guide you from quote to activation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#FF5E00] font-black text-xl flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-extrabold text-[#171D4D] text-lg mb-2">Free Site Design</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We assess your roof via high-resolution satellite LiDAR data to create an optimal system design and savings forecast.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#FF5E00] font-black text-xl flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-extrabold text-[#171D4D] text-lg mb-2">Portal Upload</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                As a registered Solar Victoria seller, we submit your official quote directly into the Solar Victoria portal.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#FF5E00] font-black text-xl flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-extrabold text-[#171D4D] text-lg mb-2">Token Verification</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                You receive a verification email from Solar Victoria. Confirm your income and identity with a few clicks to lock in the rebate.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 font-black text-xl flex items-center justify-center mb-4">
                4
              </div>
              <h3 className="font-extrabold text-[#171D4D] text-lg mb-2">Install & Save</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our NETCC approved A-Grade electricians install your Tier-1 system. The $1,400 rebate is deducted straight from your invoice!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Breakdown Table */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-black mb-3">Example 6.6kW System Cost Breakdown</h2>
            <p className="text-gray-300 text-sm">
              See how combining federal STC incentives with Victorian Solar Homes rebates slashes your net investment.
            </p>
          </div>

          <div className="overflow-x-auto bg-slate-800/80 rounded-2xl border border-slate-700 p-2 sm:p-6">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-orange-400 font-bold uppercase text-xs">
                  <th className="p-3">Pricing Component</th>
                  <th className="p-3">Standard Price</th>
                  <th className="p-3">With Solar Victoria Rebate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700 text-gray-200">
                <tr>
                  <td className="p-3 font-semibold">Gross System Value (Tier-1 Panels + Inverter)</td>
                  <td className="p-3">$7,500</td>
                  <td className="p-3">$7,500</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Federal STC Rebate (Point of Sale Discount)</td>
                  <td className="p-3 text-emerald-400">-$2,200</td>
                  <td className="p-3 text-emerald-400">-$2,200</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-orange-300">Victorian Solar Homes Rebate</td>
                  <td className="p-3 text-gray-400">$0</td>
                  <td className="p-3 text-emerald-400 font-bold">-$1,400</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-orange-300">Victorian Interest-Free Loan (Optional)</td>
                  <td className="p-3 text-gray-400">$0</td>
                  <td className="p-3 text-blue-300 font-bold">-$1,400 (repaid $29/mo)</td>
                </tr>
                <tr className="bg-slate-700/50 font-black text-base">
                  <td className="p-3 text-white">Your Net Upfront Payment</td>
                  <td className="p-3 text-white">$5,300</td>
                  <td className="p-3 text-[#FF5E00] text-lg">$2,500*</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            *Representative example for a standard single-story tin/tile roof install in Victoria. Actual pricing depends on site electrical setup and product selection.
          </p>
        </div>
      </section>

      {/* Rebate FAQs */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-[#FF5E00] font-extrabold text-xs uppercase tracking-wider block mb-2">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#171D4D]">
              Victorian Solar Rebates FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {rebateFaqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
                <h3 className="font-extrabold text-base sm:text-lg text-[#171D4D] mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-[#FF5E00] to-[#FF7A00] text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Start Saving with Victorian Solar Rebates Today
          </h2>
          <p className="text-orange-100 text-base mb-8 max-w-2xl mx-auto">
            Contact Billabong Solar today for a no-obligation quote and let our rebate experts reserve your government allocation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/get-a-free-quote"
              className="bg-white text-[#FF5E00] hover:bg-orange-50 font-black px-8 py-4 rounded-full text-base transition-all shadow-lg hover:scale-105"
            >
              Get My Free Solar Quote
            </Link>
            <a
              href="tel:1300897221"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-full text-base transition-colors"
            >
              Call 1300 897 221
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
