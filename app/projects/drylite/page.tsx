import { ProjectRoute, projectMetadata } from "../project-route";

const slug = "drylite";

export const metadata = projectMetadata(slug);

export default function DrylitePage() {
  return <ProjectRoute slug={slug} />;
}
