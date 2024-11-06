<script setup>
import { computed, inject, toRefs, watch } from 'vue'
import { MAPA_INYECTADO } from './../../../../utiles/identificadores'

const mapa = inject(MAPA_INYECTADO)
// console.log(mapa.pixel)
const x = computed(() => {
  // return mapa.pixel
  return mapa.pixel.map(p => `${p}px`)
})

watch(
  // () => mapa.pixel,
  x,
  nv => {
    // console.log(nv)
  }
)

const props = defineProps({
  contenido: {
    type: String,
    default: undefined,
  },
  visible: {
    type: Boolean,
    default: false,
  },
})

const { contenido, visible } = toRefs(props)
</script>

<template>
  <div
    class="globo-informacion"
    role="tooltip"
    aria-live="assertive"
    :style="`left: ${x[0]}; top: ${x[1]};`"
  >
    <div class="globo-informacion-cuerpo">{{ contenido }}</div>
  </div>
</template>

<style lang="scss">
.sisdai-mapa.contenedor-vis .contenido-vis .globo-informacion {
  position: absolute;
  display: none;
}
</style>
