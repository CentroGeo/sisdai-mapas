<script setup>
import usarRegistroMapas from '@/composables/usarRegistroMapas'
import { idAleatorio } from '@/utiles'
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
    validator({ extension, centro, zoom }) {
      if (extension !== undefined) {
        // tipos admitidos para extension: [N,N,N,N], ['N','N','N','N'], o 'N,N,N,N'
        const extensionComoArreglo =
          typeof extension === typeof String()
            ? extension.split(',')
            : extension

        if (
          !Array.isArray(extensionComoArreglo) ||
          isNaN(Number(extensionComoArreglo[0])) ||
          isNaN(Number(extensionComoArreglo[1])) ||
          isNaN(Number(extensionComoArreglo[2])) ||
          isNaN(Number(extensionComoArreglo[3]))
        ) {
          // eslint-disable-next-line
          console.error(
            'EL VALOR DE LA EXTENCIÓN DE LA VISTA DEL MAPA NO ES VALIDO, SE ESPERABA: [Number, Number, Number, Number]'
          )
          return false
        }

        return true
      }

      if (!zoom || !centro) {
        // eslint-disable-next-line
        console.error(
          'EL ZOOM O EL CENTRO DE LA VISTA DEL MAPA NO HAN SIDO DEFINIDOS'
        )
        return false
      }

      // tipos admitidos para zoom: N o "N"
      if (isNaN(Number(zoom)) || (Number(zoom) < 1 && Number(zoom) > 22)) {
        // eslint-disable-next-line
        console.error(
          'EL VALOR DEL ZOOM DE LA VISTA DEL MAPA DEBE SER ENTRE 1 Y 22'
        )
        return false
      }

      // tipos admitidos para centro: [N, N], ['N', 'N'], o 'N,N'
      const centroComoArreglo =
        typeof centro === typeof String() ? centro.split(',') : centro

      if (
        !Array.isArray(centroComoArreglo) ||
        isNaN(Number(centroComoArreglo[0])) ||
        isNaN(Number(centroComoArreglo[1]))
      ) {
        // eslint-disable-next-line
        console.error(
          'EL VALOR DEL CENTRO DE LA VISTA DEL MAPA NO ES VALIDO, SE ESPERABA: [Number, Number]'
        )
        return false
      }

      return true
    },
  },
})

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
  // watch(vista, asignarValoresVista)
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
