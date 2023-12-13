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
 * @module composables/usarCapaControl
 */

import { ref, watch } from 'vue'
import usarCapasRegistradas from './usarCapasRegistradas'

export const props = {
  /**
   * para
   * - Tipo: `String`
   * - Obligatorio: ✅
   * - Interactivo: ❌
   *
   * Identificador de la capa a la que se quiere vincular el control de leyenda.
   */
  para: {
    type: String,
    required: true,
  },
}

/**
 * La finalidad de este composable es acceder a las funciones del genéricas de la leyenda desde
 * diferentes componentes o composables.
 * @param {Object} propsParam props genéricos de leyenda.
 * @returns {Function} composable.
 */
export default function usarCapaControl(propsParam) {
  const visibilidadCapa = ref(false)
  const nombreCapa = ref('Cargando...')
  const estiloCapa = ref({})

  /**
   * Ejecutar esta función para vincular el idCapa con alguna capa registrada.
   */
  function vincularCapa() {
    if (!usarCapasRegistradas().capaEstaRegistrada(propsParam.para)) return

    const { alternarVisibilidad, visibilidad, nombre, estilo } =
      usarCapasRegistradas().vincularCapa(propsParam.para)

    visibilidadCapa.value = visibilidad.value
    watch(visibilidad, nvoValor => (visibilidadCapa.value = nvoValor))
    watch(visibilidadCapa, alternarVisibilidad)

    nombreCapa.value = nombre.value
    watch(nombre, nvoNombre => (nombreCapa.value = nvoNombre))

    estiloCapa.value = JSON.parse(estilo.value ? estilo.value : '{}')
    watch(estilo, nvoEstilo => (estiloCapa.value = JSON.parse(nvoEstilo)))
  }

  return {
    vincularCapa,
    visibilidadCapa,
    nombreCapa,
    estiloCapa,
  }
}
