<script setup>
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
@import 'sisdai-css/src/_variables';
@import 'sisdai-css/src/_mixins';
// @import './../estilos/ContenedorVis.scss';

.sisdai-mapa.contenedor-vis {
  $border-radius-canvas: 14px;

  .contenido-vis {
    background: #e9e9e9;

    canvas {
      border-radius: $border-radius-canvas $border-radius-canvas 0 0;
    }
  }

  &.con-panel-encabezado-vis canvas,
  &.con-panel-izquierda-vis canvas {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
  @include mediaquery('esc') {
    &.con-panel-izquierda-vis canvas {
      border-top-left-radius: 0;
      border-top-right-radius: $border-radius-canvas;
    }
    &.con-panel-derecha-vis canvas {
      border-top-right-radius: 0;
    }
  }

  &.sin-boton-conahcyt {
    canvas {
      border-bottom-right-radius: $border-radius-canvas;
      border-bottom-left-radius: $border-radius-canvas;
    }
    &.con-panel-derecha-vis canvas,
    &.con-panel-pie-vis canvas {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    @include mediaquery('esc') {
      &.con-panel-encabezado-vis.con-panel-izquierda-vis canvas {
        border-top-right-radius: 0;
      }
      &.con-panel-izquierda-vis canvas {
        border-bottom-left-radius: 0;
      }
      &.con-panel-izquierda-vis.con-panel-derecha-vis canvas,
      &.con-panel-derecha-vis.con-panel-pie-vis canvas {
        border-bottom-left-radius: 0;
      }
      &.con-panel-derecha-vis canvas {
        border-bottom-left-radius: $border-radius-canvas;
      }
    }
  }

  &.sin-bordes canvas {
    border-radius: 0;
  }
}
</style>
