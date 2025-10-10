// export const ruta = '/'
export const ruta = '/comienza/'

export const nav = { text: 'Comienza', link: ruta, activeMatch: ruta }

export const sidebar = [
  {
    text: 'Comienza',
    collapsed: false,
    items: [
      { text: 'Comienza', link: ruta },
      { text: 'Instalación', link: `${ruta}instalacion` },
    ],
  },
]

export default { [ruta]: sidebar }
