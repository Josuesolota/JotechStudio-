// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// IMPORTANTE: troque pelo seu domínio real assim que fizer o deploy na Vercel
// (ex: https://seunome.vercel.app ou seu domínio próprio).
// Isso é usado para gerar o sitemap.xml e as tags de SEO (og:url, canonical).
const SITE_URL = 'https://jotechstudio.vercel.app/';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
});
