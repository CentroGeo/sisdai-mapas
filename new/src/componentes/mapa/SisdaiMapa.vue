<script setup>
import { toRefs, useSlots, onMounted, shallowRef, ref } from 'vue'
import { panelesEnUso } from './utiles'
import _props from './props'
import ContenedorVisAtribuciones from './../otros/ContenedorVisAtribuciones.vue'
import { provide } from 'vue'
import Map from 'ol/Map.js'
import View from 'ol/View.js'

const props = defineProps(_props)
const { id } = toRefs(props)

const mapa = ref(null)
provide('mapa', mapa)

const refMapa = shallowRef(null)
onMounted(() => {
  mapa.value = new Map({
    target: refMapa.value,
    view: new View({
      center: [0, 0],
      zoom: 2
    })
  })
})
</script>

<template>
  <div class="sisdai-mapa contenedor-vis borde-redondeado-8">
    <div class="contenedor-vis-paneles" :class="panelesEnUso(useSlots())">
      <div class="panel-encabezado-vis">
        <slot name="panel-encabezado-vis" />
      </div>

      <div class="panel-izquierda-vis">
        <slot name="panel-izquierda-vis" />
      </div>

      <!-- slot para las capas -->
      <slot />

      <div class="contenido-vis" ref="refMapa" tabindex="0" />

      <div class="panel-derecha-vis">
        <slot name="panel-derecha-vis" />
      </div>

      <div class="panel-pie-vis">
        <slot name="panel-pie-vis" />
      </div>
    </div>

    <!-- <SisdaiCargando /> -->
    <ContenedorVisAtribuciones />
  </div>
</template>

<style lang="scss">
@import 'ol/ol.css';
</style>
