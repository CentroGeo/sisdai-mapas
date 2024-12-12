<script setup>
import { computed, toRefs } from 'vue'
import SisdaiLeyendaControl from './../control'
import _props from './props'
import { Svg } from './../../../utiles/vectores'

const props = defineProps(_props)
const { estilo, informacion, titulo } = toRefs(props)

const svg = computed(() => {
  return new Svg({
    estilo: estilo.value,
    // geometria:
  })
})
</script>

<template>
  <div class="sisdai-mapa-leyenda">
    <div class="leyenda-titulo">
      <SisdaiLeyendaControl
        :informacion="informacion"
        :etiqueta="titulo"
        :simbolo="svg"
      />
    </div>
  </div>
</template>

<script></script>
