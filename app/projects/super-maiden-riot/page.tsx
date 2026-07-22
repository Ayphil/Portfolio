import { ProjectRoute, projectMetadata } from "../project-route";

const slug = "super-maiden-riot";

export const metadata = projectMetadata(slug);

export default function SuperMaidenRiotPage() {
  return <ProjectRoute slug={slug} />;
}
