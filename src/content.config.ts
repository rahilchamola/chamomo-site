import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    series: z.string().optional(),
    part: z.number().optional(),
    totalParts: z.number().optional(),
    nextSlug: z.string().optional(),
    prevSlug: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date(),
    status: z.enum(['active', 'completed', 'paused', 'archive']).default('active'),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    description: z.string().optional(),
    links: z.record(z.string()).optional(),
    tech: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

const ideas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ideas' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    status: z.enum(['seed', 'growing', 'mature']).default('seed'),
    description: z.string().optional(),
  }),
});

const dj = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dj' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['set', 'playlist', 'recap']).default('set'),
    venue: z.string().optional(),
    duration: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    soundcloud: z.string().optional(),
  }),
});

export const collections = { posts, projects, ideas, dj };
