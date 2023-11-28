<script setup>
import { toRefs, watch } from 'vue'
import SimboloSvg from './../../clases/SimboloSvgLeyenda'

const props = defineProps({
  simbolo: {
    type: SimboloSvg,
    default: new SimboloSvg(),
  },
})

const { simbolo } = toRefs(props)

// console.log(simbolo.value.xml)
watch(simbolo, () => {
  // console.log(nv)
})
</script>

<template>
  <svg
    class="figura-variable nombre"
    :width="simbolo.tamanioSimboloMayorMinimo"
    :height="simbolo.tamanio"
    v-html="simbolo.xml"
  ></svg>
</template>

<style lang="scss"></style>
