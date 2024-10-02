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
 * @module controles/EscalaGrafica
 */

import ScaleLine from 'ol/control/ScaleLine'
import { getPointResolution } from 'ol/proj'

/**
 * Configuración del objeto original de openlayers.
 */
const consifguracion = {
  units: 'metric',
  bar: true,
  steps: 4,
  text: false,
  minWidth: 140,
  maxWidth: 220,
}

/**
 * @property {String} claseCss clase del elemnto HTML del control. La clase se concatenará con la
 * clase genérica `sisdai-mapa-control-${claseCss}`.
 */
const claseCss = 'escala-grafica'

/**
 * Fuente:
 * @see https://github.com/openlayers/openlayers/blob/v8.1.0/src/ol/control/ScaleLine.js#L28
 *
 * @const
 * @type {number}
 */
const DEFAULT_DPI = 25.4 / 0.28

/**
 * Creando etiqueta que leera el asistente de voz para la escala numérica
 */
const label = document.createElement('span')
label.classList.add('sisdai-mapa-escala-numerica')

/**
 * @classdesc
 * Clase extendida de la clase `ScaleLine` de openlayers configurada especialmente para este mapa.
 */
export default class EscalaGrafica extends ScaleLine {
  /**
   * Nombre con el que se podrá extraer el control del mapa.
   * @type {String}
   */
  static nombre = 'EscalaGrafica'

  /**
   * Acceder al nombre estatico desde el objeto instanciado.
   * @returns {String}
   */
  get nombre() {
    return EscalaGrafica.nombre
  }

  constructor() {
    super(consifguracion)

    // Agrega al elemnto HTML del control las clases genéricas de los controles de la biblioteca.
    this.element.classList.add('sisdai-mapa-control')
    this.element.classList.add(`sisdai-mapa-control-${claseCss}`)

    // Esconder el elemnento div.ol-scale-bar-inner para que no lo lea el asistente de voz.
    this.element
      .querySelector('.ol-scale-bar-inner')
      .setAttribute('aria-hidden', true)
    // this.element.ariaHidden = true
    // this.element.setAttribute('aria-hidden', true)

    // Agregando etiqueta para el asistente de voz.
    this.element.appendChild(label)
    this.asignarEscalaNumerica()
  }

  /**
   * Asigna el texto apropiado para la etiqueta destinada para el asistente de voz.
   * @param {number} resolutionScale La escala apropiada.
   */
  asignarEscalaNumerica(resolutionScale = undefined) {
    var texto = 'Escala '

    if (resolutionScale === undefined) {
      texto += 'no definida'
    } else {
      texto +=
        resolutionScale < 1
          ? Math.round(1 / resolutionScale).toLocaleString() + ' : 1'
          : '1 : ' + Math.round(resolutionScale).toLocaleString()
    }
    label.innerText = texto
  }

  /**
   * Fuente:
   * @see https://github.com/openlayers/openlayers/blob/v8.1.0/src/ol/control/ScaleLine.js#L453
   *
   * Returns the appropriate scale for the given resolution and units.
   * @return {number} The appropriate scale.
   */
  getScaleForResolution() {
    const resolution = getPointResolution(
      this.viewState_.projection,
      this.viewState_.resolution,
      this.viewState_.center,
      'm'
    )
    const dpi = this.dpi_ || DEFAULT_DPI
    const inchesPerMeter = 1000 / 25.4
    // return resolution * inchesPerMeter * dpi

    // Modificación para capturar cuando cambie la escala.
    const resolutionScale = resolution * inchesPerMeter * dpi
    this.asignarEscalaNumerica(resolutionScale)
    return resolutionScale
  }
}
