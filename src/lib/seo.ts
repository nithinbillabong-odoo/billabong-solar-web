import { Metadata } from 'next';

export const siteConfig = {
  name: 'Billabong Solar',
  description: 'Leading provider of solar energy solutions in Victoria, Australia.',
  url: 'https://billabongsolar.com.au',
  ogImage: 'https://billabongsolar.com.au/og-image.jpg',
  socialHandles: {
    facebook: 'https://facebook.com/billabongsolar',
    instagram: 'https://instagram.com/billabongsolar',
    twitter: '@billabongsolar'
  }
};

export function generateMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'en_AU',
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.socialHandles.twitter,
    },
    other: {
      'geo.region': 'AU-VIC',
      'geo.placename': 'Victoria, Australia',
    },
    ...overrides,
  };
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ElectricalContractor"],
  "name": "Billabong Solar",
  "image": "https://billabongsolar.com.au/logo.png",
  "@id": "https://billabongsolar.com.au",
  "url": "https://billabongsolar.com.au",
  "telephone": "+61 3 0000 0000",
  "email": "info@billabongsolar.com.au",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Solar Way",
    "addressLocality": "Melbourne",
    "addressRegion": "VIC",
    "postalCode": "3000",
    "addressCountry": "AU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -37.8136,
    "longitude": 144.9631
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "$$"
};
