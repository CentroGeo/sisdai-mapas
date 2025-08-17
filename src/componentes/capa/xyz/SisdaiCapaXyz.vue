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

// { type, target, inversePixelTransform, frameState, context }
// capa.on('prerender', event => {
//   const tamanioMapa = mapa.getSize()
//   const nuevoAnchoCapa = tamanioMapa[0] * (Number(mapa.dividir) / 100)
//   const tl = getRenderPixel(event, [nuevoAnchoCapa, 0])
//   const tr = getRenderPixel(event, [tamanioMapa[0], 0])
//   const bl = getRenderPixel(event, [nuevoAnchoCapa, tamanioMapa[1]])
//   const br = getRenderPixel(event, tamanioMapa)
//   // console.log(event.type, tamanioMapa, tl, tr, bl, br)
//   const { context } = event

//   context.save()
//   context.beginPath()
//   context.moveTo(tl[0], tl[1])
//   context.lineTo(bl[0], bl[1])
//   context.lineTo(br[0], br[1])
//   context.lineTo(tr[0], tr[1])
//   context.closePath()
//   context.clip()
// })
// capa.on('postrender', ({ context }) => {
//   // console.log(type)

//   context.restore()
// })
</script>

<template>
  <span :sisdai-capa="props.id" />
</template>
