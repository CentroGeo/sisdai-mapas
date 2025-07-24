<script setup>
import { inject, ref } from 'vue'

import MapBrowserEventType from 'ol/MapBrowserEventType'
// import EventType from 'ol/events/EventType'
// import PointerEventType from 'ol/pointer/EventType'

import { MAPA_INYECTADO } from './../../../../utiles/identificadores'

const mapa = inject(MAPA_INYECTADO)
const visible = ref(false)
const coordenadas = ref()
mapa.on(MapBrowserEventType.SINGLECLICK, alClick)
function alClick({ dragging, originalEvent /*, map */ }) {
  if (dragging || originalEvent.target.closest('.sisdai-mapa-control')) {
    // console.log('Aquí no')
    return
  }

  const pixel = mapa.getEventPixel(originalEvent)

  visible.value = true

  coordenadas.value = mapa.getCoordinateFromPixel(pixel)
  // console.log(mapa.getPixelFromCoordinate(coordenadas))
}

// mapa.on(PointerEventType.POINTERMOVE, () => {
// mapa.getView().on(EventType.CHANGE, () => { // funciona
mapa.on(MapBrowserEventType.POINTERDRAG, () => { // funciona con el mause
  // console.log('moviendo')

  if (coordenadas.value === undefined) {
    return
  }

  // console.log(mapa.getPixelFromCoordinate(coordenadas.value))
})

function cerrarCuadro() {
  coordenadas.value = undefined
  visible.value = false
}

const cargando = '<span class="pictograma-reloj pictograma-grande" />'
</script>

<template>
  <div
    aria-hidden="true"
    aria-live="assertive"
    class="ol-unselectable globo-informacion cuadro-informacion-capa"
    :class="{ oculto: !visible }"
    ref="sisdaiCuadroInfo"
    role="tooltip"
  >
    <div
      class="globo-informacion-cuerpo"
      v-html="cargando"
    />
    <button
      aria-label="Cerrar"
      class="globo-informacion-cerrar"
      type="button"
      @click="cerrarCuadro"
    >
      <span class="pictograma-cerrar" aria-hidden="true" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.sisdai-mapa.contenedor-vis .contenido-vis .cuadro-informacion-capa {
}
</style>
