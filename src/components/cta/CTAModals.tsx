import { CropInsightModal } from "./CropInsightModal";
import { LeadModal } from "./LeadModal";
import { LogisticsModal } from "./LogisticsModal";
import { RequirementModal } from "./RequirementModal";
import { useCTA } from "./cta-context";

export function CTAModals() {
  const { active, close } = useCTA();
  const onOpenChange = (next: boolean) => {
    if (!next) close();
  };

  return (
    <>
      <LeadModal variant="farmer" open={active === "farmer"} onOpenChange={onOpenChange} />
      <LeadModal variant="buyer" open={active === "buyer"} onOpenChange={onOpenChange} />
      <CropInsightModal open={active === "crop"} onOpenChange={onOpenChange} />
      <RequirementModal open={active === "requirement"} onOpenChange={onOpenChange} />
      <LogisticsModal open={active === "logistics"} onOpenChange={onOpenChange} />
    </>
  );
}
