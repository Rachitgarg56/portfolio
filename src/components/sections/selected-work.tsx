import Link from "next/link";
import { Section } from "@/components/layout/section";
import { professionalProjects, type OutcomeMetric, type ProjectMetric } from "@/data/projects";
import { SringeriDiff } from "@/components/projects/sringeri-diff";
import { ProjectLinks } from "@/components/projects/project-links";
import { AssetWorkflowPreview } from "@/components/projects/asset-workflow-preview";

function AssetOutcomes({ metrics }: { metrics: Record<string, ProjectMetric> }) {
  const outcomes = Object.values(metrics).filter((metric): metric is OutcomeMetric => metric.kind === "outcome");
  return (
    <dl className="project-impact-list" aria-label="Asset Management System reported outcomes">
      {outcomes.map((metric) => <div key={metric.label}>
        <dt>{metric.label}</dt>
        <dd><strong>{metric.value}</strong>{metric.qualifier && <span>{metric.qualifier}</span>}</dd>
      </div>)}
      <div className="project-impact-qualitative">
        <dt>Approved requests</dt>
        <dd><strong>Edits prevented</strong><span>Through state-driven UI rules</span></dd>
      </div>
    </dl>
  );
}

export function SelectedWork() {
  return (
    <Section id="work" tabIndex={-1} aria-labelledby="work-title" className="work-section">
      <div className="chapter-heading chapter-heading-inverse">
        <p className="type-label">01 / Production</p>
        <div><h2 id="work-title">Engineering the before <span className="transformation-mark" aria-hidden="true">→</span><span className="sr-only">to</span> after.</h2>
          <p className="section-description">Existing systems. Real constraints. Useful improvements.</p></div>
      </div>
      {professionalProjects.map((project, index) => (
        <article className={`project-preview project-preview-${project.slug}`} key={project.slug} aria-labelledby={`preview-${project.slug}`}>
          <div className="project-preview-copy">
            <p className="type-label text-muted">0{index + 1} / {project.category} / {project.focus}</p>
            <h3 id={`preview-${project.slug}`} className="project-name">{project.name}</h3>
            <p className="text-muted">{project.summary}</p>
            <p className="project-contribution">{project.contributions[0]}</p>
            {project.slug === "sringeri-net" && project.narrative?.decision && <p className="project-decision"><span className="type-label">Engineering decision</span>{project.narrative.decision}</p>}
            <ul className="technology-list" aria-label={`${project.name} technologies`}>
              {project.technologies.slice(0, 4).map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
            {project.slug === "asset-management-system" && <AssetOutcomes metrics={project.metrics} />}
            {project.slug === "sringeri-net" && <ProjectLinks project={project} />}
            <Link href={`/work/${project.slug}`} className="text-link mt-6">Read the case study <span className="sr-only">for {project.name}</span><span aria-hidden="true">↗</span></Link>
          </div>
          {project.slug === "sringeri-net" ? <SringeriDiff /> : <AssetWorkflowPreview />}
        </article>
      ))}
    </Section>
  );
}
