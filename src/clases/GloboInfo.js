import PointerEventType from 'ol/pointer/EventType'

/**
 * @classdesc
 */
export default class GloboInfo {
  constructor(mapa) {
    this.margen = 8
    this.posicion = { x: 0, y: 0 }

    /**
     * @private
     * @type {!HTMLElement}
     */
    this.contenedor_ = document.createElement('div')
    this.contenedor_.className = 'contenedor-globo-info'
    // this.contenedor_.style.position = 'absolute'
    this.setVisibilidad(false, mapa)
    this.setPosicion(this.posicion)

    /**
     * @private
     * @type {!HTMLElement}
     */
    this.cuerpo_ = document.createElement('div')
    this.cuerpo_.className = 'cuerpo-globo-info'
    this.contenedor_.appendChild(this.cuerpo_)

    mapa.getViewport().appendChild(this.contenedor_)
    mapa.on(PointerEventType.POINTERMOVE, evt => this.procesar(mapa, evt))
    mapa
      .getTargetElement()
      .addEventListener(PointerEventType.POINTERLEAVE, () =>
        this.setVisibilidad(false, mapa)
      )
  }

  procesar(mapa, { dragging, originalEvent }) {
    if (dragging) {
      this.setVisibilidad(false, mapa)
      return
    }

    const pixel = mapa.getEventPixel(originalEvent)
    let layerActual = undefined
    const feature = originalEvent.target.closest('.ol-control')
      ? undefined
      : mapa.forEachFeatureAtPixel(pixel, (feature, layer) => {
          layerActual = layer
          return feature
        })

    if (feature) {
      this.setPosicionDesdePixel(pixel, mapa.getViewport())
      this.setContenido(pixel)
      this.setVisibilidad(true, mapa)
      this.procesarContenido(feature, layerActual.get('globoInfo'))
    } else {
      this.setVisibilidad(false, mapa)
    }
  }

  procesarContenido(feature, contenido) {
    this.setContenido(
      typeof contenido === 'function'
        ? contenido(feature.getProperties())
        : contenido
    )
  }

  getContenedor() {
    return this.contenedor_
  }

  setContenido(contenido) {
    this.cuerpo_.innerHTML = contenido
  }

  getPosicion() {
    return this.posicion
  }

  setPosicion(posicion) {
    this.posicion = posicion

    this.contenedor_.style.left = `${this.posicion.x}px`
    this.contenedor_.style.top = `${this.posicion.y}px`
  }

  setPosicionDesdePixel(pixel, viewport) {
    this.setPosicion({
      x:
        pixel[0] -
        (pixel[0] > viewport.clientWidth / 2
          ? this.contenedor_.clientWidth + this.margen
          : -this.margen),
      y:
        pixel[1] -
        (pixel[1] > viewport.clientHeight / 2
          ? this.contenedor_.clientHeight + this.margen
          : -this.margen),
    })
  }

  setVisibilidad(valor, mapa = undefined) {
    this.contenedor_.style.display = valor ? 'block' : 'none'

    if (mapa) {
      mapa.getTargetElement().style.cursor = valor ? 'pointer' : ''
    }
  }
}
