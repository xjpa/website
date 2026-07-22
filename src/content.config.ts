import { defineCollection, z } from 'astro:content';

const datedEntrySchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  summary: z.string(),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().optional(),
});

const blog = defineCollection({
  type: 'content',
  schema: datedEntrySchema,
});

const ascend = defineCollection({
  type: 'content',
  schema: datedEntrySchema,
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string().url(),
        }),
      )
      .default([]),
  }),
});

export const collections = { ascend, blog, projects };
