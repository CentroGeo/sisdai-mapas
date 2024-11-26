<script setup>
import { inject, toRefs, watch } from 'vue'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import TopoJSON from 'ol/format/TopoJSON'
import VectorLayer from 'ol/layer/Vector'
import VectorEventType from 'ol/source/VectorEventType'
import { MAPA_INYECTADO } from './../../../utiles/identificadores'
import _props from './props'
import eventos from './../eventos'
import { TipoEstadoCarga } from './../../../utiles/MonitoreoCargaElementos'
import obtenerRepresentacion from './representacion'
import { esObjeto } from '../../../utiles'

const mapa = inject(MAPA_INYECTADO)
const emits = defineEmits(Object.values(eventos))
const props = defineProps(_props)
mapa.capas[props.id] = TipoEstadoCarga.no
const { estilo, fuente, representacion } = toRefs(props)

const dicFormato = {
  geojson: new GeoJSON(),
  topojson: new TopoJSON(),
}

const source = new VectorSource({
  format: dicFormato[props.formato],
  // format: new TopoJSON(),
})

if (typeof fuente.value === typeof String()) {
  source.setUrl(fuente.value)
} else if (esObjeto(fuente.value)) {
  emits(eventos.alIniciarCarga)
  mapa.capas[props.id] = TipoEstadoCarga.inicio
  source.addFeatures(new GeoJSON().readFeatures(fuente.value))
  emits(eventos.alFinalizarCarga, true)
  mapa.capas[props.id] = TipoEstadoCarga.fin
}

source.on(VectorEventType.FEATURESLOADSTART, () => {
  if (typeof fuente.value === typeof String()) {
    emits(eventos.alIniciarCarga)
    mapa.capas[props.id] = TipoEstadoCarga.inicio
  }
  // _ver(VectorEventType.FEATURESLOADSTART)
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

watch(estilo, nv => layer.setStyle(nv))
// watch(fuente, nv => layer.setSource(nv))
// watch(visualizacion, (nv) => layer.setSource())
watch([representacion, fuente], ([vis, fue]) =>
  layer.setSource(obtenerRepresentacion(vis, fue))
)

// function _ver(params) {
//   if (props.ver) {
//     console.log(props.id, params)
//   }
// }
</script>

<template>
  <span :sisdai-capa="props.id" />
</template>
