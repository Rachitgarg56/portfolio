import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { EngineeringDiff, ProjectResult } from "@/components/projects/engineering-diff";
import type { Project } from "@/data/projects";
import { ProjectLinks } from "@/components/projects/project-links";
import { ProductFlow } from "@/components/projects/product-flow";
import { AssetWorkflow, SringeriSystemFlow, UnstuckContrast } from "@/components/projects/project-system-flow";

function ProjectSystemView({ project }: { project: Project }) {
  if (project.slug === "sringeri-net") return <SringeriSystemFlow />;
  if (project.slug === "asset-management-system") return <AssetWorkflow />;
  if (project.slug === "unstuck") return <><UnstuckContrast /><ProductFlow project={project} /></>;
  if (project.slug === "papertrail") return <ProductFlow project={project} />;
  return null;
}

export function CaseStudy({ project }: { project: Project }) {
  const homeTarget = project.group === "independent" ? "/#products" : "/#work";
  const homeLabel = project.group === "independent" ? "Independent products" : "Production work";
  const reflection = project.lessons ?? (project.narrative?.learning ? [project.narrative.learning] : undefined);

  return (
    <article>
      <header className="case-intro">
        <Link prefetch={false} href={homeTarget} className="text-link"><span aria-hidden="true">←</span> {homeLabel}</Link>
        <p className="type-label mt-12 text-muted">{project.category} / {project.focus}</p>
        <h1 className="case-title mt-5">{project.name}</h1>
        <p className="type-subheading mt-6 max-w-[46ch] text-muted">{project.summary}</p>
        {project.technologies.length > 0 && <ul className="technology-list" aria-label="Project technologies">
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>}
        <ProjectLinks project={project} includeArticle includeDemo onCaseStudy />
      </header>

      {project.media && <figure className={`case-media case-media-${project.slug}`}>
        <Image src={project.media.image} alt={project.media.alt} width={project.media.width} height={project.media.height} sizes={project.slug === "papertrail" ? "(min-width: 1280px) 1100px, 90vw" : "(min-width: 640px) 480px, 90vw"} />
        <figcaption>{project.media.caption}</figcaption>
      </figure>}

      {project.narrative?.context && <Section aria-labelledby="context-title" className="case-section">
        <h2 id="context-title" className="type-label text-muted">Context</h2>
        <div className="reading-copy"><p>{project.narrative.context}</p></div>
      </Section>}

      <Section aria-labelledby="problem-title" className="case-section">
        <h2 id="problem-title" className="type-label text-muted">Problem & constraints</h2>
        <div className="reading-copy">
          <p>{project.problem}</p>
          {project.narrative?.constraints && <ul className="constraint-list">{project.narrative.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}</ul>}
        </div>
      </Section>

      <Section aria-labelledby="responsibility-title" className="case-section">
        <h2 id="responsibility-title" className="type-label text-muted">My responsibility</h2>
        <div>
          {project.narrative?.responsibility && <p className="reading-copy responsibility-copy">{project.narrative.responsibility}</p>}
          <ul className="contribution-list">
            {project.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}
          </ul>
        </div>
      </Section>

      {project.narrative?.decision && <Section aria-labelledby="decision-title" className="case-section">
        <h2 id="decision-title" className="type-label text-muted">Engineering decision</h2>
        <div className="decision-copy">
          <p>{project.narrative.decision}</p>
          {project.narrative.tradeoff && <div className="tradeoff-note"><p className="type-label text-muted">Tradeoff / boundary</p><p>{project.narrative.tradeoff}</p></div>}
        </div>
      </Section>}

      <ProjectSystemView project={project} />

      <Section aria-labelledby="implementation-title" className="case-section">
        <h2 id="implementation-title" className="type-label text-muted">Implementation</h2>
        <div className="implementation-list">
          {project.implementation.map(({ title, body }) => (
            <div key={title}><h3 className="type-subheading">{title}</h3><p className="mt-4 text-muted">{body}</p></div>
          ))}
        </div>
      </Section>

      {project.transformation && <Section aria-labelledby="results-title" className="case-section">
        <h2 id="results-title" className="type-label text-muted">Engineering Diff / impact</h2>
        <div className="min-w-0">
          <EngineeringDiff metric={project.transformation} />
          <div className="case-results">
            {Object.entries(project.metrics).map(([key, metric]) => <ProjectResult key={key} metric={metric} />)}
          </div>
          <p className="type-meta mt-8 text-muted">Reported results from this project. Approximate figures are labelled; scores and timings are historical, not live measurements.</p>
        </div>
      </Section>}

      {(reflection || project.narrative?.improvement) && <Section aria-labelledby="reflection-title" className="case-section">
        <h2 id="reflection-title" className="type-label text-muted">Learning & next step</h2>
        <div className="reading-copy">
          {reflection?.map((lesson) => <p key={lesson}>{lesson}</p>)}
          {project.narrative?.improvement && <div className="tradeoff-note"><p className="type-label text-muted">What I would improve</p><p>{project.narrative.improvement}</p></div>}
          {project.links?.article && <a href={project.links.article} className="text-link mt-6">Read the engineering article <span aria-hidden="true">↗</span></a>}
        </div>
      </Section>}

      {project.media && <Section id="demo" tabIndex={-1} aria-labelledby="demo-title" className="case-section demo-section">
        <div>
          <h2 id="demo-title" className="type-label text-muted">The product in use</h2>
          <p className="type-meta text-muted mt-4">{project.media.duration} recording · playback starts only when requested</p>
        </div>
        <div>
          <video
            className={`case-video case-video-${project.slug}`}
            controls
            playsInline
            preload="none"
            poster={project.media.image}
            width={project.media.width}
            height={project.media.height}
            aria-label={`${project.name} demo recording`}
            aria-describedby={`${project.slug}-video-note`}
          >
            <source src={project.media.video} type="video/mp4" />
            Your browser does not support embedded video. <a href={project.media.video}>Open the MP4 recording.</a>
          </video>
          <div className="demo-walkthrough">
            <h3 className="type-subheading">A walkthrough, in words</h3>
            <ol className="walkthrough-list">{project.media.walkthrough.map((step) => <li key={step}>{step}</li>)}</ol>
            <p id={`${project.slug}-video-note`} className="type-meta text-muted">This describes the recorded screens; it is not a transcript of the audio. Accurate captions and transcripts are listed as remaining work.</p>
          </div>
        </div>
      </Section>}

      <div className="case-back"><Link prefetch={false} className="text-link" href={homeTarget}><span aria-hidden="true">←</span> Back to {homeLabel.toLowerCase()}</Link></div>
    </article>
  );
}
