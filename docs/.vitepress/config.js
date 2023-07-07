import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'es-mx',
  title: 'mapas-vue3',
  description: 'pruebas para la siguiente versión de mapas',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Comienza', link: '/comienza/' },
      { text: 'Fuentes', link: '/fuentes/' },
      { text: 'Visualizaciones', link: '/visualizaciones/' },
      { text: 'Clasificaciones', link: '/clasificaciones/' },
      { text: 'Avanzado', link: '/avanzado/' },
    ],

    sidebar: {
      comienza: [
        {
          text: 'Comienza',
          // collapsed: false,
          items: [
            { text: 'Instalación', link: '/comienza/instalacion' },
            { text: 'Mapa Básico', link: '/comienza/basico' },
            { text: 'Configuración', link: '/comienza/configuracion' },
            { text: 'Vista', link: '/comienza/vista' },
            { text: 'Capas', link: '/comienza/capas' },
            { text: 'Globos de información', link: '/comienza/globos' },
            { text: 'Leyenda', link: '/comienza/leyenda' },
          ],
        },
      ],
      '/fuentes/': [
        {
          text: 'Fuentes',
          // collapsed: false,
          items: [
            { text: 'Mapa básico', link: '/fuentes/basico' },
            { text: 'Otro', link: '/fuentes/otro' },
          ],
        },
      ],
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/salsa-community/sisdai-mapas',
        ariaLabel: '',
      },
    ],
  },
})
