import { createRoot } from "react-dom/client";

import { TextTrails } from "@/registry/components/texttrails";

/** Entry for `bun run playground` — mounts TextTrails for manual testing only. */

const root = document.getElementById("root");
if (!root) {
  throw new Error("Missing #root");
}

createRoot(root).render(
  <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-8">
    <TextTrails />
  </div>,
);
