import { onBeforeUnmount, onMounted, toRefs, watch } from 'vue'
import { buscarIdContenedorHtmlSisdai, idAleatorio } from './../utiles'
import usarRegistroMapas from './usarRegistroMapas'

export const props = {
  /**
   * Identificador único de la capa. Si no es detectado, se asignará una cadena de texto
   * aleatorea. Para hacer uso de la leyenda esta propiedad pasa a ser obligatoria.
   *
   * - Tipo: `String`
   * - Interactivo: ❌
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
   * - Interactivo: ✅
   */
  nombre: {
    type: String,
    default: 'Nombre no asignado',
  },
}

export default function usarCapa(refVar, props) {
  var idMapa
  const { nombre } = toRefs(props)

  var fnConfiguracion
  function configurar(_fnConfiguracion) {
    fnConfiguracion = _fnConfiguracion
  }

  function agregar() {
    usarRegistroMapas()
      .mapaPromesa(idMapa)
      .then(mapa => {
        const { olLayerClass, olSource } = fnConfiguracion()

        mapa.addLayer(
          new olLayerClass({
            source: olSource,
            id: props.id,
            nombre: nombre.value,
          })
        )

        watch(nombre, nv => mapa.buscarCapa(props.id).set('nombre', nv))
      })
  }

  onMounted(() => {
    console.log('onMounted composable')

    idMapa = buscarIdContenedorHtmlSisdai('mapa', refVar.value)

    agregar()
  })

  function eliminar() {
    console.log('quitando capa', props.id)

    usarRegistroMapas()
      .mapaPromesa(idMapa)
      .then(mapa => {
        mapa.eliminarCapa(props.id)
      })
  }

  onBeforeUnmount(() => {
    console.log('onBeforeUnmount composable')
    eliminar()
  })

  return {
    configurar,
    // eliminar,
  }
}
