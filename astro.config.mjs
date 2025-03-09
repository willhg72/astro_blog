import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sistemas-operativos-blog.netlify.app',
  output: 'server',         // Indica a Astro que renderice en modo servidor
  adapter: netlify(),       // Usa la función SSR normal de Netlify
  integrations: [mdx(), sitemap()],
});