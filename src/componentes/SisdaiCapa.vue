<script setup>
import { idAleatorio, buscarContenedorSisdaiMapa } from '@/utiles'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { getCurrentInstance, onMounted, onUnmounted, toRefs, watch } from 'vue'
import usarRegistroMapas from '@/composables/usarRegistroMapas'

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

const idMapa = buscarContenedorSisdaiMapa(getCurrentInstance())

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

  watch(nombre, x => {
    console.log('SisdaiCapa, nombre cambiado', x)
    mapa
      .getAllLayers()
      .find(_capa => _capa.get('id') === props.id)
      .set('nombre', nombre.value)
  })
}

onMounted(() => {
  console.log('SisdaiCapa')
  // console.log(`agregar ${capa.get('id')} en mapa ${idMapa}`)

  usarRegistroMapas().mapaPromesa(idMapa).then(agregarCapa)
})

onUnmounted(() => {
  usarRegistroMapas()
    .mapaPromesa(idMapa)
    .then(mapa => {
      console.log('quitando capa', props.id)

      mapa.removeLayer(
        mapa.getAllLayers().find(_capa => _capa.get('id') === props.id)
      )
    })
})
</script>

<template>
  <div class="sisddai-capa">
    <h2>Hola, soy una capa 😏 [{{ id }}]</h2>
  </div>
</template>
