<script setup>
import { inject, onMounted, onUnmounted, toRefs, watch } from 'vue'

import ImageWMS from 'ol/source/ImageWMS'
import { Image as ImageLayer } from 'ol/layer'
import { ImageSourceEventType } from 'ol/source/Image'

import { MAPA_INYECTADO } from './../../../utiles/identificadores'
import eventos from './../eventos'
import _props from './props'
import { TipoEstadoCarga } from './../../../utiles/MonitoreoCargaElementos'

const mapa = inject(MAPA_INYECTADO)
const emits = defineEmits(Object.values(eventos))
const props = defineProps(_props)
const { cuadroInformativo, estilo, filtro, titulo } = toRefs(props)

const source = new ImageWMS({
  params: {
    LAYERS: props.capa,
    STYLES: estilo.value,
    CQL_FILTER: filtro.value,
  },
  ratio: 1,
  serverType: props.tipoServidor,
  url: props.fuente,
  crossOrigin: 'anonymous',
});

const capa = new ImageLayer({
  cuadroInfo: cuadroInformativo.value,
  id: props.id,
  source,
  tipo: "wms",
  titulo: titulo.value,
})
watch(cuadroInformativo, (nv) => capa.set('cuadroInfo', nv))

// mapa.capas[props.id] = TipoEstadoCarga.no

source.on(ImageSourceEventType.IMAGELOADSTART, () => {
  emits(eventos.alIniciarCarga)
  // mapa.capas[props.id] = TipoEstadoCarga.inicio
})
source.on(ImageSourceEventType.IMAGELOADEND, () => {
  emits(eventos.alFinalizarCarga, true)
  // mapa.capas[props.id] = TipoEstadoCarga.fin
})
source.on(ImageSourceEventType.IMAGELOADERROR, () => {
  emits(eventos.alFinalizarCarga, false)
  // mapa.capas[props.id] = TipoEstadoCarga.error
})

watch(estilo, STYLES => source.updateParams({ STYLES }))
watch(filtro, CQL_FILTER => source.updateParams({ CQL_FILTER }))

onMounted(() => mapa.addLayer(capa))
onUnmounted(() => mapa.quitarCapa(props.id))

// /**
//  * Ver como reacciona su usabilidad con teselas. Puede cargar más rapido pero se tendreá que
//  * revisar si funciona bien con Utfgrid.
//  * @see https://openlayers.org/en/latest/examples/wms-tiled.html
//  */
</script>

<template>
  <span :sisdai-capa="props.id" />
</template>
