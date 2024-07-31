<script setup>
import { toRefs, useSlots } from 'vue'
import { panelesEnUso } from './utiles'
import _props from './props'
import ContenedorVisAtribuciones from './../otros/ContenedorVisAtribuciones.vue'
import { provide } from 'vue'

provide('message', 'hello!')

const props = defineProps(_props)
const { id } = toRefs(props)
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

<style lang="scss"></style>
