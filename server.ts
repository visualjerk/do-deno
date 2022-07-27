import presetUno from '@unocss/preset-uno.ts'
import presetIcons from '@unocss/preset-icons.ts'
import { serve } from 'aleph/server'
import ssr from 'aleph/vue-ssr'
import VueLoader from 'aleph/vue-loader'
import routes from './routes/_export.ts'

serve({
  baseUrl: import.meta.url,
  router: {
    glob: './routes/**/*.{vue,ts}',
    routes,
  },
  loaders: [new VueLoader()],
  unocss: {
    presets: [
      presetUno(),
      presetIcons({
        cdn: 'https://esm.sh/',
      }),
    ],
  },
  ssr,
})
