import { Leaf } from "lucide-react";
import { Container } from "@/components/layout/Container";

const groups: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Platform",
    links: [
      { label: "Marketplace", href: "#how-it-works" },
      { label: "For Farmers", href: "#farmers" },
      { label: "For Buyers", href: "#buyers" },
    ],
  },
  {
    heading: "Capabilities",
    links: [
      { label: "AI Insights", href: "#ai-forecasting" },
      { label: "Logistics", href: "#logistics" },
      { label: "Market Intelligence", href: "#market-intelligence" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#impact" },
      { label: "Contact", href: "#get-started" },
      { label: "FAQs", href: "#trust" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          <div className="max-w-sm">
            <span className="flex items-center gap-2 text-leaf">
              <span className="grid size-9 place-items-center rounded-md bg-leaf-soft">
                <Leaf className="size-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-semibold">Krishisetu</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              An AI-powered farm-to-market marketplace connecting farmers and FPOs with verified
              buyers.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {groups.map((group) => (
              <div key={group.heading}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                  {group.heading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-leaf"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">© 2026 Krishisetu. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
