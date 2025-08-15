<script setup>
import { inject, onMounted, onUnmounted, reactive, ref } from 'vue'

import MapBrowserEventType from 'ol/MapBrowserEventType'
import EventType from 'ol/events/EventType'

import { MAPA_INYECTADO } from './../../../../utiles/identificadores'

// const sisdaiCuadroInfo = ref()

const mapa = inject(MAPA_INYECTADO)
const posicion = reactive(new PosicionCss())
const coordenadas = ref()
const contenidoCuadro = ref('')
const visible = ref(false)

/**
 *
 * @param param
 */
function alClick({ coordinate, dragging, originalEvent, map }) {
  if (dragging || originalEvent.target.closest('.sisdai-mapa-control')) return

  const wmsConCuadro = mapa.capasWMS
    .filter(capa => capa.get('cuadroInfo'))
    .slice(-1)[0]
  if (wmsConCuadro === undefined) return

  contenidoCuadro.value =
    '<span class="pictograma-reloj pictograma-grande p-0" />'

  const pixel = mapa.getEventPixel(originalEvent)
  posicion.xy = pixel
  coordenadas.value = coordinate
  visible.value = true

  const { params, contenido } = wmsConCuadro.get('cuadroInfo')
  const url = wmsConCuadro
    .getSource()
    .getFeatureInfoUrl(
      coordinate,
      map.getView().getResolution(),
      map.getView().getProjection().getCode(),
      { FEATURE_COUNT: 1, INFO_FORMAT: 'application/json', ...params }
    )

  // console.log(url);

  if (url) {
    fetch(url)
      .then(response => response.json())
      .then(({ features }) => {
        // console.log(features[0]?.properties);
        // const { properties } = features[0]
        if (features[0]?.properties) {
          contenidoCuadro.value = contenido(features[0]?.properties)
        } else {
          contenidoCuadro.value =
            'No hay información disponible para esta ubicación'
        }
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        //console.log("fin");
      })
  }
}

/**
 *
 */
function actualizarPixel() {
  if (coordenadas.value === undefined) return

  posicion.xy = mapa.getPixelFromCoordinate(coordenadas.value)
}

onMounted(() => {
  mapa.on(MapBrowserEventType.SINGLECLICK, alClick)
  mapa.on(MapBrowserEventType.POINTERDRAG, actualizarPixel) // funciona solo con el mause
  mapa.getView().on(EventType.CHANGE, actualizarPixel) // funciona con delay
})
onUnmounted(() => {
  mapa.un(MapBrowserEventType.SINGLECLICK, alClick)
  mapa.un(MapBrowserEventType.POINTERDRAG, actualizarPixel) // funciona solo con el mause
  mapa.getView().un(EventType.CHANGE, actualizarPixel) // funciona con delay
})

/**
 *
 */
function cerrarCuadro() {
  coordenadas.value = undefined
  visible.value = false
}
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
      v-html="contenidoCuadro"
    />
    <button
      aria-label="Cerrar"
      class="globo-informacion-cerrar"
      type="button"
      @click="cerrarCuadro"
    >
      <span
        class="pictograma-cerrar"
        aria-hidden="true"
      />
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
