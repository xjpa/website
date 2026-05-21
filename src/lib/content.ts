export type TocHeading = {
  slug: string;
  text: string;
  depth: 2 | 3 | 4 | 5;
  number: string;
  children: TocHeading[];
};

type FlatHeading = {
  slug: string;
  text: string;
  depth: number;
};

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function sortByDateDesc<T extends { data: { date: Date } }>(entries: T[]) {
  return [...entries].sort((left, right) => right.data.date.getTime() - left.data.date.getTime());
}

export function buildToc(headings: FlatHeading[]) {
  const toc: TocHeading[] = [];
  const stack: TocHeading[] = [];

  for (const heading of headings) {
    if (heading.depth < 2 || heading.depth > 5) {
      continue;
    }

    const node: TocHeading = {
      slug: heading.slug,
      text: heading.text,
      depth: heading.depth as TocHeading['depth'],
      number: '',
      children: [],
    };

    while (stack.length > 0 && stack[stack.length - 1].depth >= node.depth) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];
    const siblingIndex = parent ? parent.children.length + 1 : toc.length + 1;
    node.number = parent ? `${parent.number}.${siblingIndex}` : `${siblingIndex}`;

    if (parent) {
      parent.children.push(node);
    } else {
      toc.push(node);
    }

    stack.push(node);
  }

  return toc;
}
