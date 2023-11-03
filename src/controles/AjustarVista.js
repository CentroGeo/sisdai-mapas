/**
 * @module controles/AjustarVista
 */

import Control from 'ol/control/Control'
import { crearBotonControl, crearContenedorControl } from './utiles'

/**
 * @property {String} claseCss clase del elemnto HTML del control. La clase se concatenará con la
 * clase genérica `sisdai-mapa-control-${claseCss}`.
 */
const claseCss = 'ajuste-vista'

/**
 * Emits del componente Sisdaimapa, en esta parte es usado para desencadenar el evento
 * alAjustarVista
 */
// let emits

/**
 * @classdesc
 * Agrega un control personalizado que permite volver a la vista del mapa que se definió
 * inicialmente.
 */
export default class AjustarVista extends Control {
  /**
   * Nombre con el que se podrá extraer el control del mapa.
   * @type {String}
   */
  static nombre = 'AjustarVista'

  /**
   * Acceder al nombre estatico desde el objeto instanciado.
   * @returns {String}
   */
  get nombre() {
    return AjustarVista.nombre
  }

  constructor() {
    // emits = _emits

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
    this.botonAjustarVista = crearBotonControl(
      'Ajustar vista',
      claseCss,
      'mapa-centro',
      this.ajustarVista.bind(this)
    )
    contenedorControl.appendChild(this.botonAjustarVista)
  }

  /**
   * Ajusta la vista del mapa a los valores iniciales de la propiedad vista.
   */
  ajustarVista() {
    this.getMap().ajustarVista()
    // emits(eventos.alAjustarVista, toRaw(this.getMap().getView()))
  }
}
