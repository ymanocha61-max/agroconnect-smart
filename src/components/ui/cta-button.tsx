import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export const ctaButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold tracking-tight transition-[background-color,color,box-shadow,transform] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:translate-y-px [&_svg]:size-[1.1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-soft hover:bg-leaf",
        outline:
          "border border-border bg-surface text-foreground hover:border-primary hover:bg-secondary",
        ghost: "text-foreground hover:bg-secondary",
        quiet: "text-leaf underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[0.95rem]",
        lg: "h-14 px-8 text-base",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: { variant: "primary", size: "md", block: false },
  },
);

type CTAButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof ctaButtonVariants> & { asChild?: boolean };

export function CTAButton({
  className,
  variant,
  size,
  block,
  asChild = false,
  ...props
}: CTAButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(ctaButtonVariants({ variant, size, block }), className)} {...props} />
  );
}
