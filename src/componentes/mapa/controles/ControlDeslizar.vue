<script setup>
import { inject, ref, watch } from 'vue'
import { MAPA_INYECTADO } from '../../../utiles/identificadores'

const mapa = inject(MAPA_INYECTADO)

const deslizamiento = ref(mapa.deslizamiento)
watch(deslizamiento, nv => {
  mapa.deslizamiento = nv
  mapa.render()
})
</script>

<template>
  <input
    type="range"
    v-model="deslizamiento"
  />
</template>
