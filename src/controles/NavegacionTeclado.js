/**
 * @module controles/NavegacionTeclado
 */

import Control from 'ol/control/Control'
import { crearBotonControl, crearContenedorControl } from './utiles'

/**
 * @property {String} claseCss clase del elemnto HTML del control. La clase se concatenará con la
 * clase genérica `sisdai-mapa-control-${claseCss}`.
 */
const claseCss = 'navegacion-teclado'

/**
 * @classdesc
 * Agrega un control que permite iniciar con la nzvegación del teclado en la vista del mapa.
 */
export default class NavegacionTeclado extends Control {
  /**
   * Nombre con el que se podrá extraer el control del mapa.
   * @type {String}
   */
  static nombre = 'NavegacionTeclado'

  /**
   * Acceder al nombre estatico desde el objeto instanciado.
   * @returns {String}
   */
  get nombre() {
    return this.nombre
  }

  constructor() {
    /**
     * Elemento contenedor del control
     * @type {HTMLDivElement}
     * @private
     */
    const contenedorControl = crearContenedorControl(claseCss)

    super({
      element: contenedorControl,
      target: undefined,
    })

    /**
     * Elemento clickable del control
     * @type {HTMLButtonElement}
     * @private
     */
    this.botonNavegacionTeclado = crearBotonControl(
      'Iniciar navegación por teclado',
      claseCss,
      'accesibilidad',
      this.iniciarNavegacion.bind(this)
    )
    contenedorControl.appendChild(this.botonNavegacionTeclado)
  }

  iniciarNavegacion() {
    this.getMap().navegacionTeclado.activar(this.getMap())
  }
}
