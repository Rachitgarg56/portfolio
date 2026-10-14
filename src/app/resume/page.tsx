import type { Metadata } from "next";
import Link from "next/link";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { independentProjects, professionalProjects } from "@/data/projects";
import { toolkit } from "@/data/toolkit";
import { site } from "@/lib/site";

const pdfPath = "/resume/rachit-garg-resume.pdf";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume and engineering overview for ${profile.name}.`,
  ...(site.url ? { alternates: { canonical: new URL("/resume", site.url) } } : {}),
  openGraph: {
    type: "profile",
    title: `${profile.name} — Resume`,
    description: profile.positioning,
    ...(site.url ? { url: new URL("/resume", site.url) } : {}),
  },
};

export default function ResumePage() {
  return (
    <article className="resume-page">
      <header className="resume-intro">
        <Link prefetch={false} href="/#experience" className="text-link print-hidden"><span aria-hidden="true">←</span> Experience</Link>
        <p className="type-label text-muted mt-12">Resume / {profile.location}</p>
        <h1 className="resume-title">{profile.name}<span className="text-accent">.</span></h1>
        <p className="resume-positioning">{profile.positioning}</p>
        <div className="resume-actions print-hidden">
          <a className="hero-link" href={pdfPath} target="_blank" rel="noreferrer">View PDF <span aria-hidden="true">↗</span></a>
          <a className="text-link" href={pdfPath} download="Rachit-Garg-Resume.pdf">Download PDF <span aria-hidden="true">↓</span></a>
        </div>
        <div className="resume-contact">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.links.linkedin}>linkedin.com/in/rachitgarg56</a>
          <a href={profile.links.github}>github.com/Rachitgarg56</a>
        </div>
      </header>

      <section className="resume-section" aria-labelledby="resume-experience-title">
        <h2 id="resume-experience-title" className="type-label text-muted">Experience</h2>
        <ol className="resume-experience">
          {experience.map((entry) => <li key={entry.employer}>
            <div><h3>{entry.role}</h3><p>{entry.employer}</p></div>
            <p className="resume-dates"><time dateTime={entry.start}>{entry.startLabel}</time> – {entry.end ? <time dateTime={entry.end}>{entry.endLabel}</time> : entry.endLabel}</p>
            <p className="resume-context">{entry.context}</p>
          </li>)}
        </ol>
      </section>

      <section className="resume-section" aria-labelledby="resume-work-title">
        <h2 id="resume-work-title" className="type-label text-muted">Selected engineering work</h2>
        <div className="resume-projects">
          {[...professionalProjects, ...independentProjects].map((project) => <article key={project.slug}>
            <p className="type-label text-muted">{project.category}</p>
            <h3><Link href={`/work/${project.slug}`}>{project.name}</Link></h3>
            <p>{project.summary}</p>
          </article>)}
        </div>
      </section>

      <section className="resume-section" aria-labelledby="resume-toolkit-title">
        <h2 id="resume-toolkit-title" className="type-label text-muted">Engineering toolkit</h2>
        <dl className="resume-toolkit">
          {toolkit.map((group) => <div key={group.label}><dt>{group.label}</dt><dd>{group.items.join(" · ")}</dd></div>)}
        </dl>
      </section>
    </article>
  );
}
