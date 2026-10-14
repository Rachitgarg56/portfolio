import { Section } from "@/components/layout/section";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <Section id="experience" tabIndex={-1} aria-labelledby="experience-title" className="experience-section">
      <div className="section-heading mb-0">
        <p className="type-label text-muted">03 / Experience</p>
        <div>
          <h2 id="experience-title" className="type-heading">Building in production.</h2>
          <p className="type-meta text-muted mt-4">{profile.experience}</p>
          <ol className="experience-list">
            {experience.map((entry, index) => <li key={entry.employer} className={index === 0 ? "experience-current" : ""}>
              {index === 0 && <p className="type-label text-accent mb-3">Current role</p>}
              <h3 className="experience-role">{entry.role}</h3>
              <p className="experience-employer">{entry.employer}</p>
              <p className="experience-dates"><time dateTime={entry.start}>{entry.startLabel}</time><span aria-hidden="true"> – </span><span className="sr-only"> to </span>{entry.end ? <time dateTime={entry.end}>{entry.endLabel}</time> : entry.endLabel}</p>
            </li>)}
          </ol>
          <p className="reading-copy mt-6">My professional work spans production website modernization and internal applications: faster pages, accessible interfaces and workflows shaped by roles and request state.</p>
          <ul className="practice-list" aria-label="Areas of professional experience">
            <li>React, Next.js & TypeScript</li><li>Performance, accessibility & SEO</li><li>REST APIs & role-based workflows</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
