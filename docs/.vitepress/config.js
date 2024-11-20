import pkg from './../../package.json'
import sidebarDocumentacion, {
  nav as navDocumentacion,
  sidebar as sidebarInicio
} from '../documentacion/sidebar'
import sidebarAccesibilidad, { nav as navAccesibilidad } from './../accesibilidad/sidebar'

// .vitepress/config.js
export default {
  // site-level options
  lang: 'es-mx',
  title: pkg.name,
  description: pkg.description,
  version: pkg.version,
  lastUpdated: true,
  // appearance: false,

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Montserrat:wght@300;400;500;600&display=swap'
      }
    ]
  ],

  // https://vitepress.dev/exs/reference/default-theme-config
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config#nav
    nav: [
      { ...navDocumentacion },
      { ...navAccesibilidad },
      {
        text: `v${pkg.version}`,
        link: pkg.repository.url,
        rel: 'noopener noreferrer',
        target: '_blank',
        img: 'https://cdn.conahcyt.mx/sisdai-archivos/gitlab-logo-500.png'
      }
    ],

    // https://vitepress.dev/es/reference/default-theme-config#sidebar
    // https://vitepress.dev/es/reference/default-theme-sidebar
    sidebar: {
      // '/comienza/': sidebarDocumentacion
      '/': sidebarInicio,
      ...sidebarDocumentacion,
      ...sidebarAccesibilidad
    }
  },
}
