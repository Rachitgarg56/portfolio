import { DiffMotion } from "@/components/projects/diff-motion";
import { sringeriProject, type ComparisonMetric } from "@/data/projects";

function Comparison({ metric, prominent = false }: { metric: ComparisonMetric; prominent?: boolean }) {
  return <div className={`diff-comparison${prominent ? " diff-prominent" : ""}`}>
    <p className="diff-comparison-label">{metric.label}</p>
    <dl className="diff-pair" aria-label={metric.label}>
      <div><dt className="diff-state-label">Before</dt><dd className="diff-original">{metric.before}<span className="diff-pair-unit">{metric.unit}</span></dd></div>
      <div className="diff-resolved"><dt className="diff-state-label">After</dt><dd>
        <span className="diff-direction transformation-mark" data-diff-arrow aria-hidden="true">→</span>
        <span className="diff-improved" data-diff-after>{metric.after}<span className="diff-pair-unit">{metric.unit}</span></span>
      </dd></div>
    </dl>
  </div>;
}

export function SringeriDiff() {
  const { load, seo, accessibility, components } = sringeriProject.metrics;
  return <DiffMotion>
    <h4 id="sringeri-diff-title" className="type-label" data-diff-trigger>Engineering the improvement</h4>
    <Comparison metric={load} prominent />
    <div className="diff-supporting"><Comparison metric={seo} /><Comparison metric={accessibility} /></div>
    <div className="diff-architecture">
      <p className="diff-comparison-label">Frontend architecture</p>
      <dl className="diff-pair">
        <div><dt className="diff-state-label">Before</dt><dd className="diff-original">{sringeriProject.transformation.before}</dd></div>
        <div className="diff-resolved"><dt className="diff-state-label">After</dt><dd>
          <span className="diff-direction transformation-mark" data-diff-arrow aria-hidden="true">→</span>
          <span className="diff-improved" data-diff-after><strong>{components.value} migrated</strong><br />to {sringeriProject.transformation.after}</span>
        </dd></div>
      </dl>
    </div>
    <div className="diff-engineering-note" data-diff-note>
      <p>Component migration, performance optimization and more accessible interfaces.</p>
      <p className="result-note">Reported project results; historical scores and timings.</p>
    </div>
  </DiffMotion>;
}
