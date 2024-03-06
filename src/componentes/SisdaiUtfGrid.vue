<script setup>
import axios from 'axios'
// import TileLayer from 'ol/layer/Tile'
// import UTFGrid from 'ol/source/UTFGrid'
import { onBeforeMount, onMounted, ref, shallowRef, toRaw, watch } from 'vue'
import usarRegistroMapas from '../composables/usarRegistroMapas'
import { buscarIdContenedorHtmlSisdai, idAleatorio } from '../utiles'

// const urlPrueba =
//   'https://gema.conahcyt.mx/geoserver/wms?LAYERS=hcti_snii_sexo_22_est_a&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=application/json;type=utfgrid&WIDTH=1002&HEIGHT=368&BBOX=-128.8452450867052,14.006475722543353,-76.2302549132948,33.24432427745664'

const defaultParametros = {
  SERVICE: 'WMS',
  VERSION: '1.3.0',
  REQUEST: 'GetMap',
  FORMAT: 'application/json;type=utfgrid',
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

  id: {
    type: String,
    default: () => idAleatorio(),
  },
})

const sisdaiCapaUtfGrid = shallowRef()
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

function configuracion(mapa) {
  // const gridLayer = new TileLayer({
  //   // source: gridSource
  //   source: undefined,
  // })

  // mapa.addLayer(gridLayer.value)
  mapa.on('moveend', actualizarUrl)
  mapa.on('pointermove', buscarDatos)

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

onMounted(() => {
  console.log('sisdaiCapaUtfGrid')
  idMapa = buscarIdContenedorHtmlSisdai('mapa', sisdaiCapaUtfGrid.value)

  usarRegistroMapas().mapaPromesa(idMapa).then(configuracion)
  console.log(idMapa)
})

onBeforeMount(() => {
  usarRegistroMapas()
    .mapaPromesa(idMapa)
    .then(mapa => {
      mapa.un('moveend', actualizarUrl)
    })
})
</script>

<template>
  <span ref="sisdaiCapaUtfGrid" />
</template>
