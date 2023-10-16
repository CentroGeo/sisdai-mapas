<script setup>
import { ref, toRaw, toRefs } from 'vue'
import { tipoGeometria } from '../../valores/capa'

const props = defineProps({
  estilo: {
    typo: Object,
    default: undefined,
  },

  geometria: {
    typo: String,
    default: tipoGeometria.poligono,
  },
})

const { estilo, geometria } = toRefs(props)

const estiloSvg = ref('')

function pasarObjetoATexto(obj) {
  return Object.keys(obj)
    .map(key => `${key}: ${obj[key]}`)
    .join(';')
}

function asgignar(reglas) {
  console.log(toRaw(reglas))

  estiloSvg.value = pasarObjetoATexto({
    fill: reglas['fill'],
    'fill-opacity': reglas['fill-opacity'],
    stroke: reglas['stroke'],
    'stroke-linecap': reglas['stroke-linecap'],
    'stroke-linejoin': reglas['stroke-linejoin'],
    'stroke-opacity': reglas['stroke-opacity'],
    'stroke-width': reglas['stroke-width'],
  })
}

if (geometria.value === tipoGeometria.punto) {
  asgignar(estilo.value.graphics[0])
} else {
  asgignar(estilo.value)
}

const espacio = 18
</script>

<template>
  <svg
    class="figura-variable"
    :width="espacio"
    :height="espacio"
  >
    <circle
      v-if="geometria === tipoGeometria.punto"
      :cx="espacio / 2"
      :cy="espacio / 2"
      r="9"
      :style="estiloSvg"
    />

    <line
      v-if="geometria === tipoGeometria.linea"
      x1="0"
      :y1="espacio / 2"
      :x2="espacio"
      :y2="espacio / 2"
      :style="estiloSvg"
    />

    <rect
      v-if="geometria === tipoGeometria.poligono"
      x="0"
      y="0"
      rx="2"
      ry="2"
      :width="espacio"
      :height="espacio"
      :style="estiloSvg"
    />
  </svg>
</template>

<style lang="scss">
.figura-variable {
  background: none !important;
  border: none !important;
  border-radius: 0 !important;
}
</style>
