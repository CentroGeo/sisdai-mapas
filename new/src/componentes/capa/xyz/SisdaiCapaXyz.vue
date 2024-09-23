<script setup>
import { inject, toRefs, watch } from 'vue'
import OSM from 'ol/source/OSM'
import ImageTile from 'ol/source/ImageTile'
import TileLayer from 'ol/layer/Tile'
import propsCapa from './../props'

const mapa = inject('mapa')
const props = defineProps({
  /**
   * Url remota de la capa.
   *
   * - Tipo: `String`
   * - Valor por defecto: `undefined`
   * - Reactivo: ❌
   */
  url: {
    type: String,
    default: 'https://{a-c}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'
  },

  ...propsCapa
})
const { url } = toRefs(props)

const xyz = new TileLayer({
  // source: new OSM()
  source: new ImageTile({
    url: url.value
  })
})

watch(mapa, (nv) => {
  nv.addLayer(xyz)

  // console.log(nv.getAllLayers().length)
})
</script>

<template>
  <span :sisdai-capa="id" />
</template>
