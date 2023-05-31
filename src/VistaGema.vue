<script setup>
import SisdaiCapa from '@/componentes/SisdaiCapa.vue'
import SisdaiMapa from '@/componentes/SisdaiMapa.vue'
import { reactive } from 'vue'

if (window.location.search === '') {
  window.location.search = '?capas=buscar'
}
if (window.location.hash === '') {
  window.location.hash = '#map=10/19.6060/-98.7635'
}

const vistaMapa = reactive({
  extension: '-118.3651, 14.5321, -86.7104, 32.7187',
  margenExtension: 30,
  centro: [undefined, undefined],
  zoom: undefined,
})

function procesarParametrosHash({ hash }) {
  const obtenerParametroHash = n =>
    hash !== '' ? parseFloat(hash.split('=')[1].split('/')[n]) : undefined

  vistaMapa.zoom = obtenerParametroHash(0)
  vistaMapa.centro = `${obtenerParametroHash(2)},${obtenerParametroHash(1)}`
  vistaMapa.extension = undefined
  // console.log('vista', JSON.stringify(vistaMapa))
}
procesarParametrosHash(window.location)

function alMoverVista({ map }) {
  let zoom = map.getView().getZoom()
  let centro = map.getView().getCenter()

  let hash = `#map=${zoom.toFixed(0)}/${centro[1].toFixed(
    4
  )}/${centro[0].toFixed(4)}`

  if (hash !== window.location.hash) {
    window.location.hash = hash
  }
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
