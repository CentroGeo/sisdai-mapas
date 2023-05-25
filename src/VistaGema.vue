<script setup>
import SisdaiCapa from '@/componentes/SisdaiCapa.vue'
import SisdaiMapa from '@/componentes/SisdaiMapa.vue'
import { onMounted, reactive } from 'vue'

window.location.search = '?capas=buscar'
window.location.hash = '#map=10/19.6060/-98.7635'

const vistaMapa = reactive({
  extension: [-118.3651, 14.5321, -86.7104, 32.7187],
  margenExtension: 30 || [30, 30, 30, 30],
  centro: [],
  zoom: undefined,
})

function procesarParametrosHash({ hash }) {
  const obtenerParametroHash = n =>
    hash !== '' ? parseFloat(hash.split('=')[1].split('/')[n]) : undefined

  vistaMapa.zoom = obtenerParametroHash(0)
  vistaMapa.centro[0] = obtenerParametroHash(2)
  vistaMapa.centro[1] = obtenerParametroHash(1)
  console.log('vista', JSON.stringify(vistaMapa))
}

onMounted(() => {
  procesarParametrosHash(window.location)
})

function alMoverVista({ getView }) {
  let zoom = getView().getZoom()
  let centro = getView().getCenter()

  console.log(centro, zoom)
}
</script>

<template>
  <div>
    <header>header</header>
    <div class="izquierda">izquierda</div>

    <SisdaiMapa
      :vista="vistaMapa"
      @alMoverVista="alMoverVista"
    >
      <SisdaiCapa />
    </SisdaiMapa>

    <div class="derecha">derecha</div>
    <footer>footer</footer>
  </div>
</template>

<style>
header {
  background: #0b231e;
}

footer {
  background: #003384;
}
</style>
