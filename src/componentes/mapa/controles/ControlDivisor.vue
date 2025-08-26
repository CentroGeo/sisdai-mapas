<script setup>
import { computed, inject } from 'vue'
import { MAPA_INYECTADO } from '../../../utiles/identificadores'

const mapa = inject(MAPA_INYECTADO)

const tamanioMapa = computed(() => mapa.getSize() || [])
const dividir = computed({
  get: () => mapa.dividir,
  set(nv) {
    mapa.dividir = nv
    mapa.render()
  },
})

const anchoControl = 32
const minimo = computed(() => (anchoControl / tamanioMapa.value[0] / 2) * 100)
</script>

<template>
  <input
    :style="`--altura-divisor: ${tamanioMapa[1]}px; --ancho-control: ${anchoControl}px`"
    class="divisor"
    type="range"
    v-model="dividir"
    :min="minimo"
    :max="100 - minimo"
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
    --fondo-oscuro: rgba(0, 0, 0, 0.625); /* centro oscuro */
    // --ancho-control: 2rem;
    // --fondo-claro: rgba(0, 0, 0, 0.08); /* orillas claras */
    --fondo-claro: rgba(0, 0, 0, 0); /* orillas claras */
    width: var(--ancho-control);
    background:
      var(--pictograma-control-divisor) center/var(--ancho-control)
        var(--ancho-control) no-repeat,
      linear-gradient(90deg, var(--fondo-oscuro), var(--fondo-oscuro))
        center/var(--ancho-fondo-oscuro) 100% no-repeat,
      linear-gradient(90deg, var(--fondo-claro), var(--fondo-claro));
  }
}
</style>
