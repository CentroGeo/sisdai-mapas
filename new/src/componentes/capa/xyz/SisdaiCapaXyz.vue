<script setup>
import { inject, toRefs, watch, reactive, onUnmounted } from 'vue'
import ImageTile from 'ol/source/ImageTile'
import TileLayer from 'ol/layer/Tile'
import _props from './props'
import TileEventType from 'ol/source/TileEventType'
import MonitoreoCargaElementos, { TipoEstadoCarga } from './../../../utiles/MonitoreoCargaElementos'
import eventos from './eventos'

const mapa = inject('mapa')
const emits = defineEmits(Object.values(eventos))
const props = defineProps(_props)
const { url } = toRefs(props)

const source = new ImageTile({
  url: url.value,
  crossOrigin: 'anonymous'
})

const monitoreoCargaTeselas = reactive(new MonitoreoCargaElementos())
function emitirEventosCargaTotal(estado) {
  if (estado === TipoEstadoCarga.inicio) {
    emits(eventos.alIniciarCarga)
  } else {
    emits(eventos.alFinalizarCarga, Boolean(estado === TipoEstadoCarga.fin))
  }
}
watch(() => monitoreoCargaTeselas.estdo, emitirEventosCargaTotal)

source.on(TileEventType.TILELOADSTART, () => {
  emits(eventos.alIniciarCargaTesela)
  monitoreoCargaTeselas.inicio++
})
source.on(TileEventType.TILELOADEND, () => {
  emits(eventos.alFinalizarCargaTesela, true)
  monitoreoCargaTeselas.fin++
})
source.on(TileEventType.TILELOADERROR, () => {
  emits(eventos.alFinalizarCargaTesela, false)
  monitoreoCargaTeselas.error++
})

watch(mapa, (nv) => {
  nv.addLayer(new TileLayer({ source }))
})
</script>

<template>
  <span :sisdai-capa="id" />
</template>
