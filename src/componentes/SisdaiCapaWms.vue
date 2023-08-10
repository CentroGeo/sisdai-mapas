<script setup>
import ImageLayer from 'ol/layer/Image'
import { ImageSourceEventType } from 'ol/source/Image'
import ImageWMS from 'ol/source/ImageWMS'
import { onMounted, shallowRef, toRefs } from 'vue'
import usarCapa, { props as propsCapa } from './../composables/usarCapa'
import eventos from './../eventos/capa'

const props = defineProps({
  /**
   * url del servicio wms
   */
  url: {
    type: String,
    default: 'https://gema.conahcyt.mx/geoserver/wms',
  },

  /**
   * parametros del servicio wms, layers, cql, styles, etc
   */
  parametros: {
    type: Object,
    default: () => ({}),
    validator({ LAYERS }) {
      const validarLayer = LAYERS !== undefined && LAYERS !== null

      if (!validarLayer) {
        console.warn('LAYERS no puede ser un parámetro indefinido o vacío')
      }

      return validarLayer
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

  ...propsCapa,
})

const emits = defineEmits(Object.values(eventos))

const sisdaiCapaWms = shallowRef()
const { url, parametros } = toRefs(props)

const { configurar } = usarCapa(sisdaiCapaWms, props)

configurar(() => {
  const olSource = new ImageWMS({
    url: url.value,
    params: parametros.value,
    serverType: props.servidor,
    crossOrigin: 'Anonymous',
  })

  olSource.on(ImageSourceEventType.IMAGELOADSTART, () => {
    emits(eventos.alIniciarCarga)
    // estatusCarga.value = tiposEstatusCarga.ini
  })
  olSource.on(ImageSourceEventType.IMAGELOADERROR, () => {
    emits(eventos.alFinalizarCarga, false)
    // estatusCarga.value = tiposEstatusCarga.error
  })
  olSource.on(ImageSourceEventType.IMAGELOADEND, () => {
    emits(eventos.alFinalizarCarga, true)
    // estatusCarga.value = tiposEstatusCarga.fin
  })

  return { olSource, olLayerClass: ImageLayer }
})

onMounted(() => {
  console.log('SisdaiCapaWms', props.id)
})
</script>

<template>
  <span
    ref="sisdaiCapaWms"
    :sisdai-capa="id"
  />
</template>
