<script setup>
import 'ol/ol.css'
import { onMounted, onUnmounted, shallowRef, toRefs, watch } from 'vue'
import usarRegistroMapas from './../composables/usarRegistroMapas'
import eventos from './../eventos/mapa'
import { idAleatorio } from './../utiles'
import { vista as validarVista } from './../utiles/validaciones'
import * as valoresPorDefecto from './../valores/mapa'
import BotonConahcyt from './BotonConahcyt.vue'
import SisdaiCargando from './SisdaiCargando.vue'

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
    validator: validarVista,
  },
})

const emits = defineEmits(Object.values(eventos))
const mapa = shallowRef(null)
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

defineExpose({
  exportarImagen: nombreImagen => {
    console.log('exportarImagen', nombreImagen)
    usarRegistroMapas().mapa(props.id).exportarImagen(nombreImagen)
  },
})
</script>

<template>
  <div
    :sisdai-mapa="id"
    class="sisdai-mapa contenedor-vis borde borde-color-2 borde-redondeado-8"
  >
    <div class="panel-encabezado-vis">
      <slot name="panel-encabezado-vis" />
    </div>

    <div class="panel-izquierda-vis">
      <slot name="panel-izquierda-vis" />
    </div>

    <!-- slot para las capas -->
    <slot />

    <figure
      class="contenido-vis"
      ref="mapa"
    />

    <div class="panel-derecha-vis">
      <slot name="panel-derecha-vis" />
    </div>

    <div class="panel-pie-vis">
      <slot name="panel-pie-vis" />
    </div>

    <SisdaiCargando />
    <BotonConahcyt />
  </div>
</template>

<style lang="scss">
@import './../estilos/ContenedorVis';

.sisdai-mapa.contenedor-vis .contenido-vis {
  background: #e9e9e9;

  canvas {
    border-radius: 14px 14px 0 0;
  }
}
</style>
