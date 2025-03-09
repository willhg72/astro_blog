import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
  
  // Choose either 'static' or 'server' for output
  output: 'server',
  
  // Keep the adapter for server-rendered pages
  adapter: node({
    mode: 'standalone'
  }),
});