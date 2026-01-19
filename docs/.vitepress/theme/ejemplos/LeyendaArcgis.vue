<template>
  <SisdaiSelector
    class="m-t-3"
    etiqueta="Leyenda de la capa ArcGIS"
    v-model="seleccion"
  >
    <option
      v-for="servicio in listaCatalogo"
      :key="servicio"
      :value="servicio"
    >
      {{ servicio }}
    </option>
  </SisdaiSelector>

  <SisdaiLeyendaArcgis
    :capa="getCapa()"
    :fuente="getFuenteUrl()"
  />
</template>

<script setup>
import { ref } from 'vue'

const catalogo = {
  Hurricanes: ['Huracanes del Atlántico 2000', 'Trayectoria de huracanes'],
  Census: [
    'Puntos de bloques censales',
    'Grupo de bloques censales',
    'Condados detallados',
    'Estados',
  ],
}
const listaCatalogo = Object.values(catalogo).flat()
const seleccion = ref('Puntos de bloques censales')
function getFuente() {
  return Object.keys(catalogo).find(servicio =>
    catalogo[servicio].includes(seleccion.value)
  )
}
function getFuenteUrl() {
  return `https://sampleserver6.arcgisonline.com/arcgis/rest/services/${getFuente()}/MapServer`
}
function getCapa() {
  return String(catalogo[getFuente()].indexOf(seleccion.value))
}
</script>
