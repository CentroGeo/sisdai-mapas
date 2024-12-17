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

import ScaleLine from 'ol/control/ScaleLine'

/**
 * @module src/componentes/mapa/elementos/EscalaGrafica
 */

/**
 * Configuración del objeto original de openlayers.
 */
const consifguracion = {
  units: 'metric',
  bar: true,
  steps: 4,
  text: true,
  minWidth: 140,
  maxWidth: 220,
}

/**
 * @property {String} claseCss clase del elemnto HTML del control. La clase se concatenará con la
 * clase genérica `sisdai-mapa-control-${claseCss}`.
 */
const claseCss = 'escala-grafica'

/**
 * @classdesc
 * Clase extendida de la clase `ScaleLine` de openlayers configurada especialmente para este mapa.
 */
export default class EscalaGrafica extends ScaleLine {
  constructor() {
    super(consifguracion)

    // Agrega al elemnto HTML del control las clases genéricas de los controles de la biblioteca.
    // this.element.classList.add('sisdai-mapa-control')
    this.element.classList.add(`sisdai-mapa-control-${claseCss}`)
  }

  /**
   * Creates the label for a marker marker at given position
   * @param {number} i The iterator
   * @param {number} width The width the scalebar will currently use
   * @param {boolean} isLast Flag indicating if we add the last step text
   * @param {number} scale The current scale for the whole scalebar
   * @param {string} suffix The suffix for the scale
   * @return {string} The stringified div containing the step text
   */
  createStepText(i, width, isLast, scale, suffix) {
    const length =
      i === 0 ? 0 : Math.round((scale / this.scaleBarSteps_) * i * 100) / 100
    const lengthString = length + (i === 0 ? '' : ' ' + suffix)
    const margin = i === 0 ? -3 : (width / this.scaleBarSteps_) * -1
    const minWidth = i === 0 ? 0 : (width / this.scaleBarSteps_) * 2
    return (
      '<div ' +
      'class="ol-scale-step-text" ' +
      'aria-hidden="true" ' +
      'style="' +
      `margin-left: ${margin}px;` +
      `text-align: ${i === 0 ? 'left' : 'center'};` +
      `min-width: ${minWidth}px;` +
      `left: ${isLast ? width + 'px' : 'unset'};` +
      '">' +
      lengthString +
      '</div>'
    )
  }
}
