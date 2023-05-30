<script setup>
import usarRegistroMapas from '@/composables/usarRegistroMapas'
import { buscarIdContenedorHtmlSisdai, idAleatorio } from '@/utiles'
import ImageLayer from 'ol/layer/Image'
import ImageWMS from 'ol/source/ImageWMS'
import { onBeforeUnmount, onMounted, shallowRef, toRefs } from 'vue'

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
    default: 'https://dadsigvisgeo.conacyt.mx/geoserver/wms',
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
})

const sisdaiCapaWms = shallowRef()
const { nombre, url, parametros } = toRefs(props)

function agregarCapa(mapa) {
  mapa.addLayer(
    new ImageLayer({
      source: new ImageWMS({
        url: url.value,
        params: parametros.value,
      }),
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
