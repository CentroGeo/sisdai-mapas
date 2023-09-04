<script setup>
import { onMounted } from 'vue'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import usarCapaTeselas, {
  props,
  emits,
} from '../../composables/usarCapaTeselas'

// eslint-disable-next-line
const propsSetup = defineProps(props)

// eslint-disable-next-line
const emit = defineEmits(emits)

onMounted(() => {
  usarCapaTeselas(propsSetup, emit).registrar(
    new TileLayer({
      source: new OSM(),
      // className: this.className,
    })
  )
})
</script>

<template style="display: none"><span /></template>
