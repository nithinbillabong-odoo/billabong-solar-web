import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/data/blogPosts';
import AuthorAvatar from '@/components/blog/AuthorAvatar';
import BlogImage from '@/components/blog/BlogImage';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const params: { slug: string }[] = [];

  for (const post of posts) {
    params.push({ slug: post.slug });
    if (post.aliases) {
      for (const alias of post.aliases) {
        params.push({ slug: alias });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Post Not Found | Billabong Solar',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://billabongsolar.com.au';
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: postUrl,
      type: 'article',
      publishedTime: post.dateISO,
      authors: [post.author.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.image],
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const recentPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://billabongsolar.com.au';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: post.image,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Billabong Solar',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Royal Navy Blue Glass Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#171D4D] via-[#242C7D] to-[#1C2366] text-white py-14 md:py-20 overflow-hidden shadow-md">
        {/* Subtle decorative glass glow orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF5E00]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          {/* Breadcrumbs with clean contrast */}
          <nav className="text-xs uppercase tracking-wider font-bold mb-5 flex items-center gap-2 text-blue-200/80">
            <Link href="/" className="hover:text-white transition-colors">Residential</Link>
            <span className="text-[#FF5E00]">›</span>
            <Link href="/blog" className="hover:text-white transition-colors">Latest News</Link>
            <span className="text-[#FF5E00]">›</span>
            <span className="text-orange-300 truncate max-w-xs md:max-w-md">{post.category}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6 max-w-4xl tracking-tight">
            {post.title}
          </h1>

          {/* Author & Meta Pill */}
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-sm text-blue-100 flex-wrap">
            <div className="flex items-center gap-2.5">
              <AuthorAvatar
                name={post.author.name}
                avatarUrl={post.author.avatar}
                size={28}
                className="border border-white/40"
              />
              <span className="text-white font-semibold">{post.author.name}</span>
            </div>
            <span className="text-white/40">•</span>
            <span>{post.date}</span>
            <span className="text-white/40">•</span>
            <span className="text-orange-300 font-medium">{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-12 md:py-20 bg-[#F8FAFC] min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-12">
            
            {/* Article Column */}
            <article className="lg:col-span-8 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-gray-100">
              {/* Featured Image */}
              <div className="relative w-full h-[280px] sm:h-[400px] md:h-[440px] rounded-2xl overflow-hidden shadow-md mb-10 border border-gray-100">
                <BlogImage
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </div>

              {/* Body Content */}
              <div
                className="prose prose-slate prose-lg max-w-none text-gray-700 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />

              {/* Author Bio Box - Google E-E-A-T Authority Boost */}
              <div className="my-10 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-50 to-orange-50/40 border border-slate-200/80 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
                <AuthorAvatar
                  name={post.author.name}
                  avatarUrl={post.author.avatar}
                  size={68}
                  className="shadow-md ring-2 ring-orange-400/40"
                />
                <div className="text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                    <h4 className="font-extrabold text-slate-900 text-lg">{post.author.name}</h4>
                    <span className="text-xs bg-orange-100 text-[#FF5E00] font-bold px-2.5 py-0.5 rounded-full border border-orange-200">
                      NETCC Approved Specialist
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-semibold mb-3">
                    {post.author.role} • Billabong Solar Victoria
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    The Billabong Solar engineering and technical team brings over a decade of hands-on experience designing and commissioning NETCC approved residential and commercial solar arrays and battery storage solutions across Melbourne and regional Victoria.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs font-bold text-[#171D4D]">
                    <Link href="/residential" className="hover:text-[#FF5E00] transition-colors underline">Residential Solar</Link>
                    <span>•</span>
                    <Link href="/commercial" className="hover:text-[#FF5E00] transition-colors underline">Commercial Solar</Link>
                    <span>•</span>
                    <Link href="/battery-storage" className="hover:text-[#FF5E00] transition-colors underline">Battery Storage</Link>
                    <span>•</span>
                    <Link href="/get-a-free-quote" className="hover:text-[#FF5E00] transition-colors underline">Free Quote</Link>
                  </div>
                </div>
              </div>

              {/* Share and Navigation */}
              <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-800 text-sm">Share:</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${siteUrl}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-blue-50 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors flex items-center justify-center shadow-sm"
                    aria-label="Share on Facebook"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${siteUrl}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-blue-50 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors flex items-center justify-center shadow-sm"
                    aria-label="Share on LinkedIn"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} - ${siteUrl}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-green-50 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors flex items-center justify-center shadow-sm"
                    aria-label="Share on WhatsApp"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 17.65c-1.49 0-2.95-.4-4.23-1.16l-.3-.18-3.14.82.84-3.06-.2-.31c-.84-1.33-1.28-2.88-1.28-4.47 0-4.63 3.77-8.4 8.4-8.4 2.24 0 4.36.87 5.95 2.46a8.348 8.348 0 012.46 5.94c0 4.63-3.77 8.4-8.4 8.4z"/></svg>
                  </a>
                </div>

                <Link
                  href="/blog"
                  className="text-sm font-bold text-[#1E2560] hover:text-[#FF5E00] transition-colors inline-flex items-center gap-1.5"
                >
                  ← Back to all articles
                </Link>
              </div>
            </article>

            {/* Sidebar Column */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Glassmorphism Quote Card */}
              <div className="bg-gradient-to-br from-[#171D4D] via-[#242C7D] to-[#1C2366] text-white rounded-3xl p-7 shadow-xl border border-blue-900/40 relative overflow-hidden sticky top-28">
                {/* Background ambient glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF5E00]/20 rounded-full blur-2xl pointer-events-none" />

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF5E00] to-[#FF7A00] flex items-center justify-center mb-5 shadow-lg shadow-orange-500/30">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>

                <span className="text-[#FF8A3D] font-extrabold text-xs uppercase tracking-wider block mb-1">
                  Solar Homes Program
                </span>
                <h3 className="text-2xl font-extrabold mb-3 leading-snug">
                  Save Up to $20,000/year With Solar
                </h3>
                <p className="text-blue-100/80 text-sm mb-6 leading-relaxed">
                  Join thousands of Victoria families saving big on electricity with Tier-1 panels and battery storage.
                </p>

                <Link
                  href="/get-a-free-quote"
                  className="block text-center w-full bg-gradient-to-r from-[#FF5E00] to-[#FF7A00] hover:from-[#e55400] hover:to-[#ff6d00] text-white font-extrabold py-3.5 px-6 rounded-full transition-all shadow-lg shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get a Free Quote
                </Link>

                <div className="mt-6 pt-6 border-t border-white/10 text-xs text-blue-100/80 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0">
                      ✓
                    </div>
                    <span>New Energy Tech Approved Seller</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0">
                      ✓
                    </div>
                    <span>25-Year Performance Warranty</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0">
                      ✓
                    </div>
                    <span>NETCC Approved Solar Seller</span>
                  </div>
                </div>

                {/* Recent Posts Glass Widget */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-200 mb-4">
                    Recent Articles
                  </h4>
                  <div className="space-y-4">
                    {recentPosts.map((rPost) => (
                      <Link
                        key={rPost.id}
                        href={`/blog/${rPost.slug}`}
                        className="group flex gap-3.5 items-center p-2 rounded-2xl hover:bg-white/5 transition-colors"
                      >
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800 shadow-inner">
                          <BlogImage
                            src={rPost.image}
                            alt={rPost.title}
                            fill
                            sizes="64px"
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-grow">
                          <h5 className="text-xs font-bold text-white group-hover:text-[#FF8A3D] line-clamp-2 transition-colors leading-snug">
                            {rPost.title}
                          </h5>
                          <span className="text-[11px] text-blue-200/60 mt-1 block">
                            {rPost.date}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom Related Posts Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <span className="text-[#FF5E00] text-xs font-bold uppercase tracking-wider block mb-1">
                Keep Reading
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E2560]">
                Related Solar Articles
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-[#FF5E00] font-bold text-sm hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((rPost) => (
              <article
                key={rPost.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <BlogImage
                    src={rPost.image}
                    alt={rPost.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#1E2560]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {rPost.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-gray-400 mb-2">{rPost.date}</span>
                  <Link href={`/blog/${rPost.slug}`}>
                    <h3 className="text-lg font-bold text-[#1E2560] mb-3 group-hover:text-[#FF5E00] transition-colors line-clamp-2 leading-snug">
                      {rPost.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
                    {rPost.excerpt}
                  </p>
                  <Link
                    href={`/blog/${rPost.slug}`}
                    className="text-[#FF5E00] font-bold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all mt-auto"
                  >
                    Read Article →
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
