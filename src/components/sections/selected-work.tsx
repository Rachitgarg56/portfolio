import Link from "next/link";
import { Section } from "@/components/layout/section";
import { ProjectResult } from "@/components/projects/engineering-diff";
import { professionalProjects } from "@/data/projects";
import { SringeriDiff } from "@/components/projects/sringeri-diff";
import { ProjectLinks } from "@/components/projects/project-links";

export function SelectedWork() {
  return (
    <Section id="work" tabIndex={-1} aria-labelledby="work-title" className="work-section">
      <div className="section-heading">
        <p className="type-label text-muted">01 / Production work</p>
        <div><h2 id="work-title" className="type-heading">Engineering the<br />before <span className="transformation-mark" aria-hidden="true">→</span><span className="sr-only">to</span> after.</h2>
          <p className="section-description">Existing systems. Real constraints. Useful improvements.</p></div>
      </div>
      {professionalProjects.map((project, index) => (
        <article className="project-preview" key={project.slug} aria-labelledby={`preview-${project.slug}`}>
          <div className="project-preview-copy">
            <p className="type-label text-muted">0{index + 1} / {project.category} / {project.focus}</p>
            <h3 id={`preview-${project.slug}`} className="project-name">{project.name}</h3>
            <p className="text-muted">{project.summary}</p>
            <p className="project-contribution">{project.contributions[0]}</p>
            <ul className="technology-list" aria-label={`${project.name} technologies`}>
              {project.technologies.slice(0, 4).map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
            {project.slug === "sringeri-net" && <ProjectLinks project={project} />}
            <Link href={`/work/${project.slug}`} className="text-link mt-6">Read the case study <span className="sr-only">for {project.name}</span><span aria-hidden="true">↗</span></Link>
          </div>
          {project.slug === "sringeri-net" ? <SringeriDiff /> : <div className="project-preview-result">
            <p className="type-label result-eyebrow">Less friction. Better flow.</p>
            {project.previewMetric && <ProjectResult metric={project.metrics[project.previewMetric]} />}
            <p className="result-caption">Procurement <span className="transformation-mark">→</span> approvals <span className="transformation-mark">→</span> audit tracking</p>
            <p className="result-note">Reported project result</p>
          </div>}
        </article>
      ))}
    </Section>
  );
}
