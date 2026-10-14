"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function AssetWorkflowMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const played = useRef(false);

  useGSAP((_context, contextSafe) => {
    const media = gsap.matchMedia();

    media.add(
      { motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" },
      (context) => {
        if (!context.conditions?.motion) {
          played.current = true;
          return;
        }

        if (played.current || !root.current || !contextSafe) return;
        const trigger = root.current.querySelector("[data-workflow-trigger]");
        if (!trigger || !("IntersectionObserver" in window)) return;

        const play = contextSafe(() => {
          if (played.current) return;
          played.current = true;
          context.add(() => {
            gsap.timeline({ defaults: { ease: "power1.out" } })
              .fromTo(
                "[data-workflow-connector]",
                { scale: 0.18, opacity: 0.45 },
                { scale: 1, opacity: 1, duration: 0.24, stagger: 0.045, clearProps: "opacity,transform" },
                0,
              )
              .fromTo(
                "[data-workflow-node]",
                { y: 3, opacity: 0.9 },
                { y: 0, opacity: 1, duration: 0.22, stagger: 0.05, clearProps: "opacity,transform" },
                0.08,
              );
          });
        });

        const observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              observer.disconnect();
              play();
            }
          },
          { rootMargin: "0px 0px -18% 0px", threshold: 0.25 },
        );

        observer.observe(trigger);
        return () => observer.disconnect();
      },
      root,
    );

    return () => media.revert();
  }, { scope: root });

  return <section ref={root} className="asset-workflow-preview" aria-labelledby="asset-workflow-preview-title">{children}</section>;
}
