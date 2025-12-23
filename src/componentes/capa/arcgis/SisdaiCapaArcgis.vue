<script setup>
import ImageLayer from 'ol/layer/Image'
import TileLayer from 'ol/layer/Tile'
import ImageArcGISRest from 'ol/source/ImageArcGISRest'
import TileArcGISRest from 'ol/source/TileArcGISRest'

import useCapa from './../useCapa'
import _props from './props'

const props = defineProps(_props)

const Layer = props.mosaicos ? TileLayer : ImageLayer
const Source = props.mosaicos ? TileArcGISRest : ImageArcGISRest
const capa = new Layer({
  source: new Source({
    ratio: 1,
    params: { LAYERS: `show:${props.capa}` },
    url: props.fuente,
  }),
})

useCapa(capa, props)
</script>

<template>
  <span :sisdai-capa="props.id" />
</template>
