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

<style lang="scss" scoped>
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
}
</style>
