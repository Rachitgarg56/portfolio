import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { profile } from "@/data/profile";
import { independentProjects, professionalProjects, sringeriProject } from "@/data/projects";
import { HeroProof, type HeroProofItem } from "@/components/sections/hero-proof";
import portrait from "../../../public/images/rachit-garg-portrait.webp";

const { load, components } = sringeriProject.metrics;
const proofItems: readonly HeroProofItem[] = [
  { label: "Performance", text: `${sringeriProject.name} · ${load.before}${load.unit} → ${load.after}${load.unit} page load` },
  { label: "Products", text: independentProjects.map((project) => project.name).join(" · ") },
  { label: "Interfaces", text: `${components.value} legacy components migrated to ${sringeriProject.transformation.after}` },
  { label: "AI", text: "Document retrieval · guided AI experiences" },
];

export function HomeIntro() {
  return (
    <Section id="intro" tabIndex={-1} aria-labelledby="intro-title" className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="type-label hero-eyebrow">{profile.role}</p>
          <h1 id="intro-title" className="hero-title">Rachit Garg<span className="text-accent">.</span></h1>
          <p className="hero-statement">I build, improve<br />and ship real products.</p>
          <p className="hero-description">{profile.positioning}</p>
          <HeroProof items={proofItems} />
          <div className="hero-actions">
            <a className="hero-link" href="#work">View work <span aria-hidden="true">↘</span></a>
            <Link className="text-link hero-resume-link" href="/resume">Resume <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <figure className="hero-portrait">
          <Image
            className="hero-portrait-image"
            src={portrait}
            alt="Rachit Garg, frontend and product engineer"
            sizes="(min-width: 1280px) 420px, (min-width: 1024px) 34vw, (min-width: 640px) 400px, calc(100vw - 40px)"
            loading="eager"
            fetchPriority="high"
          />
        </figure>
      </div>

      <aside className="work-index hero-work-index" aria-label="A quick look at my work">
        {[
          { label: "In production", items: professionalProjects },
          { label: "Built independently", items: independentProjects },
        ].map(({ label, items }) => (
          <div className="index-group" key={label}>
            <p className="type-label text-muted">{label}</p>
            {items.map((project) => (
              <Link className="index-link" key={project.slug} href={`/work/${project.slug}`}>
                <span><span className="index-name">{project.name}</span><span className="index-description">{project.focus.split(" / ")[0]}</span></span>
                <span className="index-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        ))}
      </aside>
      <div className="hero-details">
        <p>{profile.experience}</p>
        <p><span className="text-muted">Core toolkit</span> <span>{profile.technologies.join(" / ")}</span></p>
      </div>
    </Section>
  );
}
