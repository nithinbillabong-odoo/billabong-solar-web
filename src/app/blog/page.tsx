import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/data/blogPosts';

export const metadata: Metadata = {
  title: 'Solar News & Industry Guides Victoria | Billabong Solar Blog',
  description:
    'Stay updated with the latest solar news, Victoria rebate guides, battery storage tips, and commercial solar analysis from Billabong Solar.',
  keywords: [
    'solar blog victoria',
    'solar news melbourne',
    'solar rebate guides 2025',
    'best solar panel installers victoria',
    'battery storage guide melbourne',
  ],
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://billabongsolar.com.au';

  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Billabong Solar News & Insights',
    description: 'Latest residential and commercial solar insights, battery storage tips, and Victorian solar news.',
    url: `${siteUrl}/blog`,
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${siteUrl}/blog/${post.slug}`,
      datePublished: post.dateISO,
      image: post.image,
      author: {
        '@type': 'Person',
        name: post.author.name,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />

      {/* Hero Header */}
      <div className="bg-slate-950 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <nav className="text-sm text-gray-400 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-white">Blog</span>
          </nav>
          <div className="inline-block bg-[#FF5E00] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            Solar Insights & Education
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Solar News & Expert Guides
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Everything you need to know about rooftop solar, commercial installations, battery storage, and government incentives in Victoria.
          </p>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <section className="py-16 md:py-24 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#FF5E00] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {post.category}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="group-hover:text-[#FF5E00] transition-colors">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">{post.author.name}</span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-slate-900 font-bold text-sm hover:text-[#FF5E00] transition-colors inline-flex items-center gap-1 group-hover:translate-x-1 duration-200"
                    >
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Lead Gen Box */}
          <div className="mt-20 rounded-3xl bg-slate-950 p-8 md:p-14 text-white text-center shadow-2xl relative overflow-hidden border border-slate-800">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-[#FF5E00] font-bold text-sm uppercase tracking-wider block mb-2">
                Victorian Clean Energy Experts
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
                Ready to Slash Your Power Bills with Solar?
              </h3>
              <p className="text-gray-300 text-base mb-8">
                Get a custom solar design tailored to your energy consumption and claim up to $5,000 in Victorian rebates.
              </p>
              <Link
                href="/get-a-free-quote"
                className="inline-block bg-[#FF5E00] hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
              >
                Get Your Free Solar Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
