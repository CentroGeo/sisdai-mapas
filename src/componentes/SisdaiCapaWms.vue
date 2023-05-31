<script setup>
import usarRegistroMapas from '@/composables/usarRegistroMapas'
import { buscarIdContenedorHtmlSisdai, idAleatorio } from '@/utiles'
import ImageLayer from 'ol/layer/Image'
import { ImageSourceEventType } from 'ol/source/Image'
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

<script>
const eventos = {
  /**
   * Evento ejecutado cuando se detecta el cambio de visibilidad de la capa desde las propiedades
   * reactivas o desde los controles del componente como el control de leyenda.
   * @param {Boolean} visibilidad Visibilidad final al ejecutarse este evento.
   */
  alCambiarVisibilidad: 'alCambiarVisibilidad',

  /**
   * Evento ejecutado cuando se detecta que ha iniciado la carga de la información visible en el
   * mapa. En el caso de capas vectoriales (GeoJSON) cuando inicia la consulta de los features;
   * En el caso de capas raster (WMS) cuando inicia la consulta de la imagen; En el caso de las
   * capas por conjunto de teselas (XYZ, OSM) cuando inicia la consulta de un grupo de teselas.
   */
  alIniciarCarga: 'alIniciarCarga',

  /**
   * Evento ejecutado cuando se detecta que ha finalizado la carga de la información visible en
   * el mapa. En el caso de capas vectoriales (GeoJSON) cuando finaliza la consulta de los
   * features; En el caso de capas raster (WMS) cuando finaliza la consulta de la imagen; En el
   * caso de las capas por conjunto de teselas (XYZ, OSM) cuando finaliza la consulta de un
   * grupo de teselas.
   * @param {Boolean} cargaExitosa Indica si la carga no ha presentado error.
   */
  alFinalizarCarga: 'alFinalizarCarga',
}
</script>
