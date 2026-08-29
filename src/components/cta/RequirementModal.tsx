import { CircleCheckBig, Loader2, Search, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { CTAButton } from "@/components/ui/cta-button";
import { Field, inputClass, textareaClass } from "./Field";
import { ModalShell } from "./ModalShell";

const schema = z.object({
  product: z.string().trim().min(2, "Please enter the product you need.").max(80),
  quantity: z.string().trim().min(1, "Please enter a quantity.").max(60),
  quality: z.string().trim().min(3, "Describe the quality you expect.").max(500),
  requiredDate: z.string().trim().min(1, "Please choose a required date."),
  deliveryLocation: z.string().trim().min(2, "Please enter a delivery location.").max(120),
});

type Values = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Values, string>>;
const empty: Values = {
  product: "",
  quantity: "",
  quality: "",
  requiredDate: "",
  deliveryLocation: "",
};

export function RequirementModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
      await new Promise((r) => setTimeout(r, 1000));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <ModalShell
      open={open}
      onOpenChange={onOpenChange}
      title={status === "success" ? "You're on the list!" : "Post Your Requirement"}
      {...(status === "success"
        ? {}
        : {
            description:
              "Share what you need and we'll look for farmers and FPOs who can supply it.",
          })}
    >
      {status === "success" ? (
        <div className="flex flex-col items-center gap-5 py-4 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-leaf-soft text-leaf">
            <CircleCheckBig className="size-7" aria-hidden="true" />
          </span>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Thanks for your interest. We&apos;ll use your information to understand your needs and
            connect you with the right opportunities.
          </p>
          <CTAButton size="lg" className="w-full sm:w-auto" onClick={() => onOpenChange(false)}>
            Close
          </CTAButton>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Field id="req-product" label="Product" required error={errors.product}>
            <input
              id="req-product"
              type="text"
              className={inputClass}
              placeholder="e.g. Tomato"
              value={values.product}
              aria-invalid={!!errors.product}
              onChange={(e) => set("product")(e.target.value)}
            />
          </Field>

          <Field id="req-quantity" label="Quantity" required error={errors.quantity}>
            <input
              id="req-quantity"
              type="text"
              inputMode="numeric"
              className={inputClass}
              placeholder="e.g. 5000 kg per week"
              value={values.quantity}
              aria-invalid={!!errors.quantity}
              onChange={(e) => set("quantity")(e.target.value)}
            />
          </Field>

          <Field id="req-quality" label="Quality Requirement" required error={errors.quality}>
            <textarea
              id="req-quality"
              className={textareaClass}
              placeholder="e.g. Grade A, uniform size, firm, minimal blemishes"
              value={values.quality}
              aria-invalid={!!errors.quality}
              onChange={(e) => set("quality")(e.target.value)}
            />
          </Field>

          <Field id="req-date" label="Required Date" required error={errors.requiredDate}>
            <input
              id="req-date"
              type="date"
              className={inputClass}
              value={values.requiredDate}
              aria-invalid={!!errors.requiredDate}
              onChange={(e) => set("requiredDate")(e.target.value)}
            />
          </Field>

          <Field
            id="req-location"
            label="Delivery Location"
            required
            error={errors.deliveryLocation}
          >
            <input
              id="req-location"
              type="text"
              className={inputClass}
              placeholder="City, warehouse or store address"
              value={values.deliveryLocation}
              aria-invalid={!!errors.deliveryLocation}
              onChange={(e) => set("deliveryLocation")(e.target.value)}
            />
          </Field>

          {status === "error" ? (
            <p
              role="alert"
              className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
            >
              <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              Something went wrong while submitting. Please try again.
            </p>
          ) : null}

          <CTAButton type="submit" size="lg" block disabled={status === "loading"}>
            {status === "loading" ? (
              <>
                <Loader2 className="animate-spin" aria-hidden="true" />
                Searching…
              </>
            ) : (
              <>
                <Search aria-hidden="true" />
                Find My Supply
              </>
            )}
          </CTAButton>
        </form>
      )}
    </ModalShell>
  );
}
