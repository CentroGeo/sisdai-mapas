<script setup>
import { inject, onMounted, onUnmounted, toRefs, watch } from 'vue'

import { Image as ImageLayer } from 'ol/layer'
import { ImageSourceEventType } from 'ol/source/Image'
import ImageWMS from 'ol/source/ImageWMS'

import { MAPA_INYECTADO } from './../../../utiles/identificadores'
import eventos from './../eventos'
import _props from './props'
import { TipoEstadoCarga } from './../../../utiles/MonitoreoCargaElementos'

const mapa = inject(MAPA_INYECTADO)
const emits = defineEmits(Object.values(eventos))
const props = defineProps(_props)
const { cuadroInformativo, estilo, filtro, opacidad, posicion, titulo, visible } = toRefs(props)

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
  opacity: opacidad.value,
  visible: visible.value,
  zIndex: posicion.value
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
watch(opacidad, nuevaOpacidad => capa.setOpacity(nuevaOpacidad))
watch(posicion, nuevaPosicion => capa.setZIndex(nuevaPosicion))
watch(visible, nuevaVisibilidad => capa.setVisible(nuevaVisibilidad))

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
