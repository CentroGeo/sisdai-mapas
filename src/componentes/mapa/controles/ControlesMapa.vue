<script setup>
import { inject } from 'vue'
import { MAPA_INYECTADO } from '../../../utiles/identificadores'
import BotonAcercamiento from './BotonAcercamiento.vue'

const mapa = inject(MAPA_INYECTADO)
</script>

<template>
  <div class="sisdai-mapa-control contenedor-controles-vista ol-unselectable">
    <BotonAcercamiento
      nombre="Acercar"
      pictograma="agregar"
      @click="mapa.acercar(1)"
    />
    <BotonAcercamiento
      nombre="Alejar"
      pictograma="restar"
      @click="mapa.acercar(-1)"
    />
    <BotonAcercamiento
      nombre="Centrar"
      pictograma="mapa-centro"
      @click="mapa.ajustarVista()"
    />
  </div>
</template>

<style lang="scss">
.sisdai-mapa-control {
  --margen: 16px;
  --alto-boton: 40px;
  --ancho-boton: 40px;
  --espacio-entre-botones: 4px;

  position: absolute;
  z-index: 1;

  > button {
    height: var(--alto-boton);
    width: var(--ancho-boton);
  }
  &.contenedor-controles-vista {
    display: flex;
    flex-direction: column;
    gap: var(--espacio-entre-botones);
    top: var(--margen);
    right: var(--margen);
  }

  //
  &-escala-grafica {
    bottom: calc(var(--margen) / 2);
    left: calc(var(--margen) / 2);

    .sisdai-mapa-escala-numerica {
      position: absolute;
      bottom: 0;
      width: 100%;
      color: transparent;
    }

    .ol-scale-bar-inner {
      .ol-scale-text {
        bottom: unset;
        color: transparent;
        text-shadow: none;
        &:before {
          content: 'Escala ';
        }
      }
      .ol-scale-step-marker {
        height: 10px;
        top: 0px !important;
      }
      .ol-scale-singlebar {
        height: 3px;
        top: 8px;
      }
      .ol-scale-step-text {
        bottom: 10px;
        font-size: 11px;
      }
      div > .ol-scale-step-marker {
        top: -2px !important;
      }
    }
  }
}
</style>
