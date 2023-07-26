import { createRequire } from 'module'
import { defineConfig } from 'vitepress'

const require = createRequire(import.meta.url)

const pkg = require('./../../package.json')

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'es-mx',
  title: pkg.name,
  description: pkg.description,

  lastUpdated: true,

  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://file.myfontastic.com/JS4TgqY9L4s8WsKQDkt5qA/icons.css',
      },
    ],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),

    sidebar: {
      '/comienza/': sidebarComienza('comienza'),
      '/fuentes/': sidebarFuentes('fuentes'),

      // visualizaciones: [
      //   {
      //     text: 'Visualizaciones',
      //     // collapsed: false,
      //     items: [
      //       { text: 'Símbolo único', link: '/visualizaciones/simbolo-unico' },
      //       {
      //         text: 'Discos/Símbolos graduados',
      //         link: '/visualizaciones/simbolos-graduados',
      //       },
      //       { text: 'Coropletas', link: '/visualizaciones/coropletas' },
      //       { text: 'Bivariante**', link: '/visualizaciones/bivariante' },
      //       { text: 'Mallas*', link: '/visualizaciones/mallas' },
      //       { text: 'Grupos (Clusters)*', link: '/visualizaciones/grupos' },
      //       {
      //         text: 'Puntos desplazados*',
      //         link: '/visualizaciones/puntos-desplazados',
      //       },
      //       { text: 'Mapa de calor**', link: '/visualizaciones/mapa-calor' },
      //     ],
      //   },
      // ],

      // clasificacion: [
      //   {
      //     text: 'Clasificación de datos',
      //     // collapsed: false,
      //     items: [
      //       { text: 'Categórica', link: '/clasificacion/categorica' },
      //       {
      //         text: 'Cortes naturales',
      //         link: '/clasificacion/cortes-naturales',
      //       },
      //       {
      //         text: 'Cortes suavizados**',
      //         link: '/clasificacion/cortes-suavizados',
      //       },
      //       { text: 'Cuantiles', link: '/clasificacion/cuantiles' },
      //       {
      //         text: 'Desviación estándar**',
      //         link: '/clasificacion/desviación',
      //       },
      //       { text: 'Intervalo igual', link: '/clasificacion/intervalo-igual' },
      //       { text: 'Logarítmica**', link: '/clasificacion/logarítmica' },
      //       { text: 'Personalizada', link: '/clasificacion/personalizada' },
      //     ],
      //   },
      // ],
    },

    socialLinks: [
      {
        icon: 'github',
        link: pkg.repository.url || '',
        ariaLabel: '',
      },
    ],

    lastUpdated: {
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
        timeZone: 'America/Mexico_City',
      },
      text: 'Última actualización',
    },
  },
})

function nav() {
  return [
    {
      text: 'Sisdai',
      link: 'https://sisdai.conacyt.mx/',
      rel: 'noopener noreferrer',
      target: '_blank',
    },
    { text: 'Inicio', link: '/' },
    {
      text: 'Comienza',
      link: '/comienza/',
      activeMatch: '/comienza/',
      // items: [],
    },
    { text: 'Fuentes', link: '/fuentes/', activeMatch: '/fuentes/' },
    // {
    //   text: 'Visualizaciones',
    //   link: '/visualizaciones/',
    //   activeMatch: '/visualizaciones/',
    // },
    // {
    //   text: 'Clasificaciones',
    //   link: '/clasificaciones/',
    //   activeMatch: '/clasificaciones/',
    // },
    // { text: 'Avanzado', link: '/avanzado/', activeMatch: '/avanzado/' },
    { text: 'solo', link: '/solo' },
  ]
}

function sidebarComienza(path) {
  return {
    text: 'Comienza',
    // collapsed: false,
    items: [
      { text: 'Instalación', link: `/${path}/instalacion` },
      { text: 'Mapa Básico', link: `/${path}/basico` },
      { text: 'Configuración', link: `/${path}/configuracion` },
      { text: 'Vista', link: `/${path}/vista` },
      { text: 'Capas', link: `/${path}/capas` },
      { text: 'Globos de información', link: `/${path}/globos` },
      { text: 'Leyenda', link: `/${path}/leyenda` },
    ],
  }
}

function sidebarFuentes(path) {
  return {
    text: 'Fuentes',
    // collapsed: false,
    items: [
      { text: 'Mosaicos', link: `/${path}/mosaicos` },
      { text: 'WFS', link: `/${path}/wfs` },
      { text: 'WMS', link: `/${path}/wms` },
    ],
  }
}
