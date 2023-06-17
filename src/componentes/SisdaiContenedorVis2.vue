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

// Variables
$alto-menus: 120px;
$alto-boton-conahcyt: 40px;
$alto-contenedor-vis: calc(100vh - $alto-menus);
$alto-minimo-vis: 300px;

// Disposición
.sisdai-contenedor-vis {
  display: grid;
  grid-gap: 0;
  // grid-template-rows: min($alto-minimo-vis);
  grid-template-rows: auto min($alto-minimo-vis) auto auto auto;

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
      max-height: calc($alto-contenedor-vis - $alto-minimo-vis);
    }
    &.con-panel-encabezado-vis.con-panel-pie-vis {
      .panel-encabezado-vis,
      .panel-pie-vis {
        max-height: calc(($alto-contenedor-vis - $alto-minimo-vis) / 2);
      }
    }
    &.con-panel-izquierda-vis,
    &.con-panel-derecha-vis {
      grid-template-rows: none;
      grid-template-columns: repeat(3, 1fr);
      .panel-izquierda-vis,
      .panel-derecha-vis {
        min-height: $alto-minimo-vis;
        max-height: calc($alto-contenedor-vis - $alto-boton-conahcyt);
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

// Bordes redondeados
.sisdai-contenedor-vis {
  .panel-encabezado-vis,
  .contenido-vis {
    border-radius: 7px 7px 0 0;
  }
  .sisdai-cargando {
    border-radius: 7px;
  }
  &.con-panel-encabezado-vis .contenido-vis {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
  @include mediaquery('esc') {
    &.con-panel-izquierda-vis {
      .panel-izquierda-vis {
        border-top-left-radius: 7px;
      }
      .contenido-vis {
        border-top-left-radius: 0;
      }
    }
    &.con-panel-derecha-vis {
      .contenido-vis {
        border-top-right-radius: 0;
      }
      .panel-derecha-vis {
        border-top-right-radius: 7px;
      }
    }
    &.con-panel-encabezado-vis {
      .panel-derecha-vis,
      .panel-izquierda-vis {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }
  }
}

// Escodner elementos
.sisdai-contenedor-vis {
  &.sin-cargador .sisdai-cargando {
    display: none;
  }

  &.sin-boton-conahcyt {
    padding-bottom: 0;

    .boton.boton-conacyt {
      display: none;
    }

    .contenido-vis,
    .panel-izquierda-vis,
    .panel-derecha-vis,
    .panel-pie-vis {
      border-bottom-right-radius: 7px;
      border-bottom-left-radius: 7px;
    }

    &.con-panel-izquierda-vis .contenido-vis {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
    &.con-panel-derecha-vis {
      .contenido-vis,
      .panel-izquierda-vis {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    &.con-panel-pie-vis {
      .contenido-vis,
      .panel-izquierda-vis,
      .panel-derecha-vis {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }
    }

    @include mediaquery('esc') {
      &.con-panel-izquierda-vis {
        .panel-izquierda-vis {
          border-bottom-right-radius: 0;
        }
        .contenido-vis {
          border-bottom-right-radius: 7px;
        }
      }
      &.con-panel-derecha-vis {
        .contenido-vis {
          border-bottom-left-radius: 7px;
        }
        .panel-derecha-vis {
          border-bottom-left-radius: 0;
        }
      }
      &.con-panel-izquierda-vis.con-panel-derecha-vis {
        .panel-izquierda-vis {
          border-bottom-left-radius: 7px;
        }
        .contenido-vis {
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
      &.con-panel-pie-vis.con-panel-izquierda-vis,
      &.con-panel-pie-vis.con-panel-derecha-vis {
        .panel-izquierda-vis,
        .contenido-vis {
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
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
      border-radius: 0 !important;
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
  // min-width: 800px;
  width: 100%;

  .contenido-vis {
    // min-height: $alto-minimo-vis;
    width: 100%;
  }

  .sisdai-cargando {
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  // Botón conahcyt simepre este pegado abajo
  position: relative;
  padding-bottom: $alto-boton-conahcyt;
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
    scrollbar-width: thin;
  }

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
}
</style>
