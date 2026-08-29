import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type CTAModal = "farmer" | "buyer" | "crop" | "requirement" | "logistics";

type CTAContextValue = {
  active: CTAModal | null;
  open: (modal: CTAModal) => void;
  close: () => void;
};

const CTAContext = createContext<CTAContextValue | null>(null);

export function CTAProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<CTAModal | null>(null);
  const open = useCallback((modal: CTAModal) => setActive(modal), []);
  const close = useCallback(() => setActive(null), []);
  const value = useMemo(() => ({ active, open, close }), [active, open, close]);
  return <CTAContext.Provider value={value}>{children}</CTAContext.Provider>;
}

export function useCTA() {
  const ctx = useContext(CTAContext);
  if (!ctx) throw new Error("useCTA must be used within a CTAProvider");
  return ctx;
}

/** Convenience: returns a click handler that opens the given modal. */
export function useOpenCTA(modal: CTAModal) {
  const { open } = useCTA();
  return useCallback(() => open(modal), [open, modal]);
}
