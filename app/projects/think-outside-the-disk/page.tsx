import { ProjectRoute, projectMetadata } from "../project-route";

const slug = "think-outside-the-disk";

export const metadata = projectMetadata(slug);

export default function ThinkOutsideTheDiskPage() {
  return <ProjectRoute slug={slug} />;
}
