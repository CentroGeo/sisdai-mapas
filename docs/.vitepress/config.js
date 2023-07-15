import { createRequire } from 'module'
import { defineConfig } from 'vitepress'

const require = createRequire(import.meta.url)

const pkg = require('./../../package.json')

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'es-mx',
  title: pkg.name,
  description: pkg.description,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Comienza', link: '/comienza/' },
      { text: 'Fuentes', link: '/fuentes/' },
      { text: 'Visualizaciones', link: '/visualizaciones/' },
      { text: 'Clasificaciones', link: '/clasificaciones/' },
      { text: 'Avanzado', link: '/avanzado/' },
      { text: 'solo', link: '/solo' },
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

      fuentes: [
        {
          text: 'Fuentes',
          // collapsed: false,
          items: [
            { text: 'Mosaicos', link: '/fuentes/mosaicos' },
            { text: 'WFS', link: '/fuentes/wfs' },
            { text: 'WMS', link: '/fuentes/wms' },
          ],
        },
      ],

      visualizaciones: [
        {
          text: 'Visualizaciones',
          // collapsed: false,
          items: [
            { text: 'Símbolo único', link: '/visualizaciones/simbolo-unico' },
            {
              text: 'Discos/Símbolos graduados',
              link: '/visualizaciones/simbolos-graduados',
            },
            { text: 'Coropletas', link: '/visualizaciones/coropletas' },
            { text: 'Bivariante**', link: '/visualizaciones/bivariante' },
            { text: 'Mallas*', link: '/visualizaciones/mallas' },
            { text: 'Grupos (Clusters)*', link: '/visualizaciones/grupos' },
            {
              text: 'Puntos desplazados*',
              link: '/visualizaciones/puntos-desplazados',
            },
            { text: 'Mapa de calor**', link: '/visualizaciones/mapa-calor' },
          ],
        },
      ],

      clasificacion: [
        {
          text: 'Clasificación de datos',
          // collapsed: false,
          items: [
            { text: 'Categórica', link: '/clasificacion/categorica' },
            {
              text: 'Cortes naturales',
              link: '/clasificacion/cortes-naturales',
            },
            {
              text: 'Cortes suavizados**',
              link: '/clasificacion/cortes-suavizados',
            },
            { text: 'Cuantiles', link: '/clasificacion/cuantiles' },
            {
              text: 'Desviación estándar**',
              link: '/clasificacion/desviación',
            },
            { text: 'Intervalo igual', link: '/clasificacion/intervalo-igual' },
            { text: 'Logarítmica**', link: '/clasificacion/logarítmica' },
            { text: 'Personalizada', link: '/clasificacion/personalizada' },
          ],
        },
      ],
    },

    socialLinks: [
      {
        icon: 'github',
        link: pkg.repository.url || '',
        ariaLabel: '',
      },
    ],
  },
})
