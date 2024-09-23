// This file is part of sisdai-mapas.
//
//   sisdai-mapas is free software: you can redistribute it and/or modify
//   it under the terms of the GNU Lesser General Public License as published by the
//   Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.
//
//   sisdai-mapas is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General
//   Public License for more details.
//
//   You should have received a copy of the GNU Lesser General Public License along
//   with sisdai-mapas. If not, see <https://www.gnu.org/licenses/>.

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
      target: undefined
    })

    /**
     * Elemento clickable del control
     * @type {HTMLButtonElement}
     * @protected
     */
    this.botonAcercar = crearBotonControl(
      'Acercar',
      'acercar',
      'agregar',
      this.acercamiento.bind(this)
    )

    /**
     * Elemento clickable del control
     * @type {HTMLButtonElement}
     * @protected
     */
    this.botonAlejar = crearBotonControl('Alejar', 'alejar', 'restar', this.alejamiento.bind(this))

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
        duration: 250
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
        duration: 250
      })
  }
}
