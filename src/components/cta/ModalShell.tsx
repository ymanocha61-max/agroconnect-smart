import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ModalShellProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Responsive modal: bottom sheet on mobile, centered dialog from `sm` up.
 * Radix handles Escape, outside click, focus trap and background inertness.
 */
export function ModalShell({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: ModalShellProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-leaf/50 backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-soft outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-bottom-6 data-[state=closed]:slide-out-to-bottom-6 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 duration-300",
            "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[88dvh] sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl",
            "sm:data-[state=open]:slide-in-from-bottom-2 sm:data-[state=closed]:slide-out-to-bottom-2 sm:data-[state=open]:zoom-in-95 sm:data-[state=closed]:zoom-out-95",
            className,
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-5 sm:px-7">
            <div className="min-w-0">
              <span
                aria-hidden="true"
                className="mx-auto mb-3 block h-1 w-10 rounded-full bg-border sm:hidden"
              />
              <DialogPrimitive.Title className="text-lg font-semibold text-leaf sm:text-xl">
                {title}
              </DialogPrimitive.Title>
              {description ? (
                <DialogPrimitive.Description className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </DialogPrimitive.Description>
              ) : null}
            </div>
            <DialogPrimitive.Close
              aria-label="Close"
              className="grid size-10 shrink-0 place-items-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:bg-secondary hover:text-leaf focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <X className="size-5" aria-hidden="true" />
            </DialogPrimitive.Close>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-7">
            {children}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
