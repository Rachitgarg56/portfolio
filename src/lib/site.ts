import { profile } from "@/data/profile";

function getSiteUrl(): URL | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return undefined;

  const url = new URL(value);
  if (!["https:", "http:"].includes(url.protocol) || url.pathname !== "/" || url.search || url.hash || url.username || url.password) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without a path, query or hash.");
  }
  return url;
}

export const site = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.description,
  url: getSiteUrl(),
};
