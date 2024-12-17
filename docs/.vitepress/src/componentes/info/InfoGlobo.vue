<script setup>
import { ref, toRefs, watch } from 'vue'
import { calcularPosicionInfo } from './../../utiles/globoInfo'

const props = defineProps({
  contenido: {
    type: String,
    default: undefined
  },
  pixel: {
    type: Array,
    default: () => [0, 0]
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const { contenido, pixel, visible } = toRefs(props)
const sisdaiGloboInfo = ref()
const posicion = ref(calcularPosicionInfo(pixel.value))

function calcular() {
  posicion.value = calcularPosicionInfo(pixel.value, sisdaiGloboInfo.value)
}
watch(pixel, calcular)
</script>

<template>
  <div
    ref="sisdaiGloboInfo"
    class="ol-unselectable globo-informacion"
    :class="{ oculto: !visible }"
    :style="`left: ${posicion.x}px; top: ${posicion.y}px;`"
    aria-live="assertive"
    @mouseover="calcular"
  >
    <div class="globo-informacion-cuerpo" v-html="contenido" />
  </div>
</template>

<style lang="scss">
.ol-unselectable.globo-informacion {
  position: absolute;
}
</style>
