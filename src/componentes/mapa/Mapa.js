import olMap from 'ol/Map'
import View from 'ol/View'
import PointerEventType from 'ol/pointer/EventType'
import { TipoEstadoCarga } from './../../utiles/MonitoreoCargaElementos'
import { vista as vistaPorDefecto } from './valores'
import * as validaciones from './validaciones'
import {
  esObjeto,
  valorarArregloNumerico,
  valorarExtensionMargen,
} from './../../utiles'
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

  acercar(unidades = 1) {
    this.getView().animate({
      zoom: this.getView().getZoom() + unidades,
      duration,
    })
  }

  /**
   * Objeto vista: { acercamiento, centro, extencsion }
   * Ajusta a vista del mapa de acuerdo a los parametros recividos con la estructura:
   * { acercamiento, centro } o { extension }
   */
  ajustarVista_(vista) {
    const acercamiento =
      vista?.acercamiento ||
      this.getView().get('acercamiento') ||
      vistaPorDefecto.acercamiento
    const centro =
      vista?.centro || this.getView().get('centro') || vistaPorDefecto.centro
    const extension =
      vista?.extension ||
      this.getView().get('extension') ||
      vistaPorDefecto.extension
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
        padding: valorarExtensionMargen(extensionMargen),
      })
    } else {
      this.getView().setCenter(
        validaciones.centro(centro)
          ? valorarArregloNumerico(centro)
          : vistaPorDefecto.centro
      )
      this.getView().setZoom(Number(acercamiento))
    }

    // this.eventos(eventos.alAjustarVista, vista)
  }

  ajustarVista(vista) {
    function validar(valor) {
      return esObjeto(valor)
        ? ['acercamiento', 'centro', 'extension', 'extensionMargen'].some(p =>
            Object.keys(valor).includes(p)
          )
        : false
    }

    const view = this.getView()
    const vistag = this.vista
    function ajustar({ acercamiento, centro, extension, extensionMargen }) {
      if (
        (extension && validaciones.extension(extension)) ||
        (extensionMargen && validaciones.extensionMargen(extensionMargen))
      ) {
        console.log(
          `revisar, si extención (${extension}) no es difenida pero margen (${extensionMargen}) si, utilisar extención guardada, si no existe, salir`
        )

        if (extension && validaciones.extension(extension)) {
          console.log(
            'ajustar por extension',
            extension,
            extensionMargen || vistag.extensionMargen
          )
          view.fit(valorarArregloNumerico(extension), {
            duration,
            padding: valorarExtensionMargen(
              extensionMargen || vistag.extensionMargen
            ),
          })
        } else {
          console.log('utilizar extención guardada', vistag.extension)
          view.fit(valorarArregloNumerico(vistag.extension), {
            duration,
            padding: valorarExtensionMargen(extensionMargen),
          })
        }

        // if (!(extension && validaciones.extension(extension))) {
        //   console.log('ajustar por extensionMargen', extensionMargen)
        // }
      } else {
        view.animate({
          center:
            centro && validaciones.centro(centro)
              ? valorarArregloNumerico(centro)
              : view.getZoom(),
          duration,
          zoom:
            acercamiento && validaciones.acercamiento(acercamiento)
              ? Number(acercamiento)
              : view.getCenter(),
        })
      }
    }

    if (validar(vista)) {
      // console.log('utilizar parámetros')
      ajustar(vista)
    } else {
      // console.log('buscar valores guardados')
      ajustar(this.vista)
    }
  }

  /**
   * Asigna el valor del acercamiento en el mapa.
   * @param {Number} acercamiento
   */
  // asignarAcercamiento(acercamiento) {
  //   this.getView().set('acercamiento', acercamiento)
  // }

  /**
   * Asigna el valor del centro en el mapa.
   * @param {Array<Number>|String} centro
   */
  // asignarCentro(centro) {
  //   this.getView().set('centro', centro)
  // }

  /**
   * Asigna el valor de la extención del mapa en el mapa.
   * @param {Array<Number>|String} extension
   * @param {Array<Number>|String} extensionMargen
   */
  // asignarExtension(extension, extensionMargen) {
  //   this.getView().set('extension', extension)
  //   this.getView().set('extensionMargen', extensionMargen)
  // }

  get vista() {
    return {
      acercamiento: this.getView().get('acercamiento'),
      centro: this.getView().get('centro'),
      extension: this.getView().get('extension'),
      extensionMargen: this.getView().get('extensionMargen'),
    }
  }

  set vista({ acercamiento, centro, extension, extensionMargen }) {
    this.getView().set(
      'acercamiento',
      acercamiento || vistaPorDefecto.acercamiento
    )
    this.getView().set('centro', centro || vistaPorDefecto.centro)
    this.getView().set('extension', extension || vistaPorDefecto.extension)
    this.getView().set(
      'extensionMargen',
      extensionMargen || vistaPorDefecto.extensionMargen
    )

    this.ajustarVista()
  }

  /**
   * Asigna los valores de de la vista del mapa.
   * @param {Object} propiedades
   */
  // asignarVista({ extension, extensionMargen, centro, acercamiento }) {
  //   this.asignarCentro(centro)
  //   this.asignarAcercamiento(acercamiento)
  //   this.asignarExtension(extension, extensionMargen)
  //   // this.ajustarVista()
  // }

  /**
   *
   */
  get capasCargando() {
    return Object.values(this.capas).some(
      capa => capa === TipoEstadoCarga.inicio
    )
  }

  /**
   *
   */
  get todasCapasConError() {
    return Object.values(this.capas).every(
      capa => capa === TipoEstadoCarga.error
    )
  }

  /**
   *
   */
  async agregarAtributosAriaCanvas() {
    const canvas = await this.busquedaPromesa(mapa =>
      mapa.getViewport().querySelector('canvas')
    )

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
}
