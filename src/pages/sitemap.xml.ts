import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../content/site';

function toUrl(pathname: string) {
  return pathname === '/' ? `${site.url}/` : `${site.url}${pathname}`;
}

export const GET: APIRoute = async () => {
  const [blog, lifemaxx, projects] = await Promise.all([
    getCollection('blog'),
    getCollection('lifemaxx'),
    getCollection('projects'),
  ]);

  const routes = [
    '/',
    '/blog',
    '/archive',
    '/lifemaxx',
    ...blog.map((entry) => `/blog/${entry.slug}`),
    ...lifemaxx.map((entry) => `/lifemaxx/${entry.slug}`),
    ...projects.map((entry) => `/projects/${entry.slug}`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((route) => `  <url><loc>${toUrl(route)}</loc></url>`)
    .join('\n')}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
