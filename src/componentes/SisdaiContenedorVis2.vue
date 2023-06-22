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
// @import './../estilos/ContenedorVis';
@charset 'UTF-8';
@import 'sisdai-css/src/_variables';
@import 'sisdai-css/src/_mixins';
@import 'sisdai-css/src/reticula/contenedor-vis';

// Variables
$alto-menus: 120px;
$alto-boton-conahcyt: 40px;
$alto-maximo-contenedor-vis: calc(100vh - $alto-menus);
$alto-minimo-vis: 300px;

// Disposición
.contenedor-vis {
  // Filas por defecto
  .panel-encabezado-vis {
    grid-row: 1;
  }
  .contenido-vis {
    grid-row: 2;
  }
  .panel-izquierda-vis {
    grid-row: 3;
  }
  .panel-derecha-vis {
    grid-row: 4;
  }
  .panel-pie-vis {
    grid-row: 5;
  }

  @include mediaquery('esc') {
    // grid-template-rows: 0 min($alto-minimo-vis) 0;
    .panel-encabezado-vis,
    .panel-pie-vis {
      max-height: calc($alto-maximo-contenedor-vis - $alto-minimo-vis);
    }
    &.con-panel-encabezado-vis.con-panel-pie-vis {
      .panel-encabezado-vis,
      .panel-pie-vis {
        max-height: calc(($alto-maximo-contenedor-vis - $alto-minimo-vis) / 2);
      }
    }
    &.con-panel-izquierda-vis,
    &.con-panel-derecha-vis {
      grid-template-rows: none;
      grid-template-columns: repeat(3, 1fr);
      .panel-izquierda-vis,
      .panel-derecha-vis {
        min-height: $alto-minimo-vis;
        max-height: calc($alto-maximo-contenedor-vis - $alto-boton-conahcyt);
      }
    }
    &.con-panel-izquierda-vis {
      .panel-izquierda-vis {
        // grid-row-start / grid-column-start / grid-row-end / grid-column-end
        grid-area: 2 / 1 / span 1 / span 1;
      }
      .contenido-vis {
        grid-area: 2 / 2 / span 1 / span 2;
      }
    }
    &.con-panel-derecha-vis {
      .contenido-vis {
        grid-area: 2 / 1 / span 1 / span 2;
      }
      .panel-derecha-vis {
        grid-area: 2 / 3 / span 1 / span 1;
      }
    }
    &.con-panel-encabezado-vis,
    &.con-panel-pie-vis {
      grid-template-rows: auto min($alto-minimo-vis) auto;
      &.con-panel-izquierda-vis,
      &.con-panel-derecha-vis {
        .panel-encabezado-vis {
          grid-area: 1 / 1 / span 1 / span 3;
        }
        .panel-pie-vis {
          grid-area: 3 / 1 / span 1 / span 3;
        }
      }
      &.con-panel-izquierda-vis.con-panel-derecha-vis {
        .panel-encabezado-vis {
          grid-area: 1 / 1 / span 1 / span 4;
        }
        .panel-pie-vis {
          grid-area: 3 / 1 / span 1 / span 4;
        }
      }
    }
    &.con-panel-izquierda-vis.con-panel-derecha-vis {
      grid-template-columns: repeat(4, 1fr);
      .contenido-vis {
        grid-area: 2 / 2 / span 1 / span 2;
      }
      .panel-derecha-vis {
        grid-area: 2 / 4 / span 1 / span 1;
      }
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

// .contenedor-vis {
// Para verificar que no sobresalga de su espacio, escimandolo al boton pie
// .boton.boton-conacyt {
//   z-index: 1;
// }
// .contenido-vis,
// .sisdai-cargando,
// .panel-encabezado-vis,
// .panel-izquierda-vis,
// .panel-derecha-vis,
// .panel-pie-vis {
//   z-index: 2;
// }
// }
</style>
