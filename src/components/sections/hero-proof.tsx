"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export type HeroProofItem = { label: string; text: string };
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function HeroProof({ items }: { items: readonly HeroProofItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const interacted = useRef(false);
  const [selected, setSelected] = useState(0);
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);

  useGSAP(() => {
    const media = gsap.matchMedia();
    let evaluated = false;
    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      // A preference change restores CSS, without replaying the selected proof.
      if (evaluated) return;
      evaluated = true;
      if (!interacted.current || !context.conditions?.motion) return;
      const panel = root.current?.querySelector('[data-active="true"]');
      if (panel) gsap.fromTo(panel, { opacity: 0.88, y: 4 }, {
        opacity: 1, y: 0, duration: 0.2, ease: "power1.out",
        clearProps: "opacity,transform",
      });
    });
    return () => media.revert();
  }, { scope: root, dependencies: [selected], revertOnUpdate: true });

  function select(index: number) {
    if (index === selected) return;
    interacted.current = true;
    setSelected(index);
  }

  return (
    <div ref={root} className="hero-proof">
      <div className="proof-keywords" role="group" aria-label="Explore the work behind my focus">
        {items.map((item, index) => <button
          key={item.label}
          type="button"
          className="proof-keyword"
          disabled={!hydrated}
          aria-pressed={selected === index}
          aria-controls={`hero-proof-${index}`}
          onFocus={() => select(index)}
          onClick={() => select(index)}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) select(index);
          }}
        >{item.label}</button>)}
      </div>
      <div className="proof-stage" aria-live="polite" aria-atomic="true">
        {items.map((item, index) => <p
          key={item.label}
          id={`hero-proof-${index}`}
          className="proof-line"
          data-active={selected === index}
          aria-hidden={selected !== index}
        ><span className="transformation-mark" aria-hidden="true">↳</span> {item.text}</p>)}
      </div>
    </div>
  );
}
