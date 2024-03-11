<script setup>
import axios from 'axios'
// import TileLayer from 'ol/layer/Tile'
// import UTFGrid from 'ol/source/UTFGrid'
import {
  computed,
  onBeforeMount,
  onMounted,
  reactive,
  shallowRef,
  toRefs,
  watch,
} from 'vue'
import usarRegistroMapas from '../composables/usarRegistroMapas'
import { buscarIdContenedorHtmlSisdai, parametrosEnFormatoURL } from '../utiles'
import { props as propsCapa } from './../composables/usarCapa'

// const urlPrueba =
//   'https://gema.conahcyt.mx/geoserver/wms?LAYERS=hcti_snii_sexo_22_est_a&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=application/json;type=utfgrid&WIDTH=1002&HEIGHT=368&BBOX=-128.8452450867052,14.006475722543353,-76.2302549132948,33.24432427745664'

const defaultParametros = {
  SERVICE: 'WMS',
  VERSION: '1.3.0',
  REQUEST: 'GetMap',
  FORMAT: 'application/json;type=utfgrid',

  BBOX: undefined,
  WIDTH: undefined,
  HEIGHT: undefined,
  LAYERS: undefined,
  CQL_FILTER: undefined,
  // PROPERTYNAME: undefined,
}

var idMapa

const props = defineProps({
  capa: {
    typo: String,
    required: true,
  },

  filtro: {
    typo: String,
    required: undefined,
  },

  fuente: {
    typo: String,
    default: 'https://gema.conahcyt.mx/geoserver/wms',
  },

  /**
   * Contenido del globo de información que aparecerá al pasar el cursor sobre la capa.
   * Puede ser una funcion que accede a las propiedades del elemento al que se sobrepone o un texto estatico.
   *
   * - Tipo: `String` o `Function`
   * - Valor por defecto: `undefined`.
   * - Reactivo: ✅
   */
  globoInformativo: {
    type: Function,
    default: undefined,
  },

  ...propsCapa,
})

const sisdaiCapaUtfGrid = shallowRef()
const { globoInformativo, posicion, visible, filtro } = toRefs(props)
const parametrosUtfgrid = reactive({
  ...defaultParametros,
  LAYERS: props.capa,
})

function actualizarParametrosUtfgrid({ target: mapa }) {
  const size = mapa.getSize()
  const extent = mapa.getView().calculateExtent(size)

  parametrosUtfgrid.BBOX = extent.join(',')
  parametrosUtfgrid.WIDTH =
    size[0] % 4 === 0 ? size[0] : size[0] + (size[0] % 4)
  parametrosUtfgrid.HEIGHT =
    size[1] % 4 === 0 ? size[1] : size[1] + (size[1] % 4)

  // console.log(toRaw(parametrosUtfgrid))
}

const urlUtfGrid = computed(() => {
  return `${props.fuente}?${parametrosEnFormatoURL({ ...parametrosUtfgrid, CQL_FILTER: filtro.value })}`
})

function agregar() {
  usarRegistroMapas()
    .mapaPromesa(idMapa)
    .then(mapa => {
      mapa.rejillasUtf[props.id] = {
        visible: visible.value,
        posicion: Number(posicion.value),
        globoInfo: globoInformativo.value,
        resultado: undefined,
      }

      mapa.on('moveend', actualizarParametrosUtfgrid)
      watch(urlUtfGrid, nv => {
        // console.log(props.capa, nv)
        mapa.rejillasUtf[props.id].resultado = undefined
        axios(nv)
          .then(({ data }) => {
            // console.log(data)
            // mapa.rejillasUtf[props.id] = {
            //   ...mapa.rejillasUtf[props.id],
            //   ...data,
            // }
            mapa.rejillasUtf[props.id].resultado = data
          })
          .catch(() => {})
      })
    })
}

onMounted(() => {
  // console.log('sisdaiCapaUtfGrid')
  idMapa = buscarIdContenedorHtmlSisdai('mapa', sisdaiCapaUtfGrid.value)

  // usarRegistroMapas().mapaPromesa(idMapa).then(configuracion)
  agregar()
})

onBeforeMount(() => {
  usarRegistroMapas()
    .mapaPromesa(idMapa)
    .then(mapa => {
      mapa.un('moveend', actualizarParametrosUtfgrid)
    })
})
</script>

<template>
  <span ref="sisdaiCapaUtfGrid" />
</template>
