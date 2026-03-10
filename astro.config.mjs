import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://chamomo.com',
  integrations: [
    react(),
    mdx(),
    sitemap(),
  ],
  adapter: vercel(),
  output: 'server',
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
    },
  },
});
