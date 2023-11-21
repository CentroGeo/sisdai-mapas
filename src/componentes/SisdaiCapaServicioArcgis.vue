<script setup>
import ImageLayer from 'ol/layer/Image'
import ImageArcGISRest from 'ol/source/ImageArcGISRest'
import { shallowRef } from 'vue'
import usarCapa, { props as propsCapa } from './../composables/usarCapa'
import { tiposCapa } from './../valores/capa'

const props = defineProps({
  /**
   * URL del servicio ArcGIS.
   *
   * - Tipo: `String`
   * - Valor por defecto: `undefined`.
   * - Reactivo: ❌
   */
  url: {
    type: String,
    // default: undefined,
  },

  ...propsCapa,
})

const sisdaiCapaServicioArcgis = shallowRef()
const { configurar } = usarCapa(sisdaiCapaServicioArcgis, props)

configurar(() => {
  const olSource = new ImageArcGISRest({
    ratio: 1,
    params: {},
    url: props.url,
  })

  return { olSource, olLayerClass: ImageLayer, tipo: tiposCapa.wms }
})
</script>

<template>
  <span
    ref="sisdaiCapaServicioArcgis"
    :sisdai-capa="id"
  />
</template>
