<script setup>
import { inject, toRaw, watch } from 'vue'
import OSM from 'ol/source/OSM.js'
import TileLayer from 'ol/layer/Tile.js'
import _props from './../props'

const mapa = inject('mapa')
const props = defineProps(_props)

console.log(props.id)

const xyz = new TileLayer({
  source: new OSM()
})

watch(mapa, (nv) => {
  nv.addLayer(xyz)

  console.log(nv.getAllLayers().length)
})
</script>

<template>
  <span :sisdai-capa="id" />
</template>
