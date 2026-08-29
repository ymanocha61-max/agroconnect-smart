import { useOpenCTA } from "@/components/cta/cta-context";
import { ArrowRight, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-farm-to-market.jpg";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { CTAButton } from "@/components/ui/cta-button";

const microcopy = ["Fair Prices", "Direct Sourcing", "AI Insights", "Smart Logistics"];

const flow = ["Farmer", "Produce", "Marketplace", "AI", "Logistics", "Buyer"];

function FloatingLeaf({ className, delay }: { className: string; delay: string }) {
  return (
    <Leaf
      aria-hidden="true"
      className={`animate-drift pointer-events-none absolute text-leaf/20 ${className}`}
      style={{ animationDelay: delay }}
    />
  );
}

export function Hero() {
  return (
    <SectionWrapper
      id="top"
      className="field-lines overflow-hidden bg-gradient-to-b from-secondary/60 via-background to-background pt-10 sm:pt-14 lg:pt-20"
      size="wide"
    >
      <FloatingLeaf className="left-[6%] top-16 size-8 sm:size-10" delay="0s" />
      <FloatingLeaf className="right-[8%] top-28 size-6 sm:size-8" delay="2.5s" />
      <FloatingLeaf className="bottom-24 left-[18%] size-5 sm:size-7" delay="5s" />

      <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div className="max-w-2xl">
          <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium tracking-wide text-leaf sm:text-sm">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            AI-powered farm-to-market network
          </p>

          <h1
            className="animate-rise mt-6 text-[2.15rem] leading-[1.08] text-leaf sm:text-5xl lg:text-6xl xl:text-[4.1rem]"
            style={{ animationDelay: "80ms" }}
          >
            Sell Smarter. Buy Direct.{" "}
            <span className="text-primary">Move Fresh Produce Faster.</span>
          </h1>

          <p
            className="animate-rise mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            Connect directly with farmers, FPOs and verified buyers while using AI-powered demand
            insights and smarter logistics to make agricultural trade more transparent and
            efficient.
          </p>

          <div
            className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "240ms" }}
          >
            <CTAButton size="lg" className="w-full sm:w-auto" onClick={openCrop}>
              Check My Crop
              <ArrowRight aria-hidden="true" />
            </CTAButton>
            <CTAButton variant="outline" size="lg" className="w-full sm:w-auto" onClick={openRequirement}>
              Post Your Requirement
            </CTAButton>
          </div>

          <ul
            className="animate-rise mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground"
            style={{ animationDelay: "320ms" }}
          >
            {microcopy.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 && <span className="text-border" aria-hidden="true">•</span>}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="animate-rise overflow-hidden rounded-xl border border-border bg-surface shadow-soft" style={{ animationDelay: "200ms" }}>
            <img
              src={heroImage}
              alt="Illustration of produce moving from a farmer's fields through a digital marketplace and AI insights to a buyer's storefront"
              width={1280}
              height={1024}
              className="h-auto w-full"
            />
          </div>

          <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:text-xs">
            {flow.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span
                  className="animate-sprout rounded-md bg-surface-muted px-2.5 py-1.5 text-leaf"
                  style={{ animationDelay: `${300 + i * 120}ms` }}
                >
                  {step}
                </span>
                {i < flow.length - 1 && (
                  <span className="text-border" aria-hidden="true">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>

          <Leaf
            aria-hidden="true"
            className="animate-sway absolute -bottom-4 -right-2 size-10 text-primary/30 sm:size-14"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
