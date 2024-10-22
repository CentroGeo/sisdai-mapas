<script>
const eventos = {
  /**
   *
   */
  alCambiarVisibilidad: 'alCambiarVisibilidad',

  /**
   *
   */
  alCambiarFiltroLeyenda: 'alCambiarFiltroLeyenda'
}
</script>

<script setup>
import axios from 'axios'
import { computed, onMounted, ref, toRefs, watch } from 'vue'
import { parametrosEnFormatoURL } from '../utiles'
import { acomodarReglasWms } from '../utiles/leyenda'
import LeyendaControl from './leyenda/LeyendaControl.vue'

const props = defineProps({
  capa: {
    type: String,
    default: undefined
  },

  deshabilitado: {
    type: Boolean,
    default: false
  },

  estiloCapa: {
    type: String,
    default: undefined
  },

  fuenteCapa: {
    type: String,
    default: undefined
  },

  globoInformativo: {
    type: String,
    default: undefined
  },

  /**
   * Define si se agrega el control (input) en el titulo de la leyenda. El control se vincula
   * con la visibilidad de la capa.
   *
   * - Tipo: `Boolean`
   * - Valor por defecto: `false`
   * - Reactivo: Si.
   */
  sinControl: {
    type: Boolean,
    default: true
  },

  /**
   * Define si se agrega el control (input) en las clases de la leyenda. Cada control se vincula
   * con la visibilidad los elementos que pertenezcan a la clase correspondiente de la capa.
   */
  sinControlClases: {
    type: Boolean,
    default: true
  },

  tituloCapa: {
    type: String,
    default: undefined
  },

  visibilidadCapa: {
    type: [Boolean, Array],
    default: true
  }
})
const emits = defineEmits(Object.values(eventos))

const {
  deshabilitado,
  capa,
  estiloCapa,
  fuenteCapa,
  sinControl,
  sinControlClases,
  tituloCapa,
  visibilidadCapa
} = toRefs(props)

const clases = ref([])
watch(
  () => clases.value.map(({ visible }) => visible),
  (nv) => emits(eventos.alCambiarVisibilidad, nv)
)

function urlGeoserver() {
  const parametros = {
    service: 'wms',
    version: '1.3.0',
    request: 'GetLegendGraphic',
    format: 'application/json',
    layer: capa.value,
    style: estiloCapa.value
  }

  return fuenteCapa.value + '?' + parametrosEnFormatoURL(parametros)
}

function actualizarClasesDesdeWms() {
  axios(urlGeoserver())
    .then(({ data, status }) => {
      if (status !== 200) return

      clases.value = acomodarReglasWms(
        data,
        Array.isArray(visibilidadCapa.value)
          ? visibilidadCapa.value.some((v) => v)
          : visibilidadCapa.value
      )

      // if (clases.value.length > 1) {
      //   // console.log(clases.value.map(({ filtro }) => filtro).join(' AND '))
      //   // console.log(clases.value.map(({ visible }) => visible).join())
      // }
    })
    .catch(() => {})
}
onMounted(actualizarClasesDesdeWms)
watch([capa, estiloCapa, fuenteCapa], actualizarClasesDesdeWms)

/**
 * Filtro aplizable par las capas clasificadas
 */
watch(
  () => {
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
  },
  (nv) => emits(eventos.alCambiarFiltroLeyenda, nv)
)

const capaEncendida = computed({
  // getter
  get() {
    return Array.isArray(visibilidadCapa.value)
      ? visibilidadCapa.value.some((v) => v)
      : visibilidadCapa.value
  },
  // setter
  set(valor) {
    // Note: we are using destructuring assignment syntax here.
    // console.log('cambiar', valor)
    clases.value.forEach((_, idx) => {
      clases.value[idx].visible = valor
    })
  }
})
</script>

<template>
  <div ref="sisdaiLeyendaExterna" class="sisdai-mapa-leyenda">
    <div class="leyenda-titulo">
      <LeyendaControl
        :deshabilitado="deshabilitado"
        :etiqueta="tituloCapa"
        :encendido="capaEncendida"
        :encendidoIndeterminado="
          clases.some(({ visible }) => visible) && !clases.every(({ visible }) => visible)
        "
        :globoInformativo="globoInformativo"
        :simbolo="clases.length === 1 ? clases[0].simbolo : undefined"
        :sinControl="sinControl"
        @alCambiar="(valor) => (capaEncendida = valor)"
      />
    </div>

    <div v-if="clases.length > 1" class="leyenda-clases casillas-subseleccion">
      <ul class="casillas-anidadas">
        <li v-for="(clase, idx) in clases" :key="`${capa}-clase-control-${idx}`">
          <LeyendaControl
            :id="`${capa}-clase-control-${idx}`"
            :encendido="clase.visible"
            :etiqueta="clase.titulo"
            :simbolo="clase.simbolo"
            :sinControl="sinControlClases"
            @alCambiar="(valor) => (clase.visible = valor)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sisdai-mapa-leyenda {
  // .leyenda-titulo .visible-parcial [type='checkbox']:checked + label::after {
  //   content: '\2f';
  // }

  .leyenda-clases {
    padding: 0 0 0 calc(1.25rem + 4px);
  }
}
</style>
