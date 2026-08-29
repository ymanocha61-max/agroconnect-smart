import { Boxes, MapPin, Route, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CTAButton } from "@/components/ui/cta-button";
import { useCTA } from "./cta-context";
import { ModalShell } from "./ModalShell";

const points: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Boxes,
    title: "Aggregation first",
    body: "Produce from nearby farmers and FPOs is grouped into a single, fuller load.",
  },
  {
    icon: Route,
    title: "Optimized routes",
    body: "Pickups are sequenced to cut empty travel and keep distance down.",
  },
  {
    icon: Timer,
    title: "Faster movement",
    body: "Shorter time between harvest and delivery means fresher produce on arrival.",
  },
  {
    icon: MapPin,
    title: "Trackable trips",
    body: "Both sides can see where the consignment is through the journey.",
  },
];

export function LogisticsModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { open: openModal } = useCTA();

  return (
    <ModalShell
      open={open}
      onOpenChange={onOpenChange}
      title="Smart Logistics, Explained"
      description="How produce moves from multiple farms to a buyer with fewer trips, less handling and better visibility."
    >
      <ul className="flex flex-col gap-4">
        {points.map((point) => (
          <li key={point.title} className="flex gap-4 rounded-xl border border-border p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-leaf-soft text-leaf">
              <point.icon className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-leaf sm:text-base">{point.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{point.body}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <CTAButton size="lg" className="w-full" onClick={() => openModal("farmer")}>
          Join as Farmer / FPO
        </CTAButton>
        <CTAButton
          size="lg"
          variant="outline"
          className="w-full"
          onClick={() => openModal("requirement")}
        >
          Post Your Requirement
        </CTAButton>
      </div>
    </ModalShell>
  );
}
