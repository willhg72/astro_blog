import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-netlify-site-name.netlify.app', // Update this to your actual Netlify URL
  integrations: [mdx(), sitemap()],
  
  // Keep server output
  output: 'server',
  
  // Use Netlify adapter instead of Node
  adapter: netlify({
    edgeMiddleware: true
  }),
});