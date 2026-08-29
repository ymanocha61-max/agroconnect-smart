import { useOpenCTA } from "@/components/cta/cta-context";
import { Sprout, Warehouse, Route, Store, ArrowRight, ArrowDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { CTAButton } from "@/components/ui/cta-button";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const features = [
  "Multi-farmer pickup",
  "Order aggregation",
  "Vehicle capacity consideration",
  "Route optimization",
  "Delivery tracking",
];

type Node = { icon: LucideIcon; title: string; caption?: string; farmers?: string[] };

const nodes: Node[] = [
  { icon: Sprout, title: "Farmers", farmers: ["Farmer A", "Farmer B", "Farmer C"] },
  { icon: Warehouse, title: "Collection / Aggregation", caption: "Produce pooled at a hub" },
  { icon: Route, title: "Optimized Route", caption: "Fewer stops, fuller loads" },
  { icon: Store, title: "Buyer", caption: "Delivered fresh, on schedule" },
];

export function Logistics() {
  const openLogistics = useOpenCTA("logistics");
  const { ref, visible } = useReveal<HTMLDivElement>(0.12);

  return (
    <SectionWrapper id="logistics" className="bg-surface-muted/50" size="wide">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Smart Logistics
        </p>
        <h2 className="mt-4 text-[1.85rem] leading-tight text-leaf sm:text-4xl lg:text-[2.75rem]">
          From Farm to Buyer, With Smarter Routes
        </h2>
      </div>

      <div
        ref={ref}
        className="mt-12 flex flex-col gap-4 lg:mt-16 lg:flex-row lg:items-stretch lg:gap-3"
      >
        {nodes.map((node, i) => (
          <div key={node.title} className="contents">
            <div
              className={cn(
                "flex-1 rounded-xl border border-border bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft",
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: `${i * 140}ms` }}
            >
              <span className="grid size-10 place-items-center rounded-md bg-leaf-soft text-leaf">
                <node.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-leaf sm:text-lg">{node.title}</h3>
              {node.farmers ? (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {node.farmers.map((farmer) => (
                    <li
                      key={farmer}
                      className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {farmer}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{node.caption}</p>
              )}
            </div>

            {i < nodes.length - 1 && (
              <div
                className="flex shrink-0 items-center justify-center text-primary/70 lg:px-1"
                aria-hidden="true"
              >
                <ArrowDown className="size-5 lg:hidden" />
                <ArrowRight className="hidden size-5 lg:block" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <ul className="flex flex-wrap gap-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground"
              >
                {feature}
              </li>
            ))}
          </ul>
          <p className="mt-8 flex flex-wrap items-center gap-3 text-base font-medium text-leaf sm:text-lg">
            <span className="h-px w-10 bg-primary" aria-hidden="true" />
            Less empty travel. Better utilization. Faster delivery.
          </p>
        </div>

        <CTAButton size="lg" variant="outline" className="w-full sm:w-auto" onClick={openLogistics}>
          Explore Smart Logistics
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}
