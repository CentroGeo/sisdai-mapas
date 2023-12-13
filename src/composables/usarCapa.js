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
 * @module composables/usarCapa
 */

import { ref, toRefs, watch } from 'vue'
import usarCapasRegistradas from './usarCapasRegistradas'
import { idAleatorio } from './../utiles'
import tiposEstatusCarga from './../defaults/estatusCarga'

export const props = {
  /**
   * `extension`
   * - Tipo: `Array`
   * - Valor por defecto: `[0, 0, 0, 0]`
   * - Interactivo: ❌
   *
   * Extensión de la capa. Con este parametro se calcularán los mínimos y máximos de las capas
   * registradas en el mapa.
   */
  extension: {
    type: Array,
    default: () => [0, 0, 0, 0],
  },

  /**
   * `id`
   * - Tipo: `String`
   * - Obligatorio: ✅
   * - Interactivo: ❌
   *
   * Identificador único de la capa. Si no es detectado, se asignará una cadena de texto
   * aleatorea. Para hacer uso de la leyenda esta propiedad pasa a ser obligatoria.
   */
  id: {
    type: String,
    default: '_default_',
  },

  /**
   * `nombre`
   * - Tipo: `String`
   * - Valor por defecto: Identificador único de la capa.
   * - Interactivo: ✅
   *
   * Nombre de la capa que aparecerá en el control de la leyenda. Si no es detectado, se asignará
   * el identificador único de la capa (`id`).
   */
  nombre: {
    type: String,
    default: 'Nombre no asignado',
  },

  /**
   * `verCargador`
   * - Tipo: `Boolean`
   * - Valor por defecto: `false`
   * - Interactivo: ❌
   *
   * Esta propiedad le comunica a la vista del mapa si se desea sobreponer la vista que indica
   * el proceso de carga de una capa.
   */
  verCargador: {
    type: Boolean,
    default: false,
  },

  /**
   * `visible`
   * - Tipo: `Boolean`
   * - Valor por defecto: `true`
   * - Interactivo: ✅
   *
   * Visibilidad de la capa.
   */
  visible: {
    type: Boolean,
    default: true,
  },

  /**
   * `zIndex`
   * - Tipo: `Number`
   * - Valor por defecto: [trabajando...]
   * - Interactivo: ✅ [trabajando...]
   *
   * Indica la posición respecto a otras capas, cuando se define un z-index mas alto respecto a
   * las demás capas, esa capa se posicionara enfrente de ellas.
   */
  zIndex: {
    type: Number,
    default: undefined,
  },
}

export const eventos = {
  /**
   * Evento ejecutado cuando se detecta el cambio de visibilidad de la capa desde las propiedades
   * reactivas o desde los controles del componente como el control de leyenda.
   * @param {Boolean} visibilidad Visibilidad final al ejecutarse este evento.
   */
  alCambiarVisibilidad: 'alCambiarVisibilidad',

  /**
   * Evento ejecutado cuando se detecta que ha iniciado la carga de la información visible en el
   * mapa. En el caso de capas vectoriales (GeoJSON) cuando inicia la consulta de los features;
   * En el caso de capas raster (WMS) cuando inicia la consulta de la imagen; En el caso de las
   * capas por conjunto de teselas (XYZ, OSM) cuando inicia la consulta de un grupo de teselas.
   */
  alIniciarCarga: 'alIniciarCarga',

  /**
   * Evento ejecutado cuando se detecta que ha finalizado la carga de la información visible en
   * el mapa. En el caso de capas vectoriales (GeoJSON) cuando finaliza la consulta de los
   * features; En el caso de capas raster (WMS) cuando finaliza la consulta de la imagen; En el
   * caso de las capas por conjunto de teselas (XYZ, OSM) cuando finaliza la consulta de un
   * grupo de teselas.
   * @param {Boolean} cargaExitosa Indica si la carga no ha presentado error.
   */
  alFinalizarCarga: 'alFinalizarCarga',
}

export const emits = Object.values(eventos)

/**
 * La finalidad de este composable es acceder a las funciones del genéricas de la capa desde
 * diferentes componentes o composables.
 * @param {Object} propsParam props genéricos de capa.
 * @param {Object} emitsParam emits genéricos de capa.
 * @returns {Function} composable.
 */
export default function usarCapa(propsParam, emitsParam) {
  const { registrarNuevaCapa, vincularCapa } = usarCapasRegistradas()
  const { nombre, verCargador, visible, zIndex } = toRefs(propsParam)
  const estatusCarga = ref(tiposEstatusCarga.no)

  /**
   * Asigna un identificador aleatorio en caso de que no se asigne.
   */
  const idValida = propsParam.id === '_default_' ? idAleatorio() : propsParam.id

  /**
   * Agrega los porps al objeto y propiedades de la capa.
   * @param {import("ol/layer/Layer.js").default} olCapa objeto de capa de openlayers.
   */
  function asignarPorps(olCapa) {
    olCapa.set('extension', propsParam.extension)
    olCapa.set('estatusCarga', estatusCarga.value)
    olCapa.set('id', idValida)
    olCapa.set('nombre', nombre.value)
    olCapa.set('verCargador', verCargador.value)
    olCapa.setVisible(visible.value)
    olCapa.setZIndex(zIndex.value)
  }

  /**
   *
   * @returns
   */
  function vincular() {
    return vincularCapa(idValida)
  }

  /**
   * Prepara la capa y la registra en el composable de capas registradas.
   * @param {import("ol/layer/Layer.js").default} olCapa objeto de capa de openlayers.
   */
  function registrar(olCapa) {
    asignarPorps(olCapa)
    registrarNuevaCapa(olCapa)

    const {
      visibilidad,
      alternarVisibilidad,
      cambiarNombre,
      cambiarEstatusCarga,
    } = vincular()

    watch(visible, alternarVisibilidad)
    watch(visibilidad, nuevoValor =>
      emitsParam(eventos.alCambiarVisibilidad, nuevoValor)
    )

    watch(nombre, cambiarNombre)
    watch(estatusCarga, cambiarEstatusCarga)
  }

  return {
    registrar,
    estatusCarga,
    vincular,
  }
}
