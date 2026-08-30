import { createFileRoute } from "@tanstack/react-router";
import { CTAProvider } from "@/components/cta/cta-context";
import { CTAModals } from "@/components/cta/CTAModals";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Problem } from "@/components/site/Problem";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Farmers } from "@/components/site/Farmers";
import { Buyers } from "@/components/site/Buyers";
import { AIForecasting } from "@/components/site/AIForecasting";
import { Logistics } from "@/components/site/Logistics";
import { PriceIntelligence } from "@/components/site/PriceIntelligence";
import { Trust } from "@/components/site/Trust";
import { Impact } from "@/components/site/Impact";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";

const title = "AI-Powered Farm-to-Market Marketplace | Krishisetu";
const description =
  "Connect farmers, FPOs and buyers through an AI-powered agricultural marketplace with demand insights, transparent sourcing and smarter logistics.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Krishisetu" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Krishisetu",
          description,
          url: "/",
          areaServed: "IN",
          knowsAbout: [
            "agricultural marketplace",
            "crop demand forecasting",
            "farm logistics",
            "FPO produce aggregation",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CTAProvider>
      <div className="min-h-dvh bg-background">

      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Farmers />
        <Buyers />
        <AIForecasting />
        <Logistics />
        <PriceIntelligence />
        <Trust />
        <Impact />
        <FinalCTA />
      </main>
      <Footer />
      <CTAModals />
      </div>
    </CTAProvider>
  );
}
