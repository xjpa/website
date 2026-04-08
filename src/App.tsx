import { useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import portraitOne from '../slide1.jpg';
import portraitTwo from '../slide2.jpg';
import portraitThree from '../slide3.jpg';
import { highlightCode } from './codeHighlight';
import { lifemaxxEntries } from './lifemaxx';
import type { LifemaxxEntry } from './lifemaxx';
import { posts } from './posts';
import type { BlogPost } from './posts';
import { projects } from './projects';
import type { Project } from './projects';
import { site } from './content/site';

type TagFilter = {
  label: string;
  count: number;
};

type BlogHeading = {
  id: string;
  text: string;
  level: 2 | 3 | 4 | 5;
  children: BlogHeading[];
};

type RenderedHtmlContent = {
  html: string;
  headings: BlogHeading[];
};

function resolvePublicAssetPath(path: string) {
  if (!path.startsWith('/')) {
    return path;
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

function useDocumentTitle(pageTitle?: string) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${site.name}` : site.name;
  }, [pageTitle]);
}

function App() {
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
          portfolio
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
  useDocumentTitle();

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
          <li>code:
            <a href={site.github} target="_blank" rel="noreferrer">
              github.com/xjpa
            </a>
          </li>

        </ul>

        <section className="panel">
          <h2>Projects.</h2>
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
  useDocumentTitle('Blog');

  const [activeTag, setActiveTag] = useState('All');

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

  const visiblePosts = useMemo(
    () => (activeTag === 'All' ? posts : posts.filter((post) => post.tags.includes(activeTag))),
    [activeTag],
  );

  return (
    <section className="blog-layout">
      <div className="section-heading">
        <p className="eyebrow">Blog</p>
        <h1>Notes on AI, security, and systems.</h1>
        <p className="about-copy">
          personal tech skillmaxxing protocols
        </p>
      </div>

      <div className="blog-toolbar">
        <div className="tag-cloud" aria-label="Filter posts by tag">
          {tagFilters.map((tag) => (
            <button
              key={tag.label}
              className={`tag-filter ${activeTag === tag.label ? 'active' : ''}`}
              onClick={() => setActiveTag(tag.label)}
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

function ArchivePage() {
  useDocumentTitle('Archive');

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
  useDocumentTitle('Lifemaxx');

  return (
    <section className="blog-layout">
      <div className="section-heading">
        <p className="eyebrow">Lifemaxx</p>
        <h1>Discipline, systems, and performance notes.</h1>
        <p className="about-copy">A separate feed for routines, self-management, and high-agency living.</p>
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

  useDocumentTitle(entry ? entry.title : 'Lifemaxx');

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

  useDocumentTitle(project ? project.title : 'Project');

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

  useDocumentTitle(post ? post.title : 'Blog');

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
          <span className="tag" key={tag}>
            {tag}
          </span>
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
  const document = new DOMParser().parseFromString(content, 'text/html');
  const slugCounts = new Map<string, number>();
  const headings: BlogHeading[] = [];
  const headingStack: BlogHeading[] = [];

  document.querySelectorAll('h2, h3, h4, h5').forEach((heading) => {
    const text = heading.textContent?.trim() ?? '';

    if (!text) {
      return;
    }

    const baseId = slugify(text);
    const currentCount = slugCounts.get(baseId) ?? 0;
    const id = currentCount === 0 ? baseId : `${baseId}-${currentCount + 1}`;
    slugCounts.set(baseId, currentCount + 1);
    heading.id = id;

    const level = Number(heading.tagName.slice(1)) as BlogHeading['level'];
    const tocHeading: BlogHeading = { id, text, level, children: [] };

    while (headingStack.length > 0 && headingStack[headingStack.length - 1].level >= level) {
      headingStack.pop();
    }

    if (headingStack.length === 0) {
      headings.push(tocHeading);
    } else {
      headingStack[headingStack.length - 1].children.push(tocHeading);
    }

    headingStack.push(tocHeading);
  });

  document.querySelectorAll('a[href]').forEach((anchor) => {
    const href = anchor.getAttribute('href') ?? '';

    if (/^https?:\/\//.test(href)) {
      anchor.setAttribute('target', '_blank');
      anchor.setAttribute('rel', 'noreferrer');
    }
  });

  document.querySelectorAll('img[src], source[src], video[src]').forEach((element) => {
    const src = element.getAttribute('src') ?? '';
    if (src.startsWith('/')) {
      element.setAttribute('src', resolvePublicAssetPath(src));
    }
  });

  document.querySelectorAll('pre > code').forEach((codeElement) => {
    const language =
      codeElement.className.match(/language-([a-z0-9-]+)/i)?.[1] ??
      codeElement.getAttribute('data-language') ??
      'text';
    const code = codeElement.textContent ?? '';
    const preElement = codeElement.parentElement;

    if (!preElement) {
      return;
    }

    codeElement.innerHTML = renderHighlightedCodeHtml(code, language);
    preElement.classList.add('code-block-pre');
  });

  document.querySelectorAll('iframe').forEach((iframe) => {
    iframe.classList.add('embed-frame');
    if (!iframe.getAttribute('loading')) {
      iframe.setAttribute('loading', 'lazy');
    }
  });

  return {
    html: document.body.innerHTML,
    headings,
  };
}

function TableOfContents({ headings, basePath }: { headings: BlogHeading[]; basePath: string }) {
  return (
    <ol>
      {headings.map((heading) => (
        <li key={heading.id}>
          <Link to={`${basePath}?section=${heading.id}`}>{heading.text}</Link>
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

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export default App;
