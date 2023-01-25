import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  site: 'https://munisystem.dev/',
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'nord',
      wrap: false,
    },
  },
  output: 'static',
  adapter: vercel(),
});
