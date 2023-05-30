<script>
const eventos = {
  alMoverVista: 'alMoverVista',
}
</script>

<script setup>
import usarRegistroMapas from '@/composables/usarRegistroMapas'
import { idAleatorio, valorarArregloNumerico } from '@/utiles'
import * as validaciones from '@/utiles/validaciones'
import * as valoresPorDefecto from '@/valores/mapa'
import 'ol/ol.css'
import { onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
const props = defineProps({
  id: {
    type: String,
    default: () => idAleatorio(),
  },

  /**
   * dar prioridad a la extención en caso de ser valida
   */
  vista: {
    type: Object,
    default: () => valoresPorDefecto.vista,
    validator({ extension, margenExtension, centro, zoom }) {
      if (validaciones.extension(extension)) {
        if (
          margenExtension !== undefined &&
          !validaciones.margenExtension(margenExtension)
        ) {
          return false
        }

        return true
      }

      // tipos admitidos para margenExtension: [N, N, N, N], ['N', 'N', 'N', 'N'], o 'N,N,N,N'
      // tipos admitidos para margenExtension: [all], [y,x], [top, x, bottom], [top, left, bottom, right]

      if (!zoom || !centro) {
        // eslint-disable-next-line
        console.error(
          'LA PROPIEDAD ZOOM O CENTRO DE LA VISTA DEL MAPA NO HAN SIDO DEFINIDOS'
        )
        return false
      }

      // tipos admitidos para zoom: N o "N"
      if (isNaN(Number(zoom)) || (Number(zoom) < 1 && Number(zoom) > 22)) {
        // eslint-disable-next-line
        console.error(
          'LA PROPIEDAD "zoom" DE LA VISTA DEL MAPA DEBE SER ENTRE 1 Y 22'
        )
        return false
      }

      // tipos admitidos para centro: [N, N], ['N', 'N'], o 'N,N'
      // const centroComoArreglo = esTexto(centro) ? centro.split(',') : centro
      const centroComoArreglo = valorarArregloNumerico(centro)

      if (
        !Array.isArray(centroComoArreglo) ||
        centroComoArreglo.includes(NaN) ||
        centroComoArreglo.includes(null)
      ) {
        // eslint-disable-next-line
        console.error(
          'LA PROPIEDAD "centro" DE LA VISTA DEL MAPA NO ES VALIDA, SE ESPERABA: [Number, Number]'
        )
        return false
      }

      return true
    },
  },
})

const emits = defineEmits(Object.values(eventos))

const mapa = ref(null)

const { vista } = toRefs(props)

function asignarValoresVista() {
  usarRegistroMapas()
    .mapa(props.id)
    .asignarVista({ ...valoresPorDefecto.vista, ...vista.value })
}
watch(vista, asignarValoresVista)

onMounted(() => {
  console.log('SisdaiMapa')
  usarRegistroMapas().registrarMapa(props.id, mapa.value)
  asignarValoresVista()

  usarRegistroMapas()
    .mapa(props.id)
    .on('moveend', e => {
      emits(eventos.alMoverVista, e)
    })
})

onUnmounted(() => {
  usarRegistroMapas().borrarMapa(props.id)
})
</script>

<template>
  <div
    :sisdai-mapa="id"
    class="sisdai-mapa"
  >
    <h1>Hola, soy un contenedor de mapa 😎 [{{ id }}]</h1>

    <figure
      ref="mapa"
      class="mapa"
    />

    <slot />
  </div>
</template>

<style>
.sisdai-mapa {
  width: 100%;
  border: solid 1px tomato;
}

.sisdai-mapa .mapa {
  width: 100%;
  height: 400px;
}
</style>
