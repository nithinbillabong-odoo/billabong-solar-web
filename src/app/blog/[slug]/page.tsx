import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/data/blogPosts';

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

      {/* Header Banner */}
      <div className="bg-slate-950 text-white py-12 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <nav className="text-sm text-gray-400 mb-4 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-300 truncate max-w-xs md:max-w-md">{post.title}</span>
          </nav>
          
          <div className="inline-block bg-[#FF5E00] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            {post.category}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6 max-w-4xl">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-800 border border-slate-700">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-white font-medium block">{post.author.name}</span>
                <span className="text-xs text-gray-400">{post.author.role}</span>
              </div>
            </div>
            <span className="hidden sm:inline">•</span>
            <span>{post.date}</span>
            <span className="hidden sm:inline">•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-12 md:py-16 bg-white min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Article Column */}
            <article className="lg:col-span-8">
              {/* Featured Image */}
              <div className="relative w-full h-[280px] sm:h-[400px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg mb-10 border border-gray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Body Content */}
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />

              {/* Share and Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800 text-sm">Share article:</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${siteUrl}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-slate-100 hover:bg-[#FF5E00] hover:text-white transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${siteUrl}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-slate-100 hover:bg-[#FF5E00] hover:text-white transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                  </a>
                </div>

                <Link
                  href="/blog"
                  className="text-sm font-semibold text-slate-800 hover:text-[#FF5E00] transition-colors inline-flex items-center gap-1"
                >
                  ← Back to all articles
                </Link>
              </div>
            </article>

            {/* Sidebar Column */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Quote CTA Box */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 sticky top-24">
                <div className="w-12 h-12 rounded-xl bg-[#FF5E00] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Get Up to $20,000/yr in Solar Savings</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Switch to Tier-1 solar with accredited installers in Victoria. Claim up to $5,000 in Government rebates today.
                </p>
                <Link
                  href="/get-a-free-quote"
                  className="block text-center w-full bg-[#FF5E00] hover:bg-orange-600 text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-md"
                >
                  Get a Free Quote
                </Link>

                <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-gray-400 space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    <span>New Energy Tech Approved Seller</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    <span>25-Year Performance Warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    <span>Accredited Clean Energy Electricians</span>
                  </div>
                </div>

                {/* Recent Articles Widget */}
                <div className="mt-8 pt-8 border-t border-slate-800">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                    Recent Articles
                  </h4>
                  <div className="space-y-4">
                    {recentPosts.map((rPost) => (
                      <Link
                        key={rPost.id}
                        href={`/blog/${rPost.slug}`}
                        className="group flex gap-3 items-center"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                          <Image
                            src={rPost.image}
                            alt={rPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-grow">
                          <h5 className="text-xs font-semibold text-gray-200 group-hover:text-[#FF5E00] line-clamp-2 transition-colors">
                            {rPost.title}
                          </h5>
                          <span className="text-[11px] text-gray-500 mt-1 block">
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
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Related Articles
            </h2>
            <Link
              href="/blog"
              className="text-[#FF5E00] font-bold text-sm hover:underline"
            >
              View All Articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((rPost) => (
              <article
                key={rPost.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={rPost.image}
                    alt={rPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {rPost.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-gray-400 mb-2">{rPost.date}</span>
                  <Link href={`/blog/${rPost.slug}`}>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#FF5E00] transition-colors line-clamp-2 leading-snug">
                      {rPost.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
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
