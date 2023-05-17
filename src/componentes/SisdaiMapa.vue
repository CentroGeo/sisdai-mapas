<script setup>
import { idAleatorio } from '@/utiles'
import Map from 'ol/Map'
import View from 'ol/View'
import { onMounted, ref } from 'vue'
import 'ol/ol.css'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

defineProps({
  id: {
    type: String,
    default: () => idAleatorio(),
  },
})

const mapa = ref(null)

onMounted(() => {
  new Map({
    target: mapa.value,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      new VectorLayer({
        source: new VectorSource({
          // features: new GeoJSON().readFeatures({ ...propsSetup.datos }),
        }),
      }),
    ],
    view: new View({
      center: [-102, 24],
      zoom: 4.5,
      projection: 'EPSG:4326',
    }),
  })
})
</script>

<template>
  <div class="sisddai-mapa">
    <h1>Hola, soy un contenedor de mapa 😎 [{{ id }}]</h1>

    <div
      ref="mapa"
      class="mapa"
      id="mapa"
    />

    <slot />
  </div>
</template>

<style>
.sisddai-mapa {
  width: 100%;
  border: solid 1px tomato;
}

.sisddai-mapa .mapa {
  width: 100%;
  height: 400px;
}
</style>
