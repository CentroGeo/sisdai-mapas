/**
 * @module scripts/mapa/ExportarImagen
 */

/**
 * Regresa la imagen del estado actual del mapa codificada en base64.
 * @param {Object} mapa instancia del mapa.
 * @returns {String} Imagen codificada en base64
 */
export default function crearImagen(mapa) {
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

/** D E P R E C A D O -> (import("clases/Mapa").default).exportarImagen
 * Permite descargar la vista actual del mapa, con las capas visibles y acercamiento mostrado en
 * pantalla, sin controles. El formato de descargá es PNG.
 * @param {Object} mapa instancia del mapa.
 * @param {String} nombreCaptura nombre del archivo que se descargara del navegador (no debe
 * incluir extensión).
 */
export function exportarImagen(mapa, nombreCaptura) {
  mapa.once('rendercomplete', function () {
    const link = document.createElement('a')
    link.href = crearImagen(mapa)
    link.download = `${nombreCaptura}.png`
    link.click()
  })
  mapa.renderSync()
}
