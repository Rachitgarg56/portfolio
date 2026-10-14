import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { createSocialImage } from "@/lib/social-image";

export const alt = "An engineering case study by Rachit Garg";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return createSocialImage(project.name, `${project.category} / ${project.focus}`);
}
