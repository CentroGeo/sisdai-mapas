<script setup>
import { inject } from 'vue'
import _props from './../props'
import ImageWMS from 'ol/source/ImageWMS.js'
import { Image as ImageLayer } from 'ol/layer.js'
import { ImageSourceEventType } from 'ol/source/Image'
import { TipoEstadoCarga } from './../../../utiles/MonitoreoCargaElementos'

const mapa = inject('mapa')
const props = defineProps(_props)

const source = new ImageWMS({
  url: 'https://ahocevar.com/geoserver/wms',
  params: { LAYERS: 'topp:states' },
  ratio: 1,
  serverType: 'geoserver'
})

const layer = new ImageLayer({ source, id: props.id })
mapa.addLayer(layer)
mapa.capas[props.id] = TipoEstadoCarga.no

source.on(ImageSourceEventType.IMAGELOADSTART, () => {
  mapa.capas[props.id] = TipoEstadoCarga.inicio
  console.log(ImageSourceEventType.IMAGELOADSTART)
})
source.on(ImageSourceEventType.IMAGELOADEND, () => {
  mapa.capas[props.id] = TipoEstadoCarga.fin
  console.log(ImageSourceEventType.IMAGELOADEND)
})
source.on(ImageSourceEventType.IMAGELOADERROR, () => {
  mapa.capas[props.id] = TipoEstadoCarga.error
  console.log(ImageSourceEventType.IMAGELOADERROR)
})
</script>

<template>
  <span :sisdai-capa="id" />
</template>
