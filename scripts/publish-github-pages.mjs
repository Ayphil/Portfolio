import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { pipeline } from "node:stream/promises";

const root = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const clientDir = join(root, "dist", "client");
const serverEntry = join(root, "dist", "server", "index.js");
const basePath = "/Portfolio";
const routes = [
  "/",
  "/projects/super-maiden-riot/",
  "/projects/think-outside-the-disk/",
  "/projects/drylite/",
  "/projects/graphic-design-projects/",
];

async function copyFile(source, target) {
  await mkdir(dirname(target), { recursive: true });
  await pipeline(createReadStream(source), createWriteStream(target));
}

async function copyDirectory(source, target) {
  await mkdir(target, { recursive: true });

  for (const entry of await readdir(source, { withFileTypes: true })) {
    const sourcePath = join(source, entry.name);
    const targetPath = join(target, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, targetPath);
    } else if (entry.isFile()) {
      await copyFile(sourcePath, targetPath);
    }
  }
}

async function assetResponse(pathname) {
  const assetPath = join(clientDir, pathname.replace(/^\/Portfolio\//, "").replace(/^\/+/, ""));

  try {
    const info = await stat(assetPath);
    if (!info.isFile()) return new Response("Not found", { status: 404 });
    return new Response(await readFile(assetPath));
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

function htmlTarget(route) {
  if (route === "/") return join(root, "index.html");
  return join(root, route.replace(/^\/|\/$/g, ""), "index.html");
}

async function renderRoute(worker, route) {
  const url = new URL(`${basePath}${route}`, "https://ayphil.github.io");
  const response = await worker.fetch(
    new Request(url, { headers: { accept: "text/html" } }),
    {
      ASSETS: {
        fetch: async (request) => assetResponse(new URL(request.url).pathname),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to render ${route}: ${response.status}`);
  }

  const html = await response.text();
  const target = htmlTarget(route);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
  return relative(root, target);
}

await rm(join(root, "assets"), { recursive: true, force: true });
await rm(join(root, "projects"), { recursive: true, force: true });
await copyDirectory(join(clientDir, "assets"), join(root, "assets"));

for (const entry of await readdir(clientDir, { withFileTypes: true })) {
  if (entry.isFile() && entry.name !== "404.html" && entry.name !== "_headers" && entry.name !== ".assetsignore") {
    await copyFile(join(clientDir, entry.name), join(root, entry.name));
  }
}

const workerModule = await import(`${pathToFileURL(serverEntry).href}?publish=${Date.now()}`);
const rendered = [];

for (const route of routes) {
  rendered.push(await renderRoute(workerModule.default, route));
}

await writeFile(join(root, ".nojekyll"), "");
console.log(`Published GitHub Pages files: ${rendered.join(", ")}`);
