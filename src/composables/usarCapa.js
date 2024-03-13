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

import { onBeforeUnmount, onMounted, toRefs, watch } from 'vue'
import eventos from './../eventos/capa'
import { buscarIdContenedorHtmlSisdai, idAleatorio } from './../utiles'
import usarRegistroMapas from './usarRegistroMapas'

export const props = {
  /**
   * Establece las atribuciones de la fuente.
   *
   * - Tipo: `String` o `Array<String>`
   * - Valor por defecto: `undefined`
   * - Reactivo: ❌
   *
   * @see https://openlayers.org/en/latest/apidoc/module-ol_source_Source.html#~AttributionLike
   */
  atribuciones: {
    type: [String, Array],
    default: undefined,
  },

  /**
   * Identificador único de la capa. Si no es detectado, se asignará una cadena de texto
   * aleatorea. Para hacer uso de la leyenda esta propiedad pasa a ser obligatoria.
   *
   * - Tipo: `String`
   * - Valor por defecto: Aleatorio
   * - Reactivo: ❌
   */
  id: {
    type: String,
    default: () => idAleatorio(),
  },

  /**
   * Nombre de la capa que aparecerá en el control de la leyenda.
   *
   * - Tipo: `String`
   * - Valor por defecto: `'Nombre no asignado'`.
   * - Reactivo: ✅
   */
  nombre: {
    type: String,
    default: 'Nombre no asignado',
  },

  /**
   * Un valor que va de 0 a 1, para indicar la opacidad de la capa. 0 es totalmente invisible y 1 es la opacidad completa.
   *
   * - Tipo: `Number` o `String`
   * - Valor por defecto: `1`
   * - Reactivo: ✅
   */
  opacidad: {
    type: [Number, String],
    default: 1,
  },

  /**
   * Indica la posición respecto a otras capas. Las capas con un valor mayor en este parámetro se mostrarán enfrente.
   *
   * - Tipo: `Number` o `String`
   * - Valor por defecto: `undefined`
   * - Reactivo: ✅
   */
  posicion: {
    type: [Number, String],
    default: undefined,
  },

  /**
   * Visibilidad de la capa.
   *
   * - Tipo: `Boolean`
   * - Valor por defecto: `true`
   * - Reactivo: ✅
   */
  visible: {
    type: Boolean,
    default: true,
  },
}

export default function usarCapa(refVar, props, emits = () => {}) {
  var idMapa
  const { nombre, opacidad, posicion, visible } = toRefs(props)

  var fnConfiguracion
  function configurar(_fnConfiguracion) {
    fnConfiguracion = _fnConfiguracion
  }

  var fnAgregada = () => {}
  function agregada(_fnAgregada) {
    if (typeof _fnAgregada === typeof (() => {})) {
      fnAgregada = _fnAgregada
    }
  }

  function agregar() {
    usarRegistroMapas()
      .mapaPromesa(idMapa)
      .then(mapa => {
        const { olLayerClass, olSource, tipo } = fnConfiguracion()

        mapa.addLayer(
          new olLayerClass({
            id: props.id,
            nombre: nombre.value,
            opacity: Number(opacidad.value),
            source: olSource,
            tipo,
            visible: visible.value,
            zIndex: Number(posicion.value),
          })
        )

        watch(nombre, nv => mapa.buscarCapa(props.id).set('nombre', nv))
        watch(opacidad, nv => mapa.buscarCapa(props.id).setOpacity(Number(nv)))
        watch(posicion, nv => mapa.buscarCapa(props.id).setZIndex(Number(nv)))
        watch(visible, nv => mapa.buscarCapa(props.id).setVisible(nv))

        // alCambiarVisibilidad
        watch(
          () => mapa.buscarCapa(props.id)?.getVisible(),
          nv => emits(eventos.alCambiarVisibilidad, nv)
        )

        fnAgregada(mapa.buscarCapa(props.id))
      })
  }

  onMounted(() => {
    // console.log('onMounted composable capa')

    idMapa = buscarIdContenedorHtmlSisdai('mapa', refVar.value)

    agregar()
  })

  function eliminar() {
    // console.log('quitando capa', props.id)

    usarRegistroMapas()
      .mapaPromesa(idMapa)
      .then(mapa => {
        mapa.eliminarCapa(props.id)
      })
  }

  onBeforeUnmount(() => {
    // console.log('onBeforeUnmount composable')
    eliminar()
  })

  return {
    agregada,
    configurar,
    // eliminar,
  }
}

// PARA PRUEBAS UNITARIAS QUIZÁ VERIFICAR SI LA CAPA SE AGREGÓ CORRECTAMENTE
