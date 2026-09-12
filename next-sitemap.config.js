/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://billabongsolar.com.au',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
  },
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/commercial/'),
    await config.transform(config, '/battery-storage/'),
    await config.transform(config, '/about-us/'),
    await config.transform(config, '/blog/'),
    await config.transform(config, '/faq/'),
    await config.transform(config, '/contact-us/'),
    await config.transform(config, '/get-a-free-quote/'),
  ],
}
