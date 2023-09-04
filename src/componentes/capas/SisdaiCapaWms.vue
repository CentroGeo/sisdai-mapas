<script setup>
import { onMounted } from 'vue'
import ImageLayer from 'ol/layer/Image'
import ImageWMS from 'ol/source/ImageWMS'
import { ImageSourceEventType } from 'ol/source/Image'
import tiposEstatusCarga from './../../defaults/estatusCarga'

import usarCapa, { props, emits } from '../../composables/usarCapa'

// eslint-disable-next-line
const propsSetup = defineProps({
  /**
   * Url del servicio wms.
   */
  url: {
    type: String,
    required: true,
  },

  /**
   * Parametros del servicio wms, layers, cql, styles, etc
   */
  parametros: {
    type: Object,
    default: function () {
      return {}
    },
  },

  /**
   * Parametro de tipo de servidor.
   * @see https://openlayers.org/en/latest/apidoc/module-ol_source_WMSServerType.html
   */
  servidor: {
    type: String,
    default: 'geoserver',
  },

  ...props,
})

// eslint-disable-next-line
const emitsSetup = defineEmits(emits)

const { estatusCarga, registrar } = usarCapa(propsSetup, emitsSetup)

const source = new ImageWMS({
  url: propsSetup.url,
  params: propsSetup.parametros,
  serverType: propsSetup.servidor,
  crossOrigin: 'Anonymous',
})

source.on(ImageSourceEventType.IMAGELOADSTART, () => {
  emitsSetup('alIniciarCarga')
  estatusCarga.value = tiposEstatusCarga.ini
})
source.on(ImageSourceEventType.IMAGELOADERROR, () => {
  emitsSetup('alFinalizarCarga', true)
  estatusCarga.value = tiposEstatusCarga.error
})
source.on(ImageSourceEventType.IMAGELOADEND, () => {
  emitsSetup('alFinalizarCarga', true)
  estatusCarga.value = tiposEstatusCarga.fin
})

onMounted(() => {
  registrar(
    new ImageLayer({
      source,
      // className: this.className,
    })
  )
})
</script>

<template style="display: none"><span /></template>
