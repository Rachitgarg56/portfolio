import { Section } from "@/components/layout/section";
import { now } from "@/data/toolkit";

export function Now() {
  return (
    <Section id="now" tabIndex={-1} aria-labelledby="now-title" className="now-section">
      <p className="type-label text-muted">05 / Now</p>
      <h2 id="now-title" className="type-heading now-title">Where I’m headed.</h2>
      <dl className="now-list">
        {now.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
      </dl>
    </Section>
  );
}
