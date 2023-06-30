<script setup>
import BotonConahcyt from './BotonConahcyt.vue'
import SisdaiCargando from './SisdaiCargando.vue'
</script>

<template>
  <div class="contenedor-vis borde borde-color-2 borde-redondeado-8">
    <slot />
    <figure class="contenido-vis" />
    <SisdaiCargando />
    <BotonConahcyt />
  </div>
</template>

<style lang="scss">
@charset 'UTF-8';

@import 'sisdai-css/src/_variables';
@import 'sisdai-css/src/_mixins';

@import 'sisdai-css/src/reticula/contenedor-vis';

@import 'sisdai-css/src/bordes/base';
@import 'sisdai-css/src/bordes/redondeado';
@import 'sisdai-css/src/bordes/colores';
// @import 'sisdai-css/src/bordes/grosores';
// @import 'sisdai-css/src/bordes/separadores';

@import 'sisdai-css/src/boton/base';
// @import 'sisdai-css/src/boton/iconos';
@import 'sisdai-css/src/boton/compuestos';

@import 'sisdai-css/src/reticula/margenes';

// .contenedor-vis {
//   // Para verificar que no sobresalga de su espacio, escimandolo al boton pie
//   .boton.boton-conacyt {
//     z-index: 1;
//   }
//   .contenido-vis,
//   .sisdai-cargando,
//   .panel-encabezado-vis,
//   .panel-izquierda-vis,
//   .panel-derecha-vis,
//   .panel-pie-vis {
//     z-index: 2;
//   }
// }
</style>
