import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Billabong Solar Victoria',
  description:
    'Billabong Solar is committed to protecting your personal information in compliance with the Australian Privacy Principles (APPs) and Privacy Act 1988.',
  alternates: {
    canonical: '/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#FF5E00] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-gray-900">Privacy Policy</span>
        </nav>

        {/* Page Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
          <div className="border-b border-gray-100 pb-8 mb-8">
            <span className="text-[#FF5E00] font-extrabold text-xs uppercase tracking-wider block mb-2">
              Legal & Compliance
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#171D4D] mb-4">
              Privacy Policy
            </h1>
            <p className="text-xs text-gray-400 font-medium">
              Last Updated: February 2026 • Compliant with Australian Privacy Principles (APPs) & Privacy Act 1988 (Cth)
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed space-y-8">
            <p className="lead text-base sm:text-lg text-gray-600 font-medium">
              This Privacy Policy document discloses how <strong>Billabong Solar</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, holds, protects, uses, and discloses information about our customers, prospective clients, and website visitors across <strong>billabongsolar.com.au</strong> and related digital platforms.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#171D4D]">1. What Information Do We Collect?</h2>
              <p>
                To provide you with accurate solar system designs, financial payback forecasts, and government rebate assistance in Victoria, we may collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
                <li><strong>Contact details:</strong> Your name, phone number, physical installation address, and email address.</li>
                <li><strong>Energy consumption data:</strong> Quarterly electricity bills, National Meter Identifier (NMI), daily kWh usage profiles, and roof orientation data.</li>
                <li><strong>Rebate eligibility data:</strong> Household income tier, property ownership status, and Council Capital Improved Value (CIV) required strictly for Solar Victoria Homes Program submissions.</li>
                <li><strong>Technical site parameters:</strong> Roof tile/metal material, single-phase or 3-phase electrical switchboard setup, and shaded roof obstacles.</li>
                <li><strong>Digital interactions:</strong> IP address, device type, browser settings, and page interaction timestamps collected via analytical cookies.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#171D4D]">2. How We Use Your Information</h2>
              <p>
                We use collected information exclusively for legitimate business purposes including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
                <li>Designing customized residential and commercial solar PV and battery storage systems tailored to your property.</li>
                <li>Facilitating official STC (Small-scale Technology Certificates) and Solar Victoria rebate/loan applications on your behalf.</li>
                <li>Submitting grid connection approvals and meter reconfiguration requests to Victorian electricity distribution networks (Powercor, Jemena, AusNet Services, CitiPower, United Energy).</li>
                <li>Coordinating NETCC-approved electrical installations and scheduling annual maintenance inspections.</li>
                <li>Communicating warranty registration details and responding promptly to customer inquiries.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#171D4D]">3. Information Security & Storage</h2>
              <p>
                All personal information is held securely in encrypted digital databases and restricted administrative environments. Access is granted solely to certified Billabong Solar personnel and NETCC-approved engineering supervisors who require the data to execute your system installation and rebate approvals.
              </p>
              <p className="text-sm text-gray-600">
                When personal data is no longer required for regulatory compliance under Australian Consumer Law or Electrical Safety Victoria mandates, it is securely de-identified or permanently deleted.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#171D4D]">4. Disclosure of Personal Information</h2>
              <p>
                We never sell, rent, or trade your personal data to third-party telemarketers. Disclosures are limited strictly to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
                <li><strong>Regulatory bodies & Government agencies:</strong> Solar Victoria, Clean Energy Regulator (CER), and Energy Safe Victoria (ESV) for mandatory rebate token processing and safety certificates.</li>
                <li><strong>Electricity Network Distributors:</strong> To authorize your grid export pre-approvals and solar bi-directional metering.</li>
                <li><strong>Tier-1 Equipment Manufacturers:</strong> For activating 25-year panel product warranties and inverter monitoring apps (e.g. Sungrow, Tesla, Enphase, Fronius).</li>
                <li><strong>Accredited Installation Teams:</strong> To complete the safe physical on-site installation of your solar array and battery storage.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#171D4D]">5. Cookies and Web Analytics</h2>
              <p className="text-sm text-gray-600">
                Our website uses standard HTTP cookies to understand visitor navigation, calculate page loading performance, and improve user experience. You can disable cookies at any time through your browser preferences without affecting your ability to request a solar quote.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#171D4D]">6. Your Rights & Contact Information</h2>
              <p className="text-sm text-gray-600">
                Under the Australian Privacy Principles, you have the right to request access to the personal information we hold about you or request corrections. If you have any inquiries regarding this Privacy Policy, please contact our Privacy Officer:
              </p>
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 text-sm space-y-2 text-gray-800">
                <p className="font-bold text-[#171D4D]">Billabong Solar Privacy Officer</p>
                <p>Phone: <a href="tel:1300897221" className="text-[#FF5E00] font-bold hover:underline">1300 897 221</a></p>
                <p>Email: <a href="mailto:info@billabongsolar.com.au" className="text-[#FF5E00] font-bold hover:underline">info@billabongsolar.com.au</a></p>
                <p>Coverage: Victoria, Australia</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
