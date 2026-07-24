import { ProjectRoute, projectMetadata } from "../project-route";

const slug = "minimal-rpg";

export const metadata = projectMetadata(slug);

export default function MinimalRpgPage() {
  return <ProjectRoute slug={slug} />;
}
