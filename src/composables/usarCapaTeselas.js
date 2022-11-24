/**
 * @module composables/usarCapaTeselas
 */

import TileEventType from 'ol/source/TileEventType'
import { ref, watch } from 'vue'
import usarCapa, {
  props as propsCapa,
  eventos as eventosCapa,
} from './usarCapa'
import tiposEstatusCarga from './../defaults/estatusCarga'

export const props = {
  /**
   *
   */
  url: {
    type: String,
    default:
      'https://{a-c}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png',
  },

  ...propsCapa,
}

export const eventos = {
  /**
   *
   */
  alIniciarCargaTesela: 'alIniciarCargaTesela',

  /**
   *
   */
  alFinalizarCargaTesela: 'alFinalizarCargaTesela',

  ...eventosCapa,
}

export const emits = Object.values(eventos)

/**
 * La finalidad de este composable es acceder a las funciones del genéricas de las capas que sean
 * cargadas por teselas desde diferentes componentes o composables.
 * @param {Object} propsParam props genéricos de capa.
 * @param {Object} emitsParam emits genéricos de capa.
 * @returns {Function} composable.
 */
export default function usarCapaTeselas(propsParam, emitsParam) {
  const { estatusCarga, registrar: registrarCapa } = usarCapa(
    propsParam,
    emitsParam
  )

  /**
   * La variable `nTeselasSolicitadas` sirve para monitoriar las teselas cargadas y en proceso, con la
   * finalidad de saber en que momento se desencadenan los emits de carga.
   */
  const nTeselasSolicitadas = ref({
    inicio: 0,
    fin: 0,
    error: 0,
  })

  /**
   * Reinicia con 0 las propiedades de la carga de teselas
   */
  function reiniciarNumeroTeselasSolicitadas() {
    nTeselasSolicitadas.value.inicio = 0
    nTeselasSolicitadas.value.fin = 0
    nTeselasSolicitadas.value.error = 0
  }

  /**
   * Actualiza el estado de carga con error si todas las teselas cargadas dieron error, de lo
   * contrario el estado de carga se toma como finalizada.
   */
  function actualizarEstatusCarga() {
    estatusCarga.value =
      nTeselasSolicitadas.value.error === nTeselasSolicitadas.value.inicio
        ? tiposEstatusCarga.error // si todas las teselas dan error
        : tiposEstatusCarga.fin
  }

  /**
   * Este watcher detecta los cambios en el numero de teselas cargadas para disparar diferentes
   * eventos.
   */
  watch(
    () => nTeselasSolicitadas.value.fin === nTeselasSolicitadas.value.inicio,
    cargaCompleta => {
      if (cargaCompleta) {
        actualizarEstatusCarga()
        emitsParam(eventos.alFinalizarCarga, true)
        reiniciarNumeroTeselasSolicitadas()
      } else {
        estatusCarga.value = tiposEstatusCarga.ini
        emitsParam(eventos.alIniciarCarga)
      }
    }
  )

  /**
   * Agrega los emits de carga por cada tesela.
   * @param {import("ol/layer/Layer.js").default} olCapa objeto de capa de openlayers.
   */
  function agregarEmitsCarga(olCapa) {
    olCapa.getSource().on(TileEventType.TILELOADSTART, () => {
      emitsParam(eventos.alIniciarCargaTesela)
      nTeselasSolicitadas.value.inicio++
    })
    olCapa.getSource().on(TileEventType.TILELOADEND, () => {
      emitsParam(eventos.alFinalizarCargaTesela, true)
      nTeselasSolicitadas.value.fin++
    })
    olCapa.getSource().on(TileEventType.TILELOADERROR, () => {
      emitsParam(eventos.alFinalizarCargaTesela, false)
      nTeselasSolicitadas.value.fin++
      nTeselasSolicitadas.value.error++
    })
  }

  /**
   * Prepara la capa y la registra en el composable de capa.
   * @param {import("ol/layer/Layer.js").default} olCapa objeto de capa de openlayers.
   */
  function registrar(olCapa) {
    agregarEmitsCarga(olCapa)
    registrarCapa(olCapa)
  }

  return { registrar }
}
