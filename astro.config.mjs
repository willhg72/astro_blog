import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-netlify-site-name.netlify.app', // Update this to your actual Netlify URL
  integrations: [mdx(), sitemap()],
  
  // For Netlify, static output works better
  output: 'static',
  
  // Remove the adapter when using static output
  // adapter: node({
  //   mode: 'standalone'
  // }),
});