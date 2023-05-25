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
    validator({ centro, zoom }) {
      console.log('validador de vista1')

      // if (extension !== undefined) {
      //   return true
      // }

      if (!zoom || !centro) {
        // eslint-disable-next-line
        console.error('EL ZOOM O EL CENTRO DE LA VISTA NO HAN SIDO DEFINIDOS')
        return false
      }

      // tipos admitidos para zoom: N o "N"
      if (isNaN(Number(zoom)) || (Number(zoom) < 1 && Number(zoom) > 22)) {
        // eslint-disable-next-line
        console.error('EL VALOR DEL ZOOM DEBE SER ENTRE 1 Y 22')
        return false
      }

      // tipos admitidos para centro: [N, N], ['N', 'N'], o 'N,N'
      const centroVector =
        typeof centro === typeof String() ? centro.split(',') : centro

      if (
        !Array.isArray(centroVector) ||
        isNaN(Number(centroVector[0])) ||
        isNaN(Number(centroVector[1]))
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
  usarRegistroMapas().mapa(props.id).asignarVista(vista.value)
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
