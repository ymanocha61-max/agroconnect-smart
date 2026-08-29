import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";
import { Container } from "./Container";

type SectionWrapperProps = {
  children: ReactNode;
  id?: string;
  as?: ElementType;
  className?: string;
  containerClassName?: string;
  size?: "default" | "wide" | "narrow";
  bare?: boolean;
};

export function SectionWrapper({
  children,
  id,
  as: Tag = "section",
  className,
  containerClassName,
  size = "default",
  bare = false,
}: SectionWrapperProps) {
  return (
    <Tag id={id} className={cn("relative py-16 sm:py-20 lg:py-28", className)}>
      {bare ? (
        children
      ) : (
        <Container size={size} className={containerClassName}>
          {children}
        </Container>
      )}
    </Tag>
  );
}
