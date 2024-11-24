import olMap from 'ol/Map'
import View from 'ol/View'
import PointerEventType from 'ol/pointer/EventType'
import { TipoEstadoCarga } from './../../utiles/MonitoreoCargaElementos'
import { vista as vistaPorDefecto } from './valores'
import * as validaciones from './validaciones'
import { valorarArregloNumerico, valorarExtensionMargen } from './../../utiles'
import { ref } from 'vue'
import { EscalaGrafica } from './controles'
import RenderEventType from 'ol/render/EventType'
import { crearImagenMapa } from './utiles'

const duration = 250

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
  constructor(id, proyeccion /*, target, emits*/) {
    super({
      controls: [new EscalaGrafica()],
      // target,
      view: new View({
        center: [0, 0],
        projection: proyeccion,
        zoom: 2,
      }),
    })

    this.capas = {}

    this.id = id

    this.agregarAtributosAriaCanvas()

    // this.pixel = [0,0]
    this.on(
      PointerEventType.POINTERMOVE,
      ({ dragging, originalEvent /*, map */ }) => {
        if (
          !(dragging || originalEvent.target.closest('.sisdai-mapa-control'))
        ) {
          this.abrirGloboInfo(originalEvent)
          // console.log({ dragging, originalEvent, map })
        }
      }
    )
  }

  pixel = ref([0, 0])
  abrirGloboInfo(originalEvent) {
    const pixel = this.getEventPixel(originalEvent)
    // const contenido = buscarContenidoCapaEnPixel(pixel, map, 'globoInfo')
    // console.log(pixel)
    this.pixel.value = pixel
  }

  /**
   * Acerca la vista el número de unidades que se asignen como parámetro. Si las unidades son negativas, se da un alejamiento.
   * @param {number} unidades
   */
  acercar(unidades = 1) {
    this.getView().animate({
      zoom: this.getView().getZoom() + unidades,
      duration,
    })
  }

  /**
   * Agrega atributos Aria al elemento canvas que genera openlayers para el mapa.
   */
  async agregarAtributosAriaCanvas() {
    const canvas = await this.busquedaPromesa(mapa =>
      mapa.getViewport().querySelector('canvas')
    )

    canvas.setAttribute('aria-label', 'Mapa interactivo')
    canvas.setAttribute('aria-describedby', `mapa-${this.id}-descripcion`)
  }

  /**
   * Ajusta a vista del mapa de acuerdo a los parametros recividos con la estructura:
   *
   * @param {vista} vista
   */
  ajustarVista(vista = this.vista) {
    validaciones.vista(vista)

    const { acercamiento, centro } = vista
    var { extension, extensionMargen } = vista

    if (extension || (this.vista.extension && !(acercamiento || centro))) {
      extensionMargen = !extensionMargen
        ? this.vista.extensionMargen
        : extensionMargen
      extension = !extension ? this.vista.extension : extension

      this.getView().fit(valorarArregloNumerico(extension), {
        duration,
        padding: valorarExtensionMargen(extensionMargen),
      })
      return
    }

    this.getView().animate({
      center:
        centro && validaciones.centro(centro)
          ? valorarArregloNumerico(centro)
          : this.getView().getCenter(),
      duration,
      zoom:
        acercamiento && validaciones.acercamiento(acercamiento)
          ? Number(acercamiento)
          : this.getView().getZoom(),
    })
  }

  /**
   * Devuelve un elemento del mapa como promesa. Esta funcion es pensada para acceder a elementos
   * que tardan en crearse.
   * @param {Function} busqueda
   * @returns {Promise}
   */
  busquedaPromesa(busqueda) {
    return new Promise(resolve => {
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

  /**
   *
   */
  get capasCargando() {
    return Object.values(this.capas).some(
      capa => capa === TipoEstadoCarga.inicio
    )
  }

  /**
   * Permite descargar la vista actual del mapa, con las capas visibles y acercamiento mostrado en
   * pantalla, sin controles. El formato de descargá es PNG.
   * @param {String} nombreImagen nombre del archivo que se descargara del navegador (no debe
   * incluir extensión).
   */
  exportarImagen(nombreImagen = 'mapa') {
    this.once(RenderEventType.RENDERCOMPLETE, function () {
      const link = document.createElement('a')
      link.href = crearImagenMapa(this)
      link.download = `${nombreImagen}.png`
      link.click()
    })

    this.renderSync()
  }

  /**
   * @typedef {Object} vista
   * @property {number} [acercamiento] Nuvel de acercamiento.
   * @property {Array<number>|string} [centro] Coordenadas céntricas.
   * @property {Array<number>|string} [extension] Extensión.
   * @property {number|Array<number>} [extensionMargen] Margen de la extensión.
   *
   * @returns {vista} vista
   */
  get vista() {
    return {
      acercamiento: this.getView().get('acercamiento'),
      centro: this.getView().get('centro'),
      extension: this.getView().get('extension'),
      extensionMargen: this.getView().get('extensionMargen'),
    }
  }

  /**
   * Asigna los valores de de la vista del mapa.
   * @param {vista} vista
   */
  set vista({
    acercamiento = vistaPorDefecto.acercamiento,
    centro = vistaPorDefecto.centro,
    extension = vistaPorDefecto.extension,
    extensionMargen = vistaPorDefecto.extensionMargen,
  }) {
    this.getView().set('acercamiento', acercamiento)
    this.getView().set('centro', centro)
    this.getView().set('extension', extension)
    this.getView().set('extensionMargen', extensionMargen)

    this.ajustarVista(this.vista)
  }

  /**
   *
   */
  get todasCapasConError() {
    return Object.values(this.capas).every(
      capa => capa === TipoEstadoCarga.error
    )
  }
}
