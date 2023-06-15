<script setup>
import BotonConahcyt from './BotonConahcyt.vue'
import SisdaiCargando from './SisdaiCargando.vue'
</script>

<template>
  <div class="sisdai-contenedor-vis borde borde-color-2 borde-redondeado-8">
    <slot />
    <figure class="contenido-vis" />
    <SisdaiCargando />
    <BotonConahcyt />
  </div>
</template>

<style lang="scss">
// @import './../estilos/ContenedorVis';

@charset 'UTF-8';
@import 'sisdai-css/src/_variables';
@import 'sisdai-css/src/_mixins';

// Escodner elementos
.sisdai-contenedor-vis {
  &.sin-cargador .sisdai-cargando {
    display: none;
  }

  &.sin-boton-conahcyt {
    display: block;
    padding-bottom: 0;

    .contenido-vis,
    .sisdai-cargando {
      border-radius: 7px 7px 0 0;
      border-bottom-right-radius: 7px;
      border-bottom-left-radius: 7px;
    }

    .sisdai-cargando {
      bottom: 0;
    }

    .boton.boton-conacyt {
      display: none;
    }
  }

  &.sin-bordes {
    border: none;

    .contenido-vis,
    .sisdai-cargando,
    .panel-encabezado-vis,
    .panel-izquierda-vis,
    .panel-derecha-vis,
    .panel-pie-vis,
    .boton.boton-conacyt {
      border-radius: 0;
    }
  }
}

@import 'sisdai-css/src/bordes/base';
@import 'sisdai-css/src/bordes/redondeado';
@import 'sisdai-css/src/bordes/colores';
// @import 'sisdai-css/src/bordes/grosores';
// @import 'sisdai-css/src/bordes/separadores';

@import 'sisdai-css/src/boton/base';
// @import 'sisdai-css/src/boton/iconos';
@import 'sisdai-css/src/boton/compuestos';

@import 'sisdai-css/src/reticula/margenes';

.sisdai-contenedor-vis {
  // Contenedor de visualización a lo alto de la pantalla menos los menús
  max-height: calc(100vh - 120px);
  // min-width: 800px;
  width: 100%;

  .contenido-vis {
    min-height: 300px;
    max-height: calc(100vh - 160px);
    width: 100%;
  }

  .sisdai-cargando {
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 40px;
  }

  // botón conahcyt simepre este pegado abajo
  position: relative;
  padding-bottom: 40px;
  .boton.boton-conacyt {
    position: absolute;
    bottom: 0;
  }

  // Scroll en los paneles
  .panel-encabezado-vis,
  .panel-izquierda-vis,
  .panel-derecha-vis,
  .panel-pie-vis {
    overflow: auto;
  }

  // bordes redondeados por defecto
  .panel-encabezado-vis {
    border-radius: 7px 7px 0 0;
  }
  .panel-izquierda-vis {
    border-top-left-radius: 7px;
  }
  .contenido-vis,
  .sisdai-cargando {
    border-radius: 7px 7px 0 0;
  }
  .panel-derecha-vis {
    border-top-right-radius: 7px;
  }

  // Cuando solo se quiera la visalización sin los contenedores, aún debe tener el loader
  // &.solo-vis {
  //   padding: 0;
  //   display: block;
  //   border: none;

  //   .contenido-vis,
  //   .sisdai-cargando {
  //     border-radius: 0;
  //   }

  //   .sisdai-cargando {
  //     bottom: 0;
  //   }

  //   .panel-encabezado-vis,
  //   .panel-izquierda-vis,
  //   .panel-derecha-vis,
  //   .panel-pie-vis,
  //   .boton.boton-conacyt {
  //     display: none;
  //   }
  // }
}
</style>
