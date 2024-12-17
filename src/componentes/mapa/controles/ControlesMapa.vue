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
.sisdai-mapa-control.contenedor-controles-vista {
  display: flex;
  flex-direction: column;
  gap: var(--espacio-entre-botones);
  top: var(--margen);
  right: var(--margen);
}
</style>
