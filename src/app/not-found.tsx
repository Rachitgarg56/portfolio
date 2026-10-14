import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section">
      <p className="type-label mb-6 text-accent">404 / Page not found</p>
      <h1 className="type-heading">This page isn’t here.</h1>
      <p className="mt-5 text-muted">You can find the project case studies in selected work.</p>
      <Link className="hero-link" href="/#work">Back to selected work <span aria-hidden="true">↗</span></Link>
    </div>
  );
}
