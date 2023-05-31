<script setup>
import usarRegistroMapas from '@/composables/usarRegistroMapas'
import { buscarIdContenedorHtmlSisdai, idAleatorio } from '@/utiles'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { onBeforeUnmount, onMounted, shallowRef, toRefs, watch } from 'vue'

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
   * `url`
   * - Tipo: `String`
   * - Valor por defecto: `undefined`
   * - Interactivo: ❌
   *
   * Url remota de la capa.
   */
  url: {
    type: String,
    default:
      'https://{a-c}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png',
  },
})

const sisdaiCapaXyz = shallowRef()
const { nombre, url } = toRefs(props)

function agregarCapa(mapa) {
  mapa.addLayer(
    new TileLayer({
      // source: new OSM(),
      source: new XYZ({
        url: url.value,
        crossOrigin: 'Anonymous',
      }),
      id: props.id,
      nombre: nombre.value,
    })
  )

  watch(nombre, nv => mapa.buscarCapa(props.id).set('nombre', nv))
}

onMounted(() => {
  console.log('sisdaiCapaXyz', props.id)

  idMapa = buscarIdContenedorHtmlSisdai('mapa', sisdaiCapaXyz.value)

  usarRegistroMapas().mapaPromesa(idMapa).then(agregarCapa)
})

onBeforeUnmount(() => {
  console.log('quitando sisdaiCapaXyz', props.id)

  usarRegistroMapas()
    .mapaPromesa(idMapa)
    .then(mapa => {
      mapa.eliminarCapa(props.id)
    })
})
</script>

<template>
  <span
    ref="sisdaiCapaXyz"
    :sisdai-capa="id"
  />
</template>
