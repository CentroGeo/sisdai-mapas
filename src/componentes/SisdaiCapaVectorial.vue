<script setup>
import GeoJSON from 'ol/format/GeoJSON.js'
import VectorLayer from 'ol/layer/Vector'
import VectorImageLayer from 'ol/layer/VectorImage'
import VectorSource from 'ol/source/Vector'
import VectorEventType from 'ol/source/VectorEventType'
import { computed, onMounted, shallowRef, toRefs, watch } from 'vue'
import usarCapa, { props as propsCapa } from './../composables/usarCapa'
import eventos from './../eventos/capa'
import { traducirEstilo } from './../utiles/estiloVectores'
import { estiloVector } from './../valores/capa'

const props = defineProps({
  // datos: {
  //   type: Object,
  //   default: undefined,
  // },

  /**
   * REFACTORIZAR
   * El estilo simple es aquel que es constante para la capa, por ejemplo, independientemente de los datos que tenga un poligono o punto en el sigueinte mapa siempre tendra el mismo color y contorno de su simbologia.
   */
  estilo: {
    type: Object,
    default: () => estiloVector,
  },

  /**
   * Define el formato de los datos fuente, los valores admitidos son: 'geojson' y 'topojson'.
   *
   * - Tipo: `String`
   * - Valor por defecto: `'geojson'`.
   * - Reactivo: ❌
   */
  formato: {
    type: String,
    default: 'geojson',
  },

  /**
   * Origen de la capa. Puede ser una url externa o relativa a las carpetas del proyecto, e
   * incluso un objeto en formato geojson o topojson con coordenadas y atributos.
   *
   * - Tipo: `String` o `Object`
   * - Valor obligatorio.
   * - Reactivo: ✅
   */
  fuente: {
    type: [String, Object],
    required: true,
  },

  /**
   * Contenido del globo de información que aparecerá al pasar el cursor sobre la capa.
   * Puede ser una funcion que accede a las propiedades del elemento al que se sobrepone o un texto estatico.
   *
   * - Tipo: `String` o `Function`
   * - Valor por defecto: `undefined`.
   * - Reactivo: ✅
   */
  globoInformativo: {
    type: [String, Function],
    default: undefined,
  },

  /**
   * Punto: Point y MultiPoint
   * Linea: LineString y MultiLineString
   * Poligono: Polygon y MultiPolygon
   */
  geometria: {
    type: String,
    default: undefined,
    // 'LinearRing', 'GeometryCollection', 'Circle'
  },

  /**
   *
   */
  nombreAccesiblePorElemento: {
    type: String,
    default: undefined,
  },

  /**
   * ???
   *
   * - Tipo: `Boolean`
   * - Valor por defecto: `false`.
   * - Reactivo: ❌
   */
  renderizarComoImagen: {
    type: Boolean,
    default: true,
  },

  ...propsCapa,
})

const sisdaiCapaVectorial = shallowRef()
const {
  estilo,
  fuente,
  globoInformativo,
  geometria,
  nombreAccesiblePorElemento,
} = toRefs(props)
const emits = defineEmits(Object.values(eventos))

const { configurar, agregada } = usarCapa(sisdaiCapaVectorial, props)

configurar(() => {
  const opcionesSource = {}

  if (typeof fuente.value === typeof String()) {
    opcionesSource.url = fuente.value
    opcionesSource.format = new GeoJSON()
  } else {
    opcionesSource.features = new GeoJSON().readFeatures(fuente.value)
  }

  const olSource = new VectorSource(opcionesSource)

  olSource.on(VectorEventType.FEATURESLOADSTART, () => {
    emits(eventos.alIniciarCarga)
  })
  olSource.on(VectorEventType.FEATURESLOADERROR, () => {
    emits(eventos.alFinalizarCarga, false)
  })
  olSource.on(VectorEventType.FEATURESLOADEND, () => {
    emits(eventos.alFinalizarCarga, true)
  })

  return {
    olSource,
    olLayerClass: props.renderizarComoImagen ? VectorImageLayer : VectorLayer,
  }
})

const estiloConbinado = computed(() =>
  traducirEstilo({ ...estiloVector, ...estilo.value })
)

agregada(capa => {
  capa.setStyle(estiloConbinado.value)
  capa.set('estilo', estilo.value)
  capa.set('globoInfo', globoInformativo.value)
  capa.set('geometria', geometria.value)
  capa.set('nombreAccesible', nombreAccesiblePorElemento.value)

  // reactivo
  watch(estiloConbinado, nv => capa.setStyle(nv))
  watch(estilo, nv => capa.set('estilo', nv))
  watch(globoInformativo, nv => capa.set('globoInfo', nv))
  watch(geometria, nv => capa.set('geometria', nv))
  watch(nombreAccesiblePorElemento, nv => capa.set('nombreAccesible', nv))
})

onMounted(() => {
  console.log('sisdaiCapaVectorial', props.id)
})
</script>

<template>
  <span
    ref="sisdaiCapaVectorial"
    :sisdai-capa="id"
  />
</template>
