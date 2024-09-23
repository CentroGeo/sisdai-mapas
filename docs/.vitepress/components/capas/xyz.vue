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
    elementosDescriptivos="titulo-mapa"
  >
    <template #panel-encabezado-vis>
      <p
        id="titulo-mapa"
        class="vis-titulo-visualizacion"
      >
        Ejemplo simple de una capa xyz
      </p>
    </template>

    <SisdaiCapaXyz
      :acercamientoMaximo="20"
      :acercamientoMinimo="0"
      :atribuciones="atribuciones"
      id="capa_xyz"
      url="https://{a-c}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
    />
  </SisdaiMapa>
</template>
