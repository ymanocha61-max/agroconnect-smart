import { ArrowRight, ArrowUpRight, ArrowDownRight, MoveRight, MapPin, CalendarClock, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { CTAButton } from "@/components/ui/cta-button";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Signal = "HIGH" | "MEDIUM" | "LOW";

const crops: { name: string; signal: Signal; level: number; series: number[] }[] = [
  { name: "Tomato", signal: "HIGH", level: 86, series: [30, 42, 38, 55, 64, 78, 86] },
  { name: "Potato", signal: "MEDIUM", level: 54, series: [48, 50, 46, 52, 51, 55, 54] },
  { name: "Onion", signal: "HIGH", level: 79, series: [35, 40, 52, 58, 66, 72, 79] },
  { name: "Carrot", signal: "LOW", level: 28, series: [58, 52, 48, 41, 36, 31, 28] },
];

const signalMeta: Record<Signal, { icon: LucideIcon; className: string }> = {
  HIGH: { icon: ArrowUpRight, className: "bg-primary/12 text-primary" },
  MEDIUM: { icon: MoveRight, className: "bg-harvest/20 text-earth" },
  LOW: { icon: ArrowDownRight, className: "bg-muted text-muted-foreground" },
};

const questions: { icon: LucideIcon; q: string; a: string }[] = [
  {
    icon: MapPin,
    q: "Where should I sell?",
    a: "Identify regions or buyer segments with stronger demand.",
  },
  {
    icon: CalendarClock,
    q: "When should I sell?",
    a: "Understand potential demand windows.",
  },
  {
    icon: BarChart3,
    q: "How much demand could there be?",
    a: "Use forecasts to support supply planning.",
  },
];

function Sparkline({ series, muted }: { series: number[]; muted: boolean }) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const points = series
    .map((v, i) => {
      const x = (i / (series.length - 1)) * 100;
      const y = 30 - ((v - min) / Math.max(max - min, 1)) * 26 - 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-9 w-full" aria-hidden="true">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={muted ? "text-muted-foreground/60" : "text-primary"}
      />
    </svg>
  );
}

export function AIForecasting() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.12);

  return (
    <SectionWrapper id="ai-insights" className="bg-background" size="wide">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          AI Demand Forecasting
        </p>
        <h2 className="mt-4 text-[1.85rem] leading-tight text-leaf sm:text-4xl lg:text-[2.75rem]">
          Don&apos;t Just React to Demand. Predict It.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Our future AI engine can analyze historical transactions, seasonal patterns, market
          signals, buyer requirements and other relevant data to estimate upcoming demand.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
        {/* Mock dashboard */}
        <div
          ref={ref}
          className={cn(
            "rounded-2xl border border-border bg-surface p-5 shadow-soft transition-all duration-700 sm:p-7",
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-leaf sm:text-lg">
                Demand Outlook — Next 30 Days
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">Regional aggregate, all buyers</p>
            </div>
            <span className="shrink-0 rounded-md bg-secondary px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-secondary-foreground">
              Sample AI Insight — Demo Data
            </span>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {crops.map((crop, i) => {
              const meta = signalMeta[crop.signal];
              return (
                <li
                  key={crop.name}
                  className="rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary/40 sm:p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate font-semibold text-leaf">{crop.name}</span>
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[0.7rem] font-semibold tracking-wide",
                        meta.className,
                      )}
                    >
                      {crop.signal}
                      <meta.icon className="size-3.5" aria-hidden="true" />
                    </span>
                  </div>

                  <Sparkline series={crop.series} muted={crop.signal === "LOW"} />

                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <span
                      className={cn(
                        "block h-full rounded-full transition-[width] duration-1000 ease-out",
                        crop.signal === "LOW" ? "bg-muted-foreground/50" : "bg-primary",
                      )}
                      style={{
                        width: visible ? `${crop.level}%` : "0%",
                        transitionDelay: `${200 + i * 120}ms`,
                      }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Confidence index {crop.level}/100
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Questions */}
        <div className="flex flex-col justify-between gap-8">
          <ul className="grid gap-4">
            {questions.map((item) => (
              <li
                key={item.q}
                className="flex gap-4 rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-md bg-leaf-soft text-leaf">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-leaf">{item.q}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </div>
              </li>
            ))}
          </ul>

          <CTAButton size="lg" className="w-full sm:w-auto lg:self-start">
            Check My Crop
            <ArrowRight aria-hidden="true" />
          </CTAButton>
        </div>
      </div>
    </SectionWrapper>
  );
}
