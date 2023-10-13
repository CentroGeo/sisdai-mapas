<script setup>
import { computed, ref, toRefs, watch } from 'vue'
import { traducirEstilo } from '../utiles/estiloVectores'
import { estiloVector, tipoGeometria } from '../valores/capa'

const props = defineProps({
  estiloCapa: {
    type: Object,
    default: estiloVector,
  },

  tipoCapa: {
    type: String,
    default: undefined,
  },

  geometriaCapa: {
    type: String,
    default: undefined,
  },
})

const { estiloCapa, geometriaCapa } = toRefs(props)

const estiloConbinado = computed(() =>
  traducirEstilo({ ...estiloVector, ...estiloCapa.value })
)

// console.log(traducirEstilo(estiloCapa.value))

const geometriaDetectada = ref(undefined)
const geometria = computed(() => {
  return geometriaCapa.value ? geometriaCapa.value : geometriaDetectada.value
})

const estiloSvg = ref('')
const pictograma = ref(undefined)
function asignar(original, tradiucido) {
  if (Object.hasOwnProperty.call(tradiucido, 'icon-src')) {
    pictograma.value = tradiucido['icon-src']
    geometriaDetectada.value = tipoGeometria.punto
    return
  } else {
    pictograma.value = undefined
    geometriaDetectada.value = undefined
  }

  // if (stringifyIguales(original, estiloVector)) {
  //   console.log('tiene el estilo por defecto')
  // }

  // console.log(tradiucido)
  // if (Object.keys(tradiucido).some(key => key.startsWith('circle'))) {
  //   console.log('es un circulo')
  //   geometriaDetectada.value = tipoGeometria.punto
  // }

  estiloSvg.value = pasarObjetoATexto({
    fill: tradiucido['fill-color'],
    stroke: tradiucido['stroke-color'],
    'stroke-width': tradiucido['stroke-width'],
  })
}
watch(estiloCapa, nv => asignar(nv, traducirEstilo(nv)))

// onMounted(() => {})

const espacio = 18

function pasarObjetoATexto(obj) {
  return Object.keys(obj)
    .map(key => `${key}: ${obj[key]}`)
    .join(';')
}
</script>

<template>
  <svg
    :width="espacio"
    :height="espacio"
    class="figura-variable"
  >
    <circle
      v-if="geometria === tipoGeometria.punto && pictograma === undefined"
      :cx="espacio / 2"
      :cy="espacio / 2"
      r="8"
      :style="estiloSvg"
    />

    <image
      v-if="geometria === tipoGeometria.punto && pictograma !== undefined"
      x="0"
      y="0"
      :width="espacio"
      :height="espacio"
      :href="pictograma"
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
      v-if="geometria === tipoGeometria.poligono || geometria === undefined"
      x="1"
      y="1"
      rx="2"
      ry="2"
      :width="espacio - 2"
      :height="espacio - 2"
      :style="estiloSvg"
    />
  </svg>
  <!-- <span
    class="figura-variable"
    :style="{
      background: estiloConbinado['fill-color'],
      'border-color': estiloConbinado['stroke-color'],
      'border-width': `${estiloConbinado['stroke-width']}px`,
    }"
  /> -->
</template>

<style lang="scss">
.figura-variable {
  background: none !important;
  border: none !important;
  border-radius: 0 !important;
}
</style>
