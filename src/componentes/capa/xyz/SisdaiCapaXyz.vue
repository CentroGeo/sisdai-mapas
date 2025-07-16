<script setup>
import { inject, toRefs, watch, reactive } from 'vue'

import ImageTile from 'ol/source/ImageTile'
import TileLayer from 'ol/layer/Tile'
import TileEventType from 'ol/source/TileEventType'

import { MAPA_INYECTADO } from './../../../utiles/identificadores'
import eventos from './eventos'
import _props from './props'
import MonitoreoCargaElementos, {
  TipoEstadoCarga,
} from './../../../utiles/MonitoreoCargaElementos'

const mapa = inject(MAPA_INYECTADO)
const emits = defineEmits(Object.values(eventos))
const props = defineProps(_props)
const { titulo, fuente } = toRefs(props)

const source = new ImageTile({
  url: fuente.value,
  crossOrigin: 'anonymous',
})

const layer = new TileLayer({ id: props.id, source, titulo: titulo.value })
mapa.addLayer(layer)
// // mapa.capas = { ...mapa.capas, [props.id]: TipoEstadoCarga.no }
// mapa.capas[props.id] = TipoEstadoCarga.no

// const monitoreoCargaTeselas = reactive(new MonitoreoCargaElementos())
// function emitirEventosCargaTotal(estado) {
//   if (estado === TipoEstadoCarga.inicio) {
//     emits(eventos.alIniciarCarga)
//     mapa.capas[props.id] = TipoEstadoCarga.inicio
//   } else {
//     emits(eventos.alFinalizarCarga, Boolean(estado === TipoEstadoCarga.fin))
//     mapa.capas[props.id] = TipoEstadoCarga.fin
//   }
// }
// watch(() => monitoreoCargaTeselas.estdo, emitirEventosCargaTotal)

// source.on(TileEventType.TILELOADSTART, () => {
//   emits(eventos.alIniciarCargaTesela)
//   monitoreoCargaTeselas.inicio++
// })
// source.on(TileEventType.TILELOADEND, () => {
//   emits(eventos.alFinalizarCargaTesela, true)
//   monitoreoCargaTeselas.fin++
// })
// source.on(TileEventType.TILELOADERROR, () => {
//   emits(eventos.alFinalizarCargaTesela, false)
//   monitoreoCargaTeselas.error++
// })
</script>

<template>
  <span :sisdai-capa="props.id" />
</template>
