import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const root = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));

function run(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: root,
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";

    child.stdout.on("data", (chunk) => {
      const text = chunk.toString();
      output += text;
      process.stdout.write(text);
    });
    child.stderr.on("data", (chunk) => {
      const text = chunk.toString();
      output += text;
      process.stderr.write(text);
    });

    child.on("close", (code) => resolve({ code, output }));
  });
}

const build =
  process.platform === "win32"
    ? await run("cmd.exe", ["/d", "/s", "/c", "npm run build"])
    : await run("npm", ["run", "build"]);
const completed = build.output.includes("Build complete.");
const assertionOnly = build.output.includes("Assertion failed: !(handle->flags & UV_HANDLE_CLOSING)");

if (build.code !== 0 && !(completed && assertionOnly)) {
  process.exit(build.code ?? 1);
}

await import(`./publish-github-pages.mjs?run=${Date.now()}`);
