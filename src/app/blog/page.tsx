import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/data/blogPosts';
import AuthorAvatar from '@/components/blog/AuthorAvatar';
import BlogImage from '@/components/blog/BlogImage';

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

      {/* Royal Navy Blue Glass Hero Header */}
      <div className="relative bg-gradient-to-r from-[#171D4D] via-[#242C7D] to-[#1C2366] text-white py-14 md:py-20 overflow-hidden shadow-md">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF5E00]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <nav className="text-xs uppercase tracking-wider font-bold mb-4 flex items-center gap-2 text-blue-200/80">
            <Link href="/" className="hover:text-white transition-colors">Residential</Link>
            <span className="text-[#FF5E00]">›</span>
            <span className="text-orange-300">Latest News</span>
          </nav>
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-[#FF8A3D] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
            Solar Insights & Education
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Latest Solar News & Guides
          </h1>
          <p className="text-blue-100/80 text-lg max-w-2xl leading-relaxed">
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
                  <BlogImage
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                      <AuthorAvatar
                        name={post.author.name}
                        avatarUrl={post.author.avatar}
                        size={28}
                      />
                      <span className="text-xs font-semibold text-gray-700">{post.author.name}</span>
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
