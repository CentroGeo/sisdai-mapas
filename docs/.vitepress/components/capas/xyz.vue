<script setup>
const atribuciones = [
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  '&copy; <a href="https://carto.com/attributions">CARTO</a>',
]
</script>

<template>
  <SisdaiMapa
    :vista="{
      extension: '-118.3651,14.5321,-86.7104,32.7187',
    }"
  >
    <SisdaiCapaXyz
      url="https://{a-c}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
      :acercamientoMaximo="20"
      :acercamientoMinimo="0"
      :atribuciones="atribuciones"
    />
  </SisdaiMapa>
</template>
