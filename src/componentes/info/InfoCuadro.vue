<script>
const eventos = {
  alCerrar: 'alCerrar',
}
</script>

<script setup>
import { onUnmounted, ref, toRefs, watch } from 'vue'
import { calcularPosicionInfo } from '../../clases/CuadroInfo'

const props = defineProps({
  contenido: {
    type: String,
    default: undefined,
  },
  pixel: {
    type: Array,
    default: () => [0, 0],
  },
  visible: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(Object.values(eventos))

const { contenido, pixel, visible } = toRefs(props)
const sisdaiCuadroInfo = ref()
const posicion = ref(calcularPosicionInfo(pixel.value))

function calcular() {
  posicion.value = calcularPosicionInfo(pixel.value, sisdaiCuadroInfo.value, 0)
}

var intervalo
watch(visible, nv => {
  if (nv) {
    intervalo = setInterval(calcular, 100)
  } else {
    clearInterval(intervalo)
  }
})
onUnmounted(() => clearInterval(intervalo))
</script>

<template>
  <div
    ref="sisdaiCuadroInfo"
    class="contenedor-globo-info-ext"
    :class="{ esconder: !visible }"
    :style="`left: ${posicion.x}px; top: ${posicion.y}px;`"
    aria-live="assertive"
  >
    <button
      class="boton-icono boton-chico z"
      @click="emits(eventos.alCerrar)"
    >
      <span class="icono-cerrar" />
    </button>
    <div
      class="cuerpo-globo-info"
      v-html="contenido"
    />
  </div>
</template>
