<script setup>
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { onMounted, onUnmounted, shallowRef, toRefs, watch } from 'vue'
import usarRegistroMapas from './../composables/usarRegistroMapas'
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
})

const sisdaiCapa = shallowRef()
const { nombre } = toRefs(props)

function agregarCapa(mapa) {
  // console.log(mapa)

  mapa.addLayer(
    new TileLayer({
      source: new OSM(),
      id: props.id,
      nombre: nombre.value,
    })
  )

  watch(nombre, nv => mapa.buscarCapa(props.id).set('nombre', nv))
}

onMounted(() => {
  console.log('SisdaiCapa')
  // console.log(`agregar ${capa.get('id')} en mapa ${idMapa}`)

  idMapa = buscarIdContenedorHtmlSisdai('mapa', sisdaiCapa.value)

  usarRegistroMapas().mapaPromesa(idMapa).then(agregarCapa)
})

onUnmounted(() => {
  usarRegistroMapas()
    .mapaPromesa(idMapa)
    .then(() => {
      console.log('quitando capa', props.id)

      // mapa.eliminarCapa(props.id)
    })
})
</script>

<template>
  <div
    ref="sisdaiCapa"
    :sisdai-capa="id"
  >
    <h2>Hola, soy una capa 😏 [{{ id }}]</h2>
  </div>
</template>
