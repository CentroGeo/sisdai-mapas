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


/**
 * @module composables/usarCapasRegistradas
 */

import { ref, watch } from 'vue'
import tiposEstatusCarga from './../defaults/estatusCarga'

/**
 * Objeto de objetos de capas de openlayers, los leys de cada objeto debe ser el id de cada capa.
 */
let capasRegistradas = {}

/**
 * Variable que indica si hay capas que tienen el cargador visible en proceso de carga/actualiación.
 */
const hayCapasCargadorVisibleProcesando = ref(false)

/**
 * La finalidad de este composable es acceder al a las capas usadan en cada intsncia del
 * componernte desde diferentes componentes o composables de esta biblioteca.
 * @returns {Function} composable.
 */
export default function usarCapasRegistradas() {
  /**
   * Agrega todas las capas registradas en el objeto capasRegistradas al mapa visible.
   * @param {import("ol/Map.js").default} mapa objeto de mapa de openlayers.
   */
  function agregarTodoALMapa(mapa) {
    for (const idCapa in capasRegistradas) {
      if (capasRegistradas[idCapa]) {
        mapa.addLayer(capasRegistradas[idCapa].value)
      }
    }
  }

  /**
   * Limpia el objeto de capas registradas.
   */
  function limpiarRegistro() {
    capasRegistradas = {}
  }

  /**
   * Devuelve verdadero si la capa ya se encuentra dentro del objeto capasRegistradas.
   * @param {String} idCapa identificador único de la capa.
   * @returns {Boolean}
   */
  function laCapaYaExiste(idCapa) {
    if (capasRegistradas[idCapa] !== undefined) {
      // eslint-disable-next-line
      console.warn('¡La capa ya existe!')
      return true
    }
    return false
  }

  /**
   * Agrega la capa en el listado de capas disponibles para usarse.
   * @param {import("ol/layer/Layer.js").default} capa objeo de capa de OpenLayers.
   */
  function registrarNuevaCapa(capa) {
    const idCapa = capa.get('id')
    if (laCapaYaExiste(idCapa)) return

    capasRegistradas[idCapa] = ref(capa)
  }

  /**
   * Este watcher actualiza la variable `estadoCapasCargadorVisible` cada que cambie el estado
   * de algua capa, filra solo las capas que tienen el cargador visible y checa si hay alguna
   * capa en procesos de carga `tiposEstatusCarga.ini`.
   */
  watch(
    () =>
      Object.values(capasRegistradas)
        .filter(capa => capa.value.get('verCargador'))
        .map(capa => capa.value.get('estatusCarga'))
        .join(),
    estadoCapasCargadorVisible =>
      (hayCapasCargadorVisibleProcesando.value =
        estadoCapasCargadorVisible.includes(tiposEstatusCarga.ini))
  )

  /**
   * Devuelve un booleando dependiendo si la capa de referencia está registrada en las capas.
   * @param {String} idCapa identificador de la capa.
   * @returns {Boolean} ture si la capa está registrada.
   */
  function capaEstaRegistrada(idCapa) {
    return Object.hasOwnProperty.call(capasRegistradas, idCapa)
  }

  /**
   * Esta función en un pequeño composable para acceder a propiedades reactivas y funciones de a
   * una capa en especifico.
   * @param {String} idCapa id de la caopa a la que se vinculará.
   */
  function vincularCapa(idCapa) {
    if (!capaEstaRegistrada(idCapa)) {
      // eslint-disable-next-line
      console.warn(`La capa ${idCapa} no existe`)
      return {}
    }

    const capa = () => capasRegistradas[idCapa].value
    const conseguir = id => capa().values_[id]
    const asignar = (id, nvoValor) => capa().set(id, nvoValor)

    const nombre = ref(conseguir('nombre'))
    const estatusCarga = ref(conseguir('estatusCarga'))
    const estilo = ref(conseguir('estilo'))
    // const verCargador = ref(conseguir('verCargador'))
    const visibilidad = ref(capa().getVisible())

    /**
     * Cambia el nombre de la capa, la cual es visible en la leyenda nativa.
     * @param {String} nvoNombre nombre a asignar.
     */
    const cambiarNombre = nvoNombre => asignar('nombre', nvoNombre)
    watch(
      () => conseguir('nombre'),
      nvoNombre => (nombre.value = nvoNombre)
    )

    /**
     *
     * @param {*} nvoEstatus
     */
    function cambiarEstatusCarga(nvoEstatus) {
      estatusCarga.value = nvoEstatus
    }
    watch(estatusCarga, nvoEstatus => capa().set('estatusCarga', nvoEstatus))

    /**
     *
     * @param {*} nvoEstilo
     */
    function cambiarEstilo(nvoEstilo, accion) {
      asignar('estilo', JSON.stringify(nvoEstilo))
      accion(capa())
    }
    watch(
      () => conseguir('estilo'),
      nvoEstilo => (estilo.value = nvoEstilo)
    )

    /**
     * Cambiar el estado de visivilidad de una capa de acuerdo con su id. Si no se define el
     * parámetro booleano, se asignará el estado contratrio de su estado actual.
     * @param {Boolean|undefined} estado prendido/apagado.
     */
    function alternarVisibilidad(estado = undefined) {
      if (estado === undefined) estado = !capa().getVisible()
      capa().setVisible(estado)
    }
    watch(
      () => capa().values_.visible,
      nuevoValor => (visibilidad.value = nuevoValor)
    )
    watch(visibilidad, alternarVisibilidad)

    return {
      capa,
      visibilidad,
      alternarVisibilidad,
      nombre,
      cambiarNombre,
      cambiarEstatusCarga,
      estilo,
      cambiarEstilo,
    }
  }

  return {
    agregarTodoALMapa,
    limpiarRegistro,
    registrarNuevaCapa,
    vincularCapa,
    capaEstaRegistrada,
    hayCapasCargadorVisibleProcesando,
  }
}
