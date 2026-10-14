import { Section } from "@/components/layout/section";
import { profile } from "@/data/profile";

export function About() {
  return (
    <Section id="about" tabIndex={-1} aria-labelledby="about-title" className="about-section">
      <p className="type-label text-muted">06 / About</p>
      <h2 id="about-title" className="type-heading about-title">The interface is where<br />the product becomes real.</h2>
      <div className="reading-copy mt-6">
        <p>I started with full-stack and problem-solving foundations, moved into a product-focused frontend internship, and now work on production interfaces and workflow-driven applications.</p>
        <p>That progression shaped how I approach software: understand the product constraint, model the system clearly, then make the result useful and dependable at the interface.</p>
        <p>Papertrail and unStuck extend that work into AI products—one through grounded retrieval, the other through deliberate interaction constraints—without replacing my frontend engineering foundation.</p>
        <p>I’m interested in Frontend Engineer, SDE-1 and Product Engineer opportunities at product companies and startups.</p>
      </div>
      <a className="text-link mt-6" href={profile.links.medium}>More of my thinking on Medium <span aria-hidden="true">↗</span></a>
    </Section>
  );
}
