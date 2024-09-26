import olMap from 'ol/Map'
import View from 'ol/View'

/**
 * @classdesc
 * Clase heredada de la clase Map de OpenLayers con la finaliodad de agregar funciones y/o
 * propiedades que faciliten la manipulación del contenido de la propia instancia.
 */
export default class Mapa extends olMap {
  /**
   * Creación del objeto mapa.
   * @param {number} id
   * @param {HTMLDivElement|string} target elemento o id del elemento html que contendrá el mapa.
   * @param {string} proyeccion
   * @returns {import("./../clases/Mapa.js").default} Mapa
   */
  constructor(id, target, proyeccion, emits) {
    super({
      controls: [],
      target,
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    })

    this.id = id

    this.agregarAtributosAriaCanvas()
  }

  /**
   *
   */
  async agregarAtributosAriaCanvas() {
    const canvas = await this.buscarCanvasPromesa()
    // console.log('SisdaiMapa2', Date.now())
    canvas.setAttribute('aria-label', 'Mapa interactivo')
    canvas.setAttribute('aria-describedby', `mapa-${this.id}-descripcion`)
  }

  /**
   *
   * @returns {Promise}
   */
  buscarCanvasPromesa() {
    return this.busquedaPromesa(
      (mapa) => mapa.getViewport().querySelector('canvas')
      // mapa.getAllLayers().find(capa => capa.get('id') === idCapa)
    )
  }

  /**
   * Devuelve un elemento del mapa como promesa. Esta funcion es pensada para acceder a elementos
   * que tardan en crearse.
   * @param {Function} busqueda
   * @returns {Promise}
   */
  busquedaPromesa(busqueda) {
    return new Promise((resolve) => {
      const _this = this

      function revisar() {
        if (busqueda(_this)) {
          resolve(busqueda(_this))
        } else {
          setTimeout(revisar, 50)
        }
      }

      revisar()
    })
  }
}
