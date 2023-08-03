/**
 * @module controles/EtiquetaAtribucion
 */

import Attribution from 'ol/control/Attribution'

/**
 * @property {String} claseCss clase del elemnto HTML del control. La clase se concatenará con la
 * clase genérica `sisdai-mapa-control-${claseCss}`.
 */
const claseCss = 'etiqueta-atribucion'

/**
 * @classdesc
 * Clase extendida de la clase `Attribution` de openlayers configurada especialmente para este mapa.
 */
export default class EtiquetaAtribucion extends Attribution {
  /**
   * Nombre con el que se podrá extraer el control del mapa.
   * @type {String}
   */
  static nombre = 'EtiquetaAtribucion'

  /**
   * Acceder al nombre estatico desde el objeto instanciado.
   * @returns {String}
   */
  get nombre() {
    return EtiquetaAtribucion.nombre
  }

  constructor() {
    super()

    this.setCollapsible(false)
    this.setCollapsed(false)

    /**
     * Agrega al elemnto HTML del control las clases genéricas de los controles de la biblioteca.
     */
    this.element.classList.add('sisdai-mapa-control')
    this.element.classList.add(`sisdai-mapa-control-${claseCss}`)

    // this.render = ({ frameState }) => {
    //   this.updateElement_(frameState)

    //   if (!this.ulElement_.innerHTML.includes(atribucionOpenLayers)) {
    //     this.ulElement_.innerHTML =
    //       atribucionOpenLayers + this.ulElement_.innerHTML
    //   }
    // }
  }
}

// const atribucionOpenLayers =
//   '<li><a href="https://openlayers.org/" target="_blank">© OpenLayers</a></li>'
