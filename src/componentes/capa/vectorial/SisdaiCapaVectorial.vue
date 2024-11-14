<script setup>
import { inject, toRefs, watch } from 'vue'
import VectorSource from 'ol/source/Vector.js'
import GeoJSON from 'ol/format/GeoJSON.js'
import VectorLayer from 'ol/layer/Vector.js'
import VectorEventType from 'ol/source/VectorEventType'
import { MAPA_INYECTADO } from './../../../utiles/identificadores'
import _props from './props'
import eventos from './../eventos'
import { TipoEstadoCarga } from './../../../utiles/MonitoreoCargaElementos'
import obtenerRepresentacion from './representacion'

const mapa = inject(MAPA_INYECTADO)
const emits = defineEmits(Object.values(eventos))
const props = defineProps(_props)
const { estilo, fuente, representacion } = toRefs(props)

const source = new VectorSource({
  url: fuente.value,
  format: new GeoJSON(),
})

source.on(VectorEventType.FEATURESLOADSTART, () => {
  emits(eventos.alIniciarCarga)
  mapa.capas[props.id] = TipoEstadoCarga.inicio
})
source.on(VectorEventType.FEATURESLOADEND, () => {
  emits(eventos.alFinalizarCarga, true)
  mapa.capas[props.id] = TipoEstadoCarga.fin
})
source.on(VectorEventType.FEATURESLOADERROR, () => {
  emits(eventos.alFinalizarCarga, false)
  mapa.capas[props.id] = TipoEstadoCarga.error
})

const layer = new VectorLayer({
  source: obtenerRepresentacion(representacion.value, source),
  id: props.id,
  style: estilo.value,
})
mapa.addLayer(layer)
mapa.capas[props.id] = TipoEstadoCarga.no

watch(estilo, nv => layer.setStyle(nv))
// watch(fuente, nv => layer.setSource(nv))
// watch(visualizacion, (nv) => layer.setSource())
watch([representacion, fuente], ([vis, fue]) =>
  layer.setSource(obtenerRepresentacion(vis, fue))
)
</script>

<template>
  <span :sisdai-capa="props.id" />
</template>
