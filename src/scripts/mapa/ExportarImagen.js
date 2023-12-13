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
 * @module scripts/mapa/ExportarImagen
 */

/**
 * Regresa la imagen del estado actual del mapa codificada en base64.
 * @param {Object} mapa instancia del mapa.
 * @returns {String} Imagen codificada en base64
 */
export function crearImagen(mapa) {
  const mapCanvas = document.createElement('canvas')
  const size = mapa.getSize()
  mapCanvas.width = size[0]
  mapCanvas.height = size[1]
  const mapContext = mapCanvas.getContext('2d')

  Array.prototype.forEach.call(
    mapa.getViewport().querySelectorAll('.ol-layer canvas, canvas.ol-layer'),
    function (canvas) {
      if (canvas.width > 0) {
        const opacity = canvas.parentNode.style.opacity || canvas.style.opacity
        mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity)
        let matrix
        const transform = canvas.style.transform
        if (transform) {
          // Get the transform parameters from the style's transform matrix
          matrix = transform
            //eslint-disable-next-line
            .match(/^matrix\(([^\(]*)\)$/)[1]
            .split(',')
            .map(Number)
        } else {
          matrix = [
            parseFloat(canvas.style.width) / canvas.width,
            0,
            0,
            parseFloat(canvas.style.height) / canvas.height,
            0,
            0,
          ]
        }
        // Apply the transform to the export map context
        CanvasRenderingContext2D.prototype.setTransform.apply(
          mapContext,
          matrix
        )
        const backgroundColor = canvas.parentNode.style.backgroundColor
        if (backgroundColor) {
          mapContext.fillStyle = backgroundColor
          mapContext.fillRect(0, 0, canvas.width, canvas.height)
        }
        mapContext.drawImage(canvas, 0, 0)
      }
    }
  )

  mapContext.globalAlpha = 1
  mapContext.setTransform(1, 0, 0, 1, 0, 0)
  return mapCanvas.toDataURL()
}

/**
 * Permite descargar la vista actual del mapa, con las capas visibles y zoom mostrado en
 * pantalla, sin controles. El formato de descargá es PNG.
 * @param {Object} mapa instancia del mapa.
 * @param {String} nombreCaptura nombre del archivo que se descargara del navegador (no debe incluir extensión).
 */
export default function exportarImagen(mapa, nombreCaptura) {
  mapa.once('rendercomplete', function () {
    const link = document.createElement('a')
    link.href = crearImagen(mapa)
    link.download = `${nombreCaptura}.png`
    link.click()
  })
  mapa.renderSync()
}
