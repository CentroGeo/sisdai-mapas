<script>
const eventos = { alCambiarVisibilidad: 'alCambiarVisibilidad' }
</script>

<script setup>
import axios from 'axios'
import { onMounted, ref, toRefs } from 'vue'
import { acomodarReglasWms } from '../utiles/leyenda'
import LeyendaControl from './leyenda/LeyendaControl.vue'

const props = defineProps({
  idCapa: {},

  idMapa: {},

  tituloCapa: {
    type: String,
    default: undefined,
  },

  /**
   * Define si se agrega el control (input) en el titulo de la leyenda. El control se vincula
   * con la visibilidad de la capa.
   *
   * - Tipo: `Boolean`
   * - Valor por defecto: `false`
   * - Reactivo: ✅
   */
  sinControl: {
    type: Boolean,
    default: false,
  },

  /**
   *
   */
  urlCapa: {
    type: String,
    default: undefined,
  },
})

const emits = defineEmits(Object.values(eventos))

const { sinControl, tituloCapa, urlCapa } = toRefs(props)

const clases = ref([])

function actualizarClasesDesdeWms(_url) {
  const fuente = 'https://gema.conahcyt.mx/geoserver/wms'
  // ?service=wms&version=1.3.0&request=GetLegendGraphic&format=application%2Fjson&layer=gref_division_estatal_20_est_a&STYLE=

  const parametros = {
    service: 'wms',
    version: '1.3.0',
    request: 'GetLegendGraphic',
    format: 'application/json',
    layer: 'gref_division_estatal_20_est_a',
    style: undefined,
  }

  console.log(
    fuente +
      '?' +
      Object.entries(parametros)
        .filter(([, valor]) => valor !== undefined) // Filtrar valores con valor
        .map(([id, valor]) => `${id}=${encodeURIComponent(valor)}`)
        .join('&')
  )

  axios(_url)
    .then(({ data, status }) => {
      if (status !== 200) return

      clases.value = acomodarReglasWms(data)
      // console.log(clases)
    })
    .catch(() => {})
}

onMounted(() => {
  actualizarClasesDesdeWms(urlCapa.value)
})
</script>

<template>
  <div
    ref="sisdaiLeyendaExterna"
    class="sisdai-mapa-leyenda"
  >
    <div class="leyenda-titulo">
      <LeyendaControl
        :etiqueta="tituloCapa"
        :simbolo="clases.length === 1 ? clases[0].simbolo : undefined"
        :sinControl="sinControl"
        :encendido="true"
        @alCambiar="valor => emits(eventos.alCambiarVisibilidad, valor)"
      />
    </div>
  </div>
</template>
