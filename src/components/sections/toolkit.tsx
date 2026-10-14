import { Section } from "@/components/layout/section";
import { toolkit } from "@/data/toolkit";

export function Toolkit() {
  return (
    <Section id="toolkit" tabIndex={-1} aria-labelledby="toolkit-title" className="toolkit-section">
      <div className="section-heading mb-0">
        <p className="type-label text-muted">04 / Engineering toolkit</p>
        <div>
          <h2 id="toolkit-title" className="type-heading">Tools follow the problem.</h2>
          <p className="section-description">A compact view of the technologies and practices supported by the work above.</p>
          <dl className="toolkit-list">
            {toolkit.map((group) => <div key={group.label}><dt>{group.label}</dt><dd>{group.items.join(" · ")}</dd></div>)}
          </dl>
        </div>
      </div>
    </Section>
  );
}
