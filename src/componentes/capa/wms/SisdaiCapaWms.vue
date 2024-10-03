<script setup>
import { inject, toRefs, watch } from 'vue'
import ImageWMS from 'ol/source/ImageWMS.js'
import { Image as ImageLayer } from 'ol/layer.js'
import { ImageSourceEventType } from 'ol/source/Image'
import _props from './props'
import eventos from './../eventos'
import { TipoEstadoCarga } from './../../../utiles/MonitoreoCargaElementos'
import { MAPA_INYECTADO } from './../../../utiles/identificadores'

const mapa = inject(MAPA_INYECTADO)
const emits = defineEmits(Object.values(eventos))
const props = defineProps(_props)
const { estilo, filtro } = toRefs(props)

const source = new ImageWMS({
  url: props.url,
  params: { LAYERS: props.capa, STYLES: estilo.value, CQL_FILTER: filtro.value },
  ratio: 1,
  serverType: props.tipoServidor
})

const layer = new ImageLayer({ source, id: props.id })
mapa.addLayer(layer)
mapa.capas[props.id] = TipoEstadoCarga.no

source.on(ImageSourceEventType.IMAGELOADSTART, () => {
  emits(eventos.alIniciarCarga)
  mapa.capas[props.id] = TipoEstadoCarga.inicio
})
source.on(ImageSourceEventType.IMAGELOADEND, () => {
  emits(eventos.alFinalizarCarga, true)
  mapa.capas[props.id] = TipoEstadoCarga.fin
})
source.on(ImageSourceEventType.IMAGELOADERROR, () => {
  emits(eventos.alFinalizarCarga, false)
  mapa.capas[props.id] = TipoEstadoCarga.error
})

watch(estilo, (STYLES) => source.updateParams({ STYLES }))
watch(filtro, (CQL_FILTER) => source.updateParams({ CQL_FILTER }))
</script>

<template>
  <span :sisdai-capa="props.id" />
</template>
