import { Metadata } from 'next';

export const siteConfig = {
  name: 'Billabong Solar',
  description:
    'Accredited residential and commercial solar panels and battery storage installer in Melbourne & Victoria. Save up to $20,000/yr with Tier-1 panels, CEC accredited electricians, and Victorian Government rebates.',
  url: 'https://billabongsolar.com.au',
  ogImage: 'https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Slider-Residential-Solar-Save-Electricity-Bill.webp?w=1200&ssl=1',
  telephone: '1300 897 221',
  email: 'info@billabongsolar.com.au',
  socialHandles: {
    facebook: 'https://facebook.com/billabongsolar',
    instagram: 'https://instagram.com/billabongsolar',
    twitter: '@billabongsolar'
  }
};

export function generateMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    title: {
      default: `${siteConfig.name} | Melbourne & Victoria Solar & Battery Specialists`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    keywords: [
      'commercial solar victoria',
      'commercial solar melbourne',
      'commercial battery storage victoria',
      'commercial battery storage melbourne',
      'residential solar victoria',
      'residential solar melbourne',
      'residential battery storage victoria',
      'residential battery storage melbourne',
      'sigenergy battery melbourne',
      'goodwe solar battery victoria',
      'alpha ess battery storage melbourne',
      'esy sunhome battery victoria',
      'solar rebate victoria 2026',
      'solar homes program rebate $1400',
      'CEC accredited solar installer victoria',
      'NETCC approved solar seller victoria',
      'tier 1 solar panels melbourne'
    ],
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
          alt: 'Billabong Solar - Melbourne & Victoria Solar Specialists',
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
      'geo.placename': 'Scoresby, Melbourne, Victoria, Australia',
      'geo.position': '-37.8938;145.2285',
      ICBM: '-37.8938, 145.2285',
    },
    ...overrides,
  };
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ElectricalContractor", "EnergyAuditor"],
  "name": "Billabong Solar",
  "image": "https://billabongsolar.com.au/wp-content/uploads/2024/06/log-new.webp",
  "@id": "https://billabongsolar.com.au/#business",
  "url": "https://billabongsolar.com.au",
  "telephone": "1300 897 221",
  "email": "info@billabongsolar.com.au",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Suite 029 Waterman Caribbean Park, 44 Lakeview Drive",
    "addressLocality": "Scoresby",
    "addressRegion": "VIC",
    "postalCode": "3179",
    "addressCountry": "AU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -37.8938,
    "longitude": 145.2285
  },
  "areaServed": [
    { "@type": "City", "name": "Melbourne" },
    { "@type": "City", "name": "Scoresby" },
    { "@type": "AdministrativeArea", "name": "Victoria" },
    { "@type": "AdministrativeArea", "name": "Gippsland" },
    { "@type": "City", "name": "Heyfield" },
    { "@type": "City", "name": "Geelong" },
    { "@type": "City", "name": "Ballarat" },
    { "@type": "City", "name": "Bendigo" },
    { "@type": "AdministrativeArea", "name": "Mornington Peninsula" },
    { "@type": "City", "name": "Shepparton" },
    { "@type": "City", "name": "Traralgon" },
    { "@type": "City", "name": "Warrnambool" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Solar & Battery Storage Solutions Victoria",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Residential Solar Panel Installation",
          "description": "Tailored 10kW, 13.2kW, and 20kW Tier-1 residential solar power systems for Melbourne & Victorian homes."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Residential Solar Battery Storage",
          "description": "Home battery storage systems including Sig Energy, GoodWe, Alpha ESS, and ESY Sunhome for blackout protection."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Commercial Solar Power Systems",
          "description": "Turnkey commercial solar installations from 30kW to 1,000kW (1MW) for businesses across Victoria."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Commercial Battery Storage Systems",
          "description": "Industrial and commercial battery storage for peak demand shaving and critical load backup."
        }
      }
    ]
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "09:00",
      "closes": "14:00"
    }
  ],
  "priceRange": "$$"
};
