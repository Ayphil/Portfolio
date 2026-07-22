import { ProjectRoute, projectMetadata } from "../project-route";

const slug = "graphic-design-projects";

export const metadata = projectMetadata(slug);

export default function GraphicDesignProjectsPage() {
  return <ProjectRoute slug={slug} />;
}
