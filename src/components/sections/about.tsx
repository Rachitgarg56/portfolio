import { Section } from "@/components/layout/section";
import { profile } from "@/data/profile";

export function About() {
  return (
    <Section id="about" tabIndex={-1} aria-labelledby="about-title" className="about-section">
      <div className="section-heading mb-0">
        <p className="type-label text-muted">04 / A little about me</p>
        <div>
          <h2 id="about-title" className="type-heading">The interface is where<br />the product becomes real.</h2>
          <div className="reading-copy mt-6">
            <p>I’m a frontend-focused engineer who cares about what happens on both sides of a screen: the system behind it and the person using it.</p>
            <p>Now, I’m expanding that work into AI applications and agents. Papertrail explores trustworthy document answers; unStuck explores how AI can support someone’s thinking.</p>
            <p>I’m interested in Frontend Engineer, SDE-1 and Product Engineer opportunities at product companies and startups.</p>
          </div>
          <a className="text-link mt-6" href={profile.links.medium}>More of my thinking on Medium <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </Section>
  );
}
