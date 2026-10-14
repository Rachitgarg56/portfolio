import type { ComponentPropsWithoutRef } from "react";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  "aria-labelledby": string;
};

// The caller owns its heading level and associates it via aria-labelledby.
export function Section({ className = "", ...props }: SectionProps) {
  return <section className={`section ${className}`} {...props} />;
}
