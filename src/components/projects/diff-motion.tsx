"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// The comparison itself is a Server Component passed through this narrow slot.
export function DiffMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const played = useRef(false);

  useGSAP((_context, contextSafe) => {
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      if (!context.conditions?.motion) {
        played.current = true;
        return;
      }
      if (played.current || !root.current || !contextSafe) return;
      const heading = root.current.querySelector("[data-diff-trigger]");
      if (!heading || !("IntersectionObserver" in window)) return;

      const play = contextSafe(() => {
        if (played.current) return;
        played.current = true;
        // Register the delayed timeline with the media context as well as the
        // component context, so changing motion preferences reverts it at once.
        context.add(() => {
          gsap.timeline({ defaults: { ease: "power1.out", clearProps: "opacity,transform" } })
            .fromTo("[data-diff-arrow]", { scaleX: 0.45, opacity: 0.7 }, { scaleX: 1, opacity: 1, duration: 0.18 }, 0)
            .fromTo("[data-diff-after]", { y: 4, opacity: 0.9 }, { y: 0, opacity: 1, duration: 0.32, stagger: 0.04 }, 0.12)
            .fromTo("[data-diff-note]", { y: 2, opacity: 0.9 }, { y: 0, opacity: 1, duration: 0.2 }, 0.45);
        });
      });
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          play();
        }
      }, { rootMargin: "0px 0px -20% 0px", threshold: 0.25 });
      observer.observe(heading);
      return () => observer.disconnect();
    }, root);
    return () => media.revert();
  }, { scope: root });

  return <section ref={root} className="sringeri-diff" aria-labelledby="sringeri-diff-title">{children}</section>;
}
