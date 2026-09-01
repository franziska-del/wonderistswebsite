# The Wonderists

A responsive editorial website for The Wonderists, built with Vite and deployed from GitHub to Cloudflare Pages.

## How publishing works

`main` is the production branch. Every commit merged into `main` is deployed by Cloudflare Pages. Pull requests receive their own Cloudflare preview URL so changes can be checked before they go live.

Claude Code should make changes on a branch and open a pull request. See `CLAUDE.md` for the project-specific editing guide.

## Edit website content

Most public copy lives in two structured files:

- `src/content/home.json` — home page copy, links, adventures, contact details, and footer
- `src/content/wild-ideas.json` — WILD IDEAS experience page copy and booking details

Other page-specific copy is currently maintained in its corresponding JavaScript file:

- `src/next-gen.js`
- `src/wonderlab.js`

Images and downloads live in `public/`. Preserve the existing JSON shape and validate the production build after every content change.

## Local development

```bash
pnpm install
pnpm dev
```

The local site runs at `http://localhost:5173`.

## Production build

```bash
pnpm build
```

The production output is written to `dist/`.

## Cloudflare Pages

Connect the GitHub repository to a Cloudflare Pages project with:

- Production branch: `main`
- Build command: `pnpm build`
- Build output directory: `dist`

The checked-in `wrangler.jsonc` records the Pages project name and output directory. A manual deployment can be run with `pnpm deploy` after authenticating Wrangler.

## Stack

- Vite
- Semantic HTML
- Modern CSS
- Vanilla JavaScript
- Repository-backed JSON content
- Locally bundled Outfit font and optimized imagery
- Cloudflare Pages hosting and previews
