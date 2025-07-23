<script setup>
import { inject } from 'vue'

import PointerEventType from 'ol/pointer/EventType'

import { MAPA_INYECTADO } from './../../../../utiles/identificadores'

const mapa = inject(MAPA_INYECTADO)
// watch(() => mapa.getTargetElement(), alSalirCursor)
mapa.on(PointerEventType.POINTERDOWN, alClick)
function alClick({ dragging, originalEvent /*, map */ }) {
  console.log('se dió click')
}
</script>

<template>
  <div
    aria-hidden="true"
    aria-live="assertive"
    class="ol-unselectable globo-informacion cuadro-informacion-capa"
    ref="sisdaiCuadroInfo"
    role="tooltip"
  >
    <div
      class="globo-informacion-cuerpo"
      v-html="globo.contenido"
    />
  </div>
</template>

<style lang="scss" scoped>
.sisdai-mapa.contenedor-vis .contenido-vis .cuadro-informacion-capa {
}
</style>
