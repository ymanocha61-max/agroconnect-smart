import { useOpenCTA } from "@/components/cta/cta-context";
import { useEffect, useState } from "react";
import { Menu, X, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { CTAButton } from "@/components/ui/cta-button";

const navLinks = [
  { label: "Marketplace", href: "#marketplace" },
  { label: "For Farmers", href: "#farmers" },
  { label: "For Buyers", href: "#buyers" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "AI Insights", href: "#ai-insights" },
  { label: "Logistics", href: "#logistics" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-background/60",
      )}
    >
      <Container size="wide">
        <div
          className={cn(
            "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 transition-all duration-300 lg:flex lg:justify-between",
            scrolled ? "h-14 lg:h-16" : "h-16 lg:h-20",
          )}
        >
          <a href="#top" className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-md bg-leaf text-primary-foreground">
              <Sprout className="size-5" aria-hidden="true" />
            </span>
            <span className="truncate font-display text-lg font-semibold tracking-tight text-leaf sm:text-xl">
              Krishisetu
            </span>
          </a>

          <nav aria-label="Main" className="hidden lg:flex lg:items-center lg:gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-leaf"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <CTAButton variant="ghost" size="sm">
              Login
            </CTAButton>
            <CTAButton size="sm" onClick={openFarmer}>Join Marketplace</CTAButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 shrink-0 place-items-center rounded-md border border-border bg-surface text-leaf lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div
          id="mobile-menu"
          className="animate-rise border-t border-border bg-background lg:hidden"
        >
          <Container>
            <nav aria-label="Mobile" className="flex flex-col py-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-3 border-t border-border py-5">
              <CTAButton variant="outline" block>
                Login
              </CTAButton>
              <CTAButton block onClick={() => { setOpen(false); openFarmer(); }}>Join Marketplace</CTAButton>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
