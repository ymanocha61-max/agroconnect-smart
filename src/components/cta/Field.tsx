import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const fieldControlClass =
  "w-full rounded-md border border-border bg-background px-4 text-base text-foreground shadow-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none disabled:opacity-60";

export const inputClass = cn(fieldControlClass, "h-12");
export const textareaClass = cn(fieldControlClass, "min-h-28 py-3 leading-relaxed");
export const selectClass = cn(inputClass, "appearance-none pr-10");

export function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string | undefined;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span className="ml-1 text-primary" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {hint ? <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p> : null}
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
