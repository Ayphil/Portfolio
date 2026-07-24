"use client";

import { useEffect, useState } from "react";

type MediaAsset = {
  key: string;
  size: number;
  uploaded: string | null;
  url: string;
};

const apiPath = "/Portfolio/api/media";

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isVideo(asset: MediaAsset): boolean {
  return /\.(mp4|mov|webm)$/i.test(asset.key);
}

export default function MediaManager() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [project, setProject] = useState("minimal-rpg");
  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState("");

  async function loadAssets() {
    const response = await fetch(apiPath);
    const payload = await response.json() as { assets?: MediaAsset[]; error?: string };
    if (!response.ok) throw new Error(payload.error ?? "Unable to load media.");
    setAssets(payload.assets ?? []);
  }

  useEffect(() => {
    void loadAssets().catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Unable to load media."));
  }, []);

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!files?.length) {
      setError("Choose at least one image or video first.");
      return;
    }

    setBusy(true);
    setError("");
    setStatus("Uploading…");
    const form = new FormData();
    form.set("project", project);
    Array.from(files).forEach((file) => form.append("files", file));

    try {
      const response = await fetch(apiPath, { method: "POST", body: form });
      const payload = await response.json() as { assets?: MediaAsset[]; error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Upload failed.");
      setStatus(`${payload.assets?.length ?? 0} file(s) uploaded.`);
      setFiles(null);
      event.currentTarget.reset();
      await loadAssets();
    } catch (reason) {
      setStatus("");
      setError(reason instanceof Error ? reason.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  async function copyUrl(asset: MediaAsset) {
    await navigator.clipboard.writeText(`${window.location.origin}${asset.url}`);
    setCopied(asset.key);
    window.setTimeout(() => setCopied(""), 1600);
  }

  async function deleteAsset(asset: MediaAsset) {
    if (!window.confirm(`Delete ${asset.key}?`)) return;
    const response = await fetch(`${apiPath}?key=${encodeURIComponent(asset.key)}`, { method: "DELETE" });
    const payload = await response.json() as { error?: string };
    if (!response.ok) {
      setError(payload.error ?? "Delete failed.");
      return;
    }
    setAssets((current) => current.filter((entry) => entry.key !== asset.key));
  }

  return (
    <section className="media-manager-content">
      <form className="media-upload-panel" onSubmit={handleUpload}>
        <label>
          Project folder
          <input value={project} onChange={(event) => setProject(event.target.value)} placeholder="minimal-rpg" />
        </label>
        <label>
          Images or videos
          <input type="file" accept="image/avif,image/gif,image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm" multiple onChange={(event) => setFiles(event.target.files)} />
          <span className="media-manager-help">Images and videos up to 50 MB each.</span>
        </label>
        <button type="submit" disabled={busy}>{busy ? "Uploading…" : "Upload files"}</button>
        {status && <p className="media-manager-status">{status}</p>}
        {error && <p className="media-manager-error">{error}</p>}
      </form>

      <div className="media-library">
        <div className="media-library-heading"><span className="eyebrow">Uploaded media</span><span>{assets.length} files</span></div>
        {assets.length === 0 ? <p className="media-library-empty">No uploaded project media yet.</p> : <div className="media-asset-grid">
          {assets.map((asset) => <article className="media-asset-card" key={asset.key}>
            <div className="media-asset-preview">
              {isVideo(asset) ? <video src={asset.url} muted playsInline preload="metadata" /> : <img src={asset.url} alt="" loading="lazy" />}
            </div>
            <div className="media-asset-info"><strong>{asset.key}</strong><span>{formatBytes(asset.size)}</span></div>
            <div className="media-asset-actions"><button type="button" onClick={() => void copyUrl(asset)}>{copied === asset.key ? "Copied" : "Copy URL"}</button><button type="button" onClick={() => void deleteAsset(asset)}>Delete</button></div>
          </article>)}
        </div>}
      </div>
    </section>
  );
}
