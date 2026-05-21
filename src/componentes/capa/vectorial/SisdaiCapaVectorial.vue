<script setup>
import { toRefs, watch } from 'vue'

import GeoJSON from 'ol/format/GeoJSON'
import TopoJSON from 'ol/format/TopoJSON'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import VectorEventType from 'ol/source/VectorEventType'

import { esObjeto } from '../../../utiles'
import eventos from './../eventos'
import useCapa from './../useCapa'
import tratarEstilo from './Estilo'
import _props from './props'
import obtenerRepresentacion from './representacion'

const emits = defineEmits(Object.values(eventos))
const props = defineProps({ ..._props, ver: { default: false } })
// mapa.capas[props.id] = TipoEstadoCarga.no
const { estilo, fuente, globoInformativo, representacion } = toRefs(props)

const dicFormato = { geojson: new GeoJSON(), topojson: new TopoJSON() }

const source = new VectorSource({ format: dicFormato[props.formato] })

function agregaFuente(_fuente) {
  if (typeof _fuente === typeof String()) {
    source.setUrl(_fuente)
  } else if (esObjeto(_fuente)) {
    emits(eventos.alIniciarCarga)
    // mapa.capas[props.id] = TipoEstadoCarga.inicio
    source.clear()
    source.addFeatures(new GeoJSON().readFeatures(_fuente))
    emits(eventos.alFinalizarCarga, true)
    // mapa.capas[props.id] = TipoEstadoCarga.fin
  }
}
agregaFuente(fuente.value)

source.on(VectorEventType.FEATURESLOADSTART, () => {
  if (typeof fuente.value === typeof String()) {
    emits(eventos.alIniciarCarga)
    // mapa.capas[props.id] = TipoEstadoCarga.inicio
  }
})
source.on(VectorEventType.FEATURESLOADEND, () => {
  emits(eventos.alFinalizarCarga, true)
  // mapa.capas[props.id] = TipoEstadoCarga.fin
})
source.on(VectorEventType.FEATURESLOADERROR, () => {
  emits(eventos.alFinalizarCarga, false)
  // mapa.capas[props.id] = TipoEstadoCarga.error
})

const capa = new VectorLayer({
  globoInfo: globoInformativo.value,
  source: obtenerRepresentacion(representacion.value, source),
  style: tratarEstilo(props.estilo),
  tipo: 'vectorial',
})
useCapa(capa, props)

watch(estilo, nv => capa.setStyle(tratarEstilo(nv)))
watch(fuente, agregaFuente, { deep: true })
// watch([representacion, fuente], ([vis, fue]) =>
//   capa.setSource(obtenerRepresentacion(vis, fue))
// )

// function _ver(params) {
//   if (props.ver) {
//     console.log(props.id, params)
//   }
// }
</script>

<template>
  <span :sisdai-capa="props.id" />
</template>
