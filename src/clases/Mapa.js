import olMap from 'ol/Map'
import EventType from 'ol/events/EventType'
import { intersects } from 'ol/extent'
import VectorLayer from 'ol/layer/Vector'
import VectorImageLayer from 'ol/layer/VectorImage'
import RenderEventType from 'ol/render/EventType'
import { valorarArregloNumerico, valorarExtensionMargen } from './../utiles'
import crearImagenMapa from './../utiles/CrearImagenMapa'
import * as validaciones from './../utiles/validaciones'
import { teclasAtajo } from './../valores/mapa'
import GloboInfo from './GloboInfo'

/**
 * @classdesc
 * Clase heredada de la clase Map de OpenLayers con la finaliodad de agregar funciones y/o
 * propiedades que faciliten la manipulación del contenido de la propia instancia.
 */
export default class Mapa extends olMap {
  constructor(opcionesOlMap) {
    super(opcionesOlMap)

    this.globoInfo = new GloboInfo(this)

    this.on(EventType.KEYDOWN, ({ originalEvent }) => {
      // console.log(EventType.KEYDOWN, originalEvent)

      switch (originalEvent.key.toLowerCase()) {
        case teclasAtajo.INFORMACION:
          this.teclado()
          break

        case teclasAtajo.NORTE:
          console.log('NORTE')
          this.getView().setRotation(0)
          break

        case teclasAtajo.ROTAR_IZQUIERDA:
          console.log('ROTAR_IZQUIERDA')
          this.getView().setRotation(this.getView().getRotation() + Math.PI / 8)
          break

        case teclasAtajo.ROTAR_DERECHA:
          console.log('ROTAR_DERECHA')
          this.getView().setRotation(this.getView().getRotation() - Math.PI / 8)
          break

        default:
          console.log(originalEvent.key.toLowerCase())
          break
      }
    })

    // this.addEventListener(EventType.FOCUS, x => {
    //   console.log(EventType.FOCUS, x)
    // })
  }

  teclado() {
    console.log('Buscar contenido de la vista')

    const extent = this.getView().calculateExtent()

    // Itera a través de todas las capas en tu mapa
    const featuresVista = this.getAllLayers()
      .filter(
        // Verifica si la capa es una capa vectorial (puedes personalizar esto según tus necesidades)
        capa =>
          Boolean(
            (capa instanceof VectorLayer || capa instanceof VectorImageLayer) &&
              capa.get('globoInfo')
          )
      )
      .map(capa =>
        capa
          .getSource()
          .getFeatures()
          .filter(feature =>
            // filtra los que están dentro de la vista
            intersects(extent, feature.getGeometry().getExtent())
          )
          .map(feature =>
            this.getPixelFromCoordinate(feature.getGeometry().getCoordinates())
          )
      )
      .flat()

    console.log('elementos encontrados:', featuresVista.length)

    const contenido = this.globoInfo.buscarContenidoEnPixel(
      featuresVista[0],
      this
    )

    // console.log(contenido)

    this.globoInfo.mostrar(contenido, featuresVista[0], this)

    // this.globoInfo.setContenido('hola ejeje')
    // this.globoInfo.setVisibilidad(true)
    // this.globoInfo.setPosicionDesdePixel(
    //   this.getPixelFromCoordinate(
    //     featuresVista[0].getGeometry().getCoordinates()
    //   ),
    //   this.getViewport()
    // )
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
   * Asigna el valor del centro en el mapa.
   * @param {Array<Number>|String} centro
   */
  asignarCentro(centro) {
    this.getView().set('centro', centro)
    this.getView().setCenter(valorarArregloNumerico(centro))
  }

  /**
   * Asigna el valor de la extención del mapa en el mapa.
   * @param {Array<Number>|String} extension
   * @param {Array<Number>|String} extensionMargen
   */
  asignarExtension(extension, extensionMargen) {
    if (validaciones.extension(extension)) {
      this.getView().set('extension', extension)
      this.getView().set('extensionMargen', extensionMargen)

      this.getView().fit(valorarArregloNumerico(extension), {
        padding: valorarExtensionMargen(extensionMargen),
      })
    } else {
      this.getView().set('extension', undefined)
      this.getView().set('extensionMargen', undefined)
    }
  }

  /**
   * Asigna los valores de de la vista del mapa.
   * @param {Object} propiedades
   */
  asignarVista({ extension, extensionMargen, centro, zoom }) {
    this.asignarCentro(centro)
    this.asignarZoom(zoom)

    this.asignarExtension(extension, extensionMargen)
  }

  /**
   * Asigna el valor del zoom en el mapa.
   * @param {Number} zoom
   */
  asignarZoom(zoom) {
    this.getView().set('acercamiento', zoom)
    this.getView().setZoom(Number(zoom))
  }

  /**
   * Busca dentro de la instancia del mapa la capa que contenga un determinado `id`.
   * @param {String} idCapa id de la capa a buscar.
   * @returns {import("ol/layer/Layer").default} layer.
   */
  buscarCapa(idCapa) {
    // quizá promesa!
    return this.getAllLayers().find(capa => capa.get('id') === idCapa)
  }

  /**
   *
   * @param {*} nombreControl
   * @returns
   */
  buscarControl(nombreControl) {
    return this.getControls()
      .getArray()
      .find(olControl => olControl.nombre === nombreControl)
  }

  /**
   * Elimina de la instancia del mapa la capa que contenga un determinado `id`.
   * @param {String} idCapa id de la capa a eliminar.
   */
  eliminarCapa(idCapa) {
    this.removeLayer(this.buscarCapa(idCapa))
    // console.log(this.getAllLayers().map(c => c.get('id')))
  }

  /**
   * Permite descargar la vista actual del mapa, con las capas visibles y zoom mostrado en
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
