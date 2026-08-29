import { ClipboardList, Users, BrainCircuit, Route, Handshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Step = {
  number: string;
  title: string;
  icon: LucideIcon;
  items?: string[];
  body?: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "List Produce",
    icon: ClipboardList,
    items: ["Crop", "Quantity", "Quality", "Location", "Harvest Date"],
  },
  {
    number: "02",
    title: "Match With Buyers",
    icon: Users,
    items: ["Consumers", "Retailers", "Restaurants", "Bulk Buyers", "Institutions"],
  },
  {
    number: "03",
    title: "Predict Demand",
    icon: BrainCircuit,
    body: "AI analyzes relevant signals to estimate upcoming demand.",
  },
  {
    number: "04",
    title: "Optimize Logistics",
    icon: Route,
    body: "Orders are aggregated and routes are optimized.",
  },
  {
    number: "05",
    title: "Complete the Trade",
    icon: Handshake,
    body: "Produce reaches the buyer through an organized supply chain.",
  },
];

export function HowItWorks() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);

  return (
    <SectionWrapper id="how-it-works" className="bg-surface-muted/50" size="wide">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          How It Works
        </p>
        <h2 className="mt-4 text-[1.85rem] leading-tight text-leaf sm:text-4xl lg:text-[2.75rem]">
          From Farm to Market — One Connected Flow
        </h2>
      </div>

      <div ref={ref} className="relative mt-12 lg:mt-20">
        {/* Connector: vertical on mobile, horizontal on desktop */}
        <span
          aria-hidden="true"
          className="absolute left-[1.4rem] top-2 bottom-2 w-px bg-border lg:left-0 lg:right-0 lg:top-[3.3rem] lg:bottom-auto lg:h-px lg:w-auto"
        />

        <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
          {steps.map((step, i) => (
            <li
              key={step.number}
              className={cn(
                "group relative pl-16 transition-all duration-500 lg:pl-0",
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="absolute left-0 top-0 grid size-11 place-items-center rounded-full border border-border bg-background text-leaf lg:relative lg:mb-6 lg:size-[3.3rem] lg:transition-colors lg:group-hover:border-primary lg:group-hover:bg-primary lg:group-hover:text-primary-foreground">
                <step.icon className="size-5" aria-hidden="true" />
              </span>

              <div className="rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft sm:p-6">
                <p className="font-display text-sm font-semibold tracking-[0.12em] text-primary">
                  {step.number}
                </p>
                <h3 className="mt-1.5 text-lg font-semibold text-leaf">{step.title}</h3>

                {step.items ? (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {step.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SectionWrapper>
  );
}
