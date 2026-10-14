import { Section } from "@/components/layout/section";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <Section id="contact" tabIndex={-1} aria-labelledby="contact-title" className="contact-section">
      <p className="type-label contact-eyebrow">07 / Contact</p>
      <div className="contact-layout">
        <h2 id="contact-title" className="contact-title">Let’s build something<br />useful.</h2>
        <div className="contact-details">
          <p className="contact-copy">I’m open to software engineering and product engineering opportunities where thoughtful interfaces and strong systems matter.</p>
          <p className="type-label contact-location">Based in {profile.location}</p>
          <div className="contact-links">
            <a className="contact-primary" href={`mailto:${profile.email}`}>Email me <span aria-hidden="true">↗</span></a>
            <a className="contact-link" href={profile.links.linkedin}>LinkedIn <span aria-hidden="true">↗</span></a>
            <a className="contact-link" href={profile.links.github}>GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </Section>
  );
}
