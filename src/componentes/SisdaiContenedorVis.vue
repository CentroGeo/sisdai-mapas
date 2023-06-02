<script setup>
import BotonConahcyt from './BotonConahcyt.vue'
</script>

<template>
  <div class="sisdai-contenedor-vis borde borde-color-2 borde-redondeado-8">
    <slot />
    <div class="contenido-vis" />
    <BotonConahcyt />
  </div>
</template>

<style lang="scss">
@charset 'UTF-8';

.sisdai-contenedor-vis {
  display: grid;
  grid-gap: 0;

  .panel-encabezado-vis {
    grid-row: 1;
  }
  .panel-izquierda-vis,
  .contenido-vis,
  .panel-derecha-vis {
    grid-row: 2;
  }
  .panel-izquierda-vis {
    grid-column: 1;
  }
  .panel-pie-vis {
    grid-row: 3;
  }

  &.con-panel-encabezado-vis {
    .panel-izquierda-vis,
    .contenido-vis,
    .panel-derecha-vis {
      border-radius: 0;
    }
  }

  &.con-panel-izquierda-vis,
  &.con-panel-derecha-vis {
    grid-template-columns: repeat(3, 1fr);
    .panel-encabezado-vis,
    .panel-pie-vis {
      grid-column: 1 / 4;
    }
  }

  &.con-panel-izquierda-vis {
    .contenido-vis {
      grid-column: 2 / 4;
      border-top-left-radius: 0;
    }
  }

  &.con-panel-derecha-vis {
    .contenido-vis {
      grid-column: 1 / 3;
      border-top-right-radius: 0;
    }
    .panel-derecha-vis {
      grid-column: 3;
    }
  }

  &.con-panel-izquierda-vis.con-panel-derecha-vis {
    grid-template-columns: repeat(4, 1fr);
    .panel-encabezado-vis,
    .panel-pie-vis {
      grid-column: 1 / 5;
    }
    .contenido-vis {
      grid-column: 2 / 4;
    }
    .panel-derecha-vis {
      grid-column: 4;
    }
  }

  // Sin alteraciones para el pie por defecto
  // &.con-panel-pie-vis {
  // }
}

@import 'sisdai-css/src/_variables';
@import 'sisdai-css/src/_mixins';

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
  max-height: calc(100vh - 120px); // alto de la pantalla menos los menús
  // min-width: 800px;
  width: 100%;

  .panel-encabezado-vis {
    border-radius: 7px 7px 0 0;
  }
  .panel-izquierda-vis {
    border-top-left-radius: 7px;
  }
  .contenido-vis {
    background: #e9e9e9;
    min-height: 300px;
    width: 100%;
    border-radius: 7px 7px 0 0;
  }
  .panel-derecha-vis {
    border-top-right-radius: 7px;
  }

  // lo siguiente logra que el botón conahcyt simepre este pegado abajo
  position: relative;
  padding-bottom: 40px;
  .boton.boton-conacyt {
    position: absolute;
    bottom: 0;
  }

  &.solo-vis {
    padding: 0;
    display: block;
    border: none;

    .contenido-vis {
      border-radius: 0;
    }

    .panel-encabezado-vis,
    .panel-izquierda-vis,
    .panel-derecha-vis,
    .panel-pie-vis,
    .boton.boton-conacyt {
      display: none;
    }
  }
}
</style>
