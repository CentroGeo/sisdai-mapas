<script setup>
import TileLayer from 'ol/layer/Tile'
import TileEventType from 'ol/source/TileEventType'
import XYZ from 'ol/source/XYZ'
import { onMounted, reactive, shallowRef, toRefs, watch } from 'vue'
import MonitoreoCargaTeselas from './../clases/MonitoreoCargaTeselas'
import usarCapa, { props as propsCapa } from './../composables/usarCapa'
import { teselas as eventos } from './../eventos/capa'
import { tipoEstadoCarga } from './../valores/capa'

const props = defineProps({
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

  ...propsCapa,
})

const emits = defineEmits(Object.values(eventos))

const sisdaiCapaXyz = shallowRef()
const { url } = toRefs(props)

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
  const source = new XYZ({
    attributions:
      'Mosaicos <a href="https://carto.com/" target="_blank" rel="noopener noreferrer">&copy; Carto</a>',
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

  return { olSource: source, olLayerClass: TileLayer }
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
