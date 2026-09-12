import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Solar Battery Storage Victoria | Billabong Solar',
  description: 'Store your solar energy with premium battery storage systems. Power your home day and night. Tesla Powerwall, Enphase, and more. Free battery storage quote.',
  alternates: {
    canonical: '/battery-storage',
  },
};

export default function BatteryStoragePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Solar Battery Storage Systems",
    "description": "Premium battery storage systems including Tesla Powerwall, Enphase, and Sungrow.",
    "brand": {
      "@type": "Brand",
      "name": "Billabong Solar"
    },
    "category": "Solar Energy Equipment"
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Solar Battery Storage Solutions</h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-300">
            Take full control of your energy. Store your excess solar power during the day and use it at night.
          </p>
          <Link href="/get-a-free-quote" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg transition duration-300">
            Get a Free Battery Quote
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Why Add a Solar Battery?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Store Excess Solar", desc: "Capture the solar energy your panels produce during the day instead of sending it back to the grid for pennies." },
              { title: "Power at Night", desc: "Use your stored free solar energy when the sun goes down and grid electricity is most expensive." },
              { title: "Blackout Protection", desc: "Keep your essential appliances running during grid outages and extreme weather events." },
              { title: "Reduce Grid Reliance", desc: "Become more energy independent and shield yourself from rising electricity tariffs." }
            ].map((benefit, i) => (
              <div key={i} className="text-center p-6 border border-gray-100 rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Premium Battery Brands We Install</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: "Tesla Powerwall", desc: "A sleek, integrated AC battery system that stores your solar energy for backup protection and off-grid capabilities." },
              { name: "Enphase IQ Battery", desc: "Smart, reliable, and scalable microinverter-based storage solution that seamlessly integrates with Enphase solar systems." },
              { name: "Sungrow Batteries", desc: "High-performance, cost-effective lithium iron phosphate batteries offering excellent value and reliability." }
            ].map((brand, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 font-medium">{brand.name} Image</span>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{brand.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{brand.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">How Battery Storage Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-1 bg-orange-200 -z-10 transform -translate-y-1/2"></div>
            {[
              { step: "1", title: "Solar Generates", desc: "Your solar panels convert sunlight into DC electricity during the day." },
              { step: "2", title: "Battery Stores", desc: "Excess energy not immediately used by your home charges the battery." },
              { step: "3", title: "You Use Power", desc: "At night or during outages, your home draws power from the stored battery energy." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center w-full md:w-1/3 relative z-10">
                <div className="w-12 h-12 mx-auto bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Store Your Solar?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-400">Whether you are adding a battery to an existing solar system or installing a complete new package, we can help.</p>
          <Link href="/get-a-free-quote" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full text-lg transition duration-300">
            Request a Battery Quote
          </Link>
        </div>
      </section>
    </>
  );
}
