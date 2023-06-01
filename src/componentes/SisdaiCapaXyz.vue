<script setup>
import MonitoreoCargaTeselas from '@/clases/MonitoreoCargaTeselas'
import usarRegistroMapas from '@/composables/usarRegistroMapas'
import { teselas as eventos } from '@/eventos/capa'
import { buscarIdContenedorHtmlSisdai, idAleatorio } from '@/utiles'
import { tipoEstadoCarga } from '@/valores/capa'
import TileLayer from 'ol/layer/Tile'
import TileEventType from 'ol/source/TileEventType'
import XYZ from 'ol/source/XYZ'
import {
  onBeforeUnmount,
  onMounted,
  reactive,
  shallowRef,
  toRefs,
  watch,
} from 'vue'

var idMapa

const props = defineProps({
  id: {
    type: String,
    default: () => idAleatorio(),
  },
  nombre: {
    type: String,
    default: 'Nombre no asignado',
  },
  /**
   * `url`
   * - Tipo: `String`
   * - Valor por defecto: `undefined`
   * - Interactivo: ❌
   *
   * Url remota de la capa.
   */
  url: {
    type: String,
    default:
      'https://{a-c}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png',
  },
})

const emits = defineEmits(Object.values(eventos))

const sisdaiCapaXyz = shallowRef()
const { nombre, url } = toRefs(props)

const monitoreoCargaTeselas = reactive(new MonitoreoCargaTeselas())

watch(
  () => monitoreoCargaTeselas.estdo,
  _estadoCarga => {
    // estatusCarga.value = _estadoCarga
    if (_estadoCarga === tipoEstadoCarga.inicio) {
      emits(eventos.alIniciarCarga)
    } else {
      emits(eventos.alFinalizarCarga, _estadoCarga === tipoEstadoCarga.fin)
    }
  }
)

function agregarCapa(mapa) {
  const source = new XYZ({
    url: url.value,
    crossOrigin: 'Anonymous',
  })

  source.on(TileEventType.TILELOADSTART, () => {
    emits(eventos.alIniciarCargaTesela)
    monitoreoCargaTeselas.inicio++
  })
  source.on(TileEventType.TILELOADEND, () => {
    emits(eventos.alFinalizarCargaTesela, true)
    monitoreoCargaTeselas.fin++
  })
  source.on(TileEventType.TILELOADERROR, () => {
    emits(eventos.alFinalizarCargaTesela, false)
    monitoreoCargaTeselas.error++
  })

  mapa.addLayer(
    new TileLayer({
      source,
      id: props.id,
      nombre: nombre.value,
    })
  )

  watch(nombre, nv => mapa.buscarCapa(props.id).set('nombre', nv))
}

onMounted(() => {
  console.log('sisdaiCapaXyz', props.id)

  idMapa = buscarIdContenedorHtmlSisdai('mapa', sisdaiCapaXyz.value)

  usarRegistroMapas().mapaPromesa(idMapa).then(agregarCapa)
})

onBeforeUnmount(() => {
  console.log('quitando sisdaiCapaXyz', props.id)

  usarRegistroMapas()
    .mapaPromesa(idMapa)
    .then(mapa => {
      mapa.eliminarCapa(props.id)
    })
})
</script>

<template>
  <span
    ref="sisdaiCapaXyz"
    :sisdai-capa="id"
  />
</template>
