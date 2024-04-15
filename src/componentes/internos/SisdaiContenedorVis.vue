<script setup>
import ContenedorVisAtribuciones from './ContenedorVisAtribuciones.vue'
import SisdaiCargando from './SisdaiCargando.vue'
</script>

<template>
  <div class="contenedor-vis borde borde-color-2 borde-redondeado-8">
    <div class="panel-encabezado-vis">
      <slot name="panel-encabezado-vis" />
    </div>

    <div class="panel-izquierda-vis">
      <slot name="panel-izquierda-vis" />
    </div>

    <figure class="contenido-vis">
      <button>el mapa</button>
    </figure>

    <div class="panel-derecha-vis">
      <slot name="panel-derecha-vis" />
    </div>

    <div class="panel-pie-vis">
      <slot name="panel-pie-vis" />
    </div>

    <SisdaiCargando />
    <ContenedorVisAtribuciones />
  </div>
</template>

<style lang="scss" scoped>
@import './../estilos/ContenedorVis';
</style>
