import { profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div><p className="font-medium text-ink">{profile.name}</p><p className="mt-1">{profile.role}</p></div>
      <div className="footer-links">
        <a className="text-link" href={`mailto:${profile.email}`}>Email <span aria-hidden="true">↗</span></a>
        <a className="text-link" href={profile.links.linkedin}>LinkedIn <span aria-hidden="true">↗</span></a>
        <a className="text-link" href={profile.links.github}>GitHub <span aria-hidden="true">↗</span></a>
        <a className="text-link" href="#top">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
