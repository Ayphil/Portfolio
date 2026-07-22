import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectCaseStudy from "../project-case-study";
import { getProjectPage } from "../project-pages";

export function projectMetadata(slug: string): Metadata {
  const project = getProjectPage(slug);

  return {
    title: project ? `${project.title.en} - Ayphil 75` : "Project - Ayphil 75",
    description: project?.intro.en ?? "Project case study from Ayphil 75's game design portfolio.",
  };
}

export function ProjectRoute({ slug }: { slug: string }) {
  const project = getProjectPage(slug);

  if (!project) notFound();

  return <ProjectCaseStudy project={project} />;
}
