<script setup>
import { inject, toRaw, watch } from 'vue'
import OSM from 'ol/source/OSM.js'
import TileLayer from 'ol/layer/Tile.js'

const mapa = inject('mapa')

const xyz = new TileLayer({
  source: new OSM()
})

watch(mapa, (nv) => {
  nv.addLayer(xyz)

  console.log(nv.getAllLayers().length)
})
</script>

<template>
  <div>sisdai-capa-xyz</div>
</template>
