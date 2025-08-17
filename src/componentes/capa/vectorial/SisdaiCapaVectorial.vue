<script setup>
import { inject, onMounted, onUnmounted, toRefs, watch } from 'vue'

import GeoJSON from 'ol/format/GeoJSON'
import TopoJSON from 'ol/format/TopoJSON'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import VectorEventType from 'ol/source/VectorEventType'

import { esObjeto } from '../../../utiles'
import { MAPA_INYECTADO } from './../../../utiles/identificadores'
import eventos from './../eventos'
import tratarEstilo from './Estilo'
import _props from './props'
import obtenerRepresentacion from './representacion'

const mapa = inject(MAPA_INYECTADO)
const emits = defineEmits(Object.values(eventos))
const props = defineProps({ ..._props, ver: { default: false } })
// mapa.capas[props.id] = TipoEstadoCarga.no
const {
  estilo,
  fuente,
  globoInformativo,
  opacidad,
  posicion,
  representacion,
  titulo,
  visible,
} = toRefs(props)

const dicFormato = { geojson: new GeoJSON(), topojson: new TopoJSON() }

const source = new VectorSource({ format: dicFormato[props.formato] })

if (typeof fuente.value === typeof String()) {
  source.setUrl(fuente.value)
} else if (esObjeto(fuente.value)) {
  emits(eventos.alIniciarCarga)
  // mapa.capas[props.id] = TipoEstadoCarga.inicio
  source.addFeatures(new GeoJSON().readFeatures(fuente.value))
  emits(eventos.alFinalizarCarga, true)
  // mapa.capas[props.id] = TipoEstadoCarga.fin
}

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
  id: props.id,
  opacity: opacidad.value,
  source: obtenerRepresentacion(representacion.value, source),
  style: tratarEstilo(props.estilo),
  tipo: 'vectorial',
  titulo: titulo.value,
  visible: visible.value,
  zIndex: posicion.value,
})
// mapa.addLayer(layer)

watch(estilo, nv => capa.setStyle(tratarEstilo(nv)))
// watch(fuente, nv => layer.setSource(nv))
watch(opacidad, nuevaOpacidad => capa.setOpacity(nuevaOpacidad))
watch(posicion, nuevaPosicion => capa.setZIndex(nuevaPosicion))
watch([representacion, fuente], ([vis, fue]) =>
  capa.setSource(obtenerRepresentacion(vis, fue))
)
watch(visible, nuevaVisibilidad => capa.setVisible(nuevaVisibilidad))

onMounted(() => mapa.addLayer(capa))
onUnmounted(() => mapa.quitarCapa(props.id))

// function _ver(params) {
//   if (props.ver) {
//     console.log(props.id, params)
//   }
// }
</script>

<template>
  <span :sisdai-capa="props.id" />
</template>
