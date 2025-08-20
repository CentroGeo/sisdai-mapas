<script setup>
import { computed, inject } from 'vue'
import { MAPA_INYECTADO } from '../../../utiles/identificadores'

const mapa = inject(MAPA_INYECTADO)

const alturaDivisor = computed(() => (mapa.getSize() || [])[1])
const dividir = computed({
  get: () => mapa.dividir,
  set(nv) {
    mapa.dividir = nv
    mapa.render()
  },
})
</script>

<template>
  <input
    :style="`--altura-divisor: ${alturaDivisor}px`"
    class="divisor"
    type="range"
    v-model="dividir"
  />
</template>

<style lang="scss" scoped>
input[type='range'].divisor {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border: 0;
  margin: 0;
  padding: 0;
  height: 0;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  // color: #000;
  cursor: default;

  &::-webkit-slider-runnable-track,
  &::-moz-range-track {
    height: 0rem;
  }

  &::-webkit-slider-thumb,
  &::-moz-range-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    // margin-top: -56px;
    border: none; /*Removes extra border that FF applies*/
    border-radius: 0%;
    cursor: col-resize;

    // --altura-divisor: 10rem;
    height: var(--altura-divisor);
    transform: translateY(calc(var(--altura-divisor) / 2));

    --pictograma-control-divisor: url('https://visualpharm.com/assets/10/Split%20Horizontal-595b40b85ba036ed117dbb41.svg');
    --ancho-fondo-oscuro: 0.25rem; /* ancho de la franja oscura central */
    // --fondo-claro: rgba(0, 0, 0, 0.08); /* orillas claras */
    --fondo-claro: rgba(0, 0, 0, 0); /* orillas claras */
    --fondo-oscuro: rgba(0, 0, 0, 0.625); /* centro oscuro */
    --tamanio-pictograma: 2rem;
    width: var(--tamanio-pictograma);
    background:
      var(--pictograma-control-divisor) center/var(--tamanio-pictograma)
        var(--tamanio-pictograma) no-repeat,
      linear-gradient(90deg, var(--fondo-oscuro), var(--fondo-oscuro))
        center/var(--ancho-fondo-oscuro) 100% no-repeat,
      linear-gradient(90deg, var(--fondo-claro), var(--fondo-claro));
  }
}
</style>
