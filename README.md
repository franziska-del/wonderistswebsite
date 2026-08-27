# The Wonderists

A responsive, editorial website for The Wonderists — adventures and tools for entrepreneurs who want to stay curious, test their edges, and feel more alive.

## Local development

```bash
pnpm install
pnpm dev
```

The site runs at `http://localhost:5173`.

## Production build

```bash
pnpm build
```

The production output is written to `dist/`.

## Stack

- Vite
- Semantic HTML
- Modern CSS
- Vanilla JavaScript
- Sanity CMS with a simplified editor at `/admin` and advanced Studio at `/studio`
- Locally bundled Outfit font and optimized WebP imagery

See [PROJECT_PLAN.md](./PROJECT_PLAN.md) for the page structure, visual system, and content decisions.

## Editing content with Sanity

The public site reads published content from Sanity and falls back to
`src/content/home.json` and `src/content/wild-ideas.json` if Sanity has not been
connected yet or is unavailable.

1. Create a Sanity project with a public `production` dataset.
2. Copy `.env.example` to `.env.local` and add the project ID to both
   `VITE_SANITY_PROJECT_ID` and `SANITY_STUDIO_PROJECT_ID`.
3. Add the same environment variables in Vercel.
4. Run `pnpm seed` once to import the current website copy.
5. Open `/admin` on the deployed site and use the shared admin password.
   `/studio` remains available for advanced changes with Sanity login.

Publish changes in Studio to make them visible on the public site. Image fields
support Sanity uploads while retaining the current local site image as a fallback.
The `/admin` editor uses a signed, eight-hour password session and keeps its
Sanity write token server-side. The advanced `/studio` editor uses Sanity login.

For browser-side content reads, add the local and production site origins in
Sanity Manage under **API → CORS origins**.
