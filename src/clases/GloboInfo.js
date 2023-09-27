/**
 * @classdesc
 */
export default class GloboInfo {
  constructor() {
    this.margen = 8
    this.posicion = { x: 0, y: 0 }

    /**
     * @private
     * @type {!HTMLElement}
     */
    this.contenedor_ = document.createElement('div')
    this.contenedor_.className = 'contenedor-globo-info'
    this.contenedor_.style.position = 'absolute'
    this.setVisibilidad(false)
    this.setPosicion(this.posicion)

    /**
     * @private
     * @type {!HTMLElement}
     */
    this.cuerpo_ = document.createElement('div')
    this.cuerpo_.className = 'cuerpo-globo-info'
    this.contenedor_.appendChild(this.cuerpo_)
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

  setVisibilidad(valor) {
    this.contenedor_.style.display = valor ? 'block' : 'none'
  }
}
