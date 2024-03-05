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

  /**
   *
   */
  alCambiarFiltroLeyenda: 'alCambiarFiltroLeyenda',
}
</script>

<script setup>
import axios from 'axios'
import { computed, onMounted, ref, toRefs, watch } from 'vue'
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
  // filtroCapa: {
  //   type: String,
  //   default: undefined,
  // },
  fuenteCapa: {
    type: String,
    default: undefined,
  },

  // idCapa: {},
  // idMapa: {},

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
    default: true,
  },

  /**
   * Define si se agrega el control (input) en las clases de la leyenda. Cada control se vincula
   * con la visibilidad los elementos que pertenezcan a la clase correspondiente de la capa.
   */
  sinControlClases: {
    type: Boolean,
    default: true,
  },

  tituloCapa: {
    type: String,
    default: undefined,
  },

  visibilidadCapa: {
    type: [Boolean, Array],
    default: true,
  },
})

const emits = defineEmits(Object.values(eventos))

const {
  capa,
  estiloCapa,
  fuenteCapa,
  sinControl,
  sinControlClases,
  tituloCapa,
  visibilidadCapa,
} = toRefs(props)

const clases = ref([])
watch(
  () => clases.value.map(({ visible }) => visible),
  nv => {
    // console.log(nv)
    // No hay clases
    if (nv.length < 1) return

    if (nv.length === 1) {
      // Si solo hay una clase, no hay clasificación de la capa
      emits(eventos.alCambiarVisibilidad, nv[0])
      return
    }

    if (nv.every(visible => visible)) {
      // Todas las clases visibles
      capaEncendida.value = true
    }

    if (nv.every(visible => !visible)) {
      // Todas las clases apagadas
      capaEncendida.value = false
    }

    emits(eventos.alCambiarVisibilidad, nv)
  }
)

// const indeterminado = computed(
//   () =>
//     clases.value.some(({ visible }) => visible) &&
//     !clases.value.every(({ visible }) => visible)
// )

const capaEncendida = ref(visibilidadCapa.value)
watch(visibilidadCapa, encenderCapa) // cuidado al volver esta propiedad reactiva
// watch(capaEncendida, nv => emits(eventos.alCambiarVisibilidad, nv))

// const filtroCQL = ref(undefined)
// watch(filtroCQL, nv => {
//   // console.log('filtro:', nv)
//   emits(eventos.alCambiarVisibilidadClases, nv)
// })

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

  // console.log(url)

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
watch([capa, estiloCapa, fuenteCapa], () => actualizarClasesDesdeWms())

/**
 * Filtro aplizable par las capas clasificadas
 */
const filtroLeyenda = computed(() => {
  // if (clases.value.length <= 1) {
  //   // Si solo hay una clase, no hay clasificación de la capa
  //   return undefined
  // }

  if (
    clases.value.every(({ visible }) => visible) ||
    clases.value.every(({ visible }) => !visible)
  ) {
    return undefined
  }

  return clases.value
    .filter(({ visible }) => visible)
    .map(({ filtro }) => filtro)
    .join(' OR ')
})
watch(filtroLeyenda, nv => emits(eventos.alCambiarFiltroLeyenda, nv))

function encenderCapa(valor) {
  // valor => (capaEncendida = valor)
  capaEncendida.value = valor
  clases.value.forEach((_, idx) => {
    clases.value[idx].visible = valor
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
        :etiqueta="tituloCapa"
        :simbolo="clases.length === 1 ? clases[0].simbolo : undefined"
        :sinControl="sinControl"
        :encendido="capaEncendida"
        :encendidoIndeterminado="
          clases.some(({ visible }) => visible) &&
          !clases.every(({ visible }) => visible)
        "
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
          :key="`${capa}-clase-control-${idx}`"
        >
          <LeyendaControl
            :id="`${capa}-clase-control-${idx}`"
            :encendido="clase.visible"
            :etiqueta="clase.titulo"
            :simbolo="clase.simbolo"
            :sinControl="sinControlClases"
            @alCambiar="valor => (clase.visible = valor)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.sisdai-mapa-leyenda {
  // .leyenda-titulo .visible-parcial [type='checkbox']:checked + label::after {
  //   content: '\2f';
  // }

  .leyenda-clases {
    padding: 0 0 0 calc(1.25rem + 4px);
  }
}
</style>
