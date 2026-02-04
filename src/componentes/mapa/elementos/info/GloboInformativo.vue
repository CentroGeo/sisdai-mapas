<script setup>
import PointerEventType from 'ol/pointer/EventType'
import { inject, reactive, ref, watch } from 'vue'
import { MAPA_INYECTADO } from './../../../../utiles/identificadores'

const mapa = inject(MAPA_INYECTADO)

//

const sisdaiGloboInfo = ref()
const posicion = ref({})
const globo = reactive(new Globo())

function alSalirCursor(target) {
  if (!target) return

  target.addEventListener(
    PointerEventType.POINTERLEAVE,
    () => (globo.visible = false)
  )
}

watch(() => mapa.getTargetElement(), alSalirCursor)
mapa.on(PointerEventType.POINTERMOVE, alMover)
function alMover({ dragging, originalEvent /*, map */ }) {
  if (dragging || originalEvent.target.closest('.sisdai-mapa-control')) {
    globo.visible = false
    return
  }

  globo.pixel = mapa.getEventPixel(originalEvent)

  globo.contenido = mapa.forEachFeatureAtPixel(globo.pixel, (f, l) => {
    const globoInfo = l.get('globoInfo')

    return typeof globoInfo === typeof Function
      ? globoInfo(f.getProperties(), f.getGeometry())
      : globoInfo
  })

  posicion.value = calcularPosicionInfo(globo.pixel, sisdaiGloboInfo.value)
}
</script>

<template>
  <div
    aria-hidden="true"
    aria-live="assertive"
    class="ol-unselectable globo-informacion globo-informacion-capa"
    :class="{ oculto: !globo.visible }"
    ref="sisdaiGloboInfo"
    role="tooltip"
    :style="posicion"
  >
    <div
      class="globo-informacion-cuerpo"
      v-html="globo.contenido"
    />
  </div>
</template>

<script>
class Globo {
  contenido_
  pixel = [0, 0]
  visible = false

  get contenido() {
    return this.contenido_
  }

  set contenido(valor) {
    this.contenido_ = valor

    this.visible = Boolean(this.contenido_ !== undefined)
  }

  get posicion() {
    const x = calcularPosicionInfo(this.pixel, undefined)
    // console.log(x)

    return x
  }
}

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

  display: block;
  visibility: visible;

  &.oculto {
    // display: none;
    visibility: hidden;
  }
}
</style>
