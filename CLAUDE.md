# Claude Code guide

## Project purpose

The Wonderists website is a static Vite site hosted on Cloudflare Pages. GitHub is the source of truth. Do not add a CMS, database, server-side API, or hosted dependency unless the user explicitly asks for one.

## Publishing workflow

1. Create a focused branch for each request.
2. Make the smallest coherent change that fulfils the request.
3. Run `pnpm build` before presenting the result.
4. Open a pull request instead of pushing directly to `main`.
5. Use the Cloudflare preview deployment for visual review.

## Where to edit

- Home page content: `src/content/home.json`
- WILD IDEAS page content: `src/content/wild-ideas.json`
- Home page rendering and behaviour: `src/main.js`
- WILD IDEAS rendering and behaviour: `src/wild-ideas.js`
- Next Gen page: `src/next-gen.js` and `src/next-gen.css`
- Wonderlab page: `src/wonderlab.js` and `src/wonderlab.css`
- Shared styles: `src/styles.css`
- Public images, fonts, and downloads: `public/`

## Guardrails

- Preserve the existing editorial visual language, responsive behaviour, accessibility, and reduced-motion support.
- Preserve JSON keys and structure unless the rendering code is updated in the same change.
- Never commit secrets, credentials, `.env` files, generated `dist/`, or client invoice/quote documents.
- Do not reintroduce Sanity or Vercel configuration.
- Do not change contact, booking, pricing, dates, or external URLs unless the user explicitly provides or approves the new value.
- Optimize new images for the web and provide meaningful alt text when the image conveys information.
- Check desktop and mobile layouts for visual changes.

## Validation

At minimum, run:

```bash
pnpm build
```

For visual changes, also run the local site with `pnpm dev` and inspect the affected pages at desktop and mobile widths.
