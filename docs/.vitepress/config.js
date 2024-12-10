import { defineConfig } from 'vitepress'
import { description } from './../../package.json'
import sidebarComienza, {
  nav as navComienza,
} from './../comienza/sidebar'
import sidebarMapas, { nav as navMapas } from './../mapas/sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'es-mx',
  title: 'sisdai-mapas',
  description,

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Montserrat:wght@300;400;500;600&display=swap',
      },
    ],
  ],

  themeConfig: {
    nav: [
      {
        text: 'Inicio',
        link: '/',
      },
      { ...navComienza },
      { ...navMapas },
    ],

    sidebar: {
      ...sidebarComienza,
      ...sidebarMapas,
    },
  },
})
