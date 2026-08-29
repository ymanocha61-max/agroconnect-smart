import { useOpenCTA } from "@/components/cta/cta-context";
import { Store, LineChart, Search, Boxes, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { CTAButton } from "@/components/ui/cta-button";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const benefits: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Store,
    title: "Sell Directly",
    body: "Connect with verified buyers and reduce dependence on fragmented market channels.",
  },
  {
    icon: LineChart,
    title: "Understand Demand",
    body: "Get demand insights that can help inform selling decisions.",
  },
  {
    icon: Search,
    title: "Discover Opportunities",
    body: "Find potential buyers based on crop, location and quantity.",
  },
  {
    icon: Boxes,
    title: "Aggregate Through FPOs",
    body: "Allow FPOs to combine supply from multiple farmers.",
  },
  {
    icon: Truck,
    title: "Simplify Logistics",
    body: "Coordinate collection and delivery more efficiently.",
  },
];

export function Farmers({ onJoin }: { onJoin?: () => void }) {
  const openFarmer = useOpenCTA("farmer");
  const { ref, visible } = useReveal<HTMLUListElement>();

  return (
    <SectionWrapper id="farmers" className="bg-background">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            For Farmers &amp; FPOs
          </p>
          <h2 className="mt-4 text-[1.85rem] leading-tight text-leaf sm:text-4xl">
            More Market Access. Better Decisions.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Built for individual growers and farmer producer organisations who want fairer prices
            and fewer intermediaries.
          </p>
          <CTAButton size="lg" className="mt-8 w-full sm:w-auto" onClick={onJoin ?? openFarmer}>
            Join as Farmer / FPO
          </CTAButton>
        </div>

        <ul ref={ref} className="grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit, i) => (
            <li
              key={benefit.title}
              className={cn(
                "rounded-xl border border-border bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft",
                i === benefits.length - 1 && "sm:col-span-2",
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="grid size-10 place-items-center rounded-md bg-leaf-soft text-leaf">
                <benefit.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-leaf sm:text-lg">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
