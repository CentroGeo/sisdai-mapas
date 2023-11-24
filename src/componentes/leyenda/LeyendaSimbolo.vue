<script setup>
import { reactive, ref, toRaw, toRefs, watch } from 'vue'
import { traducirEstilo } from '../../utiles/estiloVectores'
import { tipoGeometria, tiposCapa } from '../../valores/capa'

const props = defineProps({
  estilo: {
    typo: Object,
    default: undefined,
  },

  geometria: {
    typo: String,
    default: tipoGeometria.poligono,
  },

  tipoCapa: {
    typo: String,
    required: true,
  },
})

const { estilo, geometria, tipoCapa } = toRefs(props)

const dimensiones = reactive({
  espacio: 18,
  radio: 9,
  margen: 0,
})
const estiloSvg = ref('')

function pasarObjetoATexto(obj) {
  return Object.keys(obj)
    .map(key => `${key}: ${obj[key]}`)
    .join(';')
}

function asgignar(reglas) {
  // console.log(toRaw(reglas))
  dimensiones.margen =
    Number(reglas['stroke-width']) > 0.5 ? Number(reglas['stroke-width']) : 0.5
  dimensiones.radio = dimensiones.espacio / 2 - dimensiones.margen

  estiloSvg.value = pasarObjetoATexto({
    fill:
      tipoCapa.value === tiposCapa.wms
        ? reglas['fill']
          ? reglas['fill']
          : 'transparent'
        : reglas['fill-color'],
    'fill-opacity': reglas['fill-opacity'],
    // stroke: reglas['stroke'],
    stroke:
      reglas[
        tipoCapa.value === tiposCapa.vectorial ? 'stroke-color' : 'stroke'
      ],
    'stroke-linecap': reglas['stroke-linecap'],
    'stroke-linejoin': reglas['stroke-linejoin'],
    'stroke-opacity': reglas['stroke-opacity'],
    'stroke-width': dimensiones.margen,
  })
}

function preAsignar(_estilo) {
  if (tipoCapa.value === tiposCapa.vectorial) {
    asgignar(traducirEstilo(_estilo))
  } else {
    if (geometria.value === tipoGeometria.punto) {
      console.log(toRaw(_estilo.size))
      dimensiones.espacio = Number(_estilo.size) + 2
      asgignar(_estilo.graphics[0])
    } else {
      asgignar(_estilo)
    }
  }
}

preAsignar(estilo.value)
watch(estilo, preAsignar)
</script>

<template>
  <svg
    class="figura-variable"
    :width="dimensiones.espacio"
    :height="dimensiones.espacio"
    :style="`--controlador-vis-figura-alto: ${dimensiones.espacio}px;`"
  >
    <circle
      v-if="geometria === tipoGeometria.punto"
      :cx="dimensiones.espacio / 2"
      :cy="dimensiones.espacio / 2"
      :r="dimensiones.radio"
      :style="estiloSvg"
    />

    <line
      v-if="geometria === tipoGeometria.linea"
      x1="0"
      :y1="dimensiones.espacio / 2"
      :x2="dimensiones.espacio"
      :y2="dimensiones.espacio / 2"
      :style="estiloSvg"
    />

    <rect
      v-if="geometria === tipoGeometria.poligono"
      :x="dimensiones.margen"
      :y="dimensiones.margen"
      rx="2"
      ry="2"
      :width="dimensiones.radio * 2"
      :height="dimensiones.radio * 2"
      :style="estiloSvg"
    />
  </svg>
</template>

<style lang="scss">
// .figura-variable {
//   background: none !important;
//   border: none !important;
//   border-radius: 0 !important;
// }
</style>
