<script setup>
import { idAleatorio } from '@/utiles'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { getCurrentInstance, onMounted, onUnmounted } from 'vue'
import usarRegistroMapas from '@/composables/usarRegistroMapas'

const props = defineProps({
  id: {
    type: String,
    default: () => idAleatorio(),
  },
})

function buscarContenedorSisdaiMapa({ parent }) {
  // console.log('buscarContenedorSisdaiMapa', parent)

  if (parent.type.__name === 'SisdaiMapa') {
    // console.log('es SisdaiMapas')
    return parent.props.id
  }

  if (parent.parent) {
    // console.log('buscar un nivel abajo', parent.parent)
    return buscarContenedorSisdaiMapa(parent)
  } else {
    // console.log('ya no hay más hijos')
    // eslint-disable-next-line
    console.warn(`No se encontro el mapa para agregar la capa ${props.id}`)
  }
}

const capa = new TileLayer({
  source: new OSM(),
})
// capa.setVisible(false)
capa.set('id', props.id)

onMounted(() => {
  console.log('SisdaiCapa')
  var idMapa = buscarContenedorSisdaiMapa(getCurrentInstance())
  // console.log(`agregar ${capa.get('id')} en mapa ${idMapa}`)

  usarRegistroMapas()
    .mapaPromesa(idMapa)
    .then(mapa => {
      // console.log(mapa)
      mapa.addLayer(capa)
    })
})

onUnmounted(() => {})
</script>

<template>
  <div class="sisddai-capa">
    <h2>Hola, soy una capa 😏 [{{ id }}]</h2>
  </div>
</template>
