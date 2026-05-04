# text-ui

Layered text that follows the pointer. Make cool logos, or any text interactive.

EchoText
<img src="./demo.gif" alt="EchoText demo" width="100%" />

## Install

After [`shadcn init`](https://ui.shadcn.com/docs/components-json), add EchoText from the registry:

```bash
npx shadcn@latest add @text-ui/echo-text
```

```tsx
import { EchoText } from "@/registry/components/echo-text";

<EchoText
  text="hello"
  fontClassName="font-semibold tracking-tight"
  className="h-72 w-full max-w-xl"
  aria-label="Interactive hello"
/>
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
