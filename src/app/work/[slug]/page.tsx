import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/projects/case-study";
import { getProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const title = `${project.name} — ${project.focus}`;
  const url = site.url ? new URL(`/work/${project.slug}`, site.url) : undefined;
  return {
    title,
    description: project.summary,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: { title, description: project.summary, type: "article", siteName: `${profile.name} — Portfolio`, ...(url ? { url } : {}) },
    twitter: { card: "summary_large_image", title, description: project.summary },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
