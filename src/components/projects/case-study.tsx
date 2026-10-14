import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { EngineeringDiff, ProjectResult } from "@/components/projects/engineering-diff";
import type { Project } from "@/data/projects";
import { ProjectLinks } from "@/components/projects/project-links";
import { ProductFlow } from "@/components/projects/product-flow";

export function CaseStudy({ project }: { project: Project }) {
  return (
    <article>
      <header className="case-intro">
        <Link prefetch={false} href={project.group === "independent" ? "/#products" : "/#work"} className="text-link"><span aria-hidden="true">←</span> {project.group === "independent" ? "Independent products" : "Selected work"}</Link>
        <p className="type-label mt-12 text-muted">{project.category} / {project.focus}</p>
        <h1 className="case-title mt-5">{project.name}</h1>
        <p className="type-subheading mt-6 max-w-[46ch] text-muted">{project.summary}</p>
        {project.technologies.length > 0 && <ul className="technology-list" aria-label="Project technologies">
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>}
        <ProjectLinks project={project} includeArticle />
      </header>
      {project.media && <figure className={`case-media case-media-${project.slug}`}>
        <Image src={project.media.image} alt={project.media.alt} width={project.media.width} height={project.media.height} sizes={project.slug === "papertrail" ? "(min-width: 1280px) 1100px, 90vw" : "(min-width: 640px) 480px, 90vw"} />
        <figcaption>{project.media.caption}</figcaption>
      </figure>}
      <Section aria-labelledby="problem-title" className="case-section">
        <h2 id="problem-title" className="type-label text-muted">01 / The problem</h2>
        <div className="reading-copy"><p>{project.problem}</p></div>
      </Section>
      {project.group === "independent" && <ProductFlow project={project} />}
      <Section aria-labelledby="contribution-title" className="case-section">
        <h2 id="contribution-title" className="type-label text-muted">02 / My contributions</h2>
        <ul className="contribution-list">
          {project.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}
        </ul>
      </Section>
      <Section aria-labelledby="implementation-title" className="case-section">
        <h2 id="implementation-title" className="type-label text-muted">{project.slug === "unstuck" ? "03 / The coaching experience" : "03 / Implementation"}</h2>
        <div className="implementation-list">
          {project.implementation.map(({ title, body }) => (
            <div key={title}><h3 className="type-subheading">{title}</h3><p className="mt-4 text-muted">{body}</p></div>
          ))}
        </div>
      </Section>
      {project.transformation && <Section aria-labelledby="results-title" className="case-section">
        <h2 id="results-title" className="type-label text-muted">04 / Before & after</h2>
        <div className="min-w-0">
          <EngineeringDiff metric={project.transformation} />
          <div className="case-results">
            {Object.entries(project.metrics).map(([key, metric]) => <ProjectResult key={key} metric={metric} />)}
          </div>
          <p className="type-meta mt-8 text-muted">Reported results from this project. Approximate figures are labelled; scores and timings are historical, not live measurements.</p>
        </div>
      </Section>}
      {project.lessons && <Section aria-labelledby="lessons-title" className="case-section">
        <h2 id="lessons-title" className="type-label text-muted">04 / What I learned</h2>
        <div className="reading-copy">{project.lessons.map((lesson) => <p key={lesson}>{lesson}</p>)}
          {project.links?.article && <a href={project.links.article} className="text-link mt-6">Read my full build story <span aria-hidden="true">↗</span></a>}
        </div>
      </Section>}
      {project.media && <Section id="demo" tabIndex={-1} aria-labelledby="demo-title" className="case-section">
        <div><h2 id="demo-title" className="type-label text-muted">The product in use</h2>
          <a className="text-link mt-4" href={project.media.video}>Watch {project.name} demo <span aria-hidden="true">↗</span></a>
          <p className="type-meta text-muted">{project.media.duration} · Opens an MP4 recording</p>
        </div>
        <div><h3 className="type-subheading mb-6">A walkthrough, in words</h3><ol className="walkthrough-list">{project.media.walkthrough.map((step) => <li key={step}>{step}</li>)}</ol>
          <p className="type-meta text-muted mt-6">This describes the recorded screens; it is not a transcript of the audio.</p>
        </div>
      </Section>}
      <div className="case-back"><Link prefetch={false} className="text-link" href={project.group === "independent" ? "/#products" : "/#work"}><span aria-hidden="true">←</span> Back to {project.group === "independent" ? "independent products" : "selected work"}</Link></div>
    </article>
  );
}
