<script setup>
import axios from 'axios'
// import TileLayer from 'ol/layer/Tile'
// import UTFGrid from 'ol/source/UTFGrid'
import {
  computed,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  shallowRef,
  toRaw,
  toRefs,
  watch,
} from 'vue'
import usarRegistroMapas from '../composables/usarRegistroMapas'
import { buscarIdContenedorHtmlSisdai } from '../utiles'
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
}

var idMapa

const props = defineProps({
  capa: {
    typo: String,
    required: true,
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
const { globoInformativo, posicion, visible } = toRefs(props)
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
  return `${props.fuente}?${parametrosEnFormatoURL(parametrosUtfgrid)}`
})

const urlDinamica = ref('')
// const gridSource = ref(undefined)
// const gridLayer = ref(
//   new TileLayer({
//     // source: gridSource
//     source: undefined,
//   })
// )
const grid = ref({})

function parametrosEnFormatoURL(parametros) {
  return Object.entries(parametros)
    .filter(([, valor]) => valor !== undefined) // Filtrar valores con valor
    .map(([id, valor]) => `${id}=${encodeURIComponent(valor)}`)
    .join('&')
}

function actualizarUrl({ target: mapa }) {
  const size = mapa.getSize()
  const extent = mapa.getView().calculateExtent(size)

  const parametros = {
    ...defaultParametros,
    LAYERS: props.capa,
    BBOX: extent.join(','),
    WIDTH: size[0] % 4 === 0 ? size[0] : size[0] + (size[0] % 4),
    HEIGHT: size[1] % 4 === 0 ? size[1] : size[1] + (size[1] % 4),
    // WIDTH: size[0],
    // HEIGHT: size[1],
  }

  urlDinamica.value = `${props.fuente}?${parametrosEnFormatoURL(parametros)}`
}

function obtenerCodigoCaracterParaUtfGrid(code) {
  //hay caracteres que hay que escapar y aparte debemos empezar en 32
  let code2 = code
  if (code2 >= 93) {
    code2--
  }
  if (code2 >= 35) {
    code2--
  }
  code2 -= 32

  return code2
}

function buscarDatos({ dragging, pixel }) {
  // console.log(evt)
  if (dragging) return

  const posicion = [parseInt(pixel[0] / 4), parseInt(pixel[1] / 4)]
  // console.log(posicion)
  const posicionGrid = grid.value.grid[posicion[1]].charCodeAt(posicion[0])
  // console.log(posicionGrid)
  const code = obtenerCodigoCaracterParaUtfGrid(posicionGrid)
  // console.log(code)

  if (code > 0) {
    const id = grid.value.keys[code]
    // console.log(id)
    const data = grid.value.data[id]
    console.log(toRaw(data.nom_ent))
  }
}

function configuracion(/* mapa */) {
  // const gridLayer = new TileLayer({
  //   // source: gridSource
  //   source: undefined,
  // })

  // mapa.addLayer(gridLayer.value)
  // mapa.on('moveend', actualizarUrl)
  // mapa.on('pointermove', buscarDatos)

  watch(urlDinamica, nv => {
    axios(nv)
      .then(({ data }) => {
        console.log(data)
        grid.value = data
      })
      .catch(() => {})

    // gridLayer.value.setSource(
    //   new UTFGrid({
    //     url: nv,
    //   })
    // )

    // gridSource.value = new UTFGrid({
    //   url: nv,
    // })
    console.log(nv)
  })
}

function agregar() {
  usarRegistroMapas()
    .mapaPromesa(idMapa)
    .then(mapa => {
      mapa.rejillasUtf[props.id] = {
        visible: visible.value,
        posicion: posicion.value,
        globoInfo: globoInformativo.value,
      }

      mapa.on('moveend', actualizarParametrosUtfgrid)
      watch(urlUtfGrid, nv => {
        // console.log(props.id, nv)
        axios(nv)
          .then(({ data }) => {
            // console.log(data)
            // mapa.rejillasUtf[props.id] = {
            //   ...mapa.rejillasUtf[props.id],
            //   ...data,
            // }
            mapa.rejillasUtf[props.id].rejilla = data
          })
          .catch(() => {})
      })
    })
}

onMounted(() => {
  console.log('sisdaiCapaUtfGrid')
  idMapa = buscarIdContenedorHtmlSisdai('mapa', sisdaiCapaUtfGrid.value)

  usarRegistroMapas().mapaPromesa(idMapa).then(configuracion)
  agregar()
})

onBeforeMount(() => {
  usarRegistroMapas()
    .mapaPromesa(idMapa)
    .then(mapa => {
      mapa.un('moveend', actualizarUrl)
      mapa.un('pointermove', buscarDatos)
    })
})
</script>

<template>
  <span ref="sisdaiCapaUtfGrid" />
</template>
