// export const ruta = '/'
export const ruta = '/comienza/'

export const nav = {
  text: 'Comienza',
  link: ruta,
  activeMatch: ruta,
}

export const sidebar = [
  {
    text: 'Comienza',
    collapsed: false,
    items: [
      { text: 'Comienza', link: ruta },
      { text: 'Instalación', link: `${ruta}instalacion` },
      { text: 'Accesibilidad', link: `${ruta}accesibilidad` },
    ],
  },
]

export default {
  [ruta]: sidebar,
}
