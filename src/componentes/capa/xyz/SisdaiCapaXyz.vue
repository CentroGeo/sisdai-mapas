<script setup>
import { inject, reactive, toRefs, watch } from 'vue'

import TileLayer from 'ol/layer/Tile'
// import { getRenderPixel } from 'ol/render'
import ImageTile from 'ol/source/ImageTile'
import TileEventType from 'ol/source/TileEventType'

import { MAPA_INYECTADO } from './../../../utiles/identificadores'
import MonitoreoCargaElementos, {
  TipoEstadoCarga,
} from './../../../utiles/MonitoreoCargaElementos'
import useCapa from './../useCapa'
import eventos from './eventos'
import _props from './props'

const mapa = inject(MAPA_INYECTADO)
const emits = defineEmits(Object.values(eventos))
const props = defineProps(_props)
const { fuente, titulo } = toRefs(props)

const source = new ImageTile({ url: fuente.value, crossOrigin: 'anonymous' })

const capa = new TileLayer({ id: props.id, source, titulo: titulo.value })
useCapa(capa, props)

// // mapa.capas = { ...mapa.capas, [props.id]: TipoEstadoCarga.no }
// mapa.capas[props.id] = TipoEstadoCarga.no

const monitoreoCargaTeselas = reactive(new MonitoreoCargaElementos())
function emitirEventosCargaTotal(estado) {
  if (estado === TipoEstadoCarga.inicio) {
    emits(eventos.alIniciarCarga)
    mapa.capas[props.id] = TipoEstadoCarga.inicio
  } else {
    emits(eventos.alFinalizarCarga, Boolean(estado === TipoEstadoCarga.fin))
    mapa.capas[props.id] = TipoEstadoCarga.fin
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
</script>

<template>
  <span :sisdai-capa="props.id" />
</template>
