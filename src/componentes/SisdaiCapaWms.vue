<script setup>
import ImageLayer from 'ol/layer/Image'
import { ImageSourceEventType } from 'ol/source/Image'
import ImageWMS from 'ol/source/ImageWMS'
import { onBeforeUnmount, onMounted, shallowRef, toRefs } from 'vue'
import usarRegistroMapas from './../composables/usarRegistroMapas'
import eventos from './../eventos/capa'
import { buscarIdContenedorHtmlSisdai, idAleatorio } from './../utiles'

var idMapa

const props = defineProps({
  id: {
    type: String,
    default: () => idAleatorio(),
  },
  nombre: {
    type: String,
    default: 'Nombre no asignado',
  },
  /**
   * url del servicio wms
   */
  url: {
    type: String,
    default: 'https://gema.conacyt.mx/geoserver/wms',
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
})

const emits = defineEmits(Object.values(eventos))

const sisdaiCapaWms = shallowRef()
const { nombre, url, parametros } = toRefs(props)

function agregarCapa(mapa) {
  const source = new ImageWMS({
    url: url.value,
    params: parametros.value,
    serverType: props.servidor,
    crossOrigin: 'Anonymous',
  })

  source.on(ImageSourceEventType.IMAGELOADSTART, () => {
    emits(eventos.alIniciarCarga)
    // estatusCarga.value = tiposEstatusCarga.ini
  })
  source.on(ImageSourceEventType.IMAGELOADERROR, () => {
    emits(eventos.alFinalizarCarga, false)
    // estatusCarga.value = tiposEstatusCarga.error
  })
  source.on(ImageSourceEventType.IMAGELOADEND, () => {
    emits(eventos.alFinalizarCarga, true)
    // estatusCarga.value = tiposEstatusCarga.fin
  })

  mapa.addLayer(
    new ImageLayer({
      source,
      id: props.id,
      nombre: nombre.value,
    })
  )
}

onMounted(() => {
  console.log('SisdaiCapaWms', props.id)

  idMapa = buscarIdContenedorHtmlSisdai('mapa', sisdaiCapaWms.value)

  usarRegistroMapas().mapaPromesa(idMapa).then(agregarCapa)
})

onBeforeUnmount(() => {
  console.log('quitando capa', props.id)

  usarRegistroMapas()
    .mapaPromesa(idMapa)
    .then(mapa => {
      mapa.eliminarCapa(props.id)
    })
})
</script>

<template>
  <span
    ref="sisdaiCapaWms"
    :sisdai-capa="id"
  />
</template>
