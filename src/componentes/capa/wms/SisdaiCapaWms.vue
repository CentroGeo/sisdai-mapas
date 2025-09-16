<script setup>
import { toRefs, watch } from 'vue'

import { Image as ImageLayer } from 'ol/layer'
import { ImageSourceEventType } from 'ol/source/Image'
import ImageWMS from 'ol/source/ImageWMS'

import eventos from './../eventos'
import useCapa from './../useCapa'
import _props from './props'
// import { TipoEstadoCarga } from './../../../utiles/MonitoreoCargaElementos'

const emits = defineEmits(Object.values(eventos))
const props = defineProps(_props)
const { cuadroInformativo, estilo, filtro, titulo } = toRefs(props)

const source = new ImageWMS({
  crossOrigin: 'anonymous',
  imageLoadFunction: (tile, url) => {
    props
      .consulta(url)
      .then(response => response.blob())
      .then(blob => (tile.getImage().src = URL.createObjectURL(blob)))
      .catch(() => {})
      .finally(() => {})
  },
  params: {
    CQL_FILTER: filtro.value,
    LAYERS: props.capa,
    STYLES: estilo.value,
  },
  ratio: 1,
  serverType: props.tipoServidor,
  url: props.fuente,
})

const capa = new ImageLayer({
  cuadroInfo: cuadroInformativo.value,
  id: props.id,
  source,
  tipo: 'wms',
  titulo: titulo.value,
})
useCapa(capa, props)

watch(cuadroInformativo, nv => capa.set('cuadroInfo', nv))
watch(estilo, STYLES => source.updateParams({ STYLES }))
watch(filtro, CQL_FILTER => source.updateParams({ CQL_FILTER }))

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

/**
 * Ver como reacciona su usabilidad con teselas. Puede cargar más rapido pero se tendreá que
 * revisar si funciona bien con Utfgrid.
 * @see https://openlayers.org/en/latest/examples/wms-tiled.html
 */
</script>

<template>
  <span :sisdai-capa="props.id" />
</template>
