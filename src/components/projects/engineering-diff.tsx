import type { ComparisonMetric, ProjectMetric } from "@/data/projects";

export function EngineeringDiff({ metric, compact = false }: { metric: ComparisonMetric; compact?: boolean }) {
  return (
    <div className={`engineering-diff${compact ? " engineering-diff-compact" : ""}`}>
      <p className="type-meta mb-4 font-medium">{metric.label}</p>
      <dl className="diff-grid" aria-label={metric.label}>
        <div className="diff-before">
          <dt className="type-label text-muted"><span aria-hidden="true">− </span>Before</dt>
          <dd className={metric.unit ? "diff-number" : "diff-text"}>{metric.before}{metric.unit && <span className="diff-unit">{metric.unit}</span>}</dd>
        </div>
        <div className="diff-after">
          <dt className="type-label text-success"><span aria-hidden="true">+ </span>After</dt>
          <dd className={metric.unit ? "diff-number" : "diff-text"}>{metric.after}{metric.unit && <span className="diff-unit">{metric.unit}</span>}</dd>
        </div>
      </dl>
      {metric.note && <p className="type-meta mt-3 text-muted">{metric.note}</p>}
    </div>
  );
}

export function ProjectResult({ metric, compact = false }: { metric: ProjectMetric; compact?: boolean }) {
  if (metric.kind === "comparison") return <EngineeringDiff metric={metric} compact={compact} />;

  return (
    <div className="outcome-result">
      <p className="type-meta font-medium">{metric.label}</p>
      <p className="type-metric mt-4 text-success">{metric.value}</p>
      {metric.qualifier && <p className="type-meta mt-2 text-muted">{metric.qualifier}</p>}
      {metric.note && <p className="type-meta mt-2 text-muted">{metric.note}</p>}
    </div>
  );
}
