import { site } from './content/site';
import { lifemaxxEntries } from './lifemaxx';
import { posts } from './posts';
import { projects } from './projects';

export type PageMetadata = {
  title: string;
  description: string;
  canonicalPath: string;
};

const defaultDescription = 'Portfolio and blog for John Amata on AI, cybersecurity, systems, and software engineering.';

export const siteUrl = site.url.replace(/\/+$/, '');

export function getAllRoutes() {
  return [
    '/',
    '/blog',
    '/archive',
    '/lifemaxx',
    ...projects.map((project) => `/projects/${project.slug}`),
    ...posts.map((post) => `/blog/${post.slug}`),
    ...lifemaxxEntries.map((entry) => `/lifemaxx/${entry.slug}`),
  ];
}

export function getPageMetadata(pathname: string): PageMetadata {
  const normalizedPath = normalizePath(pathname);

  if (normalizedPath === '/') {
    return {
      title: site.name,
      description: defaultDescription,
      canonicalPath: '/',
    };
  }

  if (normalizedPath === '/blog') {
    return {
      title: `Blog | ${site.name}`,
      description: 'Technical notes on AI, security, systems, and software engineering.',
      canonicalPath: normalizedPath,
    };
  }

  if (normalizedPath === '/archive') {
    return {
      title: `Archive | ${site.name}`,
      description: 'Archive of all published technical posts.',
      canonicalPath: normalizedPath,
    };
  }

  if (normalizedPath === '/lifemaxx') {
    return {
      title: `Lifemaxx | ${site.name}`,
      description: 'Protocols, experiments, and notes on high-agency living and performance.',
      canonicalPath: normalizedPath,
    };
  }

  const post = posts.find((entry) => normalizedPath === `/blog/${entry.slug}`);
  if (post) {
    return {
      title: `${post.title} | ${site.name}`,
      description: post.summary,
      canonicalPath: normalizedPath,
    };
  }

  const project = projects.find((entry) => normalizedPath === `/projects/${entry.slug}`);
  if (project) {
    return {
      title: `${project.title} | ${site.name}`,
      description: project.summary,
      canonicalPath: normalizedPath,
    };
  }

  const lifemaxxEntry = lifemaxxEntries.find((entry) => normalizedPath === `/lifemaxx/${entry.slug}`);
  if (lifemaxxEntry) {
    return {
      title: `${lifemaxxEntry.title} | ${site.name}`,
      description: lifemaxxEntry.summary,
      canonicalPath: normalizedPath,
    };
  }

  return {
    title: `${site.name}`,
    description: defaultDescription,
    canonicalPath: normalizedPath,
  };
}

export function buildCanonicalUrl(pathname: string) {
  const normalizedPath = normalizePath(pathname);
  return normalizedPath === '/' ? `${siteUrl}/` : `${siteUrl}${normalizedPath}`;
}

function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.replace(/\/+$/, '') || '/';
}
