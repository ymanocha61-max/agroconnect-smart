import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";

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
      </main>
    </div>
  );
}
