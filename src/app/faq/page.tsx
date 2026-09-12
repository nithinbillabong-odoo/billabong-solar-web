import type { Metadata } from 'next';
import FAQAccordion from './FAQAccordion';

export const metadata: Metadata = {
  title: 'Solar FAQs - Common Questions | Billabong Solar',
  description: 'Got questions about solar? Find answers to our most frequently asked questions about solar panels, installation, cost, rebates, and battery storage in Victoria.',
  alternates: {
    canonical: '/faq',
  },
};

const faqs = [
  {
    category: "General Solar",
    questions: [
      { q: "How much does solar cost in Victoria?", a: "The cost of a solar system in Victoria typically ranges from $3,500 to $9,000 depending on the system size, panel quality, and installation complexity, after applying government rebates." },
      { q: "What government rebates are available for solar?", a: "In Victoria, you may be eligible for the Solar Homes Program rebate (up to $1,400) and STCs (Small-scale Technology Certificates) which act as an upfront discount." },
      { q: "What happens on cloudy days?", a: "Solar panels still generate electricity on cloudy days, though at a reduced output (typically 10-25% of their normal capacity). They rely on light, not direct heat." },
      { q: "What is a Tier-1 solar panel?", a: "Tier-1 is a ranking given to solar panel manufacturers indicating they are financially stable, have a solid reputation, and manufacture their own high-quality products." },
      { q: "Do I need council approval for solar?", a: "In most residential cases, you do not need council approval for solar panels unless you live in a heritage overlay area. We handle all necessary grid connection approvals." }
    ]
  },
  {
    category: "Installation & Maintenance",
    questions: [
      { q: "How long does installation take?", a: "A standard residential solar installation usually takes 1 to 2 days to complete. Commercial systems may take longer depending on size." },
      { q: "How long do solar panels last?", a: "Quality solar panels are designed to last 25 to 30 years. Most tier-1 panels come with a 25-year performance warranty." },
      { q: "Do solar panels require maintenance?", a: "Solar panels require very little maintenance. We recommend a visual inspection and light cleaning once a year to ensure maximum efficiency." },
      { q: "What warranties come with Billabong Solar?", a: "We provide a 10-year workmanship warranty, plus standard manufacturer warranties (typically 10-15 years for inverters and 25 years for panels)." }
    ]
  },
  {
    category: "Battery Storage & Savings",
    questions: [
      { q: "How much can I save on electricity bills?", a: "Savings vary by household usage and system size, but an average Victorian family can save $800 to $1,500 per year on their electricity bills." },
      { q: "Can I add battery storage later?", a: "Yes! Most modern solar systems are 'battery-ready'. You can easily retrofit a battery like the Tesla Powerwall at a later date." },
      { q: "Is a solar battery worth it?", a: "A battery is highly beneficial if you use most of your electricity at night, or if you want backup power during blackouts. It increases your energy independence." },
      { q: "What is a feed-in tariff?", a: "A feed-in tariff is the amount your electricity retailer pays you for excess solar energy you send back to the grid. Rates vary between retailers." },
      { q: "How do I monitor my solar production?", a: "Your solar inverter comes with a smart app (like Enphase Enlighten or SolarEdge) that lets you monitor real-time energy production and consumption on your phone." },
      { q: "Will solar increase my property value?", a: "Yes, studies show that homes with solar panels generally sell faster and at a premium compared to homes without solar." }
    ]
  }
];

export default function FAQPage() {
  const allQuestions = faqs.flatMap(c => c.questions);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allQuestions.map(q => ({
      "@type": "Question",
      "name": q.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.a
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Find answers to common questions about solar energy, installation, and battery storage.</p>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <FAQAccordion faqs={faqs} />
        </div>
      </section>
    </>
  );
}
