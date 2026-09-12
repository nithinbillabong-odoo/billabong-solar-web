import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Commercial Solar Solutions Victoria | Billabong Solar',
  description: 'Expert commercial solar panel installation across Victoria. Reduce energy costs, earn rebates, and go green. Get your free commercial solar quote today.',
  alternates: {
    canonical: '/commercial',
  },
};

export default function CommercialSolarPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Commercial Solar Panel Installation",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Billabong Solar",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Victoria",
        "addressCountry": "AU"
      }
    },
    "areaServed": "Victoria, Australia",
    "description": "Expert commercial solar panel installation across Victoria. Reduce energy costs, earn rebates, and go green."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <svg className="w-full h-full object-cover opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Commercial Solar Solutions</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
            Empower your business with sustainable energy. Reduce overheads and boost your green credentials with our premium commercial solar installations.
          </p>
          <Link href="/get-a-free-quote" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg transition duration-300">
            Get a Free Commercial Quote →
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Benefits of Commercial Solar</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover how switching to solar can transform your business operations and bottom line.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Cost Savings", desc: "Significantly reduce your electricity bills and protect against future energy price hikes." },
              { title: "Government Incentives", desc: "Take advantage of STCs, LGCs, and other rebates to lower your upfront investment." },
              { title: "Reliable Power", desc: "Ensure consistent energy supply for your operations with high-quality tier-1 panels." },
              { title: "Environmental Impact", desc: "Lower your carbon footprint and appeal to eco-conscious consumers and partners." }
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-slate-800">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <div className="bg-slate-100 rounded-3xl p-8 aspect-square flex items-center justify-center border border-slate-200">
                <span className="text-slate-400 font-medium">Commercial Solar Imagery</span>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Why Choose Billabong Solar for Your Business?</h2>
              <div className="space-y-6">
                {[
                  { title: "Scalable Systems", desc: "Custom-designed systems ranging from 10kW to 100kW+ to perfectly match your energy needs." },
                  { title: "Dedicated Project Manager", desc: "A single point of contact from initial consultation through to final commissioning." },
                  { title: "CEC Approved", desc: "Our installations are carried out by Clean Energy Council accredited electricians." },
                  { title: "Finance Options", desc: "Flexible commercial finance solutions including zero-upfront payment plans." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-orange-500 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Power Your Business?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">Contact our commercial solar experts today for a comprehensive energy assessment and custom quote.</p>
          <Link href="/get-a-free-quote" className="inline-block bg-white text-orange-600 font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-100 transition duration-300 shadow-lg">
            Start Your Journey →
          </Link>
        </div>
      </section>
    </>
  );
}
