<script setup>
import { toRefs } from 'vue'
import SimboloSvg from './../../clases/SimboloSvgLeyenda'

const props = defineProps({
  simbolo: {
    type: SimboloSvg,
    default: new SimboloSvg(),
  },
})

const { simbolo } = toRefs(props)

// console.log(simbolo.value.tamanioSimboloMayorMinimo)
</script>

<template>
  <svg
    class="figura-variable"
    :style="{
      '--controlador-vis-figura-alto': `${simbolo.tamanio}px`,
      'min-width': `${simbolo.tamanioSimboloMayorMinimo}px`,
    }"
    :width="simbolo.tamanioSimboloMayorMinimo"
    :height="simbolo.tamanio"
    v-html="simbolo.xml"
  ></svg>
</template>
