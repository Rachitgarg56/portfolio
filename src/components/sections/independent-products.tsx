import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { ProjectLinks } from "@/components/projects/project-links";
import { independentProjects } from "@/data/projects";

export function IndependentProducts() {
  return (
    <Section id="products" tabIndex={-1} aria-labelledby="products-title" className="products-section">
      <div className="section-heading">
        <p className="type-label text-muted">02 / Independent products</p>
        <div><h2 id="products-title" className="type-heading">A problem worth<br />building for.</h2><p className="section-description">Two explorations of useful AI. Two very different questions.</p></div>
      </div>
      {independentProjects.map((project) => (
        <article className={`product-feature product-${project.slug}`} key={project.slug} aria-labelledby={`preview-${project.slug}`}>
          {project.media && <figure className="product-visual">
            <Link href={`/work/${project.slug}`} aria-label={`Explore ${project.name}`}>
              <Image src={project.media.image} alt={project.media.alt} width={project.media.width} height={project.media.height} sizes={project.slug === "papertrail" ? "(min-width: 1200px) 680px, (min-width: 900px) 55vw, 90vw" : "(min-width: 900px) 360px, (min-width: 480px) 400px, 85vw"} />
            </Link>
            <figcaption>{project.slug === "papertrail" ? "The document workspace / recorded demo" : "The coaching experience / launch walkthrough"}</figcaption>
          </figure>}
          <div className="product-copy">
            <p className="type-label text-muted">Personal product / {project.slug === "papertrail" ? "Full-stack AI" : "AI interaction design"}</p>
            <h3 id={`preview-${project.slug}`} className="product-title">{project.name}</h3>
            <p className="product-question">{project.slug === "papertrail" ? "An answer is more useful when you can trace it." : "What if AI helped you think, without doing the thinking?"}</p>
            <p className="text-muted mt-5">{project.slug === "papertrail" ? "Upload your documents, ask a question and follow the sources. A full-stack exploration of retrieval, streaming interfaces and trust." : "Built from my own DSA preparation: focused questions, smaller examples and progressive hints that leave the discovery to you."}</p>
            <ProjectLinks project={project} includeDemo includeArticle />
            <Link href={`/work/${project.slug}`} className="text-link product-story">{project.slug === "papertrail" ? "Inside the build" : "Explore the product thinking"}<span aria-hidden="true">→</span></Link>
          </div>
        </article>
      ))}
    </Section>
  );
}
