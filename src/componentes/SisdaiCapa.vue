<script setup>
import { idAleatorio } from '@/utiles'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { onMounted, onUnmounted } from 'vue'
import usarRegistroCapas from '@/composables/usarRegistroCapas'

const props = defineProps({
  id: {
    type: String,
    default: () => idAleatorio(),
  },
})

new TileLayer({
  source: new OSM(),
})

onMounted(() => {
  // usarRegistroCapas().registrar(props.id)
})

onUnmounted(() => {
  usarRegistroCapas().borrar(props.id)
})
</script>

<template>
  <div class="sisddai-capa">
    <h2>Hola, soy una capa 😏 [{{ id }}]</h2>
  </div>
</template>
