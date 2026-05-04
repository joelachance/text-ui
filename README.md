# EchoText

Layered text that follows the pointer. Make cool logos, or any text interactive.

<video src="./demo.mp4" width="100%" controls muted loop playsinline></video>

## Install

After [`shadcn init`](https://ui.shadcn.com/docs/components-json), add EchoText from the [open source registry index](https://ui.shadcn.com/docs/registry/registry-index):

```bash
npx shadcn@latest add @text-ui/echo-text
```

You do **not** need to hand-edit `components.json` first. On `shadcn add`, the CLI resolves `@text-ui` against the index and [merges the registry URL into `components.json`](https://ui.shadcn.com/docs/registry/registry-index) for you.

Add [`utils`](https://ui.shadcn.com/docs/components/utils) first if `@/lib/utils` / `cn` is missing.

```tsx
import { EchoText } from "@/registry/components/echo-text";

<EchoText text="hello" />
```

### Without the registry index

Use this if `@text-ui` is not in your CLI’s index yet (for example before your directory PR lands, or an air‑gapped mirror). Add under `registries` in `components.json`, then run the same command:

```json
"registries": {
  "@text-ui": "https://joelachance.github.io/text-ui/r/{name}.json"
}
```

## GitHub Pages

In the repo **Settings → Pages**: deploy from branch **`main`** with folder **`/` (root)** — not `/docs`.

- Hosted manifests: [`/r/registry.json`](https://joelachance.github.io/text-ui/r/registry.json) · [`/r/text-ui.json`](https://joelachance.github.io/text-ui/r/text-ui.json) · per-item [`/r/echo-text.json`](https://joelachance.github.io/text-ui/r/echo-text.json) (what `@text-ui/echo-text` resolves to).
- **`/docs`** redirects to the [README on GitHub](https://github.com/joelachance/text-ui#readme).

After changing the component, run `bun run pages:prepare` and commit the updated `r/` folder.

## This repo

| Command | What it does |
|--------|----------------|
| `bun run registry:build` | Build `public/r` from `registry.json` |
| `bun run pages:prepare` | Rebuild, then copy `public/r` → `r/` for Pages |
| `bun run playground` | Local preview (dev only) |

For proposing this registry to the index, see [`directory-entry.example.json`](./directory-entry.example.json) (same shape as entries in [`directory.json`](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/directory.json) upstream).
