import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Problem } from "@/components/site/Problem";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Farmers } from "@/components/site/Farmers";
import { Buyers } from "@/components/site/Buyers";
import { AIForecasting } from "@/components/site/AIForecasting";
import { Logistics } from "@/components/site/Logistics";

const title = "Krishisetu — Sell Smarter. Buy Direct. Move Produce Faster.";
const description =
  "AI-powered farm-to-market marketplace connecting farmers, FPOs and verified buyers with demand insights, price intelligence and smarter logistics.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Farmers />
        <Buyers />
        <AIForecasting />
        <Logistics />
      </main>
    </div>
  );
}
