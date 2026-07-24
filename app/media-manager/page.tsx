import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireChatGPTUser } from "../chatgpt-auth";
import { isMediaAdmin } from "../media-auth";
import MediaManager from "./media-manager";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Media manager — Emmanuel Cyr",
  description: "Private media manager for Emmanuel Cyr's portfolio.",
};

export default async function MediaManagerPage() {
  const user = await requireChatGPTUser("/media-manager");
  if (!isMediaAdmin(user.email)) notFound();

  return (
    <main className="media-manager-shell">
      <header className="media-manager-header">
        <a className="brand" href="/Portfolio/#reel" aria-label="Back to portfolio home">
          <span className="brand-text">game design<br />portfolio</span>
        </a>
        <div className="media-manager-account">Signed in as {user.displayName}</div>
        <a className="media-manager-back" href="/Portfolio/#work">Back to portfolio ↗</a>
      </header>
      <section className="media-manager-intro">
        <p className="eyebrow">Private media manager</p>
        <h1>Upload the work.</h1>
        <p>Upload images and short video clips by project. The manager gives you a URL for each file that can be placed in the project case-study content.</p>
      </section>
      <MediaManager />
    </main>
  );
}
