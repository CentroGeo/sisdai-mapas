<script setup>
import { toRefs } from 'vue'
import propsControl from './../control/props'

const props = defineProps({ simbolo: propsControl.simbolo })

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
