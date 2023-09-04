<script setup>
import { ref } from 'vue'

const mapa = ref(null)
</script>

<template>
  <SisdaiMapa ref="mapa">
    <SisdaiCapaXyz />

    <SisdaiMapaEncabezado>
      <button @click="mapa.exportarImagen('mapa-sisdai')">
        Guardar captura
      </button>
    </SisdaiMapaEncabezado>
  </SisdaiMapa>
</template>
