<!--This file is part of sisdai-mapas.-->

<!--sisdai-mapas is free software: you can redistribute it and/or modify-->
<!--it under the terms of the GNU Lesser General Public License as published by the-->
<!--Free Software Foundation, either version 3 of the License, or-->
<!--(at your option) any later version.-->

<!--sisdai-mapas is distributed in the hope that it will be useful,-->
<!--but WITHOUT ANY WARRANTY; without even the implied warranty of-->
<!--MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General-->
<!--Public License for more details.-->

<!--You should have received a copy of the GNU Lesser General Public License along-->
<!--with sisdai-mapas. If not, see <https://www.gnu.org/licenses/>.-->

<script setup>
import { onMounted } from 'vue'
import ImageLayer from 'ol/layer/Image'
import ImageWMS from 'ol/source/ImageWMS'
import { ImageSourceEventType } from 'ol/source/Image'
import tiposEstatusCarga from './../../defaults/estatusCarga'

import usarCapa, { props, emits } from '../../composables/usarCapa'

// eslint-disable-next-line
const propsSetup = defineProps({
  /**
   * Url del servicio wms.
   */
  url: {
    type: String,
    required: true,
  },

  /**
   * Parametros del servicio wms, layers, cql, styles, etc
   */
  parametros: {
    type: Object,
    default: function () {
      return {}
    },
  },

  /**
   * Parametro de tipo de servidor.
   * @see https://openlayers.org/en/latest/apidoc/module-ol_source_WMSServerType.html
   */
  servidor: {
    type: String,
    default: 'geoserver',
  },

  ...props,
})

// eslint-disable-next-line
const emitsSetup = defineEmits(emits)

const { estatusCarga, registrar } = usarCapa(propsSetup, emitsSetup)

const source = new ImageWMS({
  url: propsSetup.url,
  params: propsSetup.parametros,
  serverType: propsSetup.servidor,
  crossOrigin: 'Anonymous',
})

source.on(ImageSourceEventType.IMAGELOADSTART, () => {
  emitsSetup('alIniciarCarga')
  estatusCarga.value = tiposEstatusCarga.ini
})
source.on(ImageSourceEventType.IMAGELOADERROR, () => {
  emitsSetup('alFinalizarCarga', true)
  estatusCarga.value = tiposEstatusCarga.error
})
source.on(ImageSourceEventType.IMAGELOADEND, () => {
  emitsSetup('alFinalizarCarga', true)
  estatusCarga.value = tiposEstatusCarga.fin
})

onMounted(() => {
  registrar(
    new ImageLayer({
      source,
      // className: this.className,
    })
  )
})
</script>

<template style="display: none"><span /></template>
