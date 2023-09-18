<script setup>
import GeoJSON from 'ol/format/GeoJSON.js'
import VectorLayer from 'ol/layer/Vector'
import VectorImageLayer from 'ol/layer/VectorImage'
import VectorSource from 'ol/source/Vector'
import VectorEventType from 'ol/source/VectorEventType'
import { onMounted, shallowRef, toRefs } from 'vue'
import usarCapa, { props as propsCapa } from './../composables/usarCapa'
import eventos from './../eventos/capa'

const props = defineProps({
  // datos: {
  //   type: Object,
  //   default: undefined,
  // },

  /**
   * Contenido del globo de información que aparecerá al pasar el cursor sobre la capa.
   * Puede ser una funcion que accede a las propiedades del elemento al que se sobrepone o un texto estatico.
   *
   * - Tipo: `String` o `Function`
   * - Valor por defecto: `undefined`.
   * - Interactivo: ✅
   */
  globoInformativo: {
    type: [String, Function],
    default: undefined,
  },

  /**
   * Define el formato de los datos fuente, los valores admitidos son: 'geojson' y 'topojson'.
   *
   * - Tipo: `String`
   * - Valor por defecto: `'geojson'`.
   * - Interactivo: ❌
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
   * - Interactivo: ✅
   */
  fuente: {
    type: [String, Object],
    required: true,
  },

  /**
   * ???
   *
   * - Tipo: `Boolean`
   * - Valor por defecto: `false`.
   * - Interactivo: ❌
   */
  renderizarComoImagen: {
    type: Boolean,
    default: false,
  },

  // url: {
  //   type: String,
  //   default: undefined,
  // },

  ...propsCapa,
})

const sisdaiCapaVectorial = shallowRef()
const { fuente } = toRefs(props)
const emits = defineEmits(Object.values(eventos))

const { configurar } = usarCapa(sisdaiCapaVectorial, props)

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
