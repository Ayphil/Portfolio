import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectCaseStudy from "../../project-case-study";
import { getProjectPage, projectPages } from "../../project-pages";

type ProjectRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projectPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectPage(slug);

  return {
    title: project ? `${project.title.en} — Ayphil 75` : "Project — Ayphil 75",
    description: project?.intro.en ?? "Project case study from Ayphil 75's game design portfolio.",
  };
}

export default async function ProjectRoute({ params }: ProjectRouteProps) {
  const { slug } = await params;
  const project = getProjectPage(slug);

  if (!project) notFound();

  return <ProjectCaseStudy project={project} />;
}
