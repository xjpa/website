# John Amata Portfolio + Blog

React + TypeScript portfolio site with a blog section, designed for GitHub Pages.

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

1. Push this repo to GitHub.
2. Run:

   ```bash
   npm run deploy
   ```

3. In GitHub, enable **Pages** for the deployed branch if needed.

## Customize content

- Main site content: `src/content/site.ts`
- Blog posts: `src/content/posts.ts`
- Styling: `src/styles.css`

## Notes

- Uses `HashRouter` so blog routes work cleanly on GitHub Pages.
- Uses Vite with `base: './'` for project-page compatibility.
