import type { Metadata } from "next";
import HeroSlider from "@/components/sections/HeroSlider";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import NewEnergyTech from "@/components/sections/NewEnergyTech";
import GetInTouchForm from "@/components/sections/GetInTouchForm";
import Testimonials from "@/components/sections/Testimonials";
import BlogCarousel from "@/components/sections/BlogCarousel";

export const metadata: Metadata = {
  title: "Residential Solar Victoria | Save Up to $100,000/Year | Billabong Solar",
  description:
    "Billabong Solar – Victoria's trusted residential solar installer. Tier-1 panels, accredited electricians, government rebates up to $5,000. Get your free solar quote today. Save up to $100,000/year.",
  keywords: [
    "residential solar Victoria",
    "solar panels Melbourne",
    "solar installation Victoria",
    "government solar rebates Victoria",
    "Tier-1 solar panels",
    "solar quotes Victoria",
    "cheap solar panels Melbourne",
    "solar power Victoria",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Residential Solar Victoria | Save Up to $100,000/Year | Billabong Solar",
    description:
      "Victoria's trusted residential solar installer. Tier-1 panels, accredited electricians, government rebates. Get your free quote today.",
    url: "/",
    images: [
      {
        url: "https://i0.wp.com/billabongsolar.com.au/wp-content/uploads/2025/10/Slider-Residential-Solar-Save-Electricity-Bill.webp?w=1200&ssl=1",
        width: 1200,
        height: 630,
        alt: "Billabong Solar Residential Solar Victoria",
      },
    ],
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://billabongsolar.com.au"}/#webpage`,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://billabongsolar.com.au",
  name: "Residential Solar Victoria | Billabong Solar",
  description:
    "Victoria's trusted residential solar installer. Tier-1 panels, accredited electricians, government rebates.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: process.env.NEXT_PUBLIC_SITE_URL || "https://billabongsolar.com.au",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {/* Hero Slider - 3 full-width slides */}
      <HeroSlider />

      {/* How It Works - 4 steps */}
      <HowItWorks />

      {/* Why Choose Billabong Solar - Accordion + image */}
      <WhyChooseUs />

      {/* New Energy Tech Approved Seller + Warranty Badges */}
      <NewEnergyTech />

      {/* Get In Touch Form */}
      <GetInTouchForm />

      {/* Testimonials - dark navy bg */}
      <Testimonials />

      {/* Solar News Blog Carousel */}
      <BlogCarousel />
    </>
  );
}
