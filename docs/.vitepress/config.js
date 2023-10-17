import { createRequire } from 'module'
// import { defineConfig } from 'vitepress'

const require = createRequire(import.meta.url)

const pkg = require('./../../package.json')

// https://vitepress.dev/reference/site-config
// export default defineConfig({
export default {
  lang: 'es-mx',
  title: 'SISDAI-MAPAS',
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
      '/accesibilidad/': sidebarAccesibilidad('accesibilidad'),
      '/datos/': sidebarDatos('datos'),

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
}

function nav() {
  return [
    {
      text: 'Sisdai',
      link: 'https://sisdai.conahcyt.mx/',
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
    {
      text: 'Accesibilidad',
      link: '/accesibilidad/',
      activeMatch: '/accesibilidad/',
    },
    // { text: 'Datos', link: '/datos/', activeMatch: '/datos/' },
    // {
    //   text: 'Visualizaciones',
    //   link: '/visualizaciones/',
    //   activeMatch: '/visualizaciones/',
    // },
    // { text: 'Avanzado', link: '/solo', activeMatch: '/solo' },
    { text: `v${pkg.version}`, link: pkg.repository.url },
  ]
}

function sidebarComienza(path) {
  return [
    {
      text: 'Mapa',
      // collapsed: false,
      items: [
        { text: 'Primeros pasos', link: `/${path}/` },
        // { text: 'Mapa Básico', link: `/${path}/basico` },
        { text: 'Configuración', link: `/${path}/configuracion` },
        { text: 'Vista', link: `/${path}/vista` },
      ],
    },

    {
      text: 'Capas',
      // collapsed: false,
      items: [
        { text: 'Capas', link: `/${path}/capas` },
        { text: 'Vectorial', link: `/${path}/capaVectorial` },
        { text: 'WMS', link: `/${path}/capaWms` },
        { text: 'XYZ', link: `/${path}/capaXyz` },
        // { text: 'Globos de información', link: `/${path}/globos` },
        { text: 'Leyenda', link: `/${path}/leyenda` },
      ],
    },

    {
      text: 'Estilos',
      // collapsed: false,
      items: [
        { text: 'Vectores', link: `/${path}/estiloPuntos` },
        // { text: 'Líneas', link: `/${path}/estiloLineas` },
        // { text: 'Polígonos', link: `/${path}/estiloPoligono` },
      ],
    },
  ]
}

function sidebarAccesibilidad(path) {
  return [
    {
      text: 'Navegación',
      // collapsed: false,
      items: [{ text: 'Teclado', link: `/${path}/` }],
    },
  ]
}

function sidebarDatos(path) {
  return [
    {
      text: 'Fuentes',
      // collapsed: false,
      items: [
        { text: 'Mosaicos', link: `/${path}/mosaicos` },
        { text: 'WFS', link: `/${path}/wfs` },
        { text: 'WMS', link: `/${path}/wms` },
      ],
    },
    {
      text: 'Clasificación',
      // collapsed: false,
      items: [
        { text: 'Categórica', link: `/${path}/categorica` },
        {
          text: 'Cortes naturales',
          link: `/${path}/cortes-naturales`,
        },
        {
          text: 'Cortes suavizados**',
          link: `/${path}/cortes-suavizados`,
        },
        { text: 'Cuantiles', link: `/${path}/cuantiles` },
        {
          text: 'Desviación estándar**',
          link: `/${path}/desviación`,
        },
        { text: 'Intervalo igual', link: `/${path}/intervalo-igual` },
        { text: 'Logarítmica**', link: `/${path}/logarítmica` },
        { text: 'Personalizada', link: `/${path}/personalizada` },
      ],
    },
  ]
}
