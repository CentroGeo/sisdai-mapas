import { defineConfig } from 'vitepress'
import { description } from './../../package.json'
import sidebarComienza, { nav as navComienza } from './../comienza/sidebar'
import sidebarMapas, { nav as navMapas } from './../mapas/sidebar'
import * as dotenv from 'dotenv'

const {
  VITE_CDN_ARCHIVOS,
  VITE_DOMINIO,
  VITE_URL_BASE,
  VITE_DESCRIPCION,
  VITE_GOOGLE_ANALYTICS_ID,
} = dotenv.config({
  path: 'docs/.env',
}).parsed

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'es-mx',
  title: 'sisdai-mapas',
  description,
  base: VITE_URL_BASE,

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
    ['meta', { property: 'og:title', content: 'sisdai-mapas' }],
    ['meta', { property: 'og:description', content: `${VITE_DESCRIPCION}` }],
    [
      'meta',
      {
        property: 'og:image',
        content: `${VITE_CDN_ARCHIVOS}redes/miniatura-sisdaimapas.png`,
      },
    ],
    [
      'meta',
      { property: 'og:url', content: `${VITE_DOMINIO}${VITE_URL_BASE}` },
    ],

    ['meta', { name: 'twitter:title', content: 'sisdai-mapas' }],
    ['meta', { name: 'twitter:description', content: `${VITE_DESCRIPCION}` }],
    [
      'meta',
      {
        name: 'twitter:image',
        content: `${VITE_CDN_ARCHIVOS}redes/miniatura-sisdaimapas.png`,
      },
    ],
    [
      'script',
      {
        async: '',
        src: `https://www.googletagmanager.com/gtag/js?id=${VITE_GOOGLE_ANALYTICS_ID}`,
      },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${VITE_GOOGLE_ANALYTICS_ID}');`,
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
