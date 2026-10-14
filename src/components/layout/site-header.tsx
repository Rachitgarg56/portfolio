import Link from "next/link";
import { profile } from "@/data/profile";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link prefetch={false} className="site-identity" href="/#intro">
        <span className="identity-mark" aria-hidden="true">rg<span>.</span></span>
        <span>{profile.name}</span>
      </Link>
      <nav aria-label="Main navigation">
        <ul className="site-nav-list">
          <li><Link prefetch={false} className="nav-link" href="/#work">Work</Link></li>
          <li><Link prefetch={false} className="nav-link" href="/#experience">Experience</Link></li>
          <li><Link className="nav-link" href="/resume">Resume</Link></li>
          <li><Link prefetch={false} className="nav-link" href="/#contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
