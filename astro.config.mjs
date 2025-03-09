import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Indica que quieres SSR en lugar de estático
  output: 'server',

  // Usa el adaptador de Vercel
  adapter: vercel(),

  // Si tienes integraciones adicionales:
  integrations: [mdx(), sitemap()],
});
