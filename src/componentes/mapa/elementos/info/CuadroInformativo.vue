<script setup>
import MapBrowserEventType from 'ol/MapBrowserEventType'
import EventType from 'ol/events/EventType'
import { inject, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { MAPA_INYECTADO } from './../../../../utiles/identificadores'

const mapa = inject(MAPA_INYECTADO)
const posicion = reactive(new PosicionCss())
const coordenadas = ref()
const contenidosCuadro = ref([])
const contenidoCuadro = ref('')
const visible = ref(false)

function getUrlWms(capa, coordinate, map) {
  return capa
    .getSource()
    .getFeatureInfoUrl(
      coordinate,
      map.getView().getResolution(),
      map.getView().getProjection().getCode(),
      {
        FEATURE_COUNT: 1,
        INFO_FORMAT: 'application/json',
        propertyName: capa.get('propiedades'),
      }
    )
}

/**
 * Se ejecuta cuado se hace click en el mapa
 * @param param
 */
function alClick({ coordinate, dragging, originalEvent, map }) {
  if (dragging || originalEvent.target.closest('.sisdai-mapa-control')) return

  // TODO: debe regresar una lista de las capas con cuadro de información
  const cuadros = mapa.capasWMS.filter(
    capa => capa.get('cuadroInfo') !== undefined
  )
  // const contenidos = ref([])
  contenidosCuadro.value = []
  cuadros.forEach(capa => {
    const cuadro = capa.get('cuadroInfo')

    if (typeof cuadro === typeof Promise) {
      // console.log('se detectó una promesa')
      const url = getUrlWms(capa, coordinate, map)
      // console.log(url)

      cuadro(url).then(contenido => {
        // console.log(contenido)
        contenidosCuadro.value.push({
          zIndex: Number(capa.get('zIndex')),
          contenido,
        })
      })
    } else {
      contenidosCuadro.value.push({
        zIndex: Number(capa.get('zIndex')),
        contenido: cuadro,
      })
    }
  })

  posicion.xy = mapa.getEventPixel(originalEvent)
  coordenadas.value = coordinate
  visible.value = Boolean(cuadros.length > 0)
}

watch(
  () =>
    contenidosCuadro.value
      .sort((a, b) => {
        if (a.zIndex < b.zIndex) return 1
        if (a.zIndex > b.zIndex) return -1
        return 0
      })
      .map(({ contenido }) => contenido)
      .join(`<hr />`),
  nv => (contenidoCuadro.value = nv)
)

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
