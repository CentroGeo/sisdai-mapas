// export const ruta = '/'
export const ruta = '/mapas/'

export const nav = {
  text: 'Mapas',
  link: ruta,
  activeMatch: ruta,
}

export const sidebar = [
  {
    text: 'Mapas',
    collapsed: false,
    items: [
      { text: 'Personalización', link: ruta },
      { text: 'Vista', link: `${ruta}vista` },
    ],
  },

  {
    text: 'Capas',
    collapsed: false,
    items: [
      { text: 'General', link: `${ruta}capas` },
      { text: 'Vectorial', link: `${ruta}capa-vectorial` },
      { text: 'WMS', link: `${ruta}capa-wms` },
      // { text: 'UtfGrid', link: `${ruta}capaUtfGrid` },
      { text: 'XYZ', link: `${ruta}capa-xyz` },
      // { text: 'Globos de información', link: `${ruta}globos` },
    ],
  },

  {
    text: 'Leyendas',
    collapsed: false,
    items: [
      { text: 'General', link: `${ruta}leyenda` },
      { text: 'Vectorial', link: `${ruta}leyenda-vectorial` },
      { text: 'WMS', link: `${ruta}leyenda-wms` },
      // { text: 'UtfGrid', link: `${ruta}capaUtfGrid` },
    ],
  },

  {
    text: 'Representación',
    collapsed: false,
    items: [
      { text: 'Puntos Desplazados', link: `${ruta}puntos-desplazados` },
      { text: 'Coropletas', link: `${ruta}coropletas` },
      // { text: 'Líneas', link: `${ruta}estiloLineas` },
      // { text: 'Polígonos', link: `${ruta}estiloPoligono` },
    ],
  },
]

export default {
  [ruta]: sidebar,
}
