<script setup>
import { toRefs } from 'vue'
import Svg from './Svg'

const props = defineProps({
  simbolo: {
    type: Svg,
    default: new Svg(),
  },
})

const { simbolo } = toRefs(props)
</script>

<template>
  <svg
    aria-hidden="true"
    class="figura-variable"
    :height="simbolo.tamanio"
    :style="{
      '--controlador-vis-figura-alto': `${simbolo.tamanio}px`,
      'min-width': `${simbolo.tamanioSimboloMayorMinimo}px`,
    }"
    v-html="simbolo.xml"
    :width="simbolo.tamanioSimboloMayorMinimo"
  ></svg>
</template>
