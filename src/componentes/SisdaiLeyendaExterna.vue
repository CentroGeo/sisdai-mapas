<script>
const eventos = {
  /**
   *
   */
  alCambiarVisibilidad: 'alCambiarVisibilidad',

  /**
   *
   */
  alCambiarVisibilidadClases: 'alCambiarVisibilidadClases',
}
</script>

<script setup>
import axios from 'axios'
import { onMounted, ref, toRefs, watch } from 'vue'
import { acomodarReglasWms } from '../utiles/leyenda'
import LeyendaControl from './leyenda/LeyendaControl.vue'

const props = defineProps({
  capa: {
    type: String,
    default: undefined,
  },
  estiloCapa: {
    type: String,
    default: undefined,
  },
  filtroCapa: {
    type: String,
    default: undefined,
  },
  fuenteCapa: {
    type: String,
    default: undefined,
  },

  idCapa: {},
  idMapa: {},

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

  tituloCapa: {
    type: String,
    default: undefined,
  },

  visibilidadCapa: {
    type: Boolean,
    default: true,
  },

  /**
   *
   */
  // urlCapa: {
  //   type: String,
  //   default: undefined,
  // },
})

const emits = defineEmits(Object.values(eventos))

const {
  capa,
  estiloCapa,
  fuenteCapa,
  sinControl,
  tituloCapa,
  visibilidadCapa,
} = toRefs(props)

const clases = ref([])

const capaEncendida = ref(visibilidadCapa.value)
// watch(visibilidadCapa, encenderCapa) // cuidado al volver esta propiedad reactiva
watch(capaEncendida, nv => emits(eventos.alCambiarVisibilidad, nv))

const filtroCQL = ref(undefined)
watch(filtroCQL, nv => {
  // console.log('filtro:', nv)
  emits(eventos.alCambiarVisibilidadClases, nv)
})

function urlGeoserver() {
  // ?service=wms&version=1.3.0&request=GetLegendGraphic&format=application%2Fjson&layer=gref_division_estatal_20_est_a&STYLE=

  const parametros = {
    service: 'wms',
    version: '1.3.0',
    request: 'GetLegendGraphic',
    format: 'application/json',
    layer: capa.value,
    style: estiloCapa.value,
  }

  const url =
    fuenteCapa.value +
    '?' +
    Object.entries(parametros)
      .filter(([, valor]) => valor !== undefined) // Filtrar valores con valor
      .map(([id, valor]) => `${id}=${encodeURIComponent(valor)}`)
      .join('&')

  console.log(url)

  return url
}

function actualizarClasesDesdeWms() {
  axios(urlGeoserver())
    .then(({ data, status }) => {
      if (status !== 200) return

      clases.value = acomodarReglasWms(data)

      if (clases.value.length > 1) {
        // console.log(clases.value.map(({ filtro }) => filtro).join(' AND '))
        // console.log(clases.value.map(({ visible }) => visible).join())
      }
    })
    .catch(() => {})
}

onMounted(() => {
  actualizarClasesDesdeWms()
})

watch(
  () =>
    clases.value.map(({ filtro, visible }) => ({
      filtro,
      visible,
    })),
  (nv, vv) => {
    if (nv.length <= 1) return

    // console.log(nv, vv)
    if (vv.every(({ visible }) => !visible)) {
      capaEncendida.value = true
    }

    if (nv.every(({ visible }) => visible)) {
      // console.log('Sin filtro')
      filtroCQL.value = undefined
      return
    }

    if (nv.every(({ visible }) => !visible)) {
      // console.log('Capa apagada')
      capaEncendida.value = false
      return
    }

    filtroCQL.value = clases.value
      .filter(({ visible }) => visible)
      .map(({ filtro }) => filtro)
      .join(' OR ')
  }
)

function encenderCapa(valor) {
  // valor => (capaEncendida = valor)
  capaEncendida.value = valor
  clases.value.forEach((_, idx) => {
    clases.value[idx].visible = valor
    // clase.visible = nv
  })
}
</script>

<template>
  <div
    ref="sisdaiLeyendaExterna"
    class="sisdai-mapa-leyenda"
  >
    <div class="leyenda-titulo">
      <LeyendaControl
        :class="{ 'visible-parcial': clases.some(({ visible }) => !visible) }"
        :etiqueta="tituloCapa"
        :simbolo="clases.length === 1 ? clases[0].simbolo : undefined"
        :sinControl="sinControl"
        :encendido="capaEncendida"
        @alCambiar="encenderCapa"
      />
    </div>
    <div
      v-if="clases.length > 1"
      class="leyenda-clases casillas-subseleccion"
    >
      <ul class="casillas-anidadas">
        <li
          v-for="(clase, idx) in clases"
          :key="`${''}-clase-control-${idx}`"
        >
          <LeyendaControl
            :id="`${''}-clase-control-${idx}`"
            :encendido="clase.visible"
            :etiqueta="clase.titulo"
            :simbolo="clase.simbolo"
            @alCambiar="valor => (clase.visible = valor)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.sisdai-mapa-leyenda {
  .leyenda-titulo .visible-parcial [type='checkbox']:checked + label::after {
    content: '\2f';
  }

  .leyenda-clases {
    padding: 0 0 0 calc(1.25rem + 4px);
  }
}
</style>
