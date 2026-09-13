/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'billabongsolar.com.au',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
    ],
  },
  // Enable proper canonical URLs for Vercel
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/code-of-conduct',
        destination: '/docs/new-energy-tech-consumer-code.pdf',
        permanent: false,
      },
      {
        source: '/docs/New-Energy-Tech-Consumer-Code.pdf',
        destination: '/docs/new-energy-tech-consumer-code.pdf',
        permanent: false,
      },
      {
        source: '/wp-content/uploads/:path*/codeofconductCertificatePDF-3.pdf',
        destination: '/docs/new-energy-tech-consumer-code.pdf',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
