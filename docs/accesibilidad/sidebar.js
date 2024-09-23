export const ruta = '/accesibilidad/'

export const nav = {
  text: 'Accesibilidad',
  link: ruta,
  activeMatch: ruta
}

export const sidebar = [
  {
    text: 'Navegación',
    // collapsed: false,
    items: [{ text: 'Teclado', link: ruta }]
  }
]

export default {
  [ruta]: sidebar
}
