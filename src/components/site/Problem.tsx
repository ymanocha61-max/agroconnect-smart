import { CircleDollarSign, LineChart, Truck, PackageX } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Problem = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const problems: Problem[] = [
  {
    icon: CircleDollarSign,
    title: "Uncertain Prices",
    body: "Farmers often have limited visibility into actual demand and market opportunities.",
  },
  {
    icon: LineChart,
    title: "Demand Uncertainty",
    body: "Farmers may not know where and when demand will be strongest.",
  },
  {
    icon: Truck,
    title: "Expensive Logistics",
    body: "Fragmented shipments and inefficient routes increase transportation costs.",
  },
  {
    icon: PackageX,
    title: "Supply Chain Losses",
    body: "Mismatch between supply and demand can result in avoidable wastage.",
  },
];

export function Problem() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <SectionWrapper id="problem" className="bg-background">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          The Problem
        </p>
        <h2 className="mt-4 text-[1.85rem] leading-tight text-leaf sm:text-4xl lg:text-[2.75rem]">
          The Journey From Farm to Market Shouldn&apos;t Be This Complicated
        </h2>
      </div>

      <div ref={ref} className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:gap-6">
        {problems.map((problem, i) => (
          <article
            key={problem.title}
            className={cn(
              "group relative overflow-hidden rounded-xl border border-border bg-surface p-6 transition-all duration-500 sm:p-8",
              "hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft",
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
            style={{ transitionDelay: `${i * 110}ms` }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 -top-8 size-28 rounded-full bg-secondary/70 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="relative">
              <span className="grid size-11 place-items-center rounded-md bg-leaf-soft text-leaf">
                <problem.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-leaf sm:text-xl">{problem.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {problem.body}
              </p>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-10 flex flex-wrap items-center gap-3 text-base font-medium text-leaf sm:mt-12 sm:text-lg">
        <span className="h-px w-10 bg-primary" aria-hidden="true" />
        We&apos;re building one connected solution for all four.
      </p>
    </SectionWrapper>
  );
}
