<script setup>
import { useSlots, onMounted, shallowRef, ref, toRefs, toRaw, watch } from 'vue'
import { panelesEnUso } from './utiles'
import propsMapa from './props'
import ContenedorVisAtribuciones from './../otros/ContenedorVisAtribuciones.vue'
import { provide } from 'vue'
import Mapa from './Mapa'
import View from 'ol/View'

const props = defineProps(propsMapa)
const { descripcion } = toRefs(props)

const mapa = ref({})
provide('mapa', mapa)

/**
 * Creación del objeto mapa.
 * @param {HTMLDivElement|String} target elemento o id del elemento html que contendrá el mapa.
 * @param {String} proyeccion
 * @returns {import("./../clases/Mapa.js").default} Mapa
 */
function crearMapa(target, proyeccion, emits) {
  return new Mapa({
    controls: [],
    target,
    view: new View({
      center: [0, 0],
      zoom: 2
    })
  })
}

const refMapa = shallowRef(null)
onMounted(() => {
  mapa.value = crearMapa(refMapa.value)

  mapa.value
    .busquedaPromesa((_mapa) => _mapa.getViewport().querySelector('canvas'))
    .then((canvas) => {
      canvas.setAttribute('aria-label', 'Mapa interactivo')
      canvas.setAttribute('aria-describedby', `mapa-${props.id}-descripcion`)
    })
})
</script>

<template>
  <div :sisdai-mapa="props.id" class="sisdai-mapa contenedor-vis borde-redondeado-8">
    <p :id="`mapa-${props.id}-descripcion`" class="a11y-solo-lectura a11y-simplificada-ocultar">
      {{ descripcion }}
    </p>
    <p class="a11y-simplificada-mostrar-inline m-3">
      {{ descripcion }}
    </p>

    <div class="contenedor-vis-paneles a11y-simplificada-ocultar" :class="panelesEnUso(useSlots())">
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
