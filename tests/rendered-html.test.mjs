import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);

async function render(pathname) {
  const moduleUrl = new URL(workerUrl);
  moduleUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(moduleUrl.href);

  return worker.fetch(
    new Request(`http://localhost/Portfolio${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the portfolio homepage", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Emmanuel Cyr — Game design portfolio<\/title>/i);
  assert.match(html, /Selected work/i);
  assert.match(html, /Emmanuel Cyr/i);
  assert.doesNotMatch(html, /class="filter-panel"/i);
  assert.doesNotMatch(html, /private admin|account surface/i);
});

test("renders every public project route", async () => {
  const routes = [
    "/projects/super-maiden-riot",
    "/projects/think-outside-the-disk",
    "/projects/drylite",
    "/projects/graphic-design-projects",
    "/projects/minimal-rpg",
  ];

  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);

    if (route === "/projects/super-maiden-riot") {
      const html = await response.text();
      assert.match(html, /Princesse 1 — coup de poing/);
      assert.match(html, /Sous-titres propres à chaque personnage/);
    }
  }
});

test("source has no private account or admin surface", async () => {
  const files = [
    "../app/page.tsx",
    "../app/layout.tsx",
    "../app/globals.css",
    "../README.md",
  ];
  const source = await Promise.all(
    files.map((file) => readFile(new URL(file, import.meta.url), "utf8")),
  );
  const combined = source.join("\n");

  assert.doesNotMatch(combined, /private account|admin surface/i);
});
