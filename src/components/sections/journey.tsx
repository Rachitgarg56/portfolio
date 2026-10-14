import Link from "next/link";
import { Section } from "@/components/layout/section";
import { experience } from "@/data/experience";
import { toolkit, now } from "@/data/toolkit";

const chronologicalExperience = [...experience].reverse();

function ProofLinks({ entry }: { entry: (typeof experience)[number] }) {
  if (!entry.proofLinks) return null;
  return (
    <div className="journey-proof-list" aria-label={`${entry.employer} supporting work`}>
      {entry.proofLinks.map((proof) => proof.href.startsWith("/") ? (
        <Link className="journey-proof" href={proof.href} key={proof.href}><span><strong>{proof.label}</strong><small>{proof.description}</small></span><span aria-hidden="true">↗</span></Link>
      ) : (
        <a className="journey-proof" href={proof.href} key={proof.href}><span><strong>{proof.label}</strong><small>{proof.description}</small></span><span aria-hidden="true">↗</span></a>
      ))}
    </div>
  );
}

export function Journey() {
  return (
    <Section id="experience" tabIndex={-1} aria-labelledby="experience-title" className="journey-section">
      <div className="chapter-heading">
        <p className="type-label text-muted">03 / Journey</p>
        <div><h2 id="experience-title">The path so far.</h2><p className="section-description">Foundation, product practice and increasing responsibility in production.</p></div>
      </div>

      <ol className="journey-timeline">
        {chronologicalExperience.map((entry, index) => {
          const current = !entry.end;
          const phase = entry.kind === "foundation" ? "Foundation" : current ? "Production engineering" : "Internship";
          return (
            <li key={entry.employer} className={current ? "journey-current" : undefined}>
              <div className="journey-marker" aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span></div>
              <p className="type-label journey-phase">{phase}</p>
              <p className="journey-dates"><time dateTime={entry.start}>{entry.startLabel}</time><span aria-hidden="true"> — </span><span className="sr-only"> to </span>{entry.end ? <time dateTime={entry.end}>{entry.endLabel}</time> : entry.endLabel}</p>
              <h3>{entry.role}</h3>
              <p className="journey-employer">{entry.employer}</p>
              <p className="journey-context">{entry.context}</p>
              {entry.details && <ul className="journey-details">{entry.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}
              <ProofLinks entry={entry} />
            </li>
          );
        })}
      </ol>

      <section id="toolkit" tabIndex={-1} aria-labelledby="toolkit-title" className="journey-toolkit">
        <div className="journey-subheading"><p className="type-label text-muted">Engineering evidence</p><h3 id="toolkit-title">Tools follow the problem.</h3></div>
        <dl className="journey-toolkit-list">
          {toolkit.map((group) => <div key={group.label}><dt>{group.label}</dt><dd>{group.items.join(" · ")}</dd></div>)}
        </dl>
      </section>

      <section id="now" tabIndex={-1} aria-labelledby="now-title" className="journey-now">
        <div className="journey-subheading"><p className="type-label text-muted">Now</p><h3 id="now-title">Where I’m headed.</h3></div>
        <dl className="journey-now-list">
          {now.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        </dl>
      </section>
    </Section>
  );
}
