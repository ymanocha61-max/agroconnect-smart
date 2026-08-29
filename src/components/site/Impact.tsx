import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const areas: { dir: "up" | "down"; title: string; body: string }[] = [
  {
    dir: "up",
    title: "Better Market Access",
    body: "More channels for farmers and FPOs to reach relevant buyers.",
  },
  {
    dir: "down",
    title: "Supply Chain Inefficiencies",
    body: "Fewer intermediate steps between the farm and the buyer.",
  },
  {
    dir: "down",
    title: "Avoidable Wastage",
    body: "Faster movement and better planning reduce produce sitting idle.",
  },
  {
    dir: "up",
    title: "Better Demand Visibility",
    body: "Clearer signals on what buyers are looking for, and when.",
  },
];

export function Impact() {
  const { ref, visible } = useReveal<HTMLUListElement>();

  return (
    <SectionWrapper id="impact">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Impact</p>
        <h2 className="mt-4 text-[1.85rem] leading-tight text-leaf sm:text-4xl">
          Building a More Efficient Farm-to-Market Ecosystem
        </h2>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          The outcomes we are working toward as the network grows.
        </p>
      </div>

      <ul ref={ref} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {areas.map((area, i) => {
          const Icon = area.dir === "up" ? ArrowUpRight : ArrowDownRight;
          return (
            <li
              key={area.title}
              className={cn(
                "rounded-xl border border-border bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft",
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="grid size-10 place-items-center rounded-full bg-leaf-soft text-leaf">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-leaf sm:text-lg">
                {area.dir === "up" ? "More " : "Less "}
                <span className="sr-only">{area.dir === "up" ? "increase" : "decrease"}</span>
                {area.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.body}</p>
            </li>
          );
        })}
      </ul>
    </SectionWrapper>
  );
}
