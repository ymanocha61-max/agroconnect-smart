import { ArrowUpRight, Loader2, Sparkles, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { CTAButton } from "@/components/ui/cta-button";
import { Field, inputClass } from "./Field";
import { ModalShell } from "./ModalShell";

const schema = z.object({
  crop: z.string().trim().min(2, "Please enter a crop name.").max(80),
  location: z.string().trim().min(2, "Please enter your district, city or state.").max(120),
  quantity: z.string().trim().min(1, "Please enter an expected quantity.").max(60),
  harvestDate: z.string().trim().min(1, "Please choose an expected harvest date."),
});

type Values = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Values, string>>;
const empty: Values = { crop: "", location: "", quantity: "", harvestDate: "" };

export function CropInsightModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "result" | "error">("idle");

  useEffect(() => {
    if (!open) return;
    setValues(empty);
    setErrors({});
    setStatus("idle");
  }, [open]);

  const set = (key: keyof Values) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Values;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setStatus("loading");
    try {
      await new Promise((r) => setTimeout(r, 1100));
      setStatus("result");
    } catch {
      setStatus("error");
    }
  }

  const insight = [
    { label: "Expected Demand", value: "High" },
    { label: "Demand Trend", value: "Rising over the next 3 weeks" },
    { label: "Suggested Selling Window", value: "Within 10-14 days of harvest" },
    { label: "Potential Buyer Interest", value: "Bulk buyers, retailers and restaurants" },
    {
      label: "Suggested Action",
      value: "Stagger sales across two lots and confirm logistics before harvest.",
    },
  ];

  return (
    <ModalShell
      open={open}
      onOpenChange={onOpenChange}
      title={status === "result" ? "Sample AI Insight — Demo Data" : "Discover Your Crop's Market Potential"}
      {...(status === "result"
        ? {}
        : {
            description:
              "Get a sample AI-powered demand insight based on your crop, location, quantity and expected harvest date.",
          })}
    >
      {status === "result" ? (
        <div className="flex flex-col gap-5">
          <p className="rounded-md bg-surface-muted px-3 py-2 text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Demo data.</span> This is an
            illustrative sample insight for{" "}
            <span className="font-medium text-leaf">{values.crop}</span> in {values.location} — not a
            live market forecast.
          </p>

          <dl className="divide-y divide-border rounded-xl border border-border">
            {insight.map((row) => (
              <div key={row.label} className="grid gap-1 px-4 py-3.5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {row.label}
                </dt>
                <dd className="text-sm font-medium text-leaf">
                  {row.label === "Expected Demand" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-leaf-soft px-2.5 py-0.5">
                      {row.value} <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </span>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-3 sm:flex-row">
            <CTAButton size="lg" className="w-full" onClick={() => onOpenChange(false)}>
              Close
            </CTAButton>
            <CTAButton
              size="lg"
              variant="outline"
              className="w-full"
              onClick={() => setStatus("idle")}
            >
              Try another crop
            </CTAButton>
          </div>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Field id="crop-name" label="Crop" required error={errors.crop}>
            <input
              id="crop-name"
              type="text"
              className={inputClass}
              placeholder="e.g. Tomato"
              value={values.crop}
              aria-invalid={!!errors.crop}
              onChange={(e) => set("crop")(e.target.value)}
            />
          </Field>

          <Field id="crop-location" label="Location" required error={errors.location}>
            <input
              id="crop-location"
              type="text"
              className={inputClass}
              placeholder="District, City or State"
              value={values.location}
              aria-invalid={!!errors.location}
              onChange={(e) => set("location")(e.target.value)}
            />
          </Field>

          <Field id="crop-quantity" label="Expected Quantity" required error={errors.quantity}>
            <input
              id="crop-quantity"
              type="text"
              inputMode="numeric"
              className={inputClass}
              placeholder="e.g. 2000 kg"
              value={values.quantity}
              aria-invalid={!!errors.quantity}
              onChange={(e) => set("quantity")(e.target.value)}
            />
          </Field>

          <Field
            id="crop-date"
            label="Expected Harvest Date"
            required
            error={errors.harvestDate}
          >
            <input
              id="crop-date"
              type="date"
              className={inputClass}
              value={values.harvestDate}
              aria-invalid={!!errors.harvestDate}
              onChange={(e) => set("harvestDate")(e.target.value)}
            />
          </Field>

          {status === "error" ? (
            <p
              role="alert"
              className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
            >
              <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              We couldn&apos;t generate the sample insight. Please try again.
            </p>
          ) : null}

          <CTAButton type="submit" size="lg" block disabled={status === "loading"}>
            {status === "loading" ? (
              <>
                <Loader2 className="animate-spin" aria-hidden="true" />
                Generating…
              </>
            ) : (
              <>
                <Sparkles aria-hidden="true" />
                Generate Insight
              </>
            )}
          </CTAButton>
        </form>
      )}
    </ModalShell>
  );
}
