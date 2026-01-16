<script setup>
import { ref, toRefs } from 'vue'
import LeyendaControl from './../control'
import _props from './props'

const props = defineProps(_props)
const { capa, fuente } = toRefs(props)
const titulo = ref(undefined)

function actualizarClasesDesdeArcgis([capa, fuente]) {
  fetch(`${fuente}/legend?f=pjson`)
    .then(response => response.json())
    .then(({ layers }) => {
      const data = layers.find(layer => layer.layerId.toString() === capa)
      titulo.value = data?.layerName

      data.legend.forEach(element => {
        console.log(element)
      })
    })
}
actualizarClasesDesdeArcgis([capa.value, fuente.value])
</script>

<template>
  <div class="sisdai-mapa-leyenda">
    <div class="leyenda-titulo">
      <LeyendaControl :etiqueta="titulo" />
    </div>
  </div>
</template>
