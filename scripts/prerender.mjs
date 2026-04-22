import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(projectRoot, 'dist');
const ssrDir = resolve(projectRoot, 'dist-ssr');
const entryServerPath = resolve(ssrDir, 'entry-server.js');

const { getPrerenderRoutes, getWebsiteUrl, render } = await import(`file://${entryServerPath}`);

const template = await readFile(resolve(distDir, 'index.html'), 'utf8');
const websiteUrl = getWebsiteUrl();
const routes = getPrerenderRoutes();

for (const route of routes) {
  const { appHtml, metadata } = render(route);
  const pageHtml = buildHtml(template, appHtml, {
    title: metadata.title,
    description: metadata.description,
    canonicalUrl: buildCanonicalUrl(metadata.canonicalPath),
  });

  await writeRouteHtml(route, pageHtml);
}

await writeFile(resolve(distDir, 'robots.txt'), buildRobotsTxt(websiteUrl), 'utf8');
await writeFile(resolve(distDir, 'sitemap.xml'), buildSitemapXml(routes), 'utf8');
await writeFile(resolve(distDir, '404.html'), buildHtml(template, render('/').appHtml, {
  title: 'Page Not Found | John Amata',
  description: 'Portfolio and blog for John Amata.',
  canonicalUrl: buildCanonicalUrl('/'),
}), 'utf8');

await rm(ssrDir, { recursive: true, force: true });

function buildHtml(templateHtml, appHtml, metadata) {
  return templateHtml
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?>/i,
      `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
    )
    .replace(
      '</head>',
      `  <link rel="canonical" href="${escapeHtml(metadata.canonicalUrl)}" />\n</head>`,
    );
}

function buildCanonicalUrl(pathname) {
  if (pathname === '/') {
    return `${websiteUrl}/`;
  }

  return `${websiteUrl}${pathname}`;
}

async function writeRouteHtml(route, html) {
  const outputPath = route === '/' ? resolve(distDir, 'index.html') : resolve(distDir, route.slice(1), 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
}

function buildRobotsTxt(baseUrl) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
}

function buildSitemapXml(paths) {
  const urls = paths
    .map((path) => `  <url><loc>${escapeXml(buildCanonicalUrl(path))}</loc></url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeXml(value) {
  return escapeHtml(value).replace(/'/g, '&apos;');
}
