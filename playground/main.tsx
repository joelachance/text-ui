import { createRoot } from "react-dom/client";

import { TextTrail } from "@/registry/components/text-trail";

/** Entry for `bun run playground` — mounts TextTrail for manual testing only. */

const root = document.getElementById("root");
if (!root) {
  throw new Error("Missing #root");
}

createRoot(root).render(
  <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-8">
    <TextTrail />
  </div>,
);
