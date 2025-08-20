export const ruta = '/mapas/'

export const nav = { text: 'Mapas', link: ruta, activeMatch: ruta }

export const sidebar = [
  {
    text: 'Mapas',
    collapsed: false,
    items: [
      { text: 'Personalización', link: ruta },
      { text: 'Vista', link: `${ruta}vista` },
      { text: 'Mapa dividido', link: `${ruta}mapa-dividido` },
      { text: 'Accesibilidad', link: `${ruta}accesibilidad` },
    ],
  },

  {
    text: 'Capas',
    collapsed: false,
    items: [
      { text: 'General', link: `${ruta}capa` },
      { text: 'Vectorial', link: `${ruta}capa-vectorial` },
      { text: 'WMS', link: `${ruta}capa-wms` },
      // { text: 'UtfGrid', link: `${ruta}capaUtfGrid` },
      { text: 'XYZ', link: `${ruta}capa-xyz` },
    ],
  },

  {
    text: 'Leyendas',
    collapsed: false,
    items: [
      { text: 'Vinculada', link: `${ruta}leyenda` },
      { text: 'Vectorial', link: `${ruta}leyenda-vectorial` },
      { text: 'WMS', link: `${ruta}leyenda-wms` },
    ],
  },

  {
    text: 'Representaciones',
    collapsed: false,
    items: [
      // { text: 'Mallas', link: `${ruta}puntos-desplazados` },
      { text: 'Puntos agrupados', link: `${ruta}puntos-agrupados` },
      { text: 'Puntos desplazados', link: `${ruta}puntos-desplazados` },
    ],
  },

  {
    text: 'Estilos avanzados',
    collapsed: false,
    items: [
      { text: 'Coropletas', link: `${ruta}estilo-coropleta` },
      { text: 'Graduados', link: `${ruta}estilo-graduado` },
    ],
  },
]

export default { [ruta]: sidebar }
