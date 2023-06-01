<template>
  <div class="contenedor borde borde-color-2 borde-redondeado-8">
    hola soy un contenedor
  </div>
</template>

<style lang="scss">
@charset 'UTF-8';

@import 'sisdai-css/src/_variables';

@import 'sisdai-css/src/bordes/base';
@import 'sisdai-css/src/bordes/redondeado';
@import 'sisdai-css/src/bordes/colores';

.contenedor {
  font-weight: bolder;

  &:hover {
    color: fuchsia;
  }
}
</style>
