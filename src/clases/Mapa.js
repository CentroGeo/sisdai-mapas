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

import olMap from 'ol/Map'
import RenderEventType from 'ol/render/EventType'
import { obtenerCodigoCaracterParaUtfGrid } from '../utiles/globoInfo'
import eventos from './../eventos/mapa'
import { valorarArregloNumerico, valorarExtensionMargen } from './../utiles'
import crearImagenMapa from './../utiles/CrearImagenMapa'
import * as validaciones from './../utiles/validaciones'
import { vista as vistaPorDefecto } from './../valores/mapa'
import NavegacionTeclado from './NavegacionTeclado'

/**
 * @classdesc
 * Clase heredada de la clase Map de OpenLayers con la finaliodad de agregar funciones y/o
 * propiedades que faciliten la manipulación del contenido de la propia instancia.
 */
export default class Mapa extends olMap {
  rejillasUtf = []

  /**
   *
   * @param {*} pixel
   * @param {*} funsion
   */
  caracterDeRejillaEnPixel(pixel, funsion) {
    const posicion = [parseInt(pixel[0] / 4), parseInt(pixel[1] / 4)]

    return (
      Object.values(this.rejillasUtf)
        // solo las visibles
        .filter(({ visible }) => visible)
        // búsqueda de atributos
        .map(rejilla => {
          let propiedades
          const resultado = rejilla.resultado

          if (resultado === undefined) return { propiedades, rejilla }

          const code = obtenerCodigoCaracterParaUtfGrid(
            resultado.grid[posicion[1]]?.charCodeAt(posicion[0])
          )

          // no coincide con datos
          if (code === 0) return { propiedades, rejilla }

          propiedades = resultado.data[resultado.keys[code]]

          return { propiedades, rejilla }
        })
        // solo las regillas (capas utfgird) con atributos encontrados
        .filter(({ propiedades }) => propiedades !== undefined)
        // ordenar pio posicion
        .sort((a, b) => b.rejilla.posicion - a.rejilla.posicion)
        // ejecutar función de parámetro
        .map(({ propiedades, rejilla }) => {
          return funsion(propiedades, rejilla)
        })[0]
    )
  }

  constructor(opcionesOlMap, emits) {
    super(opcionesOlMap)

    this.eventos = emits

    // this.cuadroInfo = new CuadroInfo(this, 0)
    // this.globoInfo = new GloboInfo(this)

    this.navegacionTeclado = new NavegacionTeclado(this)

    // this.hayElementosEnCarga = false
    // this.hayLeyendasCargando = false
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
   * Objeto vista: { acercamiento, centro, extencsion }
   * Ajusta a vista del mapa de acuerdo a los parametros recividos con la estructura:
   * { acercamiento, centro } o { extension }
   */
  ajustarVista(vista) {
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

    this.eventos(eventos.alAjustarVista, vista)
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
   * Busca dentro de la instancia del mapa la capa que contenga un determinado `id`.
   * @param {String} idCapa id de la capa a buscar.
   * @returns {import("ol/layer/Layer").default} layer.
   */
  buscarCapa(idCapa) {
    // quizá promesa!
    return this.getAllLayers().find(capa => capa.get('id') === idCapa)
  }

  buscarCapaPromesa(idCapa) {
    return this.busquedaPromesa(mapa =>
      mapa.getAllLayers().find(capa => capa.get('id') === idCapa)
    )
  }

  /**
   *
   * @param {String} nombreControl
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
