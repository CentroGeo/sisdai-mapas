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

const anchoControl = 40
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

  /* Track para Chrome / Safari */
  &::-webkit-slider-runnable-track {
    height: 0.1rem; /* Chrome requiere un alto mínimo */
    background: transparent;
    border: none;
  }
  &::-moz-range-track {
    height: 0rem;
  }

  // --pictograma-control-divisor: url('https://visualpharm.com/assets/10/Split%20Horizontal-595b40b85ba036ed117dbb41.svg');
  --ancho-lina-visible: 0.25rem; /* ancho de la franja oscura central */
  // --lina-visible: rgba(0, 0, 0, 0.625); /* centro oscuro */
  --lina-visible: var(--boton-primario-fondo); /* centro oscuro */
  // --fondo-no-visible: rgba(0, 0, 0, 0.08); /* orillas claras */
  --fondo-no-visible: rgba(0, 0, 0, 0); /* orillas claras */

  /* Thumb para Chrome / Safari */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    border-radius: 0%;
    cursor: col-resize;

    height: var(--altura-divisor);
    width: var(--ancho-control);
    margin-top: 0.05rem; /* centra el thumb */

    background:
      // url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50'><text x='50%' y='50%' font-size='32' text-anchor='middle' dominant-baseline='middle' fill='white'>&lt; &gt;</text></svg>")
      //   // url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='50' viewBox='0 0 120 50'><g fill='none' stroke='currentColor' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'><line x1='50' y1='6' x2='20' y2='25'/><line x1='20' y1='25' x2='50' y2='44'/><line x1='70' y1='6' x2='100' y2='25'/><line x1='100' y1='25' x2='70' y2='44'/></g></svg>")
      // center/60% no-repeat,
      radial-gradient(circle, var(--lina-visible) 70%, transparent 71%)
        center/var(--ancho-control) var(--ancho-control) no-repeat,
      linear-gradient(90deg, var(--lina-visible), var(--lina-visible))
        center/var(--ancho-lina-visible) 100% no-repeat,
      linear-gradient(90deg, var(--fondo-no-visible), var(--fondo-no-visible));
  }

  &::-moz-range-thumb {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    border-radius: 0%;
    cursor: col-resize;

    width: var(--ancho-control);
    height: var(--altura-divisor);
    transform: translateY(
      calc(var(--altura-divisor) / 2)
    ); /* centra el thumb */

    // background:
    //   var(--pictograma-control-divisor) center/var(--ancho-control)
    //     var(--ancho-control) no-repeat,
    //   linear-gradient(90deg, var(--lina-visible), var(--lina-visible))
    //     center/var(--ancho-lina-visible) 100% no-repeat,
    //   linear-gradient(90deg, var(--fondo-no-visible), var(--fondo-no-visible));

    background:
      // url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50'><text x='50%' y='50%' font-size='32' text-anchor='middle' dominant-baseline='middle' fill='white'>&lt; &gt;</text></svg>")
      //   // url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='50' viewBox='0 0 120 50'><g fill='none' stroke='currentColor' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'><line x1='50' y1='6' x2='20' y2='25'/><line x1='20' y1='25' x2='50' y2='44'/><line x1='70' y1='6' x2='100' y2='25'/><line x1='100' y1='25' x2='70' y2='44'/></g></svg>")
      // center/60% no-repeat,
      radial-gradient(circle, var(--lina-visible) 70%, transparent 71%)
        center/var(--ancho-control) var(--ancho-control) no-repeat,
      linear-gradient(90deg, var(--lina-visible), var(--lina-visible))
        center/var(--ancho-lina-visible) 100% no-repeat,
      linear-gradient(90deg, var(--fondo-no-visible), var(--fondo-no-visible));
  }
}
</style>
