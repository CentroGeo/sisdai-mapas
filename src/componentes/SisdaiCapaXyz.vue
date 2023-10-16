<script setup>
import TileLayer from 'ol/layer/Tile'
import TileEventType from 'ol/source/TileEventType'
import XYZ from 'ol/source/XYZ'
import { onMounted, reactive, shallowRef, watch } from 'vue'
import MonitoreoCargaTeselas from './../clases/MonitoreoCargaTeselas'
import usarCapa, { props as propsCapa } from './../composables/usarCapa'
import { teselas as eventos } from './../eventos/capa'
import { tipoCapa, tipoEstadoCarga } from './../valores/capa'

const props = defineProps({
  /**
   * Nivel de acercamiento máximo.
   *
   * - Tipo: `Number`
   * - Valor por defecto: `undefined`
   * - Reactivo: ❌
   */
  acercamientoMaximo: {
    type: Number,
    default: undefined,
  },

  /**
   * Nivel de acercamiento mínimo.
   *
   * - Tipo: `Number`
   * - Valor por defecto: `undefined`
   * - Reactivo: ❌
   */
  acercamientoMinimo: {
    type: Number,
    default: undefined,
  },

  /**
   * Url remota de la capa.
   *
   * - Tipo: `String`
   * - Valor por defecto: `undefined`
   * - Reactivo: ❌
   */
  url: {
    type: String,
    default:
      'https://{a-c}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
  },

  ...propsCapa,
})

const emits = defineEmits(Object.values(eventos))

const sisdaiCapaXyz = shallowRef()
// const { url } = toRefs(props)

const { configurar } = usarCapa(sisdaiCapaXyz, props)

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

configurar(() => {
  const olSource = new XYZ({
    // url: url.value,
    url: props.url,
    attributions: props.atribuciones,
    // attributions:
    //   '<a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">&copy; Carto</a>',
    maxZoom: props.acercamientoMaximo,
    minZoom: props.acercamientoMinimo,
    crossOrigin: 'Anonymous',
  })

  olSource.on(TileEventType.TILELOADSTART, () => {
    emits(eventos.alIniciarCargaTesela)
    monitoreoCargaTeselas.inicio++
  })
  olSource.on(TileEventType.TILELOADEND, () => {
    emits(eventos.alFinalizarCargaTesela, true)
    monitoreoCargaTeselas.fin++
  })
  olSource.on(TileEventType.TILELOADERROR, () => {
    emits(eventos.alFinalizarCargaTesela, false)
    monitoreoCargaTeselas.error++
  })

  return { olSource, olLayerClass: TileLayer, tipo: tipoCapa.xyz }
})

onMounted(() => {
  console.log('sisdaiCapaXyz', props.id)
})
</script>

<template>
  <span
    ref="sisdaiCapaXyz"
    :sisdai-capa="id"
  />
</template>
