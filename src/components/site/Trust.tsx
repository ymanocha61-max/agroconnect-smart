import { BadgeCheck, ClipboardList, Leaf, Lock, MapPin, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const items: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: BadgeCheck,
    title: "Verified Farmers / FPOs",
    body: "Seller profiles are checked before they can list produce.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Buyers",
    body: "Buyer identity and requirements are reviewed before matching.",
  },
  {
    icon: ClipboardList,
    title: "Transparent Orders",
    body: "Order details stay visible to both sides, end to end.",
  },
  {
    icon: Leaf,
    title: "Quality & Quantity Information",
    body: "Grade, quantity and harvest details captured with each listing.",
  },
  {
    icon: MapPin,
    title: "Trackable Logistics",
    body: "Pickup and delivery movement stays visible through the trip.",
  },
  {
    icon: Lock,
    title: "Secure Data Handling",
    body: "Trade and profile data handled with access controls.",
  },
];

export function Trust() {
  const { ref, visible } = useReveal<HTMLUListElement>();

  return (
    <SectionWrapper id="trust" className="bg-surface-muted/50">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Trust</p>
        <h2 className="mt-4 text-[1.85rem] leading-tight text-leaf sm:text-4xl">
          Built on Verified Trade
        </h2>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          Every trade depends on knowing who is on the other side. These are the safeguards built
          into the platform.
        </p>
      </div>

      <ul ref={ref} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li
            key={item.title}
            className={cn(
              "rounded-xl border border-border bg-surface p-6 transition-all duration-500 hover:border-primary/40 hover:shadow-soft",
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className="grid size-10 place-items-center rounded-md bg-leaf-soft text-leaf">
              <item.icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-base font-semibold text-leaf sm:text-lg">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
