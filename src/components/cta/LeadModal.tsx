import { ChevronDown, CircleCheckBig, Loader2, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { CTAButton } from "@/components/ui/cta-button";
import { Field, inputClass, selectClass, textareaClass } from "./Field";
import { ModalShell } from "./ModalShell";

const roles = [
  "Farmer",
  "FPO",
  "Bulk Buyer",
  "Retailer",
  "Restaurant",
  "Institution",
  "Consumer",
  "Other",
] as const;

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Name must be under 100 characters."),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s-]{7,15}$/, "Enter a valid phone number (7-15 digits)."),
  email: z.string().trim().email("Enter a valid email address.").max(255),
  role: z.enum(roles, { errorMap: () => ({ message: "Please select your role." }) }),
  location: z
    .string()
    .trim()
    .min(2, "Please enter your district, city or state.")
    .max(120, "Location must be under 120 characters."),
  why: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least 10 characters.")
    .max(1000, "Please keep this under 1000 characters."),
});

type Values = z.input<typeof schema>;
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = { name: "", phone: "", email: "", role: "" as Values["role"], location: "", why: "" };

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: "farmer" | "buyer";
};

const copy = {
  farmer: {
    title: "Grow Your Market Reach",
    description:
      "Join a digital marketplace that helps farmers and FPOs connect with verified buyers, understand demand and make smarter selling decisions.",
    defaultRole: "Farmer" as const,
    submit: "Join the Marketplace",
  },
  buyer: {
    title: "Find the Produce You Need",
    description:
      "Tell us what you need and discover opportunities to source agricultural produce directly from farmers and FPOs.",
    defaultRole: "Bulk Buyer" as const,
    submit: "Submit Your Details",
  },
};

export function LeadModal({ open, onOpenChange, variant }: Props) {
  const c = copy[variant];
  const [values, setValues] = useState<Values>({ ...empty, role: c.defaultRole });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      setValues({ ...empty, role: c.defaultRole });
      setErrors({});
      setStatus("idle");
    }, 0);
    return () => clearTimeout(t);
  }, [open, c.defaultRole]);

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
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <ModalShell
      open={open}
      onOpenChange={onOpenChange}
      title={status === "success" ? "You're on the list!" : c.title}
      {...(status === "success" ? {} : { description: c.description })}
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
          <Field id="lead-name" label="Name" required error={errors.name}>
            <input
              id="lead-name"
              name="name"
              type="text"
              autoComplete="name"
              className={inputClass}
              placeholder="Your full name"
              value={values.name}
              aria-invalid={!!errors.name}
              onChange={(e) => set("name")(e.target.value)}
            />
          </Field>

          <Field id="lead-phone" label="Phone Number" required error={errors.phone}>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className={inputClass}
              placeholder="+91 98765 43210"
              value={values.phone}
              aria-invalid={!!errors.phone}
              onChange={(e) => set("phone")(e.target.value)}
            />
          </Field>

          <Field id="lead-email" label="Email" required error={errors.email}>
            <input
              id="lead-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              className={inputClass}
              placeholder="you@example.com"
              value={values.email}
              aria-invalid={!!errors.email}
              onChange={(e) => set("email")(e.target.value)}
            />
          </Field>

          <Field id="lead-role" label="Role" required error={errors.role}>
            <div className="relative">
              <select
                id="lead-role"
                name="role"
                className={selectClass}
                value={values.role}
                aria-invalid={!!errors.role}
                onChange={(e) => set("role")(e.target.value)}
              >
                <option value="">Select your role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
          </Field>

          <Field id="lead-location" label="Location" required error={errors.location}>
            <input
              id="lead-location"
              name="location"
              type="text"
              className={inputClass}
              placeholder="District, City or State"
              value={values.location}
              aria-invalid={!!errors.location}
              onChange={(e) => set("location")(e.target.value)}
            />
          </Field>

          <Field
            id="lead-why"
            label="Why do you want to join?"
            required
            error={errors.why}
            hint="Tell us what you are looking to achieve so we can connect you with the right opportunities, buyers, suppliers and services."
          >
            <textarea
              id="lead-why"
              name="why"
              className={textareaClass}
              placeholder="e.g. I want to find better buyers for my produce."
              value={values.why}
              aria-invalid={!!errors.why}
              onChange={(e) => set("why")(e.target.value)}
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
                Submitting…
              </>
            ) : (
              c.submit
            )}
          </CTAButton>
        </form>
      )}
    </ModalShell>
  );
}
