import { Users, PackageSearch, Eye, Route } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { CTAButton } from "@/components/ui/cta-button";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const benefits: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Users,
    title: "Discover Suppliers",
    body: "Find farmers and FPOs based on crop, location and quantity.",
  },
  {
    icon: PackageSearch,
    title: "Bulk Procurement",
    body: "Post requirements for larger quantities.",
  },
  {
    icon: Eye,
    title: "Better Supply Visibility",
    body: "Understand available supply before procurement.",
  },
  {
    icon: Route,
    title: "Organized Logistics",
    body: "Coordinate pickup and delivery.",
  },
];

export function Buyers({ onPostRequirement }: { onPostRequirement?: () => void }) {
  const { ref, visible } = useReveal<HTMLUListElement>();

  return (
    <SectionWrapper id="buyers" className="bg-surface-muted/50">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">For Buyers</p>
        <h2 className="mt-4 text-[1.85rem] leading-tight text-leaf sm:text-4xl">
          Source Fresh Produce Directly From the Source
        </h2>
      </div>

      <ul ref={ref} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, i) => (
          <li
            key={benefit.title}
            className={cn(
              "rounded-xl border border-border bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft",
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

      <CTAButton size="lg" className="mt-10 w-full sm:w-auto" onClick={onPostRequirement}>
        Post Your Requirement
      </CTAButton>
    </SectionWrapper>
  );
}
