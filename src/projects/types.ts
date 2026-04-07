export type Project = {
  slug: string;
  title: string;
  summary: string;
  links?: Array<{
    label: string;
    href: string;
  }>;
  content: string;
};
