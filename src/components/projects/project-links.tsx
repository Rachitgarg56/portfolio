import type { Project } from "@/data/projects";

export function ProjectLinks({ project, includeArticle = false }: { project: Project; includeArticle?: boolean }) {
  if (!project.links) return null;
  return (
    <div className="project-links">
      <a href={project.links.live} className="text-link">Try {project.name} <span aria-hidden="true">↗</span></a>
      {project.links.source ? <a href={project.links.source} className="text-link">GitHub <span className="sr-only">for {project.name}</span><span aria-hidden="true">↗</span></a> : <span className="type-meta text-muted">Source private</span>}
      {includeArticle && project.links.article && <a href={project.links.article} className="text-link">Read the build story on Medium <span aria-hidden="true">↗</span></a>}
    </div>
  );
}
