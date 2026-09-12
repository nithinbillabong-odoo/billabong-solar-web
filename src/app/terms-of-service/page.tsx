import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Billabong Solar Victoria',
  description:
    'Terms and Conditions for solar panel, inverter, and battery storage design, supply, and installation by Billabong Solar across Victoria. Compliant with Australian Consumer Law and CEC standards.',
  alternates: {
    canonical: '/terms-of-service',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#FF5E00] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-gray-900">Terms of Service</span>
        </nav>

        {/* Page Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
          <div className="border-b border-gray-100 pb-8 mb-8">
            <span className="text-[#FF5E00] font-extrabold text-xs uppercase tracking-wider block mb-2">
              Customer Agreement
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#171D4D] mb-4">
              Terms of Service
            </h1>
            <p className="text-xs text-gray-400 font-medium">
              Last Updated: February 2026 • New Energy Tech Approved Seller & Australian Consumer Law Compliant
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed space-y-8">
            <p className="lead text-base sm:text-lg text-gray-600 font-medium">
              These Terms of Service govern all quotations, supply, engineering, and installation agreements entered into between <strong>Billabong Solar</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) and our residential and commercial clients (&ldquo;Customer&rdquo;, &ldquo;you&rdquo;) within Victoria, Australia.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#171D4D]">1. Quotations, System Designs & Pricing</h2>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
                <li>All quotations issued by Billabong Solar remain valid for thirty (30) days from the date of issue unless specified otherwise in writing.</li>
                <li>Estimated solar energy generation forecasts and financial savings calculations are modeled based on historical Bureau of Meteorology (BOM) solar irradiance data, standard panel tilt/orientation, and typical energy usage habits. Actual performance may vary based on weather variations, shading, and household consumption patterns.</li>
                <li>Quotations clearly state the gross system price, the estimated federal STC point-of-sale discount, and any applicable Victorian Solar Homes rebates.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#171D4D]">2. Victorian Government Rebates & STC Assignment</h2>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
                <li>Under the Small-scale Renewable Energy Scheme (SRES), you authorize Billabong Solar (or our registered agent) to create and assign Small-scale Technology Certificates (STCs) arising from your solar installation. This discount is credited directly against your upfront purchase price.</li>
                <li>For Solar Victoria rebates ($1,400 panel rebate and interest-free loan), eligibility is determined by Solar Victoria. Billabong Solar assists with quote submission into the portal, but final approval is subject to Solar Victoria confirmation. If you do not qualify or Solar Victoria denies approval, you remain responsible for the gross balance of the quoted system.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#171D4D]">3. Grid Connection & Distributor Approvals</h2>
              <p className="text-sm text-gray-600">
                Installation is contingent upon formal grid connection approval (pre-approval) from your relevant Victorian electricity distributor (Powercor, AusNet, Jemena, CitiPower, or United Energy). Billabong Solar manages all network connection applications. If a distributor imposes an export limitation or demands switchboard upgrades, we will discuss any associated technical requirements with you prior to commencing work.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#171D4D]">4. Cooling-Off Period & Cancellations</h2>
              <p className="text-sm text-gray-600">
                In strict compliance with the Clean Energy Council Approved Retailer Code of Conduct and Australian Consumer Law, residential clients are entitled to a mandatory <strong>ten (10) business day cooling-off period</strong>. During this window, you may cancel your contract and receive a complete, unconditional refund of any deposit paid.
              </p>
              <p className="text-sm text-gray-600">
                You are also entitled to a full deposit refund if grid connection approval is refused by the distributor or if an unforeseen site condition significantly alters the quote beyond what was agreed.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#171D4D]">5. Comprehensive Warranties & Guarantees</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm border border-gray-200">
                  <thead className="bg-gray-100 text-gray-800 font-bold">
                    <tr>
                      <th className="p-3 border">Warranty Component</th>
                      <th className="p-3 border">Coverage Period</th>
                      <th className="p-3 border">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-gray-600">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900 border">Workmanship Warranty</td>
                      <td className="p-3 font-bold text-[#FF5E00] border">10 Years</td>
                      <td className="p-3 border">Covers electrical wiring, mounting brackets, roof penetration waterproofing, and installation craftsmanship.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900 border">Solar Panel Performance</td>
                      <td className="p-3 font-bold text-[#FF5E00] border">25 Years</td>
                      <td className="p-3 border">Guarantees minimum linear power output (typically 80%+ at year 25) backed by Tier-1 manufacturers.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900 border">Inverter & Battery Warranty</td>
                      <td className="p-3 font-bold text-[#FF5E00] border">10 - 15 Years</td>
                      <td className="p-3 border">Manufacturer warranties provided by Sungrow, Tesla, Enphase, and Fronius with Australian support centers.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#171D4D]">6. Governing Law</h2>
              <p className="text-sm text-gray-600">
                These Terms of Service are governed by the laws of the State of Victoria and the Commonwealth of Australia. Any disputes arising shall be subject to the exclusive jurisdiction of the courts of Victoria.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#171D4D]">7. Contact & Customer Support</h2>
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 text-sm space-y-2 text-gray-800">
                <p className="font-bold text-[#171D4D]">Billabong Solar Customer Operations</p>
                <p>Phone: <a href="tel:1300897221" className="text-[#FF5E00] font-bold hover:underline">1300 897 221</a></p>
                <p>Email: <a href="mailto:info@billabongsolar.com.au" className="text-[#FF5E00] font-bold hover:underline">info@billabongsolar.com.au</a></p>
                <p>Location: Victoria, Australia</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
