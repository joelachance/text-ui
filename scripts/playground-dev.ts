/**
 * Local dev only: builds Tailwind for the playground, watches CSS, and serves
 * playground/index.html with `bun --hot`. Not part of the shadcn registry.
 * Run: `bun run playground`
 */
import { execSync, spawn } from "child_process";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Ensure bundle.css exists before the dev server serves index.html.
execSync("bun x tailwindcss -i ./styles/globals.css -o ./playground/bundle.css", {
  cwd: root,
  stdio: "inherit",
});

const tailwind = spawn(
  "bun",
  [
    "x",
    "tailwindcss",
    "-i",
    "./styles/globals.css",
    "-o",
    "./playground/bundle.css",
    "--watch",
  ],
  { cwd: root, stdio: "inherit", shell: false },
);

const server = spawn("bun", ["--hot", "./playground/index.html"], {
  cwd: root,
  stdio: "inherit",
  shell: false,
});

function shutdown() {
  tailwind.kill("SIGTERM");
  server.kill("SIGTERM");
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

tailwind.on("exit", (code: number | null, signal: string | null) => {
  if (signal === "SIGTERM") return;
  if (code !== 0 && code !== null) shutdown();
});

server.on("exit", (code: number | null, signal: string | null) => {
  if (signal === "SIGTERM") return;
  if (code !== 0 && code !== null) shutdown();
});
