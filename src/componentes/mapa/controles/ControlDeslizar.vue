<script setup>
import { inject, ref, watch } from 'vue'
import { MAPA_INYECTADO } from '../../../utiles/identificadores'

const mapa = inject(MAPA_INYECTADO)

const dividir = ref(mapa.dividir)
watch(dividir, nv => {
  console.log('dividir', nv)

  mapa.dividir = nv
  mapa.render()
})
</script>

<template>
  <input
    type="range"
    v-model="dividir"
  />
</template>
