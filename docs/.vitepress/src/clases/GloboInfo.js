import PointerEventType from 'ol/pointer/EventType'

/**
 * @classdesc
 */
export default class GloboInfo {
  constructor(mapa, margen = 8) {
    this.margen = margen

    /**
     * @private
     * @type {Posicion}
     */
    this.posicion_ = undefined

    /**
     * @private
     * @type {!HTMLElement}
     */
    this.contenedor_ = document.createElement('div')
    this.contenedor_.className = 'contenedor-globo-info'
    this.contenedor_.setAttribute('aria-live', 'assertive')

    this.setVisibilidad(false, mapa)

    this.setPosicion(new Posicion())

    /**
     * @private
     * @type {!HTMLElement}
     */
    this.cuerpo_ = document.createElement('div')
    this.cuerpo_.className = 'cuerpo-globo-info'
    this.contenedor_.appendChild(this.cuerpo_)

    // Agrega el contenedor del globo al contenedor del mapa
    mapa.getViewport().appendChild(this.contenedor_)

    // Agregando evento POINTERMOVE
    mapa.on(PointerEventType.POINTERMOVE, ({ dragging, originalEvent }) => {
      // Verifica que el mapa no esté en acción de dibujo o que el cursor no esté sobre un botón
      // if (mapa.cuadroInfo.contenedor_.style.display === 'block') return
      if (
        !(
          dragging ||
          originalEvent.target.closest('.sisdai-mapa-control') ||
          originalEvent.target.closest('.contenedor-globo-info-ext') ||
          mapa.cuadroInfo.contenedor_.style.display === 'block'
        )
      ) {
        const pixel = mapa.getEventPixel(originalEvent)
        this.mostrar(this.buscarContenidoEnPixel(pixel, mapa), pixel, mapa)
      } else {
        this.setVisibilidad(false, mapa)
      }
    })

    // Agregando el evendto POINTERLEAVE
    mapa
      .getTargetElement()
      .addEventListener(PointerEventType.POINTERLEAVE, () =>
        this.setVisibilidad(false, mapa)
      )
  }

  /**
   * Busca si hay contenido del globo de información en un pixel determinado del mapa.
   * @param {Array<Number>} pixel
   * @param {import("ol/Map.js").default} mapa
   * @returns {String|undefined} Contenido del globo, si es `undefined` significa que no se
   * encontro contenido del tooltip.
   */
  buscarContenidoEnPixel(pixel, mapa) {
    return mapa.forEachFeatureAtPixel(pixel, (feature, capa) => {
      const contenido = capa.get('globoInfo')

      return contenido !== undefined
        ? this.procesarContenido(contenido, feature)
        : undefined
    })
  }

  mostrar(contenido, pixel, mapa) {
    if (contenido !== undefined) {
      this.setVisibilidad(true, mapa)
      this.setContenido(contenido)
      this.setPosicionDesdePixel(pixel, mapa.getViewport())
    } else {
      this.setVisibilidad(false, mapa)
    }
  }

  /**
   * Prosesa el contenido del globo, en caso de ser una función que accede a los features, se
   * ejecuta la función regresando el texto final
   * @param {any} contenido
   * @param {import("ol/Feature.js").default} feature
   * @returns {String}
   */
  procesarContenido(contenido, feature) {
    return typeof contenido === 'function'
      ? `${contenido(feature.getProperties())}`
      : contenido
  }

  /**
   * Asigna contenido html al cuerpo del globo
   * @param {String} contenido
   */
  setContenido(contenido) {
    this.cuerpo_.innerHTML = contenido
  }

  getPixelOrigenDesdePosicion() {}

  /**
   * Devuelve la ultima posición asignada al globo.
   * @returns {Posicion}
   */
  getPosicion() {
    return this.posicion_
  }

  /**
   * Guarda y asigna al elemento contenedor del globo la posición determinada en las recglas de
   * estilo left y top.
   * @param {Posicion|Array<Number>} posicion
   */
  setPosicion(posicion) {
    this.posicion_ = posicion

    this.contenedor_.style.left = `${this.posicion_.x}px`
    this.contenedor_.style.top = `${this.posicion_.y}px`
  }

  /**
   * Guarda y asigna al elemento contenedor del globo la posición determinada en las recglas de
   * estilo left y top, calculando antes la posición sugeridad desde `calcularPosicionDesdePixel`.
   * @param {Array<Number>} pixel original
   * @param {HTMLElement} viewport elemento html del mapa
   */
  setPosicionDesdePixel(pixel, viewport) {
    this.setPosicion(this.calcularPosicionDesdePixel(pixel, viewport))
  }

  /**
   * Calcula la posición que podría tomar el globo de información considerando el margen definido
   * en el globo así como la pocisión del pixel original en relación con el mapa:
   *
   * - Si la posición original está por debajo de la mitad del alto del mapa, la posición
   * calculada será considerada para mostrar el globo encima de la posicion original.
   * - Si la posición original está por encima de la mitad del alto del mapa, la posición
   * calculada será considerada para mostrar el globo debajo de la posicion original.
   * - Si la posición original está a la izquierda de la mitad del ancho del mapa, la posición
   * calculada será considerada para mostrar el globo a la derecha de la posicion original.
   * - Si la posición original está a la derecha de la mitad del ancho del mapa, la posición
   * calculada será considerada para mostrar el globo a la izquierda de la posicion original.
   * @param {Array<Number>} pixel original
   * @param {HTMLElement} viewport elemento html del mapa
   * @returns {Posicion}
   */
  calcularPosicionDesdePixel(pixel, viewport) {
    return new Posicion([
      pixel[0] -
        (pixel[0] > viewport.clientWidth / 2
          ? this.contenedor_.clientWidth + this.margen
          : -this.margen),
      pixel[1] -
        (pixel[1] > viewport.clientHeight / 2
          ? this.contenedor_.clientHeight + this.margen
          : -this.margen),
    ])
  }

  /**
   * Asigna visibilidad al globo de información a partir de una valor booleano.
   * @param {Boolean} valor
   * @param {import("ol/Map.js").default} mapa si este parámetro es definido cambiará el cursor a
   * `pointer` cuando la visibilidad del globo sea `true`.
   */
  setVisibilidad(valor /* , mapa = undefined */) {
    this.contenedor_.style.display = valor ? 'block' : 'none'

    // if (mapa) {
    //   /** REPENSAR
    //    * quisá esto no dependa del tootipo, puede cambiarse el cursor solo si es un elemento
    //    * interactuable al dar click, como un vector
    //    */
    //   mapa.getTargetElement().style.cursor = valor ? 'pointer' : ''
    // }
  }
}

/**
 * @classdesc
 * Clase creada con el fin de encapsular una posición que tenga como atributos x e y.
 */
export class Posicion {
  constructor(array = []) {
    this.x = array[0] | 0
    this.y = array[1] | 0
  }
}
