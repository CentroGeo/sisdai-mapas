// export const ruta = '/'
export const ruta = '/documentacion/'

export const nav = {
  text: 'Documentación',
  link: ruta,
  activeMatch: ruta
}

export const sidebar = [
  {
    text: 'Documentación',
    collapsed: false,
    items: [
      { text: 'Comienza', link: ruta },
      { text: 'Instalación', link: `${ruta}instalacion` },
      { text: 'Accesibilidad', link: `${ruta}accesibilidad` }
    ]
  },
]

export default {
  [ruta]: sidebar
}
