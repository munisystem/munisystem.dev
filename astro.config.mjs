import { defineConfig } from 'astro/config'

// https://astro.build/config
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
import partytown from '@astrojs/partytown'

// https://astro.build/config
export default defineConfig({
  site: 'https://munisystem.dev',
  integrations: [
    tailwind(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'nord',
      wrap: false,
    },
  },
  output: 'server',
  adapter: vercel(),
})
