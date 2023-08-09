<script setup>
import ImageLayer from 'ol/layer/Image'
import ImageWMS from 'ol/source/ImageWMS'
import { onMounted, shallowRef } from 'vue'
import usarCapa, { props as propsCapa } from './../composables/usarCapa'

const props = defineProps({ ...propsCapa })

const sisdaiCapaVectorial = shallowRef()

const { configurar } = usarCapa(sisdaiCapaVectorial, props)

configurar(() => {
  const source = new ImageWMS({
    url: 'https://gema.conacyt.mx/geoserver/wms',
    params: { LAYERS: 'contexto:gref_division_estatal_2020' },
    serverType: 'geoserver',
    crossOrigin: 'Anonymous',
  })

  return new ImageLayer({
    source,
    id: props.id,
    nombre: props.nombre,
  })
})

onMounted(() => {
  console.log('sisdaiCapaVectorial', props.id)
})
</script>

<template>
  <span
    ref="sisdaiCapaVectorial"
    :sisdai-capa="id"
  />
</template>
