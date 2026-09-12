import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Billabong Solar | Trusted Victoria Solar Installer',
  description: 'Learn about Billabong Solar - Victoria\'s trusted New Energy Tech Approved solar installer. Accredited electricians, 10+ years experience, industry-leading warranties.',
  alternates: {
    canonical: '/about-us',
  },
};

export default function AboutUsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Billabong Solar",
    "description": "Victoria's trusted New Energy Tech Approved solar installer.",
    "url": "https://www.billabongsolar.com.au/about-us",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Victoria",
      "addressCountry": "AU"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-slate-900 text-white py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">About Billabong Solar</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300">
            Empowering Victoria with clean, renewable energy since 2013.
          </p>
        </div>
      </section>

      {/* Our Story & Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <div className="bg-gray-100 rounded-3xl aspect-[4/3] flex items-center justify-center mb-6">
                <span className="text-gray-400">Company History Image</span>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Billabong Solar was founded with a clear and simple mission: to make high-quality, reliable solar energy accessible to all Victorians. What started as a small team of passionate electricians has grown into one of the state's most trusted solar installation companies.
              </p>
              <h3 className="text-2xl font-bold mb-4 mt-10 text-gray-900">Our Mission & Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We believe in a sustainable future powered by the sun. Our vision is to see a solar panel on every suitable roof in Victoria, helping families and businesses dramatically reduce their energy bills while contributing to a cleaner environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1000+", label: "Installations" },
              { number: "10+", label: "Years Experience" },
              { number: "5-Star", label: "Customer Rating" },
              { number: "100%", label: "CEC Approved" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">Our Accreditations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            We hold ourselves to the highest industry standards. As a New Energy Tech Approved Seller, you can trust that our sales practices, installations, and warranties are fully compliant and ethical.
          </p>
          <div className="flex flex-wrap justify-center gap-12 items-center">
            <div className="w-48 h-24 bg-white rounded-lg shadow-sm flex items-center justify-center text-sm font-bold text-gray-500 border border-gray-100 p-4 text-center">
              New Energy Tech Approved
            </div>
            <div className="w-48 h-24 bg-white rounded-lg shadow-sm flex items-center justify-center text-sm font-bold text-gray-500 border border-gray-100 p-4 text-center">
              Clean Energy Council
            </div>
            <div className="w-48 h-24 bg-white rounded-lg shadow-sm flex items-center justify-center text-sm font-bold text-gray-500 border border-gray-100 p-4 text-center">
              Licensed Electricians
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-16 text-gray-900">Meet Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3].map((member) => (
              <div key={member} className="group">
                <div className="w-48 h-48 mx-auto bg-gray-100 rounded-full mb-6 overflow-hidden border-4 border-white shadow-lg">
                  <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-300">
                    Photo
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Team Member {member}</h3>
                <p className="text-orange-500 mb-3">Position Title</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Experience the Billabong Difference</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-400">Join thousands of happy Victorians who have made the switch to solar with us.</p>
          <Link href="/get-a-free-quote" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full text-lg transition duration-300">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
