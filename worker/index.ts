/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  MEDIA: MediaBucket;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

type MediaObject = {
  body: ReadableStream<Uint8Array>;
  httpEtag: string;
  writeHttpMetadata(headers: Headers): void;
};

type MediaSummary = {
  key: string;
  size: number;
  uploaded: Date | string | null;
};

type MediaBucket = {
  get(key: string): Promise<MediaObject | null>;
  put(key: string, value: unknown, options?: {
    httpMetadata?: Record<string, string>;
    customMetadata?: Record<string, string>;
  }): Promise<unknown>;
  list(options?: { prefix?: string; limit?: number }): Promise<{ objects: MediaSummary[] }>;
  delete(key: string): Promise<void>;
};

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    const mediaPath = url.pathname.replace(/^\/Portfolio/, "");
    if (mediaPath === "/api/media") {
      return handleMediaCollection(request, env);
    }
    if (mediaPath.startsWith("/api/media/")) {
      return handleMediaObject(mediaPath.slice("/api/media/".length), env);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

const MEDIA_ADMIN_EMAIL = "emmanuel.cyr159@gmail.com";
const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;
const ALLOWED_MEDIA_TYPES = new Set([
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/quicktime",
  "video/webm",
]);

function mediaAdminError(request: Request): Response | null {
  const email = request.headers.get("oai-authenticated-user-email")?.trim().toLowerCase();
  if (!email) return Response.json({ error: "Sign in is required to manage media." }, { status: 401 });
  if (email !== MEDIA_ADMIN_EMAIL) return Response.json({ error: "You do not have permission to manage media." }, { status: 403 });
  return null;
}

function mediaKeySlug(value: string, fallback: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

function mediaFilename(value: string, fallback: string): string {
  const trimmed = value.trim();
  const extensionStart = trimmed.lastIndexOf(".");
  const hasExtension = extensionStart > 0 && extensionStart < trimmed.length - 1;
  const base = hasExtension ? trimmed.slice(0, extensionStart) : trimmed;
  const extension = hasExtension ? trimmed.slice(extensionStart + 1).toLowerCase().replace(/[^a-z0-9]+/g, "") : "";
  const filename = mediaKeySlug(base, fallback);
  return extension ? `${filename}.${extension}` : filename;
}

function mediaAssetUrl(key: string): string {
  return `/Portfolio/api/media/${key.split("/").map((segment) => encodeURIComponent(segment)).join("/")}`;
}

function mediaAssetSummary(object: MediaSummary | { key: string; size: number; uploaded: string }) {
  return { ...object, url: mediaAssetUrl(object.key) };
}

async function handleMediaCollection(request: Request, env: Env): Promise<Response> {
  if (request.method === "GET" || request.method === "POST" || request.method === "DELETE") {
    const denied = mediaAdminError(request);
    if (denied) return denied;
  }

  if (!env.MEDIA) return Response.json({ error: "The MEDIA R2 binding is unavailable." }, { status: 503 });

  try {
    if (request.method === "GET") {
      const result = await env.MEDIA.list({ prefix: "projects/", limit: 1000 });
      return Response.json({
        assets: result.objects.sort((a, b) => a.key.localeCompare(b.key)).map(mediaAssetSummary),
      });
    }

    if (request.method === "POST") {
      const formData = await request.formData();
      const project = mediaKeySlug(String(formData.get("project") ?? ""), "uncategorized");
      const files = formData.getAll("files").filter((entry): entry is File => entry instanceof File && entry.size > 0);

      if (!files.length) return Response.json({ error: "Choose at least one image or video." }, { status: 400 });

      const uploaded = [];
      for (const file of files) {
        if (!ALLOWED_MEDIA_TYPES.has(file.type)) {
          return Response.json({ error: `${file.name} is not a supported image or video format.` }, { status: 415 });
        }
        if (file.size > MAX_UPLOAD_BYTES) {
          return Response.json({ error: `${file.name} is larger than the 50 MB upload limit.` }, { status: 413 });
        }

        const filename = mediaFilename(file.name, `upload-${Date.now()}`);
        const key = `projects/${project}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${filename}`;
        await env.MEDIA.put(key, file.stream(), {
          httpMetadata: {
            contentType: file.type,
            cacheControl: "public, max-age=31536000, immutable",
          },
          customMetadata: {
            originalName: file.name,
            project,
            kind: file.type.startsWith("video/") ? "video" : "image",
          },
        });
        uploaded.push(mediaAssetSummary({ key, size: file.size, uploaded: new Date().toISOString() }));
      }
      return Response.json({ assets: uploaded }, { status: 201 });
    }

    if (request.method === "DELETE") {
      const key = new URL(request.url).searchParams.get("key") ?? "";
      if (!key.startsWith("projects/") || key.includes("..")) return Response.json({ error: "Invalid media key." }, { status: 400 });
      await env.MEDIA.delete(key);
      return Response.json({ deleted: key });
    }

    return new Response("Method not allowed", { status: 405 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Media storage request failed.";
    return Response.json({ error: message }, { status: 500 });
  }
}

async function handleMediaObject(rawKey: string, env: Env): Promise<Response> {
  const key = rawKey.split("/").map((segment) => decodeURIComponent(segment)).join("/");
  if (!key.startsWith("projects/") || key.includes("..")) return new Response("Not found", { status: 404 });
  if (!env.MEDIA) return new Response("Media storage is unavailable", { status: 503 });

  try {
    const object = await env.MEDIA.get(key);
    if (!object) return new Response("Not found", { status: 404 });
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("cache-control", "public, max-age=31536000, immutable");
    headers.set("etag", object.httpEtag);
    return new Response(object.body, { headers });
  } catch {
    return new Response("Media storage is unavailable", { status: 503 });
  }
}

export default worker;
