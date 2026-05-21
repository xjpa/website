import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://johnamata.com',
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
