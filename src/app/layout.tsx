import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ChatAssistPopup from "@/components/layout/ChatAssistPopup";
import { localBusinessSchema } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://billabongsolar.com.au"
  ),
  title: {
    default: "Billabong Solar | Victoria's Trusted Solar Installer",
    template: "%s | Billabong Solar",
  },
  description:
    "Billabong Solar is Victoria's trusted New Energy Tech Approved solar installer. Tier-1 panels, accredited electricians, industry-leading warranties. Get your free quote today.",
  keywords: [
    "solar panels Victoria",
    "solar installation Melbourne",
    "residential solar Victoria",
    "commercial solar Melbourne",
    "battery storage Victoria",
    "solar quotes Melbourne",
    "Billabong Solar",
    "accredited solar installer",
    "solar rebates Victoria",
    "Tier-1 solar panels",
  ],
  authors: [{ name: "Billabong Solar" }],
  creator: "Billabong Solar",
  publisher: "Billabong Solar",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://billabongsolar.com.au",
    siteName: "Billabong Solar",
    title: "Billabong Solar | Victoria's Trusted Solar Installer",
    description:
      "Victoria's trusted New Energy Tech Approved solar installer. Tier-1 panels, accredited electricians, industry-leading warranties.",
    images: [
      {
        url: "https://billabongsolar.com.au/wp-content/uploads/2024/06/log-new.webp",
        width: 400,
        height: 200,
        alt: "Billabong Solar Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Billabong Solar | Victoria's Trusted Solar Installer",
    description:
      "Victoria's trusted New Energy Tech Approved solar installer. Free quotes. Tier-1 panels.",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://billabongsolar.com.au",
  },
  other: {
    "geo.region": "AU-VIC",
    "geo.placename": "Victoria, Australia",
    "geo.position": "-37.8136;144.9631",
    ICBM: "-37.8136, 144.9631",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Roboto:wght@300;400;500;600;700&family=Roboto+Slab:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="font-sans text-solar-gray antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <ChatAssistPopup />
      </body>
    </html>
  );
}
