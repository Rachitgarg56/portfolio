import Link from "next/link";
import { profile } from "@/data/profile";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link prefetch={false} className="site-identity" href="/#intro" aria-label={`${profile.name}, home`}>
        <span className="identity-mark" aria-hidden="true">rg<span>.</span></span>
        <span>{profile.name}</span>
      </Link>
      <nav aria-label="Main navigation">
        <ul className="site-nav-list">
          <li><Link prefetch={false} className="nav-link" href="/#work">Work</Link></li>
          <li><Link prefetch={false} className="nav-link" href="/#products">Products</Link></li>
          <li><Link prefetch={false} className="nav-link" href="/#about">About</Link></li>
        </ul>
      </nav>
    </header>
  );
}
