/**
 * @module controles/AcercarAlejar
 */

import Control from 'ol/control/Control'
import { crearBotonControl, crearContenedorControl } from './utiles'

/**
 * @property {String} claseCss clase del elemnto HTML del control. La clase se concatenará con la
 * clase genérica `sisdai-mapa-control-${claseCss}`.
 */
const claseCss = 'acercar-alejar'

/**
 * @classdesc
 * Agrega un control con iconos y estilos personalizados que permite hacer zoom in y zoom out
 * sobre el mapa.
 */
export default class AcercarAlejar extends Control {
  /**
   * Nombre con el que se podrá extraer el control del mapa.
   * @type {String}
   */
  static nombre = 'AcercarAlejar'

  /**
   * Acceder al nombre estatico desde el objeto instanciado.
   * @returns {String}
   */
  get nombre() {
    return AcercarAlejar.nombre
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
     * @protected
     */
    this.botonAcercar = crearBotonControl(
      'Acercar vista del mapa',
      'acercar',
      'agregar',
      this.acercamiento.bind(this)
    )

    /**
     * Elemento clickable del control
     * @type {HTMLButtonElement}
     * @protected
     */
    this.botonAlejar = crearBotonControl(
      'Alejar vista del mapa',
      'alejar',
      'restar',
      this.alejamiento.bind(this)
    )

    contenedorControl.appendChild(this.botonAcercar)
    contenedorControl.appendChild(this.botonAlejar)
  }

  /**
   * Acerca la vista del mapa por una unidad de zoom
   */
  acercamiento() {
    this.getMap()
      .getView()
      .animate({
        zoom: this.getMap().getView().getZoom() + 1,
        duration: 250,
      })
  }

  /**
   * Aleja la vista del mapa por una unidad de zoom
   */
  alejamiento() {
    this.getMap()
      .getView()
      .animate({
        zoom: this.getMap().getView().getZoom() - 1,
        duration: 250,
      })
  }
}
