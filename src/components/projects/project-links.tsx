import type { Project } from "@/data/projects";

type ProjectLinksProps = {
  project: Project;
  includeArticle?: boolean;
  includeDemo?: boolean;
  onCaseStudy?: boolean;
};

export function ProjectLinks({ project, includeArticle = false, includeDemo = false, onCaseStudy = false }: ProjectLinksProps) {
  if (!project.links && !project.media) return null;
  const liveLabel = project.slug === "sringeri-net" ? "Live site" : "Live";
  const demoHref = onCaseStudy ? "#demo" : `/work/${project.slug}#demo`;
  return (
    <div className="project-links">
      {project.links?.live && <a href={project.links.live} className="text-link">{liveLabel} <span className="sr-only">for {project.name}</span><span aria-hidden="true">↗</span></a>}
      {project.links?.source ? <a href={project.links.source} className="text-link">GitHub <span className="sr-only">for {project.name}</span><span aria-hidden="true">↗</span></a> : project.slug === "unstuck" ? <span className="type-meta text-muted">Source private</span> : null}
      {includeDemo && project.media && <a href={demoHref} className="text-link">Demo <span className="sr-only">for {project.name}</span><span aria-hidden="true">↓</span></a>}
      {includeArticle && project.links?.article && <a href={project.links.article} className="text-link">Engineering article <span aria-hidden="true">↗</span></a>}
    </div>
  );
}
