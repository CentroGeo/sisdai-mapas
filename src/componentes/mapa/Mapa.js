import olMap from 'ol/Map'
import View from 'ol/View'
import { TipoEstadoCarga } from './../../utiles/MonitoreoCargaElementos'
import { vista as vistaPorDefecto } from './valores'
import * as validaciones from './validaciones'
import { valorarArregloNumerico, valorarExtensionMargen } from './../../utiles'

/**
 * @classdesc
 * Clase heredada de la clase Map de OpenLayers con la finaliodad de agregar funciones y/o
 * propiedades que faciliten la manipulación del contenido de la propia instancia.
 */
export default class Mapa extends olMap {
  /**
   * Creación del objeto mapa.
   * @param {number} id identificador del mapa.
   * @param {HTMLDivElement|string} target elemento o id del elemento html que contendrá el mapa.
   * @param {string} proyeccion
   * @returns {import("./../clases/Mapa.js").default} Mapa
   */
  constructor(id, proyeccion, target, emits) {
    super({
      controls: [],
      // target,
      view: new View({
        center: [0, 0],
        projection: proyeccion,
        zoom: 2
      })
    })

    this.capas = {}

    this.id = id

    this.agregarAtributosAriaCanvas()
  }

  /**
   * Objeto vista: { acercamiento, centro, extencsion }
   * Ajusta a vista del mapa de acuerdo a los parametros recividos con la estructura:
   * { acercamiento, centro } o { extension }
   */
  ajustarVista(vista) {
    const acercamiento =
      vista?.acercamiento || this.getView().get('acercamiento') || vistaPorDefecto.acercamiento
    const centro = vista?.centro || this.getView().get('centro') || vistaPorDefecto.centro
    const extension =
      vista?.extension || this.getView().get('extension') || vistaPorDefecto.extension
    const extensionMargen =
      vista?.extensionMargen ||
      this.getView().get('extensionMargen') ||
      vistaPorDefecto.extensionMargen

    // console.log(
    //   'ajustar vista a',
    //   acercamiento,
    //   centro,
    //   extension,
    //   extensionMargen
    // )

    if (validaciones.extension(extension)) {
      // console.log(this.getView().get('extensionMargen'))
      this.getView().fit(valorarArregloNumerico(extension), {
        padding: valorarExtensionMargen(extensionMargen)
      })
    } else {
      this.getView().setCenter(
        validaciones.centro(centro) ? valorarArregloNumerico(centro) : vistaPorDefecto.centro
      )
      this.getView().setZoom(Number(acercamiento))
    }

    // this.eventos(eventos.alAjustarVista, vista)
  }

  /**
   * Asigna el valor del acercamiento en el mapa.
   * @param {Number} acercamiento
   */
  asignarAcercamiento(acercamiento) {
    this.getView().set('acercamiento', acercamiento)
  }

  /**
   * Asigna el valor del centro en el mapa.
   * @param {Array<Number>|String} centro
   */
  asignarCentro(centro) {
    this.getView().set('centro', centro)
  }

  /**
   * Asigna el valor de la extención del mapa en el mapa.
   * @param {Array<Number>|String} extension
   * @param {Array<Number>|String} extensionMargen
   */
  asignarExtension(extension, extensionMargen) {
    this.getView().set('extension', extension)
    this.getView().set('extensionMargen', extensionMargen)
  }

  /**
   * Asigna los valores de de la vista del mapa.
   * @param {Object} propiedades
   */
  asignarVista({ extension, extensionMargen, centro, acercamiento }) {
    this.asignarCentro(centro)
    this.asignarAcercamiento(acercamiento)
    this.asignarExtension(extension, extensionMargen)
    // this.ajustarVista()
  }

  /**
   *
   */
  get capasCargando() {
    return Object.values(this.capas).some((capa) => capa === TipoEstadoCarga.inicio)
  }

  /**
   *
   */
  get todasCapasConError() {
    return Object.values(this.capas).every((capa) => capa === TipoEstadoCarga.error)
  }

  /**
   *
   */
  async agregarAtributosAriaCanvas() {
    const canvas = await this.busquedaPromesa((mapa) => mapa.getViewport().querySelector('canvas'))

    canvas.setAttribute('aria-label', 'Mapa interactivo')
    canvas.setAttribute('aria-describedby', `mapa-${this.id}-descripcion`)
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
