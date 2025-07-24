<script setup>
import { inject, reactive, ref } from 'vue'

import MapBrowserEventType from 'ol/MapBrowserEventType'
import EventType from 'ol/events/EventType'

import { MAPA_INYECTADO } from './../../../../utiles/identificadores'
import { esPromesa } from '../../../../utiles'

// const sisdaiCuadroInfo = ref()

const mapa = inject(MAPA_INYECTADO)
const posicion = reactive(new PosicionCss())
const coordenadas = ref()
const contenido = ref('')
const visible = ref(false)

/**
 *
 * @param param
 */
function alClick({ coordinate, dragging, originalEvent, map }) {
  if (dragging || originalEvent.target.closest('.sisdai-mapa-control')) return

  const wmsConCuadro = mapa.capasWMS.filter(capa => capa.get('cuadroInfo')).slice(-1)[0]
  if (wmsConCuadro === undefined) return

  const pixel = mapa.getEventPixel(originalEvent)
  posicion.xy = pixel
  coordenadas.value = coordinate
  visible.value = true

  const cuadroInfo = wmsConCuadro.get('cuadroInfo')
  if (typeof cuadroInfo === typeof Function) {
    const r = cuadroInfo(wmsConCuadro.getSource(), coordinate, map.getView())

    if (esPromesa(r)) {
      // console.log(r)
    }

    contenido.value = '<span class="pictograma-reloj pictograma-grande p-0" />'
  } else {
    contenido.value = cuadroInfo
  }
}
mapa.on(MapBrowserEventType.SINGLECLICK, alClick)

/**
 *
 */
function actualizarPixel() {
  if (coordenadas.value === undefined) return

  posicion.xy = mapa.getPixelFromCoordinate(coordenadas.value)
}
mapa.on(MapBrowserEventType.POINTERDRAG, actualizarPixel) // funciona solo con el mause
mapa.getView().on(EventType.CHANGE, actualizarPixel) // funciona con delay

/**
 *
 */
function cerrarCuadro() {
  coordenadas.value = undefined
  visible.value = false
}

// const cargando = '<span class="pictograma-reloj pictograma-grande p-0" />'
</script>

<template>
  <div
    aria-hidden="true"
    aria-live="assertive"
    class="ol-unselectable globo-informacion cuadro-informacion-capa"
    :class="{ oculto: !visible }"
    ref="sisdaiCuadroInfo"
    role="tooltip"
    :style="posicion?.leftTop"
  >
    <div
      class="globo-informacion-cuerpo"
      v-html="contenido"
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

<script>
class PosicionCss {
  constructor(xy = [0, 0]) {
    this.xy = xy
  }

  /**
   * @param {Array<Number>} xy
   */
  set xy([x, y]) {
    this.x_ = x
    this.y_ = y
  }

  get left() {
    return `${this.x_}px`
  }

  get top() {
    return `${this.y_}px`
  }

  get leftTop() {
    return { left: this.left, top: this.top }
  }
}
</script>

<style lang="scss" scoped>
.sisdai-mapa.contenedor-vis .contenido-vis .cuadro-informacion-capa {
  position: absolute;
}
</style>
