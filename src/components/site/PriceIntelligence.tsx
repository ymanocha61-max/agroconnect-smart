import { ArrowUpRight, Store, TrendingUp, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { CTAButton } from "@/components/ui/cta-button";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const rows: { icon: LucideIcon; label: string; value: string; note: string }[] = [
  { icon: Store, label: "Local Market", value: "₹18/kg", note: "Nearby mandi reference" },
  { icon: TrendingUp, label: "Platform Demand", value: "₹21/kg", note: "Active buyer interest" },
  { icon: Users, label: "Bulk Buyer Interest", value: "₹22/kg", note: "Large-quantity requirement" },
];

export function PriceIntelligence({ onGetInsight }: { onGetInsight?: () => void }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <SectionWrapper id="market-intelligence">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Price &amp; Market Intelligence
          </p>
          <h2 className="mt-4 text-[1.85rem] leading-tight text-leaf sm:text-4xl">
            Know the Market Before You Sell
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Compare what your crop could fetch across different channels — local markets, buyers
            active on the platform, and bulk requirements — so pricing is a decision, not a guess.
          </p>
          <CTAButton size="lg" className="mt-8 w-full sm:w-auto" onClick={onGetInsight}>
            Get Market Insight
            <ArrowUpRight aria-hidden="true" />
          </CTAButton>
        </div>

        <div
          ref={ref}
          className={cn(
            "rounded-2xl border border-border bg-surface p-5 shadow-soft transition-all duration-700 sm:p-7",
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Crop
              </p>
              <p className="mt-1 text-xl font-semibold text-leaf">Tomato</p>
            </div>
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-leaf-soft px-3 py-1 text-xs font-semibold text-leaf">
              Demand: HIGH <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </span>
          </div>

          <ul className="mt-2 divide-y divide-border">
            {rows.map((row, i) => (
              <li
                key={row.label}
                className={cn(
                  "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-4 transition-all duration-500",
                  visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
                style={{ transitionDelay: `${150 + i * 120}ms` }}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-md bg-leaf-soft text-leaf">
                    <row.icon className="size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{row.label}</p>
                    <p className="truncate text-xs text-muted-foreground">{row.note}</p>
                  </div>
                </div>
                <p className="shrink-0 text-lg font-semibold text-leaf">{row.value}</p>
              </li>
            ))}
          </ul>

          <p className="mt-2 rounded-md bg-surface-muted px-3 py-2 text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Sample / Demo Data.</span> Shown for
            illustration only — these are not live market prices.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
