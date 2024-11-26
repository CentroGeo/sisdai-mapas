<script setup>
import { inject, ref } from 'vue'
import { MAPA_INYECTADO } from './../../../../utiles/identificadores'
import PointerEventType from 'ol/pointer/EventType'

const visible = ref(false)
const sisdaiGloboInfo = ref()
const posicion = ref({})

const mapa = inject(MAPA_INYECTADO)
mapa
  .busquedaPromesa(m => m.getTargetElement())
  .then(t => {
    t.addEventListener(
      PointerEventType.POINTERLEAVE,
      () => (visible.value = false)
    )
  })
mapa.on(PointerEventType.POINTERMOVE, alMover)
function alMover({ dragging, originalEvent /*, map */ }) {
  if (dragging || originalEvent.target.closest('.sisdai-mapa-control')) return

  visible.value = true

  posicion.value = calcularPosicionInfo(
    mapa.getEventPixel(originalEvent),
    sisdaiGloboInfo.value
  )
}

const contenido = 'ok'
</script>

<template>
  <div
    aria-live="assertive"
    class="globo-informacion globo-informacion-capa"
    :class="{ oculto: !visible }"
    ref="sisdaiGloboInfo"
    role="tooltip"
    :style="posicion"
  >
    <div class="globo-informacion-cuerpo">{{ contenido }}</div>
  </div>
</template>

<script>
/**
 * Calcula la posición que podría tomar el globo de información considerando el margen definido
 * en el globo así como la posición del pixel original en relación con el mapa:
 *
 * - Si la posición original está por debajo de la mitad del alto del mapa, la posición
 * calculada será considerada para mostrar el globo encima de la posicion original.
 * - Si la posición original está por encima de la mitad del alto del mapa, la posición
 * calculada será considerada para mostrar el globo debajo de la posicion original.
 * - Si la posición original está a la izquierda de la mitad del ancho del mapa, la posición
 * calculada será considerada para mostrar el globo a la derecha de la posicion original.
 * - Si la posición original está a la derecha de la mitad del ancho del mapa, la posición
 * calculada será considerada para mostrar el globo a la izquierda de la posicion original.
 *
 * @param {Array<Number>} coordenadas
 * @param {HTMLElement} contenedor
 * @param {Number} margen
 * @returns {Object}
 */
export function calcularPosicionInfo([x, y], contenedor, margen = 8) {
  return {
    left:
      x -
      (x > (contenedor?.parentElement.clientWidth || 0) / 2
        ? (contenedor?.clientWidth || 0) + margen
        : -margen) +
      'px',
    top:
      y -
      (y > (contenedor?.parentElement.clientHeight || 0) / 2
        ? (contenedor?.clientHeight || 0) + margen
        : -margen) +
      'px',
  }
}
</script>

<style lang="scss" scoped>
.sisdai-mapa.contenedor-vis .contenido-vis .globo-informacion-capa {
  position: absolute;
}
</style>
