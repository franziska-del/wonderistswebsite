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
- Pages CMS for Git-backed copy editing
- Locally bundled Outfit font and optimized WebP imagery

See [PROJECT_PLAN.md](./PROJECT_PLAN.md) for the page structure, visual system, and content decisions.

## Editing copy

The public copy lives in `src/content/home.json` and `src/content/wild-ideas.json`. Both files are configured for a friendly browser editor in `.pages.yml`.

1. Go to [Pages CMS](https://app.pagescms.org/).
2. Sign in with GitHub and install the Pages CMS GitHub App for `SPL4D/the-wonderists`.
3. Open the repository and choose **Website copy**.
4. Edit either **Main page** or **WILD IDEAS page**, then save.

Pages CMS writes the edited JSON back to GitHub. Vercel then rebuilds the static site from the updated content. No separate content database is required.
