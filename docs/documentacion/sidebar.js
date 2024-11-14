// export const ruta = '/'
export const ruta = '/documentacion/'

export const nav = {
  text: 'Documentación',
  link: ruta,
  activeMatch: ruta
}

export const sidebar = [
  {
    text: 'Mapa',
    collapsed: false,
    items: [
      { text: 'Primeros pasos', link: ruta },
      { text: 'Configuración', link: `${ruta}configuracion` },
      { text: 'Vista', link: `${ruta}vista` }
    ]
  },

  {
    text: 'Capas',
    // collapsed: false,
    items: [
      { text: 'Capas', link: `${ruta}capas` },
      { text: 'Vectorial', link: `${ruta}capaVectorial` },
      { text: 'WMS', link: `${ruta}capaWms` },
      // { text: 'UtfGrid', link: `${ruta}capaUtfGrid` },
      { text: 'XYZ', link: `${ruta}capaXyz` },
      // { text: 'Globos de información', link: `${ruta}globos` },
      { text: 'Leyenda', link: `${ruta}leyenda` },
      { text: 'Puntos Desplazados', link: `${ruta}puntos-desplazados` }
    ]
  },

  {
    text: 'Estilos',
    // collapsed: false,
    items: [
      { text: 'Vectores', link: `${ruta}estiloPuntos` }
      // { text: 'Líneas', link: `${ruta}estiloLineas` },
      // { text: 'Polígonos', link: `${ruta}estiloPoligono` },
    ]
  }
]

export default {
  [ruta]: sidebar
}
