import { Section } from "@/components/layout/section";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import Link from "next/link";

export function Experience() {
  return (
    <Section id="experience" tabIndex={-1} aria-labelledby="experience-title" className="experience-section">
      <div className="section-heading mb-0">
        <p className="type-label text-muted">03 / Experience</p>
        <div>
          <h2 id="experience-title" className="type-heading">Building in production.</h2>
          <p className="type-meta text-muted mt-4">{profile.experience}</p>
          <ol className="experience-list">
            {experience.map((entry, index) => <li key={entry.employer} className={`${index === 0 ? "experience-current " : ""}${entry.kind === "foundation" ? "experience-foundation" : ""}`.trim()}>
              <p className={`type-label mb-3 ${index === 0 ? "text-accent" : "text-muted"}`}>{index === 0 ? "Current role" : entry.kind === "foundation" ? "Foundation / Apprenticeship" : "Earlier experience"}</p>
              <h3 className="experience-role">{entry.role}</h3>
              <p className="experience-employer">{entry.employer}</p>
              <p className="experience-dates"><time dateTime={entry.start}>{entry.startLabel}</time><span aria-hidden="true"> – </span><span className="sr-only"> to </span>{entry.end ? <time dateTime={entry.end}>{entry.endLabel}</time> : entry.endLabel}</p>
              <p className="experience-context">{entry.context}</p>
              {entry.details && <ul className="experience-details">{entry.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}
              {entry.proofLinks && <div className="experience-proof-list" aria-label={`${entry.employer} supporting work`}>
                {entry.proofLinks.map((proof) => proof.href.startsWith("/") ? (
                  <Link className="experience-proof" href={proof.href} key={proof.href}><span><strong>{proof.label}</strong><small>{proof.description}</small></span><span aria-hidden="true">↗</span></Link>
                ) : (
                  <a className="experience-proof" href={proof.href} key={proof.href}><span><strong>{proof.label}</strong><small>{proof.description}</small></span><span aria-hidden="true">↗</span></a>
                ))}
              </div>}
            </li>)}
          </ol>
        </div>
      </div>
    </Section>
  );
}
