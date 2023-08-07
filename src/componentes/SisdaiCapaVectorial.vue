<script setup>
import ImageLayer from 'ol/layer/Image'
import ImageWMS from 'ol/source/ImageWMS'
import { onBeforeUnmount, onMounted, shallowRef, toRefs } from 'vue'
import usarCapa, { props as propsCapa } from './../composables/usarCapa'
import { buscarIdContenedorHtmlSisdai } from './../utiles'

var idMapa

const props = defineProps({ ...propsCapa })

const sisdaiCapaVectorial = shallowRef()
const { nombre } = toRefs(props)

const { agregar, eliminar } = usarCapa(props)

function agregarCapa(mapa) {
  const source = new ImageWMS({
    url: 'https://gema.conacyt.mx/geoserver/wms',
    params: { LAYERS: 'contexto:gref_division_estatal_2020' },
    serverType: 'geoserver',
    crossOrigin: 'Anonymous',
  })

  mapa.addLayer(
    new ImageLayer({
      source,
      id: props.id,
      nombre: nombre.value,
    })
  )

  // watch(nombre, nv => mapa.buscarCapa(props.id).set('nombre', nv))
  console.log('agregando capa vectorial')
}

onMounted(() => {
  console.log('sisdaiCapaVectorial', props.id)

  idMapa = buscarIdContenedorHtmlSisdai('mapa', sisdaiCapaVectorial.value)

  agregar(idMapa, agregarCapa)
})

onBeforeUnmount(() => {
  eliminar(idMapa)
})
</script>

<template>
  <span
    ref="sisdaiCapaVectorial"
    :sisdai-capa="id"
  />
</template>
