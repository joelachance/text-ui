# TextTrails

Layered stroke text that follows the pointer. Shipped as a [shadcn/ui registry](https://ui.shadcn.com/docs/registry) component; install via the **`@text-ui`** namespace (see below).

## Preview

Add a `demo.gif` in the repo root, then this image will work:

![TextTrails demo](./demo.gif)

## Install

In your app (after [`shadcn init`](https://ui.shadcn.com/docs/components-json)), add to `components.json`:

```json
"registries": {
  "@text-ui": "https://joelachance.github.io/text-ui/r/{name}.json"
}
```

Then:

```bash
npx shadcn@latest add @text-ui/texttrails
```

The **`@text-ui`** prefix is whatever key you use in `components.json` — it is not issued by shadcn. To have `@text-ui` work **without** that snippet for everyone, you’d need your registry listed in the [official directory](https://ui.shadcn.com/docs/registry/registry-index) (PR to `shadcn-ui/ui`) using the same name.

Add [`utils`](https://ui.shadcn.com/docs/components/utils) first if `@/lib/utils` / `cn` is missing.

```tsx
import { TextTrails } from "@/registry/components/texttrails";

<TextTrails text="hello" />
```

## GitHub Pages

In the repo **Settings → Pages**: deploy from branch **`main`** with folder **`/` (root)** — not `/docs`.

- Registry JSON: [`/r/registry.json`](https://joelachance.github.io/text-ui/r/registry.json)
- **`/docs`** redirects to the [README on GitHub](https://github.com/joelachance/text-ui#readme).

After changing the component, run `bun run pages:prepare` and commit the updated `r/` folder.

## This repo

| Command | What it does |
|--------|----------------|
| `bun run registry:build` | Build `public/r` from `registry.json` |
| `bun run pages:prepare` | Rebuild, then copy `public/r` → `r/` for Pages |
| `bun run playground` | Local preview (dev only) |

Listing this registry on the official directory is optional; see [`directory-entry.example.json`](./directory-entry.example.json) for a snippet shaped like other entries.
