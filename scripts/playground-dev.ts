/**
 * Local dev only: bundles the playground entry, builds Tailwind, and serves
 * playground/index.html with `bun --hot`. Not part of the shadcn registry.
 * Run: `bun run playground`
 */
import { execSync, spawn } from "child_process";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Ensure compiled assets exist before the dev server serves index.html.
execSync(
  "bun build --target=browser --outfile ./playground/main.js ./playground-entry.tsx",
  {
    cwd: root,
    stdio: "inherit",
  },
);

execSync("bun x tailwindcss -i ./styles/globals.css -o ./playground/bundle.css", {
  cwd: root,
  stdio: "inherit",
});

const app = spawn(
  "bun",
  [
    "build",
    "--target=browser",
    "--outfile",
    "./playground/main.js",
    "./playground-entry.tsx",
    "--watch",
  ],
  { cwd: root, stdio: "inherit", shell: false },
);

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
  app.kill("SIGTERM");
  tailwind.kill("SIGTERM");
  server.kill("SIGTERM");
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.on("exit", (code: number | null, signal: string | null) => {
  if (signal === "SIGTERM") return;
  if (code !== 0 && code !== null) shutdown();
});

tailwind.on("exit", (code: number | null, signal: string | null) => {
  if (signal === "SIGTERM") return;
  if (code !== 0 && code !== null) shutdown();
});

server.on("exit", (code: number | null, signal: string | null) => {
  if (signal === "SIGTERM") return;
  if (code !== 0 && code !== null) shutdown();
});
