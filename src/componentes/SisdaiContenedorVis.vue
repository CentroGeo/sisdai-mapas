<script setup>
import BotonConahcyt from './BotonConahcyt.vue'
</script>

<template>
  <div class="sisdai-contenedor-vis borde borde-color-2 borde-redondeado-8">
    <slot />
    <figure class="contenido-vis" />
    <BotonConahcyt />
  </div>
</template>

<style lang="scss">
@import './../estilos/ContenedorVis';
</style>
