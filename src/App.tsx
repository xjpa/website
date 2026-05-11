import { useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes, useLocation, useParams, useSearchParams } from 'react-router-dom';
import portraitOne from './assets/slide01.jpg';
import portraitTwo from './assets/slide2.jpg';
import portraitThree from './assets/slide3.jpg';
import { highlightCode } from './codeHighlight';
import { lifemaxxEntries } from './lifemaxx';
import type { LifemaxxEntry } from './lifemaxx';
import { posts } from './posts';
import type { BlogPost } from './posts';
import { projects } from './projects';
import type { Project } from './projects';
import { site } from './content/site';
import { buildCanonicalUrl, getPageMetadata } from './seo';

type TagFilter = {
  label: string;
  count: number;
};

type BlogHeading = {
  id: string;
  text: string;
  number: string;
  level: 2 | 3 | 4 | 5;
  children: BlogHeading[];
};

type RenderedHtmlContent = {
  html: string;
  headings: BlogHeading[];
};

type ThemePalette = {
  bg: string;
  bgTop: string;
  bgSoft: string;
  line: string;
  text: string;
  muted: string;
  accent: string;
  dot: string;
  heading: string;
  glow: string;
  grid: string;
  shadow: string;
};

const themePalettes: ThemePalette[] = [
  {
    bg: '#2458db',
    bgTop: '#2b62e2',
    bgSoft: 'rgba(255, 255, 255, 0.08)',
    line: 'rgba(255, 255, 255, 0.18)',
    text: '#dce8ff', //#C1F6FF
    muted: '#cad9ff',
    accent: '#ff6ea8',
    dot: '#ff6ea8',
    heading: '#f3f7ff',
    glow: 'rgba(255, 255, 255, 0.08)',
    grid: 'rgba(201, 217, 255, 0.22)',
    shadow: 'rgba(7, 26, 84, 0.2)',
  },
  {
    bg: '#13773d',
    bgTop: '#1b8a4b',
    bgSoft: 'rgba(235, 234, 162, 0.08)',
    line: 'rgba(254, 241, 235, 0.18)',
    text: '#ebeaa2',
    muted: '#dcd98f',
    accent: '#fef1eb',
    dot: '#e66f00',
    heading: '#fef1eb',
    glow: 'rgba(254, 241, 235, 0.08)',
    grid: 'rgba(254, 241, 235, 0.18)',
    shadow: 'rgba(9, 43, 20, 0.24)',
  },
  {
    bg: '#f7f4ee',
    bgTop: '#fffbf2',
    bgSoft: 'rgba(32, 36, 35, 0.04)',
    line: 'rgba(32, 36, 35, 0.12)',
    text: '#202423',
    muted: '#4d5654',
    accent: '#e9261e',
    dot: '#ff0100',
    heading: '#202423',
    glow: 'rgba(255, 255, 255, 0.72)',
    grid: 'rgba(32, 36, 35, 0.12)',
    shadow: 'rgba(32, 36, 35, 0.08)',
  },
];

const RANDOMIZE_THEME_ON_LOAD = false;
const DEFAULT_THEME_INDEX = 2;

function pickRandomTheme() {
  return themePalettes[Math.floor(Math.random() * themePalettes.length)];
}

function getTheme() {
  if (RANDOMIZE_THEME_ON_LOAD) {
    return pickRandomTheme();
  }

  return themePalettes[DEFAULT_THEME_INDEX];
}

function resolvePublicAssetPath(path: string) {
  if (!path.startsWith('/')) {
    return path;
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

function usePageMetadata() {
  const location = useLocation();

  useEffect(() => {
    const metadata = getPageMetadata(location.pathname);
    document.title = metadata.title;

    const description =
      document.querySelector('meta[name="description"]') ??
      Object.assign(document.createElement('meta'), { name: 'description' });
    description.setAttribute('content', metadata.description);

    if (!description.parentNode) {
      document.head.appendChild(description);
    }

    const canonical =
      document.querySelector('link[rel="canonical"]') ??
      Object.assign(document.createElement('link'), { rel: 'canonical' });
    canonical.setAttribute('href', buildCanonicalUrl(metadata.canonicalPath));

    if (!canonical.parentNode) {
      document.head.appendChild(canonical);
    }
  }, [location.pathname]);
}

function App() {
  const theme = useMemo(() => getTheme(), []);
  usePageMetadata();

  useEffect(() => {
    const root = document.documentElement;

    Object.entries(theme).forEach(([token, value]) => {
      const cssVar = `--${token.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}`;
      root.style.setProperty(cssVar, value);
    });
  }, [theme]);

  return (
    <div className="page-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/lifemaxx" element={<LifemaxxIndex />} />
          <Route path="/lifemaxx/:slug" element={<LifemaxxEntryPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </main>
    </div>
  );
}

function Header() {
  const location = useLocation();

  return (
    <header className="topbar">
      <Link className="brand" to="/">
        John Patrick Amata
      </Link>
      <nav className="nav">
        <Link className={location.pathname === '/' ? 'active' : ''} to="/">
          home
        </Link>
        <Link className={location.pathname.startsWith('/blog') ? 'active' : ''} to="/blog">
          blog
        </Link>
        <Link className={location.pathname === '/archive' ? 'active' : ''} to="/archive">
          archive
        </Link>
        <Link className={location.pathname.startsWith('/lifemaxx') ? 'active' : ''} to="/lifemaxx">
          lifemaxx
        </Link>
      </nav>
    </header>
  );
}

function HomePage() {
  return (
    <section className="hero-grid">
      <div className="hero-copy">
        <h1 className="headline">
          {site.name}
          {site.accentDot ? <span className="accent-dot">•</span> : null}
        </h1>
        <p className="lede">{site.title}</p>
        {site.intro.map((paragraph) => (
          <p className="intro" key={paragraph}>
            {paragraph}
          </p>
        ))}

        <ul className="links-list">
          <li>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          {/*<li>code:
            <a href={site.github} target="_blank" rel="noreferrer">
              github.com/xjpa
            </a>
          </li>
          */}

        </ul>

        <section className="panel">
          <h2>Stuff.</h2>
          <ul className="project-list">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link className="project-link" to={`/projects/${project.slug}`}>
                  {project.title}
                </Link>{' '}
                — {project.summary}
              </li>
            ))}
          </ul>
        </section>

      </div>

      <aside className="hero-art" aria-label="Decorative avatar card">
        <AsciiCard />
      </aside>
    </section>
  );
}

function BlogIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTag = searchParams.get('tag');

  const tagFilters = useMemo<TagFilter[]>(() => {
    const tagCounts = new Map<string, number>();

    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
      });
    });

    return [
      { label: 'All', count: posts.length },
      ...Array.from(tagCounts.entries())
        .sort((left, right) => left[0].localeCompare(right[0]))
        .map(([label, count]) => ({ label, count })),
    ];
  }, []);

  const activeTag =
    selectedTag && tagFilters.some((tag) => tag.label === selectedTag) ? selectedTag : 'All';

  const visiblePosts = useMemo(
    () => (activeTag === 'All' ? posts : posts.filter((post) => post.tags.includes(activeTag))),
    [activeTag],
  );

  function handleTagFilterChange(tag: string) {
    if (tag === 'All') {
      setSearchParams({});
      return;
    }

    setSearchParams({ tag });
  }

  return (
    <section className="blog-layout">
      <div className="section-heading">
        <p className="eyebrow">Blog</p>
        <h1>on software, and systems</h1>
        <p className="about-copy">
          notes to self
        </p>
      </div>

      <div className="blog-toolbar">
        <div className="tag-cloud" aria-label="Filter posts by tag">
          {tagFilters.map((tag) => (
            <button
              key={tag.label}
              className={`tag-filter ${activeTag === tag.label ? 'active' : ''}`}
              onClick={() => handleTagFilterChange(tag.label)}
              type="button"
            >
              <span>{tag.label}</span>
              <span className="tag-count">{tag.count}</span>
            </button>
          ))}
        </div>
        <Link className="inline-link archive-link" to="/archive">
          Browse archive →
        </Link>
      </div>

      <div className="posts-grid">
        {visiblePosts.map((post) => (
          <article className="post-card" key={post.slug}>
            <p className="post-date">{formatDate(post.date)}</p>
            <h2>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            {post.coverImage ? (
              <img className="post-cover" src={resolvePublicAssetPath(post.coverImage)} alt={post.title} />
            ) : null}
            <p>{post.summary}</p>
            <div className="tag-row">
              {post.tags.map((tag) => (
                <Link className="tag tag-link" key={tag} to={`/blog?tag=${encodeURIComponent(tag)}`}>
                  {tag}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ArchivePage() {
  return (
    <section className="blog-layout">
      <div className="section-heading">
        <p className="eyebrow">Archive</p>
        <h1>All tech blog posts.</h1>
      </div>

      <div className="archive-list">
        {posts.map((post) => (
          <article className="archive-item" key={post.slug}>
            <p className="post-date">{formatDate(post.date)}</p>
            <h2>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
          </article>
        ))}
      </div>
    </section>
  );
}

function LifemaxxIndex() {
  return (
    <section className="blog-layout">
      <div className="section-heading">
        <p className="eyebrow">Lifemaxx</p>
        <h1>on being human again</h1>
        <p className="about-copy">wrong turns, lucky nights, and proofs of life</p>
      </div>

      <div className="posts-grid">
        {lifemaxxEntries.map((entry) => (
          <article className="post-card" key={entry.slug}>
            <p className="post-date">{formatDate(entry.date)}</p>
            <h2>
              <Link to={`/lifemaxx/${entry.slug}`}>{entry.title}</Link>
            </h2>
            <p>{entry.summary}</p>
            <div className="tag-row">
              {entry.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function LifemaxxEntryPage() {
  const { slug } = useParams();
  const location = useLocation();
  const entry = lifemaxxEntries.find((item) => item.slug === slug);
  const renderedEntry = useMemo(() => (entry ? renderHtmlContent(entry.content) : null), [entry]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sectionId = params.get('section');

    if (!sectionId) {
      return;
    }

    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [entry, location.search]);

  if (!entry) {
    return (
      <section className="blog-layout">
        <h1>Entry not found.</h1>
        <Link className="inline-link" to="/lifemaxx">
          Back to lifemaxx
        </Link>
      </section>
    );
  }

  return (
    <article className="post-layout">
      <Link className="inline-link" to="/lifemaxx">
        ← Back to lifemaxx
      </Link>
      <p className="post-date">{formatDate(entry.date)}</p>
      <h1>{entry.title}</h1>
      <p className="about-copy">{entry.summary}</p>
      <div className="tag-row">
        {entry.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      {renderedEntry && countHeadings(renderedEntry.headings) > 1 ? (
        <nav className="table-of-contents" aria-label="Table of contents">
          <p className="toc-title">Contents</p>
          <TableOfContents headings={renderedEntry.headings} basePath={`/lifemaxx/${entry.slug}`} />
        </nav>
      ) : null}
      {renderedEntry ? (
        <div className="post-body post-body-html" dangerouslySetInnerHTML={{ __html: renderedEntry.html }} />
      ) : null}
    </article>
  );
}

function ProjectPage() {
  const { slug } = useParams();
  const location = useLocation();
  const project = projects.find((entry) => entry.slug === slug);
  const renderedProject = useMemo(() => (project ? renderHtmlContent(project.content) : null), [project]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sectionId = params.get('section');

    if (!sectionId) {
      return;
    }

    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.search, project]);

  if (!project) {
    return (
      <section className="blog-layout">
        <h1>Project not found.</h1>
        <Link className="inline-link" to="/">
          Back to home
        </Link>
      </section>
    );
  }

  return (
    <article className="post-layout">
      <Link className="inline-link" to="/">
        ← Back to home
      </Link>
      <p className="post-date">Project</p>
      <h1>{project.title}</h1>
      <p className="about-copy">{project.summary}</p>
      {renderedProject && countHeadings(renderedProject.headings) > 1 ? (
        <nav className="table-of-contents" aria-label="Table of contents">
          <p className="toc-title">Contents</p>
          <TableOfContents headings={renderedProject.headings} basePath={`/projects/${project.slug}`} />
        </nav>
      ) : null}
      {renderedProject ? (
        <div className="post-body post-body-html" dangerouslySetInnerHTML={{ __html: renderedProject.html }} />
      ) : null}
      {project.links && project.links.length > 0 ? (
        <div className="tag-row">
          {project.links.map((link) => (
            <a className="tag project-tag-link" href={link.href} key={link.label} rel="noreferrer" target="_blank">
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function BlogPostPage() {
  const { slug } = useParams();
  const location = useLocation();
  const post = posts.find((entry) => entry.slug === slug);
  const renderedPost = useMemo(() => (post ? renderHtmlContent(post.content) : null), [post]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sectionId = params.get('section');

    if (!sectionId) {
      return;
    }

    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.search, post]);

  if (!post) {
    return (
      <section className="blog-layout">
        <h1>Post not found.</h1>
        <Link className="inline-link" to="/blog">
          Back to blog
        </Link>
      </section>
    );
  }

  return (
    <article className="post-layout">
      <Link className="inline-link" to="/blog">
        ← Back to blog
      </Link>
      <p className="post-date">{formatDate(post.date)}</p>
      <h1>{post.title}</h1>
      {post.coverImage ? <img className="post-hero" src={resolvePublicAssetPath(post.coverImage)} alt={post.title} /> : null}
      <p className="about-copy">{post.summary}</p>
      <div className="tag-row">
        {post.tags.map((tag) => (
          <Link className="tag tag-link" key={tag} to={`/blog?tag=${encodeURIComponent(tag)}`}>
            {tag}
          </Link>
        ))}
      </div>
      {renderedPost && countHeadings(renderedPost.headings) > 1 ? (
        <nav className="table-of-contents" aria-label="Table of contents">
          <p className="toc-title">Contents</p>
          <TableOfContents headings={renderedPost.headings} basePath={`/blog/${post.slug}`} />
        </nav>
      ) : null}
      {renderedPost ? <div className="post-body post-body-html" dangerouslySetInnerHTML={{ __html: renderedPost.html }} /> : null}
    </article>
  );
}

function AvatarCard() {
  return (
    <div className="avatar-card">
      <div className="avatar-grid" />
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      <div className="orb orb-d" />
      <div className="monogram">JA</div>
    </div>
  );
}

function AsciiCard() {
  const portraits = [portraitOne, portraitTwo, portraitThree];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % portraits.length);
    }, 2800);

    return () => window.clearInterval(intervalId);
  }, [portraits.length]);

  return (
    <div className="ascii-card">
      <div className="portrait-frame">
        <div className="portrait-grid" aria-hidden="true" />
        {portraits.map((portrait, index) => (
          <img
            className={`portrait-image ${activeIndex === index ? 'is-active' : ''}`}
            src={portrait}
            alt="John Amata portrait"
            key={portrait}
          />
        ))}
      </div>
    </div>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function renderHtmlContent(content: string): RenderedHtmlContent {
  const slugCounts = new Map<string, number>();
  const headings: BlogHeading[] = [];
  const headingStack: BlogHeading[] = [];
  let html = content.replace(/<h([2-5])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, levelValue, rawAttributes, innerHtml) => {
    const text = stripHtml(innerHtml).trim();

    if (!text) {
      return match;
    }

    const baseId = slugify(text);
    const currentCount = slugCounts.get(baseId) ?? 0;
    const id = currentCount === 0 ? baseId : `${baseId}-${currentCount + 1}`;
    slugCounts.set(baseId, currentCount + 1);

    const level = Number(levelValue) as BlogHeading['level'];

    while (headingStack.length > 0 && headingStack[headingStack.length - 1].level >= level) {
      headingStack.pop();
    }

    const parentHeading = headingStack[headingStack.length - 1];
    const siblingIndex = parentHeading ? parentHeading.children.length + 1 : headings.length + 1;
    const number = parentHeading ? `${parentHeading.number}.${siblingIndex}` : `${siblingIndex}`;
    const tocHeading: BlogHeading = { id, text, number, level, children: [] };

    if (headingStack.length === 0) {
      headings.push(tocHeading);
    } else {
      parentHeading.children.push(tocHeading);
    }

    headingStack.push(tocHeading);

    return `<h${levelValue}${setAttribute(rawAttributes, 'id', id)}><span class="heading-number">${number}. </span>${innerHtml}</h${levelValue}>`;
  });

  html = html.replace(/<a\b([^>]*?)href=(["'])(.*?)\2([^>]*)>/gi, (match, beforeHref, quote, href, afterHref) => {
    if (!/^https?:\/\//i.test(href)) {
      return match;
    }

    let attributes = `${beforeHref}href=${quote}${href}${quote}${afterHref}`;
    attributes = setAttribute(attributes, 'target', '_blank');
    attributes = setAttribute(attributes, 'rel', 'noreferrer');
    return `<a${attributes}>`;
  });

  html = html.replace(/<(img|source|video)\b([^>]*?)src=(["'])(.*?)\3([^>]*)>/gi, (match, tagName, beforeSrc, quote, src, afterSrc) => {
    if (!src.startsWith('/')) {
      return match;
    }

    return `<${tagName}${beforeSrc}src=${quote}${resolvePublicAssetPath(src)}${quote}${afterSrc}>`;
  });

  html = html.replace(/<pre\b([^>]*)>\s*<code\b([^>]*)>([\s\S]*?)<\/code>\s*<\/pre>/gi, (match, preAttributes, codeAttributes, codeHtml) => {
    const language =
      codeAttributes.match(/class=(["'])[^"']*language-([a-z0-9-]+)[^"']*\1/i)?.[2] ??
      codeAttributes.match(/data-language=(["'])(.*?)\1/i)?.[2] ??
      'text';
    const decodedCode = decodeHtml(codeHtml);
    const highlightedCode = renderHighlightedCodeHtml(decodedCode, language);

    return `<pre${appendClassName(preAttributes, 'code-block-pre')}><code${codeAttributes}>${highlightedCode}</code></pre>`;
  });

  html = html.replace(/<iframe\b([^>]*)>/gi, (match, attributes) => {
    let nextAttributes = appendClassName(attributes, 'embed-frame');
    if (!/\sloading\s*=/i.test(nextAttributes)) {
      nextAttributes += ' loading="lazy"';
    }

    return `<iframe${nextAttributes}>`;
  });

  return {
    html,
    headings,
  };
}

function TableOfContents({ headings, basePath }: { headings: BlogHeading[]; basePath: string }) {
  return (
    <ol>
      {headings.map((heading) => (
        <li key={heading.id}>
          <Link to={`${basePath}?section=${heading.id}`}>
            <span className="toc-number">{heading.number}.</span> {heading.text}
          </Link>
          {heading.children.length > 0 ? (
            <TableOfContents headings={heading.children} basePath={basePath} />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function countHeadings(headings: BlogHeading[]): number {
  return headings.reduce((total, heading) => total + 1 + countHeadings(heading.children), 0);
}

function renderHighlightedCodeHtml(code: string, language: string) {
  return highlightCode(code, language)
    .map(
      (line) =>
        `<span class="code-line">${line
          .map((token) => `<span class="token token-${token.kind}">${escapeHtml(token.value)}</span>`)
          .join('')}</span>`,
    )
    .join('\n');
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripHtml(value: string) {
  return decodeHtml(value.replace(/<[^>]+>/g, ''));
}

function decodeHtml(value: string) {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

function setAttribute(attributes: string, name: string, value: string) {
  const attributePattern = new RegExp(`\\s${name}\\s*=\\s*([\"']).*?\\1`, 'i');

  if (attributePattern.test(attributes)) {
    return attributes.replace(attributePattern, ` ${name}="${escapeHtml(value)}"`);
  }

  return `${attributes} ${name}="${escapeHtml(value)}"`;
}

function appendClassName(attributes: string, className: string) {
  const classMatch = attributes.match(/\sclass\s*=\s*(["'])(.*?)\1/i);

  if (!classMatch) {
    return `${attributes} class="${className}"`;
  }

  const existingClassNames = classMatch[2]
    .split(/\s+/)
    .filter(Boolean);

  if (!existingClassNames.includes(className)) {
    existingClassNames.push(className);
  }

  return attributes.replace(classMatch[0], ` class="${existingClassNames.join(' ')}"`);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export default App;
