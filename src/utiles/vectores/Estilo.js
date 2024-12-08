import ReglaCss from './ReglaCss'

/**
 * Clase que maneja el estilo de los simbolos de las leyendas, incluso de las capas vectoriales.
 */
export default class Estilo {
  constructor(opciones = {}) {
    Object.keys(opciones).forEach(id => {
      this.agregar(id, opciones[id])
    })
  }

  /**
   *
   */
  get css() {
    return Object.keys(this)
      .map(id => new ReglaCss(id, this[id]).css)
      .join(' ')
  }

  /**
   * Agrega una propiedad al objeto
   *
   * @param {string} id
   * @param {string|number} valor
   */
  agregar(id, valor) {
    this[id] = id === 'stroke-width' ? Math.max(valor, 1) : valor
  }

  /**
   * Devuelve el estilo traducido
   */
  get traducido() {
    return Object.keys(this).reduce((a, c) => {
      return { ...a, ...new ReglaCss(c, this[c]).traducida.objeto }
    }, {})
  }
}
