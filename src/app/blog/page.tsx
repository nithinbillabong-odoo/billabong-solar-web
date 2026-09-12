import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Solar News & Tips | Billabong Solar Blog',
  description: 'Stay updated with the latest solar news, tips, rebates, and industry updates from Billabong Solar Victoria.',
};

const posts = [
  {
    id: 1,
    title: "Understanding the Victoria Solar Rebate 2024",
    category: "Rebates",
    excerpt: "Everything you need to know about claiming the latest Solar Homes Program rebate in Victoria.",
    image: "/images/blog/solar-rebate.jpg"
  },
  {
    id: 2,
    title: "Is a Solar Battery Worth It?",
    category: "Battery Storage",
    excerpt: "We break down the costs and benefits of adding a Tesla Powerwall or Enphase battery to your home.",
    image: "/images/blog/solar-battery.jpg"
  },
  {
    id: 3,
    title: "Top 5 Benefits of Commercial Solar",
    category: "Commercial",
    excerpt: "How businesses are slashing their operating costs and boosting their green credentials.",
    image: "/images/blog/commercial.jpg"
  },
  {
    id: 4,
    title: "How to Maintain Your Solar Panels",
    category: "Maintenance",
    excerpt: "Simple tips to ensure your solar system runs at maximum efficiency all year round.",
    image: "/images/blog/maintenance.jpg"
  },
  {
    id: 5,
    title: "Microinverters vs String Inverters",
    category: "Technology",
    excerpt: "Which inverter technology is right for your roof? A comprehensive comparison.",
    image: "/images/blog/inverters.jpg"
  },
  {
    id: 6,
    title: "What Happens to Solar in Winter?",
    category: "General",
    excerpt: "Debunking common myths about solar energy production during the colder months.",
    image: "/images/blog/winter-solar.jpg"
  }
];

export default function BlogPage() {
  return (
    <>
      <div className="bg-slate-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="text-sm mb-4 text-gray-400">
            <Link href="/" className="hover:text-white transition">Home</Link> <span className="mx-2">{'>'}</span> <span>Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Solar News & Tips</h1>
        </div>
      </div>

      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col group">
                <div className="h-56 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium bg-slate-100 group-hover:scale-105 transition-transform duration-500">
                    Blog Image Placeholder
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-sm font-bold text-orange-500 mb-3 uppercase tracking-wider">{post.category}</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-orange-500 transition-colors">{post.title}</h2>
                  <p className="text-gray-600 mb-8 flex-grow leading-relaxed">{post.excerpt}</p>
                  <Link href={`/blog/${post.id}`} className="text-slate-900 font-bold hover:text-orange-500 transition-colors inline-flex items-center w-max">
                    Read More 
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
