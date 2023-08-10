<script setup>
import GeoJSON from 'ol/format/GeoJSON.js'
import VectorLayer from 'ol/layer/Vector'
import VectorImageLayer from 'ol/layer/VectorImage'
import VectorSource from 'ol/source/Vector'
import { onMounted, shallowRef, toRefs } from 'vue'
import usarCapa, { props as propsCapa } from './../composables/usarCapa'

const props = defineProps({
  // datos: {
  //   type: Object,
  //   default: undefined,
  // },

  /**
   *
   *
   * - Tipo: `String|Object`
   * - Valor obligatorio.
   * - Interactivo: ✅
   */
  fuente: {
    type: [String, Object],
    required: true,
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

const { configurar } = usarCapa(sisdaiCapaVectorial, props)

configurar(() => {
  const olSource = new VectorSource(
    typeof fuente.value === typeof String()
      ? {
          url: fuente.value,
          format: new GeoJSON(),
        }
      : {
          features: new GeoJSON().readFeatures(fuente.value),
        }
  )

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
