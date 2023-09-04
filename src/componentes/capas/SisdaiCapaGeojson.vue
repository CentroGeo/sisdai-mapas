<script setup>
import { onMounted } from 'vue'
import VectorLayer from 'ol/layer/Vector'
// import VectorImage from 'ol/layer/VectorImage'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'

import usarCapaVectorial, {
  props,
  emits,
} from './../../composables/usarCapaVectorial'

// eslint-disable-next-line
const propsSetup = defineProps(props)

// eslint-disable-next-line
const emitsSetup = defineEmits(emits)

onMounted(() => {
  usarCapaVectorial(propsSetup, emitsSetup).registrar(
    new VectorLayer({
      source: new VectorSource({
        features: new GeoJSON().readFeatures({ ...propsSetup.datos }),
      }),
      // className: this.className,
    })
  )
})
</script>

<template style="display: none"><span /></template>
