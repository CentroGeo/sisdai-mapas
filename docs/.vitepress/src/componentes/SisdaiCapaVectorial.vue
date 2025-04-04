<script setup>
import GeoJSON from 'ol/format/GeoJSON'
import TopoJSON from 'ol/format/TopoJSON'
import VectorLayer from 'ol/layer/Vector'
import VectorImageLayer from 'ol/layer/VectorImage'
import VectorSource from 'ol/source/Vector'
import VectorEventType from 'ol/source/VectorEventType'
import { computed, shallowRef, toRefs, watch } from 'vue'
import usarCapa, { props as propsCapa } from './../composables/usarCapa'
import eventos from './../eventos/capa'
import { traducirEstilo } from './../utiles/estiloVectores'
import { DEFAULT_ESTILO_VECTOR, tiposCapa } from './../valores/capa'

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
    default: () => DEFAULT_ESTILO_VECTOR
  },

  /**
   * Define el formato de los datos fuente, los valores admitidos son: 'geojson' y 'topojson'.
   *
   * - Tipo: `String`
   * - Valor por defecto: `'geojson'`.
   * - Reactivo: No.
   */
  formato: {
    type: String,
    default: 'geojson'
  },

  /**
   * Origen de la capa. Puede ser una url externa o relativa a las carpetas del proyecto, e
   * incluso un objeto en formato geojson o topojson con coordenadas y atributos.
   *
   * - Tipo: `String` o `Object`
   * - Valor obligatorio.
   * - Reactivo: Si.
   */
  fuente: {
    type: [String, Object],
    required: true
  },

  /**
   * Contenido del globo de información que aparecerá al pasar el cursor sobre la capa.
   * Puede ser una funcion que accede a las propiedades del elemento al que se sobrepone o un texto estatico.
   *
   * - Tipo: `String` o `Function`
   * - Valor por defecto: `undefined`.
   * - Reactivo: Si.
   */
  globoInformativo: {
    type: [String, Function, Object],
    default: undefined
  },

  /**
   * Contenido del cuadro de información que aparecerá al pasar el cursor sobre la capa.
   * Puede ser una funcion que accede a las propiedades del elemento al que se sobrepone o un texto estatico.
   *
   * - Tipo: `String` o `Function`
   * - Valor por defecto: `undefined`.
   * - Reactivo: Si.
   */
  cuadroInformativo: {
    type: [String, Function],
    default: undefined
  },

  /**
   * Punto: Point y MultiPoint
   * Linea: LineString y MultiLineString
   * Poligono: Polygon y MultiPolygon
   */
  geometria: {
    type: String,
    default: undefined
    // 'LinearRing', 'GeometryCollection', 'Circle'
  },

  /**
   *
   */
  nombreAccesiblePorElemento: {
    type: String,
    default: undefined
  },

  /**
   * ???
   *
   * - Tipo: `Boolean`
   * - Valor por defecto: `true`.
   * - Reactivo: No.
   */
  renderizarComoImagen: {
    type: Boolean,
    default: true
  },

  ...propsCapa
})

const sisdaiCapaVectorial = shallowRef()
const {
  estilo,
  fuente,
  globoInformativo,
  cuadroInformativo,
  geometria,
  nombreAccesiblePorElemento,
  formato
} = toRefs(props)
const emits = defineEmits(Object.values(eventos))

const { configurar, agregada } = usarCapa(sisdaiCapaVectorial, props)

configurar(() => {
  const opcionesSource = {}

  if (formato.value.toLowerCase() === 'topojson') {
    if (typeof fuente.value === typeof String()) {
      opcionesSource.url = fuente.value
      opcionesSource.format = new TopoJSON()
    } else {
      opcionesSource.features = new TopoJSON().readFeatures(fuente.value)
    }
  } else {
    if (typeof fuente.value === typeof String()) {
      opcionesSource.url = fuente.value
      opcionesSource.format = new GeoJSON()
    } else {
      opcionesSource.features = new GeoJSON().readFeatures(fuente.value)
    }
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
    tipo: tiposCapa.vectorial
  }
})

const estiloConbinado = computed(() =>
  traducirEstilo({ ...DEFAULT_ESTILO_VECTOR, ...estilo.value })
)

agregada((capa) => {
  capa.setStyle(estiloConbinado.value)
  capa.set('estilo', estilo.value)
  capa.set('estilo2', JSON.stringify(estiloConbinado.value))
  capa.set('cuadroInfo', cuadroInformativo.value)
  capa.set('globoInfo', globoInformativo.value)
  capa.set('geometria', geometria.value)
  capa.set('nombreAccesible', nombreAccesiblePorElemento.value)

  // reactivo
  watch(estiloConbinado, (nv) => capa.setStyle(nv))
  watch(estilo, (nv) => capa.set('estilo', nv))
  watch(estiloConbinado, (nv) => capa.set('estilo2', JSON.stringify(nv)))
  watch(cuadroInformativo, (nv) => capa.set('cuadroInfo', nv))
  watch(globoInformativo, (nv) => capa.set('globoInfo', nv))
  watch(geometria, (nv) => capa.set('geometria', nv))
  watch(nombreAccesiblePorElemento, (nv) => capa.set('nombreAccesible', nv))
})

// onMounted(() => {})
</script>

<template>
  <span ref="sisdaiCapaVectorial" :sisdai-capa="id" />
</template>
