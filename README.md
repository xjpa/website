# John Amata Portfolio + Blog

AstroJS

## Quick start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

Deployment is handled by [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).

1. Push to `main`.
2. In GitHub, set **Pages** to use **GitHub Actions**.
3. Keep `public/CNAME` if the site should continue serving `johnamata.com`.

## Customize content

- Main site content: `src/content/site.ts`
- Blog posts: `src/content/blog/*.md`
- Projects: `src/content/projects/*.md`
- Lifemaxx entries: `src/content/lifemaxx/*.md`
- Styling: `src/styles.css`

## Notes

- Uses Astro content collections for long-form content.
- Uses static output suitable for GitHub Pages.
- Syntax-highlighted code blocks use Astro's built-in Shiki pipeline.
