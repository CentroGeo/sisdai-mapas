<script setup>
import { useSlots, onMounted, shallowRef, toRefs, reactive, watch } from 'vue'
import { panelesEnUso } from './utiles'
import propsMapa from './props'
import ContenedorVisAtribuciones from './../otros/ContenedorVisAtribuciones.vue'
import AnimacionCarga from './../otros/AnimacionCarga.vue'
import { provide } from 'vue'
import Mapa from './Mapa'
import eventos from './../capa/eventos'

const emits = defineEmits(Object.values(eventos))
const props = defineProps(propsMapa)
const { descripcion } = toRefs(props)

const mapa = reactive(new Mapa(props.id))
provide('mapa', mapa)

const refMapa = shallowRef(null)
onMounted(() => {
  mapa.setTarget(refMapa.value)

  watch(
    () => mapa.capasCargando,
    (nv) => {
      if (nv) {
        emits(eventos.alIniciarCarga)
      } else {
        emits(eventos.alFinalizarCarga, mapa.todasCapasConError)
      }
    }
  )
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

    <AnimacionCarga v-show="mapa.capasCargando" />
    <ContenedorVisAtribuciones />
  </div>
</template>

<style lang="scss">
@import 'ol/ol.css';

.sisdai-mapa.contenedor-vis {
  position: relative;
}
</style>
