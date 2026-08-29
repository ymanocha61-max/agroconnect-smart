import { useOpenCTA } from "@/components/cta/cta-context";
import { Sparkles, Sprout, Store } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { CTAButton } from "@/components/ui/cta-button";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Props = {
  onJoinFarmer?: () => void;
  onPostRequirement?: () => void;
  onCheckCrop?: () => void;
};

export function FinalCTA({ onJoinFarmer, onPostRequirement, onCheckCrop }: Props) {
  const openFarmer = useOpenCTA("farmer");
  const openBuyer = useOpenCTA("buyer");
  const openCrop = useOpenCTA("crop");
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <SectionWrapper id="get-started" className="bg-leaf text-primary-foreground">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-[1.9rem] leading-tight sm:text-4xl">Ready to Trade Smarter?</h2>
        <p className="mt-5 text-base leading-relaxed text-primary-foreground/80">
          Whether you&apos;re growing produce or sourcing it, we&apos;re building a smarter way to
          connect farms with markets.
        </p>
      </div>

      <div ref={ref} className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
        {[
          {
            icon: Sprout,
            eyebrow: "Farmers & FPOs",
            body: "List your produce and reach relevant buyers.",
            cta: "Join as Farmer / FPO",
            onClick: onJoinFarmer ?? openFarmer,
          },
          {
            icon: Store,
            eyebrow: "Buyers",
            body: "Tell us what you need and discover potential suppliers.",
            cta: "Post Your Requirement",
            onClick: onPostRequirement ?? openBuyer,
          },
        ].map((card, i) => (
          <div
            key={card.eyebrow}
            className={cn(
              "flex flex-col rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-7 backdrop-blur-sm transition-all duration-500",
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <span className="grid size-11 place-items-center rounded-md bg-primary-foreground/15">
              <card.icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">{card.eyebrow}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-primary-foreground/80">
              {card.body}
            </p>
            <CTAButton
              size="md"
              variant="outline"
              className="mt-6 w-full border-transparent bg-surface text-leaf hover:bg-surface-muted"
              onClick={card.onClick}
            >
              {card.cta}
            </CTAButton>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-4 rounded-2xl border border-primary-foreground/15 px-6 py-7 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground/70">
          Not ready to join yet?
        </p>
        <p className="text-lg font-semibold sm:text-xl">
          Get Your Free AI Crop Demand &amp; Market Insight
        </p>
        <CTAButton
          size="lg"
          variant="ghost"
          className="w-full border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
          onClick={onCheckCrop ?? openCrop}
        >
          <Sparkles aria-hidden="true" />
          Check My Crop
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}
