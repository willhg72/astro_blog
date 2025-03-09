import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sistemas-operativos-blog.vercel.app', // <--- AÑADE ESTO
  // Indica que quieres SSR en lugar de estático
  output: 'server',

  // Usa el adaptador de Vercel
  adapter: vercel(),

  // Si tienes integraciones adicionales:
  integrations: [mdx(), sitemap()],
});
